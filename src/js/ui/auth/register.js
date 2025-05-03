import { registerUser } from "../../api/auth/auth.js";

/**
 * Handles registration form submission
 * @param {SubmitEvent} event
 */
export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const username = form.username.value.trim();
  const email = form.email.value.trim().toLowerCase();
  const password = form.password.value;
  const confirm = form["confirm-password"].value;
  const msgBox = document.getElementById("message");

  if (password !== confirm) {
    msgBox.innerHTML = `<p style="color: red;">Passwords do not match</p>`;
    return;
  }

  try {
    await registerUser({ name: username, email, password });
    msgBox.innerHTML = `<p style="color: green;">Account created! Redirecting to login...</p>`;
    setTimeout(() => {
      window.location.href = "/auth/login/index.html";
    }, 1500);
  } catch (error) {
    msgBox.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}
