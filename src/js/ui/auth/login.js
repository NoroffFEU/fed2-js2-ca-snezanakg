
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const errorDisplay = document.getElementById("loginError");

  loginForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    console.log("🔐 Logging in with:", email, password);

    fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(function (response) {
        return response.json().then(function (data) {
          if (!response.ok) {
            throw new Error(data.errors?.[0]?.message || "Login failed");
          }
          return data;
        });
      })
      .then(function (data) {
        const token = data.accessToken;
        if (!token) {
          throw new Error("No token received");
        }

        // Store token and user
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(data));

        console.log("✅ Login success, redirecting...");
        window.location.href = "/feed.html";
      })
      .catch(function (error) {
        errorDisplay.textContent = "❌ " + error.message;
        console.error("❌ Login error:", error.message);
      });
  });
});
