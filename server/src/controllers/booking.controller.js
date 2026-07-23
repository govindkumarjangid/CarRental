import * as bookingService from "../services/booking.service.js";
import asyncHandler from "../utils/asyncHandler.js";

//* check avaliablity of cars
export const checkAvaliablityofCar = asyncHandler(async (req, res) => {
  const cars = await bookingService.checkAvaliablityofCar(req.body);
  return res.status(200).json({ success: true, cars });
});

//* create offline booking
export const createOfflineBooking = asyncHandler(async (req, res) => {
  const message = await bookingService.createOfflineBooking(req.user._id, req.body);
  return res.status(201).json({ success: true, message });
});

//* create online booking
export const createOnlineBooking = asyncHandler(async (req, res) => {
  const result = await bookingService.createOnlineBooking(req.user._id, req.body);
  return res.status(200).json({
    success: true,
    message: "Order created",
    order: result.order,
    bookingId: result.bookingId,
    key: result.key,
    amount: result.amount,
  });
});

//* list user bookings
export const getUserBookings = asyncHandler(async (req, res) => {
  const result = await bookingService.getUserBookings(req.user._id, {
    page: req.query.page,
    limit: req.query.limit,
  });

  if (result.totalPages !== undefined) {
    return res.status(200).json({
      success: true,
      bookings: result.bookings,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  }

  return res.status(200).json({ success: true, bookings: result.bookings });
});

//* list owner bookings
export const getOwnerBookings = asyncHandler(async (req, res) => {
  const result = await bookingService.getOwnerBookings(req.user, {
    page: req.query.page,
    limit: req.query.limit,
  });

  if (result.totalPages !== undefined) {
    return res.status(200).json({
      success: true,
      bookings: result.bookings,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  }

  return res.status(200).json({ success: true, bookings: result.bookings });
});

//* change booking status
export const changeBookingStatus = asyncHandler(async (req, res) => {
  const message = await bookingService.changeBookingStatus(req.user._id, req.body);
  return res.status(200).json({ success: true, message });
});

//* change payment status
export const changePaymentStatus = asyncHandler(async (req, res) => {
  const message = await bookingService.changePaymentStatus(req.user._id, req.body);
  return res.status(200).json({ success: true, message });
});

//* verify payment
export const verifyPayment = asyncHandler(async (req, res) => {
  const message = await bookingService.verifyPayment(req.body);
  return res.status(200).json({ success: true, message });
});

//* delete booking
export const deleteBooking = asyncHandler(async (req, res) => {
  const message = await bookingService.deleteBooking(req.user._id, req.body.bookingId);
  return res.status(200).json({ success: true, message });
});