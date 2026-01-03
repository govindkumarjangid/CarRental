import express from 'express';
import {
  changeBookingStatus,
  changePaymentStatus,
  checkAvaliablityofCar,
  createOfflineBooking,
  createOnlineBooking,
  getOwnerBookings,
  getUserBookings,
  verifyPayment
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js'

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvaliablityofCar);
bookingRouter.post('/create', protect, createOfflineBooking);
bookingRouter.post('/create-online', protect, createOnlineBooking);
bookingRouter.post('/verify-payment', protect, verifyPayment);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/owner', protect, getOwnerBookings);
bookingRouter.post('/change-status', protect, changeBookingStatus);
bookingRouter.post('/change-payment-status', protect, changePaymentStatus);



export default bookingRouter;