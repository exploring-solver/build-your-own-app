const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./db');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

connectDB();

const User = mongoose.model('User', {
  username: String,
  password: String,
});

const Location = mongoose.model('Location', {
  userId: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date,
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.json({ success: true, userId: user._id });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ success: true, userId: user._id });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/users', async (req, res) => {
  const users = await User.find({}, 'username _id');
  res.json(users);
});

app.post('/location', async (req, res) => {
  const { userId, latitude, longitude } = req.body;
  const location = new Location({ userId, latitude, longitude, timestamp: new Date() });
  await location.save();
  io.emit('locationUpdate', { userId, latitude, longitude });
  res.json({ success: true });
});

app.get('/location/:userId', async (req, res) => {
  const { userId } = req.params;
  const location = await Location.findOne({ userId }).sort({ timestamp: -1 });
  res.json(location);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));