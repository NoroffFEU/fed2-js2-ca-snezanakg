import { loginUser } from "../auth.js";

/**
 * Handles login form submit event
 * @param {SubmitEvent} event
 */
export async function onLogin(event) {
  event.preventDefault();

  const form = event.target;
  const email = form.email.value.trim().toLowerCase();
  const password = form.password.value;

  try {
    const result = await loginUser({ email, password });
    localStorage.setItem("token", result.accessToken);
    localStorage.setItem("username", result.name);
    window.location.href = "/pages/feed/index.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
}
