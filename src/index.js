/**
 * Main entry point for the chat application server.
 *
 * Sets up an Express server with Socket.io for real-time communication.
 * Handles user connections, joining rooms, sending messages, sharing locations, and disconnect events.
 *
 * @module index
 */

const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

/**
 * Handles a new WebSocket connection.
 *
 * @event io#connection
 * @param {Socket} socket - The connected socket instance.
 */
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  /**
   * Joins a user to a chat room.
   *
   * @event socket#join
   * @param {Object} options - User options containing username and room.
   * @param {string} options.username - The username of the user joining.
   * @param {string} options.room - The room to join.
   * @param {Function} callback - Callback function to handle errors or completion.
   */
  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit("message", generateMessage("Admin", "Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage("Admin", `${user.username} has joined!`)
      );
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  /**
   * Sends a chat message to the room.
   *
   * @event socket#sendMessage
   * @param {string} message - The message to send.
   * @param {Function} callback - Callback function to handle errors or completion.
   */
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed!");
    }

    io.to(user.room).emit("message", generateMessage(user.username, message));
    callback();
  });

  /**
   * Shares the user's location in the chat room.
   *
   * @event socket#sendLocation
   * @param {Object} coords - Coordinates object.
   * @param {number} coords.latitude - Latitude value.
   * @param {number} coords.longitude - Longitude value.
   * @param {Function} callback - Callback function to handle completion.
   */
  socket.on("sendLocation", (coords, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback();
  });

  /**
   * Handles user disconnection from the chat room.
   *
   * @event socket#disconnect
   */
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username} has left!`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
