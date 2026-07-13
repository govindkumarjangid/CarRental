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
import { validate } from '../middleware/validate.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import { rateLimiter } from '../utils/RateLimiter.js';

const userRouter = express.Router();

const authLimiter = rateLimiter({ windowMs: 15 * 60 * 1000, max: 10, message: "Too many login/register attempts from this IP, please try again later." });

userRouter.post('/register', authLimiter, validate(registerSchema), registerUser);
userRouter.post('/login', authLimiter, validate(loginSchema), loginUser);
userRouter.get('/data', protect, getUserData);
userRouter.get('/cars', getCars);
userRouter.post('/add-review', upload.single("image"), protect, addReview);
userRouter.get('/get-reviews', getReviews);
userRouter.get('/user-cardetails/:id', protect, getCarDetails);

export default userRouter;