import "./css/style.css";

import router from "./js/router";

await router(window.location.pathname);
import { loginUser, registerUser } from './auth.js';
import { getPosts } from './posts.js';

/**
 * Handles the login form submission.
 * Retrieves email and password, then calls loginUser.
 */
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const authData = await loginUser({ email, password });
      // Save token in localStorage
      localStorage.setItem('token', authData.accessToken);
      // Redirect to feed page
      window.location.href = 'feed.html';
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  });
}

/**
 * Handles the registration form submission.
 * Retrieves username, email, and password then calls registerUser.
 */
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Optionally, you can validate confirm-password here
    try {
      await registerUser({ username, email, password });
      alert('Registration successful! Please log in.');
      window.location.href = 'login.html';
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  });
}

/**
 * If on the feed page, fetch and display posts.
 */
const postsContainer = document.querySelector('.post-list');
if (postsContainer) {
  (async () => {
    try {
      const posts = await getPosts();
      posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
          <div class="post-user">
            <img src="assets/avatar.png" alt="User Avatar" class="avatar-sm" />
            <span class="username">${post.author || 'Unknown'}</span>
          </div>
          <p class="post-text">${post.content}</p>
          <img src="${post.media || 'https://via.placeholder.com/600x400?text=Post+Image'}" alt="Post" class="post-img" />
          <div class="post-actions">
            <a href="post.html?id=${post.id}">View</a>
          </div>
        `;
        postsContainer.appendChild(postCard);
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  })();
}

//add more event listeners for creating, editing, or deleting posts similarly.

import "./src/css/style.css";
import router from "./src/js/router";

await router(window.location.pathname);
