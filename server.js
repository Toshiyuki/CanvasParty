const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://canvas-party-weld.vercel.app", // フロントエンドURL
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.get('/', (req, res) => {
  res.send("Socket.IO server is running.");
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // 描画データを他のクライアントにブロードキャスト
  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// サーバーを起動
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});