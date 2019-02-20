import express from 'express';
import http from 'http';
import socketio from 'socket.io'

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server)


app.get('/', (req, res) => {
  console.log('get')
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  io.emit("boom", {value: 'hi'})
  res.send('OK')
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

