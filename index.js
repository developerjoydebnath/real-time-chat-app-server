const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');
const { db } = require('./database/db');
const { corsOptions } = require('./utils/corsOptions');
const { credentials } = require('./middlewares/credential');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
    cors: {
        // origin: 'https://comfy-bienenstitch-afa8c6.netlify.app', // https://real-time-chat-app-client-nine.vercel.app, https://658dc5ad73b2161567441cba--comfy-bienenstitch-afa8c6.netlify.app
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// middlewares
// app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public/images')));

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

    socket.on('deleteMessage', (messageDetail) => {
        const receiver = onlineUsers?.find((user) => user.userId === messageDetail?.receiverId);

        if (receiver?.socketId) {
            io.to(receiver.socketId).emit('deleted-message', messageDetail);
        }
    });

    // remove disconnected users from the list of online users
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit('online-users', onlineUsers);
    });
});

// socket io end ====================================================================

httpServer.listen(port);
