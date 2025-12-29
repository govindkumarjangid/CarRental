import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './src/configs/db.js';
import userRouter from './src/Routes/userRoutes.js';
import ownerRouter from './src/Routes/ownerRoutes.js';
import bookingRouter from './src/Routes/bookingRoutes.js';

//* Initialize Express App
const app = express();

//* Connect Database
await connectDB();

//* port 
const PORT = process.env.PORT || 3000;

//* Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Welcome to the Car Rental Service API');
});

app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);



const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}....`);
    });
  } catch (error) {
    console.log("Error starting server:", error.message);
  }
}

startServer();