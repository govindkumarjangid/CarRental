import express from 'express';
import {
  getCars,
  loginUser,
  addReview,
  getReviews,
  getUserData,
  registerUser,
  getCarDetails,
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import upload from '../configs/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserData);
userRouter.get('/cars', getCars);
userRouter.post('/add-review', upload.single("image"), protect, addReview);
userRouter.get('/get-reviews', getReviews);
userRouter.get('/user-cardetails/:id', protect, getCarDetails);

export default userRouter;