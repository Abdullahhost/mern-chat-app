import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "https://mern-chat-app-eta-two.vercel.app",
    methods: ["GET", "POST"],
  },
});

export const getReciverSocketId = (reciverId) => {
  return userSocketMap[reciverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId != "undefined") userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("stopTyping", (data) => {
    socket.broadcast.emit("stopTyping", data);
  });

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { app, server, io };
