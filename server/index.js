import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './src/configs/db.js';
import userRouter from './src/Routes/user.route.js';
import ownerRouter from './src/Routes/owner.route.js';
import bookingRouter from './src/Routes/booking.route.js';
import chatRouter from './src/Routes/chat.route.js';

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

//* routes
app.get('/', (req, res) => {
  res.send('Welcome to the Car Rental Service API');
});

app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/chat', chatRouter);

//* Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(`[Error] ${message}`);
  res.status(statusCode).json({
    success: false,
    message
  });
});

export default app;
