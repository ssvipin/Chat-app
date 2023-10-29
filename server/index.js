const express = require("express");
// const User = require("./firebase/FirebaseConnection").default;
const app = express();
// const User = require("./FirebaseConnection")
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected socket.id", socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user join the room", data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    // await User.add(data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server is running now...");
});
