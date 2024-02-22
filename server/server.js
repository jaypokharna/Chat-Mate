import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "Authorization"],
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.get("/", (req, res) => {
  // root route http://localhost:3000
  res.json("ChatApp Server");
});

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server running on port - ${PORT}`);
});
