const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const moment = require("moment");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3001;

// Initialize chatRooms and roomDurations with default values
let chatRooms = [
  { id: 1, users: [], duration: Math.ceil(Math.random() * 60) * 60 },
];

function totalOnlineUsersCount() {
  let count = 0;
  for (let i = 0; i < chatRooms.length; i++) {
    count += chatRooms[i].users.length;
  }
  return count;
}

let connectedUsers = [];

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  const room = assignUserToRoom(socket.id);
  socket.join(room.id);

  console.log(`User ${socket.id} assigned to room ${room.id}`);

  io.to(room.id).emit(
    "user-joined",
    JSON.stringify({
      username: socket.id,
      time_left: room.duration,
      people_in_room: room.users.length,
      total_online_users: totalOnlineUsersCount(),
      color:
        "#" +
        ("000000" + Math.floor(Math.random() * 16777215).toString(16)).slice(
          -6
        ),
    })
  );

  //   // Emit a welcome message to the user who just joined
  //   socket.emit("chat message", {
  //     username: "CommonRoom",
  //     text: "Welcome to CommonRoom! Start chatting with random people from around the world.",
  //     timestamp: moment().valueOf(),
  //     color: "#000000",
  //   });

  // Notify others in the room
  //   socket.broadcast.to(roomName).emit("chat message", {
  //     username: "CommonRoom",
  //     text: `A new user has joined the chat.`,
  //     timestamp: moment().valueOf(),
  //     color: "#000000",
  //   });

  //   socket.emit("room assigned", {
  //     room: roomName,
  //     duration: roomDurations[roomName],
  //   });

  //   socket.on("chat message", (data) => {
  //     console.log(`Received message in room ${roomName}:`, data);
  //     io.to(roomName).emit("chat message", data);
  //   });

  // Add a listener for the 'disconnect' event
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
    removeFromRoom(socket.id);
  });
});

function assignUserToRoom(userSocketId) {
  for (let i = 0; i < chatRooms.length; i++) {
    if (chatRooms[i].users.length < 5) {
      // Add the user to the room
      chatRooms[i].users.push(userSocketId);
      return chatRooms[i];
    }
  }

  //   if none of the rooms are available, create a new room
  const newRoomId = chatRooms.length + 1;

  const newRoom = {
    id: newRoomId,
    users: [userSocketId],
    duration: Math.ceil(Math.random() * 60) * 60,
  };
  chatRooms.push(newRoom);
  return newRoom;
}

function removeFromRoom(socketId) {
  for (let i = 0; i < chatRooms.length; i++) {
    if (chatRooms[i].users.includes(socketId)) {
      chatRooms[i].users = chatRooms[i].users.filter((id) => id !== socketId);
      //   when last user aka all people leave the room, clean up the room
      if (chatRooms[i].users.length === 0) {
        // console.log(`Room ${chatRooms[i].id} cleaned up`);
        cleanupRoom(chatRooms[i].id);
      } else {
        io.to(chatRooms[i].id).emit(
          "user-left",
          JSON.stringify({
            username: socketId,
            people_in_room: chatRooms[i].users.length,
            total_online_users: totalOnlineUsersCount(),
          })
        );
      }
      break;
    }
  }
}

function cleanupRoom(roomId) {
  chatRooms = chatRooms.filter((room) => room.id !== roomId);
  // console.log(`Room ${roomId} cleaned up`);
}

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
