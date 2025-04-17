// controllers/todoController.js
const Todo = require('../models/Todo'); // Assuming you have a Todo model
const User = require('../models/User'); // Assuming you have a User model

// Create a new to-do item
exports.createTodo = async (req, res) => {
  const { gameId, status, title } = req.body;
  const userId = req.userId; // From JWT authentication middleware

  try {
    const newTodo = new Todo({
      gameId,
      status,
      title,
      userId
    });

    await newTodo.save();

    res.status(201).json({
      message: 'To-do item created successfully',
      todo: newTodo
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all to-do items for a user
exports.getUserTodos = async (req, res) => {
  const userId = req.userId; // From JWT authentication middleware

  try {
    const todos = await Todo.find({ userId });
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get to-do items based on status
exports.getTodosByStatus = async (req, res) => {
  const { status } = req.params;
  const userId = req.userId; // From JWT authentication middleware

  try {
    const todos = await Todo.find({ userId, status });
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update the status or other details of a to-do item
exports.updateTodo = async (req, res) => {
  const { todoId, status, title } = req.body;
  const userId = req.userId; // From JWT authentication middleware

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, userId },
      { status, title },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'To-do item not found' });
    }

    res.status(200).json({
      message: 'To-do item updated successfully',
      todo: updatedTodo
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a to-do item
exports.deleteTodo = async (req, res) => {
  const { todoId } = req.body;
  const userId = req.userId; // From JWT authentication middleware

  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, userId });

    if (!deletedTodo) {
      return res.status(404).json({ message: 'To-do item not found' });
    }

    res.status(200).json({
      message: 'To-do item deleted successfully',
      todo: deletedTodo
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
