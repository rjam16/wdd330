const express = require('express');
const axios = require('axios');
const router = express.Router();
const fetch = require('node-fetch');

const API_URL = 'https://api.igdb.com/v4/games';

// Function to get an OAuth2 token
async function getAccessToken() {
  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials'
    })
  });

  const data = await response.json();
  return data.access_token;
}

// Function to search for games on IGDB
async function searchGames(query) {
  const accessToken = await getAccessToken();

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: `fields name,cover.url,genres.name; search "${query}"; limit 10;`
  });

  const data = await response.json();
  return data.map(game => ({
    id: game.id,
    name: game.name,
    cover: game.cover ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}` : '/images/default-cover.jpg',
    genres: game.genres ? game.genres.map(genre => genre.name).join(', ') : 'No genres available'
  }));
}

// Function to get detailed game information
async function getGameDetails(gameId) {
  const accessToken = await getAccessToken();

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: `fields name,cover.url,genres.name,release_dates.y,summary; where id = ${gameId};`
  });

  const data = await response.json();
  if (data.length > 0) {
    const game = data[0];
    return {
      id: game.id,
      name: game.name,
      cover: game.cover ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}` : '/images/default-cover.jpg',
      genres: game.genres ? game.genres.map(genre => genre.name).join(', ') : 'No genres available',
      releaseDate: game.release_dates ? game.release_dates[0].y : 'Unknown',
      summary: game.summary || 'No summary available'
    };
  } else {
    throw new Error('Game not found');
  }
}

module.exports = { searchGames, getGameDetails };