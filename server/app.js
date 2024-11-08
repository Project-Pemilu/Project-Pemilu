const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { getCandidates, patchVote } = require('./controllers/voteController');
const UserController = require('./controllers/UserController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('incomingVote', (arg) => {
    console.log(arg);
    io.emit('notify:incomingVote', 'new vote received');
  });
});

app.get('/candidates', getCandidates);
app.patch('/users/:id', patchVote);
app.post('/login', UserController.login);

app.use(errorHandler);

module.exports = httpServer;
