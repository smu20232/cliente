const io = require('socket.io-client')

const socket = io();

module.exports = socket;

// global.socket = module.exports