
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const errorDisplay = document.getElementById("loginError");

  loginForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    // ✅ Log credentials for debug
    console.log("🔐 Logging in with:", email, password);

    if (!email.endsWith("@stud.noroff.no")) {
      errorDisplay.textContent = "❌ Email must be a Noroff student email.";
      return;
    }

    fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok) {
            const msg = data.errors?.[0]?.message || "Login failed";
            throw new Error(msg);
          }
          return data;
        });
      })
      .then(function (data) {
        const token = data.accessToken;
        if (!token) {
          throw new Error("No access token received from server.");
        }

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(data));
        console.log("✅ Login successful!");
        window.location.href = "/feed.html";
      })
      .catch(function (error) {
        errorDisplay.textContent = "❌ " + error.message;
        console.error("❌ Login error:", error.message);
      });
  });
});
