import express from 'express';
import {
  getUserData,
  getCars,
  addReview,
  getReviews,
  getCarDetails,
} from '../controllers/user.controller.js';
import {
  registerUser,
  loginUser,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload } from '../configs/cloudinary.config.js';
import { validate } from '../middleware/validate.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import { addReviewSchema, getCarDetailsSchema } from '../validators/user.validator.js';
import { rateLimiter } from '../utils/RateLimiter.js';

const userRouter = express.Router();

const authLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: "Too many requests from this IP, please try again later."
});

userRouter
  .route('/data')
  .get(protect, getUserData);

userRouter
  .route('/cars')
  .get(getCars);

userRouter
  .route('/add-review')
  .post(protect, upload.single("image"), validate(addReviewSchema), addReview);

userRouter
  .route('/get-reviews')
  .get(getReviews);

userRouter
  .route('/user-cardetails/:id')
  .get(validate(getCarDetailsSchema), getCarDetails);

userRouter
  .route('/register')
  .post(authLimiter, validate(registerSchema), registerUser);

userRouter
  .route('/login')
  .post(authLimiter, validate(loginSchema), loginUser);

export default userRouter;