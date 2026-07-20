import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { uploadToCloudinary } from '../configs/cloudinary.js';

// Create or get chat between user and owner
export const getOrCreateChat = asyncHandler(async (req, res) => {
  const { userId, ownerId, carId } = req.body;
  let chat = await Chat.findOne({ user: userId, owner: ownerId }).lean();
  if (!chat) {
    chat = await Chat.create({
      user: userId,
      owner: ownerId,
      car: carId,
    });
  }
  res.status(200).json({ success: true, chatId: chat._id });
});

// send messages
export const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, from, text } = req.body;
  const files = req.files || [];

  const chat = await Chat.findById(chatId);
  if (!chat)
    return res.status(404).json({ success: false, message: "Chat not found" });


  const attachments = [];
  for (const file of files) {
    const url = await uploadToCloudinary(file.buffer, file.originalname, file.mimetype);
    attachments.push({
      url,
      name: file.originalname,
      type: file.mimetype.startsWith("image/") ? "image" : "file",
    });
  }

  const newMessage = await Message.create({
    chatId,
    car: chat.car,
    senderId: from === "user" ? chat.user : chat.owner,
    receiverId: from === "user" ? chat.owner : chat.user,
    senderRole: from,
    message: text || "",
    messageType: attachments.length > 0 ? (attachments.every(a => a.type === "image") ? "image" : "file") : "text",
    attachments: attachments,
  });

  await Chat.findByIdAndUpdate(chatId, {
    $push: { messages: newMessage._id },
    lastMessage: newMessage._id,
    ...(from === "user"
      ? { unreadByOwner: true }
      : { unreadByUser: true }),
  });

  res.status(200).json({
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
});

// get user messages (Optimized with .lean())
export const getMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.query;
  const messages = await Message.find({ chatId })
    .sort({ createdAt: 1 })
    .lean();
  res.json({ success: true, messages });
});
