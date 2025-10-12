import {} from "dotenv/config";

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import { app, server } from "./socket/socket.js";

import messageRoute from "./routes/messageRoute.js";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import logoutRoute from "./routes/logoutRoute.js";

import userRoute from "./routes/userRoute.js";

import mongoose from "mongoose";
app.use(
  cors({
    origin: ["https://mern-chat-app-eta-two.vercel.app", "http://localhost:5173"],
    credentials: true, // Make sure to include this option to allow credentials
  })
);
const port = process.env.PORT || 5001;
const hostName = "localhost";

app.use(express.json());
app.use(express.static("public"));

app.use(cookieParser());

app.use("/messages", messageRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/user", userRoute);
app.use("/logout", logoutRoute);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const connection = async () => {
  try {
    await mongoose.connect(process.env.DATABAS_URL);
    console.log("Connected to db");
  } catch (err) {
    console.log(err.message);
  }
};

server.listen(port, () => {
  connection();
  console.log(`server running on: http://${hostName}:${port}`);
});

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went WRONG";
  const errStack = err.stack;

  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: errStack,
  });
});
