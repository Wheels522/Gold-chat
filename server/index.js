const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const chatController = require('./chatController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New user connected');

    // Listen for new messages
    socket.on('sendMessage', (message) => {
        chatController.addMessage(message);
        io.emit('newMessage', message);
    });

    // Send initial messages to new user
    const messages = chatController.getMessages();
    socket.emit('initialMessages', messages);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
