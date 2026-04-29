import Booking from "../models/booking.model.js";
import Car from '../models/car.model.js'
import User from '../models/user.model.js'
import razorpay from '../utils/razorpay.js'
import crypto from "crypto";
import wrapAsync from "../configs/wrapAsync.js";
import { sendEmail } from "../utils/sendEmail.js";
import { bookingEmailTemplate, bookingConfirmationTemplate } from "../utils/emailTemplates.js";

//* check avaliablity
export const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate }
  });

  return bookings.length === 0;
};

//* check avaliablity of cars
export const checkAvaliablityofCar = wrapAsync(async (req, res) => {
  const { location, pickupDate, returnDate } = req.body;

  if (!location || !pickupDate || !returnDate) {
    return res.json({ success: false, message: 'All fields are required' });
  }
  const car = await Car.find({ location, isAvaliable: true });

  const avaliableCarsPromises = car.map(async (car) => {
    const isAvaliable = await checkAvailability(car._id, pickupDate, returnDate);
    return { ...car._doc, isAvaliable: isAvaliable }
  })

  let avaliableCars = await Promise.all(avaliableCarsPromises);
  avaliableCars = avaliableCars.filter(car => car.isAvaliable === true);
  res.json({ success: true, cars: avaliableCars });
});

//* create offline booking
export const createOfflineBooking = wrapAsync(async (req, res) => {
  const { _id } = req.user;
  const { car, pickupDate, returnDate } = req.body;

  const isAvaliable = await checkAvailability(car, pickupDate, returnDate);

  if (!isAvaliable) {
    return res.json({ success: false, message: "Car is not avaliable" })
  }

  const carData = await Car.find(car);
  const picked = new Date(pickupDate);
  const returned = new Date(returnDate);
  const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
  const pricePerDay = Number(car.pricePerDay)
  const price = pricePerDay * noOfDays;

  const booking = await Booking.create({
    car,
    user: _id,
    owner: carData[0].owner,
    pickupDate,
    returnDate,
    price,
    paymentMethod: "offline",
  });

  // Send booking email to user
  const user = await User.findById(_id);
  const carInfo = carData[0];
  if (user?.email) {
    await sendEmail({
      email: user.email,
      subject: `Booking Received — ${carInfo.brand} ${carInfo.model} 📋`,
      htmlMessage: bookingEmailTemplate({
        userName: user.name,
        carName: `${carInfo.brand} ${carInfo.model}`,
        pickupDate,
        returnDate,
        price,
        paymentMethod: "offline",
      }),
    });
  }

  res.json({ success: true, message: 'Offline Booking successfully' })
});

//* create online booking
export const createOnlineBooking = wrapAsync(async (req, res) => {
  const { _id } = req.user;
  const { car, pickupDate, returnDate } = req.body;
  const isAvaliable = await checkAvailability(car, pickupDate, returnDate);

  if (!isAvaliable) {
    return res.json({ success: false, message: "Car is not avaliable" })
  }
  const carData = await Car.find(car);
  const picked = new Date(pickupDate);
  const returned = new Date(returnDate);
  const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
  const pricePerDay = Number(car.pricePerDay)
  const price = pricePerDay * noOfDays;

  const order = await razorpay.orders.create({
    amount: price * 100,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`
  });

  if (!order)
    return res.status(500).json({ success: false, message: "Error creating order" });

  const booking = await Booking.create({
    car,
    user: _id,
    owner: carData[0].owner,
    pickupDate,
    returnDate,
    price,
    paymentMethod: "online",
    paymentStatus: "confirmed",
    razorpayOrderId: order.id,
  });

  // Send booking email to user
  const user = await User.findById(_id);
  const carInfo = carData[0];
  if (user?.email) {
    await sendEmail({
      email: user.email,
      subject: `Booking Received — ${carInfo.brand} ${carInfo.model} 📋`,
      htmlMessage: bookingEmailTemplate({
        userName: user.name,
        carName: `${carInfo.brand} ${carInfo.model}`,
        pickupDate,
        returnDate,
        price,
        paymentMethod: "online",
      }),
    });
  }

  return res.json({
    success: true,
    message: "Order created",
    order,
    bookingId: booking._id,
    key: process.env.RAZORPAY_KEY_ID,
    amount: price * 100,
  });
});

//* list user bookings
export const getUserBookings = wrapAsync(async (req, res) => {
  const { _id } = req.user;
  const bookings = await Booking.find({ user: _id }).populate('car').sort({ createdAt: -1 });
  res.json({ success: true, bookings });
});

//* list owner bookings
export const getOwnerBookings = wrapAsync(async (req, res) => {
  if (req.user.role !== 'owner') {
    return res.json({ success: false, message: 'Access denied' });
  }
  const { _id } = req.user;
  const bookings = await Booking.find({ owner: _id }).populate('car user').select("-user.password").sort({ createdAt: -1 });
  res.json({ success: true, bookings });
});

//* change booking status
export const changeBookingStatus = wrapAsync(async (req, res) => {
  const { _id } = req.user;
  const { bookingId, status } = req.body;
  const booking = await Booking.findById(bookingId).populate('car user');
  if (booking.owner.toString() !== _id.toString()) {
    return res.json({ success: false, message: 'Access denied' });
  }
  booking.status = status;
  await booking.save();

  // Send confirmation email when booking is confirmed
  if (status === 'confirmed' && booking.user?.email) {
    const car = booking.car;
    await sendEmail({
      email: booking.user.email,
      subject: `Booking Confirmed — ${car.brand} ${car.model} ✅`,
      htmlMessage: bookingConfirmationTemplate({
        userName: booking.user.name,
        carName: `${car.brand} ${car.model}`,
        pickupDate: booking.pickupDate,
        returnDate: booking.returnDate,
        price: booking.price,
        bookingId: booking._id.toString(),
      }),
    });
  }

  res.json({ success: true, message: 'Booking status updated' });
});

//* change payment status
export const changePaymentStatus = wrapAsync(async (req, res) => {
  const { _id } = req.user;
  const { bookingId, status } = req.body;
  const booking = await Booking.findById(bookingId);
  if (booking.owner.toString() !== _id.toString()) {
    return res.json({ success: false, message: 'Access denied' });
  }
  booking.paymentStatus = status;
  await booking.save();
  res.json({ success: true, message: 'Payment status updated' });
});

//* verify payment
export const verifyPayment = wrapAsync(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, status, bookingId } = req.body;

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return res.status(400).json({ success: false, message: "missing required fields" });
  }

  const sign = razorpayOrderId + "|" + razorpayPaymentId;

  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expected !== razorpaySignature || status === "failure") {
    await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: "failed",
      status: "cancelled",
    });
    return res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }

  const booking = await Booking.findByIdAndUpdate(bookingId, {
    razorpayOrderId: razorpayOrderId,
    razorpayPaymentId: razorpayPaymentId,
    razorpaySignature: razorpaySignature,
    paymentStatus: "confirmed",
    status: "confirmed",
  }, { new: true }).populate('car user');

  // Send booking confirmation email after successful payment
  if (booking?.user?.email) {
    const car = booking.car;
    await sendEmail({
      email: booking.user.email,
      subject: `Booking Confirmed — ${car.brand} ${car.model} ✅`,
      htmlMessage: bookingConfirmationTemplate({
        userName: booking.user.name,
        carName: `${car.brand} ${car.model}`,
        pickupDate: booking.pickupDate,
        returnDate: booking.returnDate,
        price: booking.price,
        bookingId: booking._id.toString(),
      }),
    });
  }

  res.json({ success: true, message: "Payment verified" });
});