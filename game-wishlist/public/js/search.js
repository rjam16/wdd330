const searchInput = document.getElementById('gameSearch');
const searchBtn = document.getElementById('searchBtn');
const searchResultsContainer = document.getElementById('searchResults');

// Add event listeners for input and button click
searchInput.addEventListener('input', handleSearchInput);
searchBtn.addEventListener('click', handleSearchClick);

// Function to handle search input dynamically
async function handleSearchInput() {
  const query = searchInput.value.trim();
  if (!query) {
    searchResultsContainer.innerHTML = ''; // Clear the results if the query is empty
    return;
  }

  // Perform the search on the server-side with the input query
  const res = await fetch(`/search?q=${query}`);
  const games = await res.json();

  if (res.ok && games.length > 0) {
    // Display the games in the search results container
    searchResultsContainer.innerHTML = games.map(game => `
      <div class="result-card">
        <img src="${game.cover}" alt="${game.name}" />
        <h4>${game.name}</h4>
        <button onclick="addToWishlist(${game.id})">Add to Wishlist</button>
      </div>
    `).join('');
  } else {
    // If no games found
    searchResultsContainer.innerHTML = '<p>No games found. Try a different search.</p>';
  }
}

// Function to handle the search button click
async function handleSearchClick() {
  const query = searchInput.value.trim();
  if (!query) return;

  // Same as input, perform search
  const res = await fetch(`/search?q=${query}`);
  const games = await res.json();

  if (res.ok && games.length > 0) {
    searchResultsContainer.innerHTML = games.map(game => `
      <div class="result-card">
        <img src="${game.cover}" alt="${game.name}" />
        <h4>${game.name}</h4>
        <button onclick="addToWishlist(${game.id})">Add to Wishlist</button>
      </div>
    `).join('');
  } else {
    searchResultsContainer.innerHTML = '<p>No games found. Try a different search.</p>';
  }
}

// Function to add a game to the wishlist
async function addToWishlist(gameId) {
  try {
    const res = await fetch('/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId })
    });
    const data = await res.json();

    if (res.ok) {
      alert(data.message);  // Notify the user
    } else {
      alert('Failed to add to wishlist');
    }
  } catch (error) {
    console.error('Error adding game to wishlist:', error);
    alert('Something went wrong');
  }
}
