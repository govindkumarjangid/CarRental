import Booking from "../models/Booking.js";
import Car from '../models/Car.js'
import razorpay from '../configs/razorpay.js'
import crypto from "crypto";
import dotenv from 'dotenv';
dotenv.config();

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

export const checkAvaliablityofCar = async (req, res) => {
  try {
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

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* create offline booking

export const createOfflineBooking = async (req, res) => {
  try {
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

    // console.log(price, noOfDays, pickupDate, returnDate, _id, carData);

    await Booking.create({
      car,
      user: _id,
      owner: carData[0].owner,
      pickupDate,
      returnDate,
      price,
      paymentMethod: "offline",
    });
    res.json({ success: true, message: 'Offline Booking successfully' })
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* create online booking

export const createOnlineBooking = async (req, res) => {
  try {
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
    // console.log("ORDER CREATED ", order);


   if(!order)
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


    return res.json({
      success: true,
      message: "Order created",
      order,
      bookingId: booking._id,
      key: process.env.RAZORPAY_KEY_ID,
      amount: price * 100,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error creating booking" });
  }
}

//* list user bookings
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id }).populate('car').sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* list owner bookings

export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.json({ success: false, message: 'Access denied' });
    }
    const { _id } = req.user;
    const bookings = await Booking.find({ owner: _id }).populate('car user').select("-user.password").sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* change booking status

export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: 'Access denied' });
    }
    booking.status = status;
    await booking.save();
    res.json({ success: true, message: 'Booking status updated' });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* change payment status

export const changePaymentStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: 'Access denied' });
    }
    booking.paymentStatus = status;
    await booking.save();
    res.json({ success: true, message: 'Payment status updated' });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* verify payment

export const verifyPayment = async (req, res) => {
  try {
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

    await Booking.findByIdAndUpdate(bookingId, {
      razorpayOrderId: razorpayOrderId,
      razorpayPaymentId: razorpayPaymentId,
      razorpaySignature: razorpaySignature,
      paymentStatus: "confirmed",
      status: "confirmed",
    })
    res.json({ success: true, message: "Payment verified" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}