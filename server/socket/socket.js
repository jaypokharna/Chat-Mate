import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User Connected - ", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id; //Maintain a map of users to their sockets

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected -", socket.id);
    delete userSocketMap[userId]; //Remove the disconnected User Id from the Map
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };