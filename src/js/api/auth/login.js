export async function login({ email, password }) {}
const loginForm = document.getElementById("login-form");
const messageBox = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const res = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error("Invalid email or password");

    const data = await res.json();
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("username", data.name);
    messageBox.innerHTML = `<p style='color: green;'>Login successful! Redirecting...</p>`;
    setTimeout(() => window.location.href = "/pages/feed/index.html", 1500);
  } catch (err) {
    messageBox.innerHTML = `<p style='color: red;'>${err.message}</p>`;
  }
});