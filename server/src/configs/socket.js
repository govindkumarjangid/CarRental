import { Server } from "socket.io";
import Message from "../models/message.model.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  const onlineUsers = new Map();
  const activeSimulations = new Map();

  const routeCoordinates = [
    { lat: 28.6329, lng: 77.2195 }, // CP
    { lat: 28.6315, lng: 77.2198 },
    { lat: 28.6292, lng: 77.2205 },
    { lat: 28.6265, lng: 77.2215 },
    { lat: 28.6231, lng: 77.2230 },
    { lat: 28.6190, lng: 77.2250 },
    { lat: 28.6145, lng: 77.2270 },
    { lat: 28.6129, lng: 77.2295 }  // India Gate
  ];

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

    // INTERNAL CAR SIMULATOR LOGIC
    socket.on("start_tracking_simulation", (carId) => {
      if (!carId) return;
      socket.join(`tracking_${carId}`);
      
      if (!activeSimulations.has(carId)) {
        console.log(`Starting internal simulation for car: ${carId}`);
        let currentIndex = 0;
        const interval = setInterval(() => {
            const location = routeCoordinates[currentIndex];
            const dynamicLat = location.lat + (Math.random() - 0.5) * 0.0001;
            const dynamicLng = location.lng + (Math.random() - 0.5) * 0.0001;
            
            const payload = {
                carId: carId,
                latitude: dynamicLat,
                longitude: dynamicLng,
                speed: Math.floor(Math.random() * (60 - 40 + 1)) + 40,
                timestamp: new Date().toISOString()
            };
            
            io.emit("broadcast_car_location", payload);
            currentIndex = (currentIndex + 1) % routeCoordinates.length;
        }, 3000);
        
        activeSimulations.set(carId, interval);
      }
    });

    socket.on("stop_tracking_simulation", (carId) => {
      if (!carId) return;
      socket.leave(`tracking_${carId}`);
      
      const room = io.sockets.adapter.rooms.get(`tracking_${carId}`);
      if (!room || room.size === 0) {
          console.log(`Stopping internal simulation for car: ${carId}`);
          clearInterval(activeSimulations.get(carId));
          activeSimulations.delete(carId);
      }
    });

    // car location update from external simulator (fallback)
    socket.on("car_location_update", (data) => {
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
      
      // Clean up simulations if no one is listening
      for (const carId of activeSimulations.keys()) {
        const room = io.sockets.adapter.rooms.get(`tracking_${carId}`);
        if (!room || room.size === 0) {
            clearInterval(activeSimulations.get(carId));
            activeSimulations.delete(carId);
            console.log(`Cleaned up unused simulation for car: ${carId}`);
        }
      }
    });

    //leave chat
    socket.on("leaveChat", (chatId) => {
      socket.leave(chatId);
    });
  });

  console.log("Socket.io initialized");
};

export const getIO = () => io;
