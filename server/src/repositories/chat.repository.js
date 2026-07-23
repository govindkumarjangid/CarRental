import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const findChatByUserAndOwner = async (userId, ownerId) => {
  return await Chat.findOne({ user: userId, owner: ownerId }).lean();
};

export const findChatById = async (chatId) => {
  return await Chat.findById(chatId);
};

export const createChat = async (chatData) => {
  return await Chat.create(chatData);
};

export const createMessage = async (messageData) => {
  return await Message.create(messageData);
};

export const updateChatLastMessage = async (chatId, messageId, from) => {
  return await Chat.findByIdAndUpdate(chatId, {
    $push: { messages: messageId },
    lastMessage: messageId,
    ...(from === "user" ? { unreadByOwner: true } : { unreadByUser: true }),
  });
};

export const findMessagesByChatId = async (chatId) => {
  return await Message.find({ chatId }).sort({ createdAt: 1 }).lean();
};
