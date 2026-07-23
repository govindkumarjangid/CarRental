import * as chatRepository from "../repositories/chat.repository.js";
import ApiError from "../utils/ApiError.js";
import { uploadToCloudinary } from "../configs/cloudinary.config.js";

export const getOrCreateChat = async ({ userId, ownerId, carId }) => {
  let chat = await chatRepository.findChatByUserAndOwner(userId, ownerId);
  if (!chat) {
    chat = await chatRepository.createChat({
      user: userId,
      owner: ownerId,
      car: carId,
    });
  }
  return chat._id;
};

export const sendMessage = async ({ chatId, from, text, files = [] }) => {
  const chat = await chatRepository.findChatById(chatId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  const attachments = [];
  for (const file of files) {
    const url = await uploadToCloudinary(file.buffer, file.originalname, file.mimetype);
    attachments.push({
      url,
      name: file.originalname,
      type: file.mimetype.startsWith("image/") ? "image" : "file",
    });
  }

  const newMessage = await chatRepository.createMessage({
    chatId,
    car: chat.car,
    senderId: from === "user" ? chat.user : chat.owner,
    receiverId: from === "user" ? chat.owner : chat.user,
    senderRole: from,
    message: text || "",
    messageType: attachments.length > 0 ? (attachments.every(a => a.type === "image") ? "image" : "file") : "text",
    attachments: attachments,
  });

  await chatRepository.updateChatLastMessage(chatId, newMessage._id, from);

  return newMessage;
};

export const getMessages = async (chatId) => {
  if (!chatId) {
    throw new ApiError(400, "Chat ID is required");
  }
  return await chatRepository.findMessagesByChatId(chatId);
};
