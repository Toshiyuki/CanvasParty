const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // フロントエンドを提供

io.on('connection', (socket) => {
  console.log('ユーザーが接続しました:', socket.id);

  // 描画データを受信し、他のクライアントに送信
  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data); // 他のユーザーに送信
  });

  socket.on('disconnect', () => {
    console.log('ユーザーが切断しました:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('サーバーが http://localhost:3000 で起動しました');
});