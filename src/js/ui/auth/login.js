
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(err.errors?.[0]?.message || "Login failed");
            });
          }
          return response.json();
        })
        .then((data) => {
          const token = data.accessToken;
          if (!token) {
            throw new Error("No token received");
          }

          localStorage.setItem("authToken", token);
          localStorage.setItem("user", JSON.stringify(data));

          // Create API key after login
          return fetch("https://v2.api.noroff.dev/auth/create-api-key", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({}),
          });
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(err.errors?.[0]?.message || "API key creation failed");
            });
          }
          return response.json();
        })
        .then((apiData) => {
          localStorage.setItem("apiKey", apiData.apiKey);
          alert("Login successful!");

          // ✅ Redirect to WIRES feed page
          window.location.href = "/feed.html";
        })
        .catch((error) => {
          alert("Login failed: " + error.message);
          console.error("❌ Error during login:", error);
        });
    });
  }
});
