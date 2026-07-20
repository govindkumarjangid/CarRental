import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMessages, getOrCreateChat, sendMessage } from "../controllers/chat.controller.js";
import { upload } from "../configs/cloudinary.js";
import { validate } from "../middleware/validate.middleware.js";
import { accessChatSchema, sendMessageSchema } from "../validators/chat.validator.js";

const chatRouter = express.Router();

chatRouter
    .route("/create-chat")
    .post(protect, validate(accessChatSchema), getOrCreateChat);

chatRouter
    .route("/send-message")
    .post(protect, upload.array('files'), validate(sendMessageSchema), sendMessage);

chatRouter
    .route("/get-messages")
    .get(protect, getMessages);


export default chatRouter;