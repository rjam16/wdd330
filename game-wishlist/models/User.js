const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const url = 'your-mongodb-connection-url';  // Replace with your MongoDB URL
const dbName = 'game-quest-db';  // Replace with your DB name

async function createUser(db, username, email, password) {
  const hashPassword = await bcrypt.hash(password, 10);
  const user = {
    username,
    email,
    password: hashPassword,
    wishlist: [],
    todoList: []
  };
  
  const result = await db.collection('users').insertOne(user);
  return result.ops[0]; // return the created user
}

async function findUserByEmail(db, email) {
  return await db.collection('users').findOne({ email });
}

async function comparePassword(storedPassword, inputPassword) {
  return await bcrypt.compare(inputPassword, storedPassword);
}

module.exports = { createUser, findUserByEmail, comparePassword };
