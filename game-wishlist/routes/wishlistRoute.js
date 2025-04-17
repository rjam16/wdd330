// routes/wishlistRoute.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Get all games in the wishlist for the logged-in user
router.get('/', wishlistController.getWishlist);

// Add a game to the wishlist
router.post('/', wishlistController.addGameToWishlist);

// Remove a game from the wishlist
router.delete('/:gameId', wishlistController.removeGameFromWishlist);

module.exports = router;
