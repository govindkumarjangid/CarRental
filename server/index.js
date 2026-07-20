import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import connectDB from './src/configs/db.js';
import authRouter from './src/Routes/auth.routes.js';
import userRouter from './src/Routes/user.routes.js';
import ownerRouter from './src/Routes/owner.routes.js';
import bookingRouter from './src/Routes/booking.routes.js';
import chatRouter from './src/Routes/chat.routes.js';

//* Initialize Express App
const app = express();

//* Connect Database
await connectDB();

//* Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://car-rental-delta-rosy.vercel.app'
  ], credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//* Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Car Rental Service API');
});

//* API v1 Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/owner', ownerRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/chat', chatRouter);

//* API Legacy Aliases
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/chat', chatRouter);

//* 404 Route Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

//* Global Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Handle client request cancellation during file upload
  if (err.message === 'Request aborted' || err.code === 'ECONNABORTED') {
    return res.status(400).json({
      success: false,
      message: 'Upload cancelled by client or request aborted'
    });
  }

  // Handle specific database and JWT errors
  if (err.name === 'CastError') {
    err.statusCode = 400;
    err.message = `Resource not found. Invalid field: ${err.path}`;
  }

  if (err.code === 11000) {
    const value = err.errmsg ? err.errmsg.match(/(["'])(\\?.)*?\1/)[0] : 'duplicate value';
    err.statusCode = 400;
    err.message = `Duplicate field value: ${value}. Please use another value!`;
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors || {}).map(el => el.message);
    err.statusCode = 400;
    err.message = `Invalid input data: ${errors.join('. ')}`;
  }

  if (err.name === 'JsonWebTokenError') {
    err.statusCode = 401;
    err.message = 'Invalid token. Please log in again!';
  }

  if (err.name === 'TokenExpiredError') {
    err.statusCode = 401;
    err.message = 'Your session has expired. Please log in again!';
  }

  console.error(`[Error] ${err.statusCode} - ${err.message}`);
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    console.error(err.stack);
  }

  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    ...((process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) && { stack: err.stack })
  });
});

export default app;