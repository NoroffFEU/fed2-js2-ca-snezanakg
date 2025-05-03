gimport { loginUser } from "../../../api/auth/login.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorDisplay = document.getElementById("loginError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      await loginUser(email, password);
      window.location.href = "/pages/feed/index.html"; // ✅ FIXED PATH
    } catch (err) {
      errorDisplay.textContent = err.message;
    }
  });
});