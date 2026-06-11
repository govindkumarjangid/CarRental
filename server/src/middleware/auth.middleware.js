import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/appError.js';
import wrapAsync from '../configs/wrapAsync.js';

export const protect = wrapAsync(async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer "))
    token = token.split(" ")[1];

  if (!token)
    return next(new AppError("Not Authorized", 401));


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id)
      return next(new AppError("Not Authorized", 401));

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user)
      return next(new AppError("User not found", 404));

    if (req.user.isBlocked)
      return next(new AppError("User is blocked", 403));

    next();
  } catch (error) {
    return next(new AppError("Not Authorized", 401));
  }
});

