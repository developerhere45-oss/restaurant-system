const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // 🔥 important

let orders = [];

// 📥 order receive
app.post("/order", (req, res) => {
  const order = req.body;
  orders.push(order);

  io.emit("newOrder", order); // 🔥 realtime

  res.send({ success: true });
});

// 📤 orders fetch
app.get("/orders", (req, res) => {
  res.json(orders);
});
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});