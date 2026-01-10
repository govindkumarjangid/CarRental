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
      socket.join(chatId);
      console.log("Joined chat:", chatId);
    });

    socket.on("typing", (chatId) => {
      socket.to(chatId).emit("userTyping", chatId);
    });

    // ✋ typing stop
    socket.on("stopTyping", (chatId) => {
      socket.to(chatId).emit("userStopTyping", chatId);
    });

    // realtime message (NO DB SAVE)
    socket.on("sendMessage", ({ chatId, message }) => {
      socket.to(chatId).emit("receiveMessage", { message });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  console.log("Socket.io initialized");
};

export const getIO = () => io;