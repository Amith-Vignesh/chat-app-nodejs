/**
 * Return object with a chat message containing user's text.
 * @param {string} username - Username of the user
 * @param {string} text - Text of the message
 * @return {Object} - Object containing message data
 */
const generateMessage = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
  };
};

/**
 * Return object with a chat message containing user's location.
 * @param {string} username - Username of the user
 * @param {string} url - URL of the user's location
 * @return {Object} - Object containing location message
 */
const generateLocationMessage = (username, url) => {
  return {
    username,
    url,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage,
};
