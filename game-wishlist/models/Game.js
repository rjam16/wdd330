const { MongoClient } = require('mongodb');

const url = 'your-mongodb-connection-url';  // Replace with your MongoDB URL
const dbName = 'game-quest-db';  // Replace with your DB name

async function createGame(db, name, cover, releaseDate, platforms) {
  const game = {
    name,
    cover,
    releaseDate: releaseDate || null,
    platforms: platforms || []
  };
  
  const result = await db.collection('games').insertOne(game);
  return result.ops[0]; // return the created game
}

async function findGameById(db, gameId) {
  return await db.collection('games').findOne({ _id: new MongoClient.ObjectId(gameId) });
}

module.exports = { createGame, findGameById };
