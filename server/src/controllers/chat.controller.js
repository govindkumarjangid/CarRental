import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';
import wrapAsync from '../configs/wrapAsync.js';

// Create or get chat between user and owner
export const getOrCreateChat = wrapAsync(async (req, res) => {
  const { userId, ownerId, carId } = req.body;
  let chat = await Chat.findOne({ user: userId, owner: ownerId });
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
export const sendMessage = wrapAsync(async (req, res) => {
  const { chatId, from, text } = req.body;
  console.log(req.body);

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({ success: false, message: "Chat not found" });
  }

  const newMessage = await Message.create({
    chatId,
    car: chat.car,
    senderId: from === "user" ? chat.user : chat.owner,
    receiverId: from === "user" ? chat.owner : chat.user,
    senderRole: from,
    message: text,
    messageType: "text",
  });

  await Chat.findByIdAndUpdate(chatId, {
    $push: { messages: newMessage._id },
    lastMessage: newMessage._id,
    ...(from === "user"
      ? { unreadByOwner: true }
      : { unreadByUser: true }),
  });
  // console.log(newMessage)

  res.status(200).json({
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
});

// get user messages
export const getMessages = wrapAsync(async (req, res) => {
  const { chatId } = req.query;
  const messages = await Message.find({ chatId })
    .sort({ createdAt: 1 });
  res.json({ success: true, messages });
});
