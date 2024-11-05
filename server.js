const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let messages = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send previous messages to the new user
  socket.emit('previousMessages', messages);

  // Listen for new messages
  socket.on('newMessage', (data) => {
    const { username, message } = data;
    const newMessage = { username, message };
    messages.push(newMessage);
    io.emit('newMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(443, () => {
  console.log('Server is running on port 3000');
});
