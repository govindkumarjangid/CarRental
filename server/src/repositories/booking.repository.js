import Booking from "../models/booking.model.js";
import Car from "../models/car.model.js";
import User from "../models/user.model.js";

export const countConflictingBookings = async (carId, pickupDate, returnDate) => {
  return await Booking.countDocuments({
    car: carId,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });
};

export const findAvailableCarsByLocation = async (location) => {
  return await Car.find({ location, status: "available" }).lean();
};

export const findCarById = async (carId) => {
  return await Car.findById(carId);
};

export const findCarByIdLean = async (carId) => {
  return await Car.findById(carId).lean();
};

export const findUserByIdLean = async (userId) => {
  return await User.findById(userId).lean();
};

export const createBooking = async (bookingData) => {
  return await Booking.create(bookingData);
};

export const findUserBookingsPaginated = async (userId, skip, limit) => {
  const [bookings, total] = await Promise.all([
    Booking.find({ user: userId })
      .populate("car")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Booking.countDocuments({ user: userId }),
  ]);
  return { bookings, total };
};

export const findUserBookingsAll = async (userId) => {
  return await Booking.find({ user: userId })
    .populate("car")
    .sort({ createdAt: -1 })
    .lean();
};

export const findOwnerBookingsPaginated = async (ownerId, skip, limit) => {
  const [bookings, total] = await Promise.all([
    Booking.find({ owner: ownerId })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Booking.countDocuments({ owner: ownerId }),
  ]);
  return { bookings, total };
};

export const findOwnerBookingsAll = async (ownerId) => {
  return await Booking.find({ owner: ownerId })
    .populate("car user")
    .select("-user.password")
    .sort({ createdAt: -1 })
    .lean();
};

export const findBookingById = async (bookingId) => {
  return await Booking.findById(bookingId);
};

export const findBookingByIdWithDetails = async (bookingId) => {
  return await Booking.findById(bookingId).populate("car user");
};

export const deleteBookingById = async (bookingId) => {
  return await Booking.findByIdAndDelete(bookingId);
};
