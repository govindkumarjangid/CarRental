import express from 'express';
import {
  changeBookingStatus,
  changePaymentStatus,
  checkAvaliablityofCar,
  createOfflineBooking,
  createOnlineBooking,
  getOwnerBookings,
  getUserBookings,
  verifyPayment,
  deleteBooking
} from '../controllers/booking.controller.js';
import { protect } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.middleware.js';
import { createBookingSchema, updateBookingStatusSchema } from '../validators/booking.validator.js';

const bookingRouter = express.Router();

bookingRouter
  .route("/check-availability")
  .post(checkAvaliablityofCar);

bookingRouter
  .route("/create")
  .post(protect, validate(createBookingSchema), createOfflineBooking);

bookingRouter
  .route("/create-online")
  .post(protect, validate(createBookingSchema), createOnlineBooking);

bookingRouter
  .route("/verify-payment")
  .post(protect, verifyPayment);

bookingRouter
  .route("/user")
  .get(protect, getUserBookings);

bookingRouter
  .route("/owner")
  .get(protect, getOwnerBookings);

bookingRouter
  .route("/change-status")
  .post(protect, validate(updateBookingStatusSchema), changeBookingStatus);

bookingRouter
  .route("/change-payment-status")
  .post(protect, changePaymentStatus);

bookingRouter
  .route("/delete-booking")
  .post(protect, deleteBooking);


export default bookingRouter;