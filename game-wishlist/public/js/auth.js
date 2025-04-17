// Login Form
const loginForm = document.getElementById('loginForm');
const loginEmail = loginForm.querySelector('input[type="email"]');
const loginPassword = loginForm.querySelector('input[type="password"]');
const loginBtn = loginForm.querySelector('.submit-btn');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission
  const email = loginEmail.value;
  const password = loginPassword.value;

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      window.location.href = '/profile'; // Redirect to profile page
    } else {
      alert(data.message); // Show error message
    }
  } catch (error) {
    alert('Something went wrong. Please try again.');
    console.error(error);
  }
});

// Sign-up Form
const signupForm = document.getElementById('signupForm');
const signupUsername = signupForm.querySelector('input[type="text"]');
const signupEmail = signupForm.querySelector('input[type="email"]');
const signupPassword = signupForm.querySelector('input[type="password"]');
const signupConfirmPassword = signupForm.querySelector('input[type="password"]');
const signupBtn = signupForm.querySelector('.submit-btn');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = signupUsername.value;
  const email = signupEmail.value;
  const password = signupPassword.value;
  const confirmPassword = signupConfirmPassword.value;

  if (!username || !email || !password || !confirmPassword) {
    alert('Please fill in all fields.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  try {
    const res = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      window.location.href = '/profile'; // Redirect to profile page
    } else {
      alert(data.message); // Show error message
    }
  } catch (error) {
    alert('Something went wrong. Please try again.');
    console.error(error);
  }
});

// Log out functionality
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('/logout', {
        method: 'POST'
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        window.location.href = '/'; // Redirect to homepage
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error(error);
    }
  });
}
