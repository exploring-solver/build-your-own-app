const express = require('express');
const cors = require('cors');
const natural = require('natural');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Recommendation = require('./models/Recommendation');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret key

app.use(cors());
app.use(express.json());
connectDB();

const classifier = new natural.BayesClassifier();

// Train the classifier with some sample data
classifier.addDocument('I love technology and gadgets', 'technology');
classifier.addDocument('Traveling is my passion', 'travel');
classifier.addDocument('I enjoy trying new cuisines', 'food');
classifier.train();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ error: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/user/preferences', verifyToken, async (req, res) => {
  const { interests, recentInteractions } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.interests = interests;
    user.recentInteractions = recentInteractions;
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user preferences' });
  }
});

app.get('/api/personalized-content', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const userInterests = user.interests.join(' ');
    const category = classifier.classify(userInterests);

    const content = {
      title: `Personalized ${category.charAt(0).toUpperCase() + category.slice(1)} Content`,
      description: `Here's some amazing content about ${category} tailored just for you!`,
    };

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get personalized content' });
  }
});

app.get('/api/recommendations', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const userInterests = user.interests.join(' ');
    const category = classifier.classify(userInterests);

    const recommendations = await Recommendation.find({ category }).limit(3);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

app.get('/api/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});