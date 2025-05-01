export async function register({
  name,
  email,
  password,
  bio,
  banner,
  avatar,
}) {}
const registerForm = document.getElementById("register-form");
const registerMsg = document.getElementById("message");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = registerForm.username.value;
  const email = registerForm.email.value;
  const password = registerForm.password.value;
  const confirm = registerForm["confirm-password"].value;

  if (password !== confirm) {
    registerMsg.innerHTML = `<p style='color: red;'>Passwords do not match</p>`;
    return;
  }

  try {
    const res = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, email, password })
    });

    if (!res.ok) throw new Error("Registration failed. Make sure email ends in @noroff.no or @stud.noroff.no");

    registerMsg.innerHTML = `<p style='color: green;'>Account created! Redirecting to login...</p>`;
    setTimeout(() => window.location.href = "/src/js/api/auth/login.js", 2000);
  } catch (err) {
    registerMsg.innerHTML = `<p style='color: red;'>${err.message}</p>`;
  }
});
