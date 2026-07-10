import { Server } from "socket.io";
import Message from "../models/message.model.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // users online and offline status 
    socket.on("addUser", (userId) => {
      if (!userId) return;
      onlineUsers.set(userId.toString(), socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      console.log(onlineUsers.keys())
    });

    // join chat room
    socket.on("joinChat", (chatId) => {
      console.log("Joined chat:", chatId);
      socket.join(chatId);
    });

    // typing
    socket.on("typing", (chatId) => {
      console.log("Typing received:", chatId);
      socket.to(chatId).emit("userTyping", chatId);
    });

    //stoptyping
    socket.on("stopTyping", (chatId) => {
      console.log("Stop typing:", chatId);
      socket.to(chatId).emit("userStopTyping", chatId);
    });


    // realtime message
    socket.on("sendMessage", ({ chatId, message }) => {
      console.log(chatId, message);
      socket.to(chatId).emit("receiveMessage", { message, chatId });
    });

    // car location update from simulator
    socket.on("car_location_update", (data) => {
      // console.log('Location received from simulator:', data);
      io.emit("broadcast_car_location", data);
    });

    // mark messages as read
    socket.on("markAsRead", async ({ chatId, role }) => {
      try {
        await Message.updateMany(
          { chatId, senderRole: { $ne: role }, seenByReceiver: false },
          { $set: { seenByReceiver: true } }
        );
        // Notify the other user in the room that messages were read
        socket.to(chatId).emit("messagesRead", { chatId });
      } catch (err) {
        console.error("Error marking messages as read:", err);
      }
    });

    //diconnect socket
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);

      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    //leave chat
    socket.on("leaveChat", (chatId) => {
      socket.leave(chatId);
    });
  });

  console.log("Socket.io initialized");
};

export const getIO = () => io;
