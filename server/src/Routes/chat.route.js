import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMessages, getOrCreateChat, sendMessage } from "../controllers/chat.controller.js";
import upload from "../configs/multer.js";
import { validate } from "../middleware/validate.middleware.js";
import { accessChatSchema, sendMessageSchema } from "../validators/chat.validator.js";

const chatRouter = express.Router();


chatRouter.post('/create-chat', protect, validate(accessChatSchema), getOrCreateChat);
chatRouter.post('/send-message', protect, upload.array('files'), validate(sendMessageSchema), sendMessage);
chatRouter.get('/get-messages', protect, getMessages);


export default chatRouter;