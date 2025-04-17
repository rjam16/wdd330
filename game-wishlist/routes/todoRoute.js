// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new to-do item
router.post('/todos', authMiddleware, todoController.createTodo);

// Get all to-do items for the logged-in user
router.get('/todos', authMiddleware, todoController.getUserTodos);

// Get to-do items by status (e.g., 'Want to Play', 'Currently Playing', etc.)
router.get('/todos/status/:status', authMiddleware, todoController.getTodosByStatus);

// Update a to-do item
router.put('/todos', authMiddleware, todoController.updateTodo);

// Delete a to-do item
router.delete('/todos', authMiddleware, todoController.deleteTodo);

module.exports = router;
