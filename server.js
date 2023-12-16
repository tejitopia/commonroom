const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const moment = require('moment');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3001;

// Initialize chatRooms and roomDurations with default values
let chatRooms = {
'room-1': []
};
let roomDurations = {
'room-1': 600
};

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

// Emit a welcome message to the user who just joined
socket.emit('chat message', {
username: 'CommonRoom',
text: 'Welcome to CommonRoom! Start chatting with random people from around the world.',
timestamp: moment().valueOf(),
color: "#000000"
});

// Notify others in the room
socket.broadcast.to(roomName).emit('chat message', {
username: 'CommonRoom',
text: `A new user has joined the chat.`,
timestamp: moment().valueOf(),
color: "#000000"
});

socket.emit('room assigned', { room: roomName, duration: roomDurations[roomName] });

socket.on('chat message', (data) => {
console.log(`Received message in room ${roomName}:`, data);
io.to(roomName).emit('chat message', data);
});

// Add a listener for the 'disconnect' event
socket.on('disconnect', () => {
console.log(`User ${socket.id} disconnected`);
removeFromRoom(socket.id, roomName);
delete connectedUsers[socket.id];
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
if (chatRooms[roomName].length === 0) {
cleanupRoom(roomName);
}
}

function cleanupRoom(roomName) {
delete chatRooms[roomName];
delete roomDurations[roomName];
}

server.listen(port, () => {
console.log(`Server running on http://localhost:${port}`);
});