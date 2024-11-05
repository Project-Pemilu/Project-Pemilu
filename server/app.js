const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  // ...
});

module.exports = httpServer;
