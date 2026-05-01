import Booking from "../models/booking.model.js";
import Car from '../models/car.model.js'
import User from '../models/user.model.js'
import razorpay from '../utils/razorpay.js'
import crypto from "crypto";
import wrapAsync from "../configs/wrapAsync.js";
import { sendEmail } from "../utils/sendEmail.js";
import { bookingEmailTemplate, bookingConfirmationTemplate, bookingCancellationTemplate, bookingCompletedTemplate } from "../utils/emailTemplates.js";

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
  const { location, pickupDate: startTime, returnDate: endTime } = req.body;

  if (!location || !startTime || !endTime)
    return res.json({ success: false, message: 'All fields are required' });

  const pickupDate = new Date(startTime);
  const returnDate = new Date(endTime);
  const car = await Car.find({ location, status: "available" });

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
  const { car, startTime, endTime } = req.body;

  const picked = new Date(startTime);
  const returned = new Date(endTime);

  const isAvaliable = await checkAvailability(car, picked, returned);

  if (!isAvaliable)
    return res.json({ success: false, message: "Car is not avaliable" })

  const carData = await Car.findById(car);
  if (!carData) return res.json({ success: false, message: "Car not found" });

  const durationMs = returned - picked;
  if (isNaN(durationMs) || durationMs <= 0)
    return res.json({ success: false, message: "Invalid duration selected" });

  const hours = Math.max(1, Math.ceil(durationMs / (1000 * 60 * 60)));
  const pricePerHour = Number(carData.pricePerHour || Math.round((carData.pricePerDay || 0) / 24) || 100);

  let price = pricePerHour * hours;

  const booking = await Booking.create({
    car,
    user: _id,
    owner: carData.owner,
    pickupDate: picked,
    returnDate: returned,
    price,
    paymentMethod: "offline",
  });

  // Send booking email to user
  const user = await User.findById(_id);
  const carInfo = carData;

  if (user?.email) {
    await sendEmail({
      email: user.email,
      subject: `Booking Received — ${carInfo.brand} ${carInfo.model} 📋`,
      htmlMessage: bookingEmailTemplate({
        userName: user.name,
        carName: `${carInfo.brand} ${carInfo.model}`,
        pickupDate: picked,
        returnDate: returned,
        price,
        paymentMethod: "offline",
        location: carInfo.location,
        carImage: carInfo.image,
        fuelType: carInfo.fuel_type,
        transmission: carInfo.transmission,
        seatingCapacity: carInfo.seating_capacity
      }),
    });
  }

  res.json({ success: true, message: 'Offline Booking successfully' })
});

//* create online booking
export const createOnlineBooking = wrapAsync(async (req, res) => {
  const { _id } = req.user;
  const { car, startTime, endTime } = req.body;

  const picked = new Date(startTime);
  const returned = new Date(endTime);

  const isAvaliable = await checkAvailability(car, picked, returned);

  if (!isAvaliable)
    return res.json({ success: false, message: "Car is not avaliable" })

  const carData = await Car.findById(car);
  if (!carData) return res.json({ success: false, message: "Car not found" });

  const durationMs = returned - picked;
  if (isNaN(durationMs) || durationMs <= 0)
    return res.json({ success: false, message: "Invalid duration selected" });

  const hours = Math.max(1, Math.ceil(durationMs / (1000 * 60 * 60)));
  const pricePerHour = Number(carData.pricePerHour || Math.round((carData.pricePerDay || 0) / 24) || 100);
  const price = pricePerHour * hours;

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
    owner: carData.owner,
    pickupDate: picked,
    returnDate: returned,
    price,
    paymentMethod: "online",
    paymentStatus: "confirmed",
    razorpayOrderId: order.id,
    status: "pending"
  });

  // Send booking email to user
  const user = await User.findById(_id);
  const carInfo = carData;
  if (user?.email) {
    await sendEmail({
      email: user.email,
      subject: `Booking Received — ${carInfo.brand} ${carInfo.model} 📋`,
      htmlMessage: bookingEmailTemplate({
        userName: user.name,
        carName: `${carInfo.brand} ${carInfo.model}`,
        pickupDate: picked,
        returnDate: returned,
        price,
        paymentMethod: "online",
        location: carInfo.location,
        carImage: carInfo.image,
        fuelType: carInfo.fuel_type,
        transmission: carInfo.transmission,
        seatingCapacity: carInfo.seating_capacity
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
  if (req.user.role !== 'owner')
    return res.json({ success: false, message: 'Access denied' });
  const { _id } = req.user;
  const bookings = await Booking.find({ owner: _id }).populate('car user').select("-user.password").sort({ createdAt: -1 });
  res.json({ success: true, bookings });
});

//* change booking status
export const changeBookingStatus = wrapAsync(async (req, res) => {
  const { _id } = req.user;
  const { bookingId, status } = req.body;
  const booking = await Booking.findById(bookingId).populate('car user');

  if (booking.owner.toString() !== _id.toString())
    return res.json({ success: false, message: 'Access denied' });

  if (status === 'completed' && booking.status !== 'completed') {
    const plannedReturn = new Date(booking.returnDate);
    const actualReturn = new Date();
    if (actualReturn > plannedReturn) {
      const lateDurationMs = actualReturn - plannedReturn;
      const gracePeriodMs = 30 * 60 * 1000;

      if (lateDurationMs > gracePeriodMs) {
        const car = booking.car;
        const lateHours = Math.ceil(lateDurationMs / (1000 * 60 * 60));
        const lateFees = lateHours * (car.lateFeePerHour || 0);
        if (lateFees > 0) booking.price += lateFees;
      }
    }
  }

  if (status === 'confirmed' && booking.status !== 'confirmed') {
    const originalDurationMs = new Date(booking.returnDate) - new Date(booking.pickupDate);
    booking.pickupDate = new Date();
    booking.returnDate = new Date(booking.pickupDate.getTime() + originalDurationMs);
  }

  booking.status = status;
  await booking.save();

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
        location: car.location,
        carImage: car.image,
        fuelType: car.fuel_type,
        transmission: car.transmission,
        seatingCapacity: car.seating_capacity
      }),
    });
  }

  if (status === 'cancelled' && booking.user?.email) {
    const car = booking.car;
    await sendEmail({
      email: booking.user.email,
      subject: `Booking Cancelled — ${car.brand} ${car.model} ❌`,
      htmlMessage: bookingCancellationTemplate({
        userName: booking.user.name,
        carName: `${car.brand} ${car.model}`,
        bookingId: booking._id.toString(),
        reason: "Cancelled by owner"
      }),
    });
  }

  if (status === 'completed' && booking.user?.email) {
    const car = booking.car;
    await sendEmail({
      email: booking.user.email,
      subject: `Trip Completed — ${car.brand} ${car.model} 🏁`,
      htmlMessage: bookingCompletedTemplate({
        userName: booking.user.name,
        carName: `${car.brand} ${car.model}`,
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
  if (booking.owner.toString() !== _id.toString())
    return res.json({ success: false, message: 'Access denied' });
  booking.paymentStatus = status;
  await booking.save();
  res.json({ success: true, message: 'Payment status updated' });
});

//* verify payment
export const verifyPayment = wrapAsync(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, status, bookingId } = req.body;

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature)
    return res.status(400).json({ success: false, message: "missing required fields" });

  const sign = razorpayOrderId + "|" + razorpayPaymentId;

  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expected !== razorpaySignature || status === "failure") {
    await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: "failed",
      status: "cancelled",
    });
    const booking = await Booking.findById(bookingId).populate('car user');
    if (booking?.user?.email) {
      await sendEmail({
        email: booking.user.email,
        subject: `Booking Cancelled — ${booking.car.brand} ${booking.car.model} ❌`,
        htmlMessage: bookingCancellationTemplate({
          userName: booking.user.name,
          carName: `${booking.car.brand} ${booking.car.model}`,
          bookingId: booking._id.toString(),
          reason: "Payment verification failed"
        }),
      });
    }
    return res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }

  const bookingData = await Booking.findById(bookingId);
  if (!bookingData) return res.status(404).json({ success: false, message: "Booking not found" });

  const originalDurationMs = new Date(bookingData.returnDate) - new Date(bookingData.pickupDate);
  const newPickupDate = new Date();
  const newReturnDate = new Date(newPickupDate.getTime() + originalDurationMs);

  const booking = await Booking.findByIdAndUpdate(bookingId, {
    razorpayOrderId: razorpayOrderId,
    razorpayPaymentId: razorpayPaymentId,
    razorpaySignature: razorpaySignature,
    paymentStatus: "confirmed",
    status: "confirmed",
    pickupDate: newPickupDate,
    returnDate: newReturnDate
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
        location: car.location,
        carImage: car.image,
        fuelType: car.fuel_type,
        transmission: car.transmission,
        seatingCapacity: car.seating_capacity
      }),
    });
  }

  res.json({ success: true, message: "Payment verified" });
});

//* delete booking
export const deleteBooking = wrapAsync(async (req, res) => {
  const { _id } = req.user;
  const { bookingId } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking) return res.json({ success: false, message: "Booking not found" });

  if (booking.owner.toString() !== _id.toString()) {
    return res.json({ success: false, message: "You are not authorized" });
  }

  await Booking.findByIdAndDelete(bookingId);
  res.json({ success: true, message: "Booking deleted successfully" });
});