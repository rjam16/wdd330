const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
});

signupTab.addEventListener('click', () => {
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  signupForm.classList.add('active');
  loginForm.classList.remove('active');
});

document.querySelector('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form[0].value,
        password: form[1].value
      })
    });
    const data = await res.json();
    alert(data.message);
  });
  
  document.querySelector('#signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const res = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form[0].value,
        email: form[1].value,
        password: form[2].value
      })
    });
    const data = await res.json();
    alert(data.message);
  });