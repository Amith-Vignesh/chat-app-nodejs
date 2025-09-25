const users = [];

/**
 * Adds a user to the users array.
 *
 * @param {Object} data - Contains the user's ID, username, and room.
 * @returns {Object} - Contains the added user object, or an error message if the user already exists.
 */
const addUser = ({ id, username, room }) => {
  // Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate the data
  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }

  // Check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  // Validate username
  if (existingUser) {
    return {
      error: "Username is in use!",
    };
  }

  // Store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

/**
 * Removes a user from the users array.
 *
 * @param {string} id - ID of the user to remove
 * @returns {Object} - The removed user object, or undefined if no user was found
 */
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

/**
 * Retrieves a user by ID.
 * @param {string} id - The user's unique ID.
 * @returns {Object|undefined} The user object, or undefined if not found.
 */
const getUser = (id) => {
  return users.find((user) => user.id === id);
};

/**
 * Retrieves all users in a specific room.
 *
 * @param {string} room - The room name to filter by.
 * @returns {Object[]} Array of user objects in the specified room.
 */
const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
