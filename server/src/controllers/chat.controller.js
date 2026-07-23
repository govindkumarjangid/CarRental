import * as chatService from "../services/chat.service.js";
import asyncHandler from "../utils/asyncHandler.js";

//* Create or get chat between user and owner
export const getOrCreateChat = asyncHandler(async (req, res) => {
  const chatId = await chatService.getOrCreateChat(req.body);
  return res.status(200).json({ success: true, chatId });
});

//* send messages
export const sendMessage = asyncHandler(async (req, res) => {
  const newMessage = await chatService.sendMessage({
    chatId: req.body.chatId,
    from: req.body.from,
    text: req.body.text,
    files: req.files || [],
  });

  return res.status(200).json({
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
});

//* get user messages
export const getMessages = asyncHandler(async (req, res) => {
  const messages = await chatService.getMessages(req.query.chatId);
  return res.status(200).json({ success: true, messages });
});
