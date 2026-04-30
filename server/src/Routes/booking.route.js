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

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvaliablityofCar);
bookingRouter.post('/create', protect, createOfflineBooking);
bookingRouter.post('/create-online', protect, createOnlineBooking);
bookingRouter.post('/verify-payment', protect, verifyPayment);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/owner', protect, getOwnerBookings);
bookingRouter.post('/change-status', protect, changeBookingStatus);
bookingRouter.post('/change-payment-status', protect, changePaymentStatus);
bookingRouter.post('/delete-booking', protect, deleteBooking);



export default bookingRouter;