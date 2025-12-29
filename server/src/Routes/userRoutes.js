import express from 'express';
import { addReview, getCars, getUserData, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import upload from '../configs/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserData);
userRouter.get('/cars', getCars);
userRouter.post('/add-review', upload.single("image"), protect, addReview);

export default userRouter;