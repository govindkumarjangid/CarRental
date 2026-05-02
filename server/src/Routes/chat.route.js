import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMessages, getOrCreateChat, sendMessage } from "../controllers/chat.controller.js";
import upload from "../configs/multer.js";

const chatRouter = express.Router();


chatRouter.post('/create-chat', protect, getOrCreateChat);
chatRouter.post('/send-message', protect, upload.array('files'), sendMessage);
chatRouter.get('/get-messages', protect, getMessages);


export default chatRouter;