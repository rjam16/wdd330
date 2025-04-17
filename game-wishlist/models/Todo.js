const { MongoClient } = require('mongodb');

const url = 'your-mongodb-connection-url';  // Replace with your MongoDB URL
const dbName = 'game-quest-db';  // Replace with your DB name

async function createTodo(db, userId, gameId, status) {
  const todo = {
    userId,
    gameId,
    status
  };
  
  const result = await db.collection('todos').insertOne(todo);
  return result.ops[0]; // return the created todo
}

async function findTodoByUserId(db, userId) {
  return await db.collection('todos').find({ userId }).toArray();
}

module.exports = { createTodo, findTodoByUserId };
