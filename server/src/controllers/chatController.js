import Chat from '../models/Chat.js';
import Message from '../models/Message.js';

// Create or get chat between user and owner
export const getOrCreateChat = async (req, res) => {
  try {
    const { userId, ownerId, carId } = req.body;
    let chat = await Chat.findOne({ user: userId, owner: ownerId });
    if (!chat) {
      chat = await Chat.create({
        user: userId,
        owner: ownerId,
        car: carId, // only first time
      });
    }
    res.status(200).json({ success: true, chatId: chat._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// send messages
export const sendMessage = async (req, res) => {
  try {
    const { chatId, from, text } = req.body;

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

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get user messages
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.query;
    const messages = await Message.find({ chatId })
      .sort({ createdAt: 1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

