const registerForm = document.getElementById("register-form");
const registerMsg = document.getElementById("message");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = registerForm.username.value.trim();
  const email = registerForm.email.value.trim().toLowerCase();
  const password = registerForm.password.value;
  const confirm = registerForm["confirm-password"].value;

  // Check if passwords match
  if (password !== confirm) {
    registerMsg.innerHTML = `<p style="color: red;">Passwords do not match</p>`;
    return;
  }

  // Validate username
  const validUsername = /^[\w]+$/.test(username);
  if (!validUsername) {
    registerMsg.innerHTML = `<p style="color: red;">Username can only contain letters, numbers and underscores</p>`;
    return;
  }

  //Send request to Noroff Auth API
  try {
    const res = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.errors?.[0]?.message || "Registration failed");
    }

    //Success message and redirect
    registerMsg.innerHTML = `<p style="color: green;">Account created! Redirecting to login...</p>`;
    setTimeout(() => {
      window.location.href = "/auth/login/index.html";
    }, 2000);
  } catch (err) {
    registerMsg.innerHTML = `<p style="color: red;">${err.message}</p>`;
  }
});
