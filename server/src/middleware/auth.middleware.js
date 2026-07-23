import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/appError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && (req.cookies.accessToken || req.cookies.jwt)) {
    token = req.cookies.accessToken || req.cookies.jwt;
  }

  // console.log(req.headers.authorization)

  if (!token)
    return next(new AppError("Not authorized, token missing", 401));

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    // console.log(decoded);

    if (!decoded || !decoded.id)
      return next(new AppError("Not authorized, token invalid", 401));

    req.user = await User.findById(decoded.id).select('-password');

    // console.log(req.user);

    if (!req.user)
      return next(new AppError("User not found", 404));

    if (req.user.isBlocked)
      return next(new AppError("Your account has been blocked.", 403));

    next();
  } catch (error) {
    return next(new AppError("Not authorized, token validation failed", 401));
  }
});

export const owner = (req, res, next) => {
  if (req.user && req.user.role === 'owner') {
    next();
  } else {
    next(new AppError('Access denied: Owner role required', 403));
  }
};
