const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.get('/',(req,res)=> {
  res.json('Hola amigo!');
})
app.use('/api/auth', authRoutes);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const userLocations = new Map();

io.on('connection', (socket) => {
  console.log(`New client connected [ID: ${socket.id}]`);

  socket.on('updateLocation', (data) => {
    console.log(`Location update received from user: ${data.userId}`);
    userLocations.set(data.userId, {
      latitude: data.latitude,
      longitude: data.longitude,
    });
    io.emit('locationUpdate', data);
  });

  socket.on('startTracking', (data) => {
    console.log(`Start tracking request for user: ${data.userId}`);
    const location = userLocations.get(data.userId);
    if (location) {
      console.log(`Sending current location to user: ${data.userId}`);
      socket.emit('locationUpdate', {
        userId: data.userId,
        ...location,
      });
    } else {
      console.log(`No location data available for user: ${data.userId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected [ID: ${socket.id}]`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
