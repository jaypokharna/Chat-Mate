import { Server } from "socket.io";
import http from "http";
import express from "express";
import User from "../models/user.model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User Connected - ", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id; //Maintain a map of users to their sockets

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("searching", async (data) => {
    try {
      // Search users whose username contains the entire data term as a substring
      const searchedUser = await User.findOne({ username: data });

      // Emit the searched users back to the client-side
      socket.emit("searchedusers", searchedUser);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  });

  socket.on("typing", (receiverId, senderId) => {
    console.log(getReceiverSocketId(receiverId));
    console.log("Sender - ", senderId);
    socket
      .to(getReceiverSocketId(receiverId))
      .emit("isTyping", senderId);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected -", socket.id);
    delete userSocketMap[userId]; //Remove the disconnected User Id from the Map
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
