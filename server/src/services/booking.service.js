import crypto from "crypto";
import * as bookingRepository from "../repositories/booking.repository.js";
import ApiError from "../utils/ApiError.js";
import razorpay from "../configs/razorpay.config.js";
import { sendEmail } from "../utils/sendEmail.js";
import {
  bookingEmailTemplate,
  bookingConfirmationTemplate,
  bookingCancellationTemplate,
  bookingCompletedTemplate
} from "../utils/emailTemplates.js";

export const checkAvailability = async (carId, pickupDate, returnDate) => {
  const count = await bookingRepository.countConflictingBookings(carId, pickupDate, returnDate);
  return count === 0;
};

export const checkAvaliablityofCar = async ({ location, startTime, endTime }) => {
  if (!location || !startTime || !endTime)
    throw new ApiError(400, "All fields are required");


  const pickupDate = new Date(startTime);
  const returnDate = new Date(endTime);
  const cars = await bookingRepository.findAvailableCarsByLocation(location);

  const availableCarsPromises = (cars || []).map(async (carItem) => {
    const isAvailable = await checkAvailability(carItem._id, pickupDate, returnDate);
    return { ...carItem, isAvaliable: isAvailable };
  });

  let availableCars = await Promise.all(availableCarsPromises);
  availableCars = availableCars.filter(carItem => carItem.isAvaliable === true);
  return availableCars;
};

export const createOfflineBooking = async (userId, { car, startTime, endTime }) => {
  const picked = new Date(startTime);
  const returned = new Date(endTime);

  const isAvailable = await checkAvailability(car, picked, returned);
  if (!isAvailable) {
    throw new ApiError(400, "Car is not avaliable");
  }

  const carData = await bookingRepository.findCarByIdLean(car);
  if (!carData) {
    throw new ApiError(404, "Car not found");
  }

  const durationMs = returned - picked;
  if (isNaN(durationMs) || durationMs <= 0) {
    throw new ApiError(400, "Invalid duration selected");
  }

  const hours = Math.max(1, Math.ceil(durationMs / (1000 * 60 * 60)));
  const pricePerHour = Number(carData.pricePerHour || Math.round((carData.pricePerDay || 0) / 24) || 100);
  const price = pricePerHour * hours;

  await bookingRepository.createBooking({
    car,
    user: userId,
    owner: carData.owner,
    pickupDate: picked,
    returnDate: returned,
    price,
    paymentMethod: "offline",
  });

  const user = await bookingRepository.findUserByIdLean(userId);
  if (user?.email) {
    try {
      await sendEmail({
        email: user.email,
        subject: `Booking Received — ${carData.brand} ${carData.model} 📋`,
        htmlMessage: bookingEmailTemplate({
          userName: user.name,
          carName: `${carData.brand} ${carData.model}`,
          pickupDate: picked,
          returnDate: returned,
          price,
          paymentMethod: "offline",
          location: carData.location,
          carImage: carData.image,
          fuelType: carData.fuel_type,
          transmission: carData.transmission,
          seatingCapacity: carData.seating_capacity
        }),
      });
    } catch (e) {
      console.error("Offline Booking Email Error:", e.message);
    }
  }

  return "Offline Booking successfully";
};

export const createOnlineBooking = async (userId, { car, startTime, endTime }) => {
  const picked = new Date(startTime);
  const returned = new Date(endTime);

  const isAvailable = await checkAvailability(car, picked, returned);
  if (!isAvailable) {
    throw new ApiError(400, "Car is not avaliable");
  }

  const carData = await bookingRepository.findCarByIdLean(car);
  if (!carData) {
    throw new ApiError(404, "Car not found");
  }

  const durationMs = returned - picked;
  if (isNaN(durationMs) || durationMs <= 0) {
    throw new ApiError(400, "Invalid duration selected");
  }

  const hours = Math.max(1, Math.ceil(durationMs / (1000 * 60 * 60)));
  const pricePerHour = Number(carData.pricePerHour || Math.round((carData.pricePerDay || 0) / 24) || 100);
  const price = pricePerHour * hours;

  const order = await razorpay.orders.create({
    amount: price * 100,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`
  });

  if (!order) {
    throw new ApiError(500, "Error creating order");
  }

  const booking = await bookingRepository.createBooking({
    car,
    user: userId,
    owner: carData.owner,
    pickupDate: picked,
    returnDate: returned,
    price,
    paymentMethod: "online",
    paymentStatus: "confirmed",
    razorpayOrderId: order.id,
    status: "pending"
  });

  const user = await bookingRepository.findUserByIdLean(userId);
  if (user?.email) {
    try {
      await sendEmail({
        email: user.email,
        subject: `Booking Received — ${carData.brand} ${carData.model} 📋`,
        htmlMessage: bookingEmailTemplate({
          userName: user.name,
          carName: `${carData.brand} ${carData.model}`,
          pickupDate: picked,
          returnDate: returned,
          price,
          paymentMethod: "online",
          location: carData.location,
          carImage: carData.image,
          fuelType: carData.fuel_type,
          transmission: carData.transmission,
          seatingCapacity: carData.seating_capacity
        }),
      });
    } catch (e) {
      console.error("Online Booking Email Error:", e.message);
    }
  }

  return {
    order,
    bookingId: booking._id,
    key: process.env.RAZORPAY_KEY_ID,
    amount: price * 100,
  };
};

export const getUserBookings = async (userId, { page = 1, limit = 3 }) => {
  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) || 3;

  if (parsedLimit > 0) {
    const skip = (parsedPage - 1) * parsedLimit;
    const { bookings, total } = await bookingRepository.findUserBookingsPaginated(userId, skip, parsedLimit);
    return {
      bookings,
      total,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
    };
  } else {
    const bookings = await bookingRepository.findUserBookingsAll(userId);
    return { bookings };
  }
};

export const getOwnerBookings = async (user, { page = 1, limit = 0 }) => {
  if (user.role !== 'owner') {
    throw new ApiError(403, "Access denied");
  }

  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) || 0;

  if (parsedLimit > 0) {
    const skip = (parsedPage - 1) * parsedLimit;
    const { bookings, total } = await bookingRepository.findOwnerBookingsPaginated(user._id, skip, parsedLimit);
    return {
      bookings,
      total,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
    };
  } else {
    const bookings = await bookingRepository.findOwnerBookingsAll(user._id);
    return { bookings };
  }
};

export const changeBookingStatus = async (userId, { bookingId, status }) => {
  const booking = await bookingRepository.findBookingByIdWithDetails(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "Access denied");
  }

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

    const car = await bookingRepository.findCarById(booking.car._id);
    if (car) {
      car.status = "unavailable";
      await car.save();
    }
  }

  if ((status === 'completed' || status === 'cancelled') && (booking.status !== 'completed' && booking.status !== 'cancelled')) {
    const car = await bookingRepository.findCarById(booking.car._id);
    if (car) {
      car.status = "available";
      await car.save();
    }
  }

  booking.status = status;
  await booking.save();

  if (status === 'confirmed' && booking.user?.email) {
    const car = booking.car;
    try {
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
    } catch (e) {
      console.error("Booking Confirmation Email Error:", e.message);
    }
  }

  if (status === 'cancelled' && booking.user?.email) {
    const car = booking.car;
    try {
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
    } catch (e) {
      console.error("Booking Cancellation Email Error:", e.message);
    }
  }

  if (status === 'completed' && booking.user?.email) {
    const car = booking.car;
    try {
      await sendEmail({
        email: booking.user.email,
        subject: `Trip Completed — ${car.brand} ${car.model} 🏁`,
        htmlMessage: bookingCompletedTemplate({
          userName: booking.user.name,
          carName: `${car.brand} ${car.model}`,
          bookingId: booking._id.toString(),
        }),
      });
    } catch (e) {
      console.error("Booking Completed Email Error:", e.message);
    }
  }

  return "Booking status updated";
};

export const changePaymentStatus = async (userId, { bookingId, status }) => {
  const booking = await bookingRepository.findBookingById(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "Access denied");
  }

  booking.paymentStatus = status;
  await booking.save();
  return "Payment status updated";
};

export const verifyPayment = async ({ razorpayOrderId, razorpayPaymentId, razorpaySignature, status, bookingId }) => {
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    throw new ApiError(400, "missing required fields");
  }

  const sign = razorpayOrderId + "|" + razorpayPaymentId;
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expected !== razorpaySignature || status === "failure") {
    const booking = await bookingRepository.findBookingByIdWithDetails(bookingId);
    if (booking) {
      booking.paymentStatus = "failed";
      booking.status = "cancelled";
      await booking.save();

      if (booking.user?.email) {
        try {
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
        } catch (e) {
          console.error("Payment Failure Email Error:", e.message);
        }
      }
    }

    throw new ApiError(400, "Invalid signature");
  }

  const bookingData = await bookingRepository.findBookingById(bookingId);
  if (!bookingData) {
    throw new ApiError(404, "Booking not found");
  }

  const originalDurationMs = new Date(bookingData.returnDate) - new Date(bookingData.pickupDate);
  const newPickupDate = new Date();
  const newReturnDate = new Date(newPickupDate.getTime() + originalDurationMs);

  bookingData.razorpayOrderId = razorpayOrderId;
  bookingData.razorpayPaymentId = razorpayPaymentId;
  bookingData.razorpaySignature = razorpaySignature;
  bookingData.paymentStatus = "confirmed";
  bookingData.status = "confirmed";
  bookingData.pickupDate = newPickupDate;
  bookingData.returnDate = newReturnDate;

  await bookingData.save();

  const booking = await bookingRepository.findBookingByIdWithDetails(bookingId);
  if (booking && booking.car) {
    const car = await bookingRepository.findCarById(booking.car._id);
    if (car) {
      car.status = "unavailable";
      await car.save();
    }
  }

  if (booking?.user?.email) {
    const car = booking.car;
    try {
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
    } catch (e) {
      console.error("Payment Success Email Error:", e.message);
    }
  }

  return "Payment verified";
};

export const deleteBooking = async (userId, bookingId) => {
  const booking = await bookingRepository.findBookingById(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized");
  }

  await bookingRepository.deleteBookingById(bookingId);
  return "Booking deleted successfully";
};
