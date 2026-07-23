import express from 'express';
import {
  registerUser,
  loginUser,
  googleAuth,
  googleRegister,
  googleLogin,
  logoutUser,
  refreshToken,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  registerSchema,
  loginSchema,
  googleSchema,
  googleRegisterSchema,
  googleLoginSchema,
  refreshTokenSchema,
} from '../validators/auth.validator.js';
import { rateLimiter } from '../utils/RateLimiter.js';

const authRouter = express.Router();

const authLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: "Too many authentication requests from this IP, please try again later."
});

authRouter
  .route("/register")
  .post(authLimiter, validate(registerSchema), registerUser);

authRouter
  .route("/login")
  .post(authLimiter, validate(loginSchema), loginUser);

authRouter
  .route("/google")
  .post(authLimiter, validate(googleSchema), googleAuth);

authRouter
  .route("/google/register")
  .post(authLimiter, validate(googleRegisterSchema), googleRegister);

authRouter
  .route("/google/login")
  .post(authLimiter, validate(googleLoginSchema), googleLogin);

authRouter
  .route("/logout")
  .post(protect, logoutUser);

authRouter
  .route("/refresh-token")
  .post(validate(refreshTokenSchema), refreshToken);

export default authRouter;