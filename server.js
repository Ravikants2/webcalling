const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.get('/', (_, res) => res.send('WebCalling Signaling Server'));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Fixed room for the 2 users
const ROOM = 'webcalling-private';
const room = { users: {} }; // socketId -> { name, email }

io.on('connection', socket => {
  socket.on('user-login', ({ name, email }) => {
    socket.userName = name;
    socket.userEmail = email;
    socket.join(ROOM);
    room.users[socket.id] = { name, email };

    // Tell this user who else is online
    const others = Object.entries(room.users)
      .filter(([id]) => id !== socket.id)
      .map(([id, u]) => ({ id, ...u }));
    socket.emit('room-state', { myId: socket.id, peers: others });

    // Tell others this user joined
    socket.to(ROOM).emit('peer-online', { id: socket.id, name, email });
  });

  socket.on('offer', ({ to, offer }) => io.to(to).emit('offer', { from: socket.id, offer }));
  socket.on('answer', ({ to, answer }) => io.to(to).emit('answer', { from: socket.id, answer }));
  socket.on('ice-candidate', ({ to, candidate }) => io.to(to).emit('ice-candidate', { from: socket.id, candidate }));
  socket.on('call-request', ({ to, type }) => io.to(to).emit('call-request', { from: socket.id, name: socket.userName, type }));
  socket.on('call-accept', ({ to }) => io.to(to).emit('call-accept', { from: socket.id }));
  socket.on('call-reject', ({ to }) => io.to(to).emit('call-reject', { from: socket.id }));
  socket.on('call-end', ({ to }) => io.to(to).emit('call-end', { from: socket.id }));
  socket.on('chat-message', ({ to, message, timestamp }) =>
    io.to(to).emit('chat-message', { from: socket.id, name: socket.userName, message, timestamp })
  );

  socket.on('disconnect', () => {
    delete room.users[socket.id];
    socket.to(ROOM).emit('peer-offline', { id: socket.id });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Server on port', PORT));
