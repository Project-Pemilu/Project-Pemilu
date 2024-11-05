const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');


const app = express();

const UserController = require('./controllers/UserController');
const errorHandler = require('./middlewares/errorHandler');

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

app.use('/login', UserController.login)

app.use(errorHandler)



module.exports = httpServer;
