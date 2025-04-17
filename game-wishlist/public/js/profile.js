document.addEventListener('DOMContentLoaded', async () => {
    // Get user information on page load
    const userId = localStorage.getItem('userId');  // Assuming you're storing the user ID in localStorage after login
  
    if (!userId) {
      window.location.href = 'login-form.html';  // Redirect to login if not logged in
    }
  
    try {
      // Fetch user profile data from backend (replace with your actual endpoint)
      const res = await fetch(`/profile/${userId}`);
      const data = await res.json();
  
      if (res.ok) {
        // Populate profile data
        document.getElementById('profile-username').textContent = data.username;
        document.getElementById('profile-email').textContent = data.email;
        document.getElementById('profile-games').innerHTML = data.wishlist.map(game => `
          <div class="game-item">
            <img src="${game.cover}" alt="${game.name}" />
            <h4>${game.name}</h4>
            <button onclick="removeFromWishlist(${game.id})">Remove from Wishlist</button>
          </div>
        `).join('');
      } else {
        alert('Failed to load profile');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      alert('Something went wrong');
    }
  });
  
  // Function to remove a game from the wishlist
  async function removeFromWishlist(gameId) {
    try {
      const res = await fetch(`/wishlist/${gameId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert(data.message);  // Notify user
        window.location.reload();  // Refresh the profile page
      } else {
        alert('Failed to remove game from wishlist');
      }
    } catch (error) {
      console.error('Error removing game from wishlist:', error);
      alert('Something went wrong');
    }
  }
  