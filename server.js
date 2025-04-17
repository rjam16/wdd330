const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const igdbRoutes = require('./game-wishlist/server/igdb');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory users (just for demo)
let users = [];

// Routes
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.json({ success: false, message: 'Email already exists' });
  }

  users.push({ username, email, password });
  res.json({ success: true, message: 'Signup successful' });
});

app.use('/api', igdbRoutes);

const wishlistRoutes = require('./routes/wishlist');
app.use('/wishlist', wishlistRoutes);

app.patch('/wishlist/:gameId/status', async (req, res) => {
  const { status } = req.body;
  const { userId } = req.session;
  const { gameId } = req.params;

  const user = await User.findById(userId);
  const game = user.wishlist.id(gameId);
  game.status = status;

  await user.save();
  res.json({ success: true, game });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
