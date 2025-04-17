const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
// Handle game search input and display results
const searchInput = document.getElementById('gameSearch');
const searchResultsContainer = document.getElementById('searchResults');
const searchButton = document.getElementById('searchBtn');

// Handle search bar input and trigger a search
searchInput.addEventListener('input', async () => {
  const query = searchInput.value;
  if (!query) return searchResultsContainer.innerHTML = ''; // Clear results if no query

  // Fetch search results from the backend
  const res = await fetch(`/search?q=${query}`);
  const games = await res.json();
  
  // Display the games in the results container
  searchResultsContainer.innerHTML = games.map(game => `
    <div class="result-card" data-game-id="${game.id}">
      <img src="${game.cover}" alt="${game.name}" />
      <h3>${game.name}</h3>
      <button onclick="addToWishlist(${game.id})">Add to Wishlist</button>
    </div>
  `).join('');
});

// Function to add a game to the wishlist
async function addToWishlist(gameId) {
  const res = await fetch('/wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId })
  });
  const data = await res.json();
  alert(data.message); // Show a message based on the response
}

// Function to handle the status update (for example, when changing game status in wishlist)
async function updateWishlistStatus(gameId, newStatus) {
  const res = await fetch('/wishlist/status', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId, status: newStatus })
  });
  
  const data = await res.json();
  if (data.message === 'Wishlist status updated') {
    alert(`Game status updated to ${newStatus}`);
  } else {
    alert(data.message);
  }
}

// Handle status change (if you have a dropdown or button to update the status)
document.querySelectorAll('.status-change').forEach(button => {
  button.addEventListener('click', async (event) => {
    const gameId = event.target.dataset.gameId;
    const newStatus = event.target.dataset.status;
    await updateWishlistStatus(gameId, newStatus);
  });
});
