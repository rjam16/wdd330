// Element selectors for wishlist UI
const wishlistContainer = document.getElementById('wishlistContainer');

// Function to fetch and display the user's wishlist
async function loadWishlist() {
  const res = await fetch('/wishlist');
  const wishlist = await res.json();

  // Clear previous wishlist content
  wishlistContainer.innerHTML = '';

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = '<p>Your wishlist is empty!</p>';
    return;
  }

  // Populate the wishlist container with the current wishlist items
  wishlist.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.classList.add('wishlist-card');
    gameCard.innerHTML = `
      <img src="${game.cover}" alt="${game.name}" class="wishlist-game-img" />
      <h3>${game.name}</h3>
      <p>Status: ${game.status}</p>
      <button onclick="removeFromWishlist(${game.id})">Remove</button>
    `;
    wishlistContainer.appendChild(gameCard);
  });
}

// Function to add a game to the wishlist
async function addToWishlist(gameId) {
  const res = await fetch('/wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId })
  });

  const data = await res.json();
  if (res.ok) {
    alert(data.message);
    loadWishlist();  // Refresh wishlist after adding
  } else {
    alert('Failed to add to wishlist');
  }
}

// Function to remove a game from the wishlist
async function removeFromWishlist(gameId) {
  const res = await fetch(`/wishlist/${gameId}`, {
    method: 'DELETE'
  });

  const data = await res.json();
  if (res.ok) {
    alert(data.message);
    loadWishlist();  // Refresh wishlist after removing
  } else {
    alert('Failed to remove from wishlist');
  }
}

// Call loadWishlist on page load to display the wishlist
document.addEventListener('DOMContentLoaded', loadWishlist);
