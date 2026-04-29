import express from 'express';
import { addCar, blockUnblockUser, changeRoleToOwner, deleteCar, editCar, getAllUsers, getDashboardData, getMyChats, getOwnerCars, getOwnerDetails, toggleCarAvailability, updateUserImage } from '../controllers/owner.controller.js';
import { protect } from '../middleware/auth.middleware.js'
import upload from '../configs/multer.js';
const ownerRouter = express.Router();


ownerRouter.post('/change-role', protect, changeRoleToOwner);
ownerRouter.post('/add-car', protect, upload.single('image'), addCar);
ownerRouter.get('/cars', protect, getOwnerCars);
ownerRouter.post('/toggle-car', protect, toggleCarAvailability);
ownerRouter.post('/delete-car', protect, deleteCar);
ownerRouter.post('/edit-car', upload.single("image"), protect, editCar);
ownerRouter.get('/dashboard', protect, getDashboardData)
ownerRouter.post('/update-image', upload.single('image'), protect, updateUserImage)
ownerRouter.get('/allusers', protect, getAllUsers);
ownerRouter.post('/block-unblock', protect, blockUnblockUser);
ownerRouter.get('/owner-details/:id', protect, getOwnerDetails);
ownerRouter.get("/owner-chats", protect, getMyChats);



export default ownerRouter;