import express from "express";
import http from "http";
import moment from "moment";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // TODO: add proper origin
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 3001;

// Initialize chatRooms and roomDurations with default values
let firstRoomDuration = Math.ceil(Math.random() * 60);
// let firstRoomDuration = 1;
let chatRooms = [
  {
    id: uuidv4(),
    users: [],
    duration: firstRoomDuration,
    endTime: new Date(new Date().getTime() + firstRoomDuration * 60000),
  },
];

function totalOnlineUsersCount() {
  let count = 0;
  for (let i = 0; i < chatRooms.length; i++) {
    count += chatRooms[i].users.length;
  }
  return count;
}

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  const room = assignUserToRoom(socket.id);
  socket.join(room.id);

  console.log(`User ${socket.id} assigned to room ${room.id}`);

  io.emit(
    "total-online-users",
    JSON.stringify({ total_online_users: totalOnlineUsersCount() })
  );

  // timeLeft is in milliseconds. If you want it in minutes, you can divide by 60*1000
  io.to(room.id).emit(
    "user-joined",
    JSON.stringify({
      username: socket.id,
      time_left:
        new Date(new Date(room.endTime).getTime() - new Date().getTime()) /
        1000,
      people_in_room: room.users.length,

      color:
        "#" +
        ("000000" + Math.floor(Math.random() * 16777215).toString(16)).slice(
          -6
        ),
    })
  );

  socket.on("message-sent", (data) => {
    console.log("message sent", data, " from ", socket.id);
    const receivedData = JSON.parse(data);
    receivedData.username = socket.id;
    socket.broadcast
      .to(room.id)
      .emit("message-received", JSON.stringify(receivedData));
  });

  // Add a listener for the 'disconnect' event
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
    removeFromRoom(socket.id);
    io.emit(
      "total-online-users",
      JSON.stringify({ total_online_users: totalOnlineUsersCount() })
    );
  });
});

function assignUserToRoom(userSocketId) {
  // Check if any of the rooms have space
  let vacantRooms = chatRooms.filter((room) => room.users.length < 5);

  // If there are rooms with space, add the user to the first room with space
  if (vacantRooms.length > 0) {
    // randomly select a room from the vacant rooms
    const randomRoom =
      vacantRooms[Math.floor(Math.random() * vacantRooms.length)];
    randomRoom.users.push(userSocketId);
    return randomRoom;
  }

  //   if none of the rooms are available, create a new room
  const newRoomId = uuidv4();
  const newRoomDuration = Math.ceil(Math.random() * 60);

  const newRoom = {
    id: newRoomId,
    users: [userSocketId],
    duration: newRoomDuration,
    endTime: new Date(new Date().getTime() + newRoomDuration * 60000),
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

// function reshuffleUsers(room) {
//   // Clear the timeout
//   clearTimeout(room.timeoutId);

//   // Find the room in the array
//   const index = chatRooms.findIndex((r) => r.id === room.id);

//   // If the room was found, remove it
//   if (index !== -1) {
//     chatRooms.splice(index, 1);
//   }

//   // Filter the rooms to only include rooms with less than 5 users
//   let roomsWithSpace = chatRooms.filter((r) => r.users.length < 5);

//   // If there are no rooms with space, create few new rooms
//   if (roomsWithSpace.length === 0) {
//     const randomDuration1 = Math.ceil(Math.random() * 60) * 60;
//     const randomDuration2 = Math.ceil(Math.random() * 60) * 60;
//     const randomDuration3 = Math.ceil(Math.random() * 60) * 60;

//     const newRooms = [
//       {
//         id: uuidv4(),
//         users: [],
//         duration: randomDuration1,
//         endTime: new Date(new Date().getTime() + randomDuration1 * 60000),
//       },
//       {
//         id: uuidv4(),
//         users: [],
//         duration: randomDuration2,
//         endTime: new Date(new Date().getTime() + randomDuration2 * 60000),
//       },
//       {
//         id: uuidv4(),
//         users: [],
//         duration: randomDuration3,
//         endTime: new Date(new Date().getTime() + randomDuration3 * 60000),
//       },
//     ];
//     chatRooms = [...chatRooms, ...newRooms];
//     roomsWithSpace = [...newRooms];
//   }

//   // Reshuffle the users to the rooms with space
//   room.users.forEach((user) => {
//     const otherRoom =
//       roomsWithSpace[Math.floor(Math.random() * roomsWithSpace.length)];
//     otherRoom.users.push(user);
//   });
// }

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
