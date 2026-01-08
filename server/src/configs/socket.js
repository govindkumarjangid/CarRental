import { Server } from "socket.io";
import Message from "../models/Message.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    }
  });

  io.on("connection", (socket) => {
    console.log(socket.id);

    //joining a specific room
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
    });

    //send message
    socket.on("send_message", async (data) => {
      await Message.create({
        chatId: data.chatId,
        senderId: data.senderId,
        message: data.message,
        messageType: data.messageType || 'text'
      });

      //send real time 
      io.to(data.chatId).emit("receive_message", data);


      socket.on("disconnect", () => {
        console.log("socket disconnected");
      });

    });
  });
  console.log("Socket.io initialized");
}

export const getIO = () => io;