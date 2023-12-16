const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3001;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// A simple route for the root ('/') path
app.get('/', (req, res) => {
res.sendFile(__dirname + '/public/index.html');
});

// Socket.io connection event
io.on('connection', (socket) => {
console.log('A user connected');

// Notify the client that they are connected
socket.emit('connected', { message: 'You are now connected to the chat server.' });

// Add your socket.io logic here for handling messages, chat rooms, etc.

socket.on('chat message', (data) => {
console.log('Received chat message:', data);
// Process and broadcast the message as needed
io.emit('chat message', data); // Broadcast to all connected clients
});

// Handle the 'test event' from the client
socket.on('test event', (data) => {
console.log('Received test event from client:', data.message);

// Respond back to the client with a 'test response' event
socket.emit('test response', { message: 'This is a test response from the server' });
});

// Send the current number of connected users to all clients
io.emit('user connected', { count: io.engine.clientsCount });

socket.on('disconnect', () => {
console.log('A user disconnected');
// Handle user disconnection
});
});

// Start the server
server.listen(port, () => {
console.log(`Server running on http://localhost:${port}`);
});