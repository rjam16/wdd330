const Wishlist = require('../models/Wishlist'); // Assuming Wishlist model is defined in models/Wishlist.js
const Game = require('../models/Game'); // Assuming you have a Game model (or use IGDB API data)

// Add a game to the user's wishlist
exports.addToWishlist = async (req, res) => {
  const { gameId } = req.body;
  const userId = req.userId; // From JWT authentication middleware

  try {
    // Check if the game already exists in the user's wishlist
    const existingGame = await Wishlist.findOne({ userId, gameId });
    if (existingGame) {
      return res.status(400).json({ message: 'Game already in your wishlist' });
    }

    const newGame = new Wishlist({
      gameId,
      userId,
      status: 'Want to Play', // Default status when adding a game
    });

    await newGame.save();

    res.status(201).json({
      message: 'Game added to wishlist',
      game: newGame
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove a game from the user's wishlist
exports.removeFromWishlist = async (req, res) => {
  const { gameId } = req.body;
  const userId = req.userId; // From JWT authentication middleware

  try {
    const removedGame = await Wishlist.findOneAndDelete({ userId, gameId });

    if (!removedGame) {
      return res.status(404).json({ message: 'Game not found in wishlist' });
    }

    res.status(200).json({
      message: 'Game removed from wishlist',
      game: removedGame
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all games in the user's wishlist
exports.getWishlist = async (req, res) => {
  const userId = req.userId; // From JWT authentication middleware

  try {
    const wishlist = await Wishlist.find({ userId }).populate('gameId');
    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update the status of a game in the wishlist
exports.updateWishlistStatus = async (req, res) => {
  const { gameId, status } = req.body;
  const userId = req.userId; // From JWT authentication middleware

  // Valid status options
  const validStatuses = ['Want to Play', 'Currently Playing', 'Dropped', 'Haven\'t Started', 'Completed'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const updatedGame = await Wishlist.findOneAndUpdate(
      { userId, gameId },
      { status },
      { new: true } // Return updated document
    );

    if (!updatedGame) {
      return res.status(404).json({ message: 'Game not found in wishlist' });
    }

    res.status(200).json({
      message: 'Wishlist status updated',
      game: updatedGame
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
