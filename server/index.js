import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './src/configs/db.js';
import userRouter from './src/Routes/userRoutes.js';
import ownerRouter from './src/Routes/ownerRoutes.js';
import bookingRouter from './src/Routes/bookingRoutes.js';
import chatRouter from './src/Routes/chatRoutes.js';

//* Initialize Express App
const app = express();

//* Connect Database
await connectDB();


//* Middleware
app.use(cors({ origin: ['http://localhost:5173', 'https://carrental-nezp.onrender.com'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Welcome to the Car Rental Service API');
});

app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/chat', chatRouter);


export default app;
