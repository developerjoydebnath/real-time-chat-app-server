const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');
const { db } = require('./database/db');

const app = express();
const port = process.env.PORT || 8000;

const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
});

// middlewares
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// routes
app.use('/api/v1', router);

// database connection
db();

// socket io starts ================================================================

// declare the online users array
let onlineUsers = [];

io.on('connection', (socket) => {
    socket.on('addUser', (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            userId &&
            onlineUsers.push({
                socketId: socket.id,
                userId,
            });

        io.emit('online-users', onlineUsers);
    });

    socket.on('addNewUser', (user) => {
        io.emit('added-new-user', user);
    });

    socket.on('sendMessage', (messageDetail) => {
        const receiver = onlineUsers?.find((user) => user.userId === messageDetail?.receiverId);
        if (receiver?.socketId) {
            io.to(receiver.socketId).emit('get-message', messageDetail);
        }
    });

    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit('online-users', onlineUsers);
    });
});

// socket io end ====================================================================

httpServer.listen(port);
