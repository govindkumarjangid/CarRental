import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // join chat room
    socket.on("joinChat", (chatId) => {
      console.log("Joined chat:", chatId);
      socket.join(chatId);
    });


    socket.on("typing", (chatId) => {
      console.log("Typing received:", chatId);
      socket.to(chatId).emit("userTyping", chatId);
    });

    socket.on("stopTyping", (chatId) => {
      console.log("Stop typing:", chatId);
      socket.to(chatId).emit("userStopTyping", chatId);
    });


    // realtime message
    socket.on("sendMessage", ({ chatId, message }) => {
      console.log(chatId, message);
      socket.to(chatId).emit("receiveMessage", { message, chatId });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });

    socket.on("leaveChat", (chatId) => {
      socket.leave(chatId);
    });

  });

  console.log("Socket.io initialized");
};

export const getIO = () => io;
