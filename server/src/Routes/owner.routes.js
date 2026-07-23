import express from 'express';
import {
    addCar,
    blockUnblockUser,
    changeRoleToOwner,
    deleteCar,
    editCar,
    getAllUsers,
    getDashboardData,
    getMyChats,
    getOwnerCars,
    getOwnerDetails,
    updateCarStatus,
    updateUserImage
} from '../controllers/owner.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload } from '../configs/cloudinary.config.js';
import { validate } from '../middleware/validate.middleware.js';
import {
    addCarSchema,
    editCarSchema,
    updateCarStatusSchema,
    blockUnblockUserSchema,
    deleteCarSchema
} from '../validators/owner.validator.js';

const ownerRouter = express.Router();

ownerRouter
    .route("/change-role")
    .post(protect, changeRoleToOwner);

ownerRouter
    .route("/add-car")
    .post(protect, upload.single('image'), validate(addCarSchema), addCar);

ownerRouter
    .route("/cars")
    .get(protect, getOwnerCars);

ownerRouter
    .route("/update-status")
    .post(protect, validate(updateCarStatusSchema), updateCarStatus);

ownerRouter
    .route("/delete-car")
    .post(protect, validate(deleteCarSchema), deleteCar);

ownerRouter
    .route("/edit-car")
    .post(protect, upload.single("image"), validate(editCarSchema), editCar);

ownerRouter
    .route("/dashboard")
    .get(protect, getDashboardData);

ownerRouter
    .route("/update-image")
    .post(protect, upload.single('image'), updateUserImage);

ownerRouter
    .route("/allusers")
    .get(protect, getAllUsers);

ownerRouter
    .route("/block-unblock")
    .post(protect, validate(blockUnblockUserSchema), blockUnblockUser);

ownerRouter
    .route("/owner-details/:id")
    .get(protect, getOwnerDetails);

ownerRouter
    .route("/owner-chats")
    .get(protect, getMyChats);

export default ownerRouter;