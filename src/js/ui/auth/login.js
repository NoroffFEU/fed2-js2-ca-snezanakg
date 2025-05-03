import { loginUser } from "../../api/auth/auth.js";

/**
 * Handle login form submission
 * @param {Event} event 
 */
export async function onLogin(event) {
  event.preventDefault();

  const form = event.target;
  const email = form.email.value.trim().toLowerCase();
  const password = form.password.value;
  const messageBox = document.getElementById("message");

  if (!email || !password) {
    return (messageBox.innerHTML = `<p style="color: red;">Email and password are required.</p>`);
  }

  try {
    const { accessToken, name } = await loginUser({ email, password });

    localStorage.setItem("token", accessToken);
    localStorage.setItem("username", name);

    messageBox.innerHTML = `<p style='color: green;'>Login successful! Redirecting...</p>`;
    setTimeout(() => {
      window.location.href = "/pages/feed/index.html";
    }, 1500);
  } catch (err) {
    messageBox.innerHTML = `<p style='color: red;'>${err.message}</p>`;
  }
}
