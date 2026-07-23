import User from "../models/user.model.js";
import Car from "../models/car.model.js";
import Booking from "../models/booking.model.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const updateUserRole = async (userId, role) => {
  return await User.findByIdAndUpdate(userId, { role }, { returnDocument: 'after' });
};

export const createCar = async (carData) => {
  return await Car.create(carData);
};

export const findOwnerCarsPaginated = async (ownerId, skip, limit) => {
  const [cars, total] = await Promise.all([
    Car.find({ owner: ownerId }).skip(skip).limit(limit).lean(),
    Car.countDocuments({ owner: ownerId }),
  ]);
  return { cars, total };
};

export const findOwnerCarsAll = async (ownerId) => {
  return await Car.find({ owner: ownerId }).lean();
};

export const findCarById = async (carId) => {
  return await Car.findById(carId);
};

export const updateCarById = async (carId, updateData) => {
  return await Car.findByIdAndUpdate(carId, updateData, { returnDocument: 'after' });
};

export const updateUserImage = async (userId, image) => {
  return await User.findByIdAndUpdate(userId, { image }, { returnDocument: 'after' });
};

export const findAllUsersPaginated = async (skip, limit) => {
  const [users, total] = await Promise.all([
    User.find().select('-password').skip(skip).limit(limit).lean(),
    User.countDocuments(),
  ]);
  return { users, total };
};

export const findAllUsersAll = async () => {
  return await User.find().select('-password').lean();
};

export const updateUserBlockStatus = async (userId, isBlocked) => {
  return await User.findByIdAndUpdate(userId, { isBlocked }, { returnDocument: 'after' });
};

export const findOwnerById = async (ownerId) => {
  return await User.findById(ownerId).select('-password').lean();
};

export const findDashboardCarsAndBookings = async (ownerId) => {
  const [cars, bookings] = await Promise.all([
    Car.find({ owner: ownerId }).lean(),
    Booking.find({ owner: ownerId }).populate('car').sort({ createdAt: -1 }).lean(),
  ]);
  return { cars, bookings };
};

export const findUserChatsWithUnread = async (userId) => {
  const chats = await Chat.find({
    $or: [{ user: userId }, { owner: userId }],
  })
    .populate("user", "name image")
    .populate("owner", "name image")
    .populate("car", "brand model image")
    .populate({
      path: "lastMessage",
      select: "message createdAt messageType",
    })
    .sort({ updatedAt: -1 })
    .lean();

  const chatsWithUnreadCount = await Promise.all(chats.map(async (chat) => {
    const unreadCount = await Message.countDocuments({
      chatId: chat._id,
      receiverId: userId,
      seenByReceiver: false,
    });
    return { ...chat, unreadCount };
  }));

  return chatsWithUnreadCount;
};
