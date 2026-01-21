import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));
//initiate base route
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// triggering socket server
io.on("connection", (socket) => {
  console.log("A user connected! 🔌");
  // 1. Listen for the 'chat-message' event from this specific client
  socket.on("chat-message", (msg) => {
    console.log("Message received:", msg);

    // 2. Send it back to EVERYONE connected (Broadcasting)
    io.emit("broadcast-msg", `User said: ${msg}`);
  });
});

// server port mapping
server.listen(3000, () => {
  console.log("Server running");
});
