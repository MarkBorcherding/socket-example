import express from 'express';
import http from 'http';
import socketio from 'socket.io'

const app = express();
const server = http.createServer(app);

server.listen(3000, () => {
  console.log('listening on *:3000')
})


// All of this is standard REST with no knowledge of sockets
app.get('/', (req, res) => {
  console.log('get')
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res, next) => {
  console.log('got it')
  res.send('OK')
  next()
})

// we can wire up all this in a different module that only knows about sockety stuff
const io = socketio.listen(server)
app.post('/', (req, res, next) => {
  console.log('telling everyone')
  io.emit("boom", {some: 'value'})
  next();
})


io.on('connection', (socket) => {
  console.log('a user connected');
});

