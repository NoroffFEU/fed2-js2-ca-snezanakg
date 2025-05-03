import { loginUser } from "../../../api/auth/login.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorDisplay = document.getElementById("loginError");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      await loginUser(email, password);
      window.location.href = "/feed.html"; // match exact path in project root
    } catch (err) {
      errorDisplay.textContent = err.message;
    }
  });
});
