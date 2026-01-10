import express from "express";
import { protect } from "../middleware/auth.js";
import { getMessages, getOrCreateChat, sendMessage } from "../controllers/chatController.js";

const chatRouter = express.Router();


chatRouter.post('/create-chat', protect, getOrCreateChat);
chatRouter.post('/send-message', protect, sendMessage);
chatRouter.get('/get-messages', protect, getMessages);


export default chatRouter;