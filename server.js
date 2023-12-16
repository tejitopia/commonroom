const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const moment = require('moment');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3001;

let chatRooms = {};
let roomDurations = {};
let connectedUsers = {};

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    const roomName = assignUserToRoom(socket.id);
    socket.join(roomName);
    connectedUsers[socket.id] = { room: roomName };

    console.log(`User ${socket.id} assigned to room ${roomName}`);

    socket.emit('chat message', {
        username: 'CommonRoom',
        text: 'Welcome to CommonRoom! Start chatting with random people from around the world.',
        timestamp: moment().valueOf(),
        color: "#000000"
    });

    socket.on('chat message', (data) => {
        console.log(`Received message in room ${roomName}:`, data);
        io.to(roomName).emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
        if (connectedUsers[socket.id]) {
            delete connectedUsers[socket.id];
        }
        removeFromRoom(socket.id, roomName);
    });
});

function assignUserToRoom(socketId) {
    for (const room in chatRooms) {
        if (chatRooms[room].length < 5) {
            chatRooms[room].push(socketId);
            return room;
        }
    }

    const newRoom = `room-${Object.keys(chatRooms).length + 1}`;
    chatRooms[newRoom] = [socketId];
    roomDurations[newRoom] = Math.floor(Math.random() * (60 * 60)) + 60;
    return newRoom;
}

function removeFromRoom(socketId, roomName) {
    chatRooms[roomName] = chatRooms[roomName].filter(id => id !== socketId);
    delete connectedUsers[socketId];

    if (chatRooms[roomName].length === 0) {
        delete chatRooms[roomName];
        delete roomDurations[roomName];
    }
}

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
