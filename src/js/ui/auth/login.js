import { loginUser } from "../src/js/ui/auth/auth.js";

/**
 * Handles user login form submission.
 * @param {SubmitEvent} event
 */
export async function onLogin(event) {
  event.preventDefault();

  const form = event.target;
  const email = form.email.value.trim().toLowerCase();
  const password = form.password.value;

  try {
    const result = await loginUser({ email, password });

    // Store token and username for authenticated usage
    localStorage.setItem("token", result.accessToken);
    localStorage.setItem("username", result.name);

    // Optional success message (add #message div in HTML if you want feedback)
    const messageBox = document.getElementById("message");
    if (messageBox) {
      messageBox.innerHTML = `<p style="color:green">Login successful. Redirecting...</p>`;
    }

    // Redirect to feed
    window.location.href = "/pages/feed/index.html";
  } catch (error) {
    const messageBox = document.getElementById("message");
    if (messageBox) {
      messageBox.innerHTML = `<p style="color:red">${error.message}</p>`;
    } else {
      alert("Login error: " + error.message);
    }
  }
}


