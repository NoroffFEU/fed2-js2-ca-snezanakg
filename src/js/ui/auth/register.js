document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const errorDisplay = document.getElementById("registerError");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const avatar = document.getElementById("avatar").value.trim();

    if (!email.endsWith("noroff.no")) {
      errorDisplay.textContent = "Email must be a valid Noroff email address.";
      return;
    }

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || "Registration failed");
      }

      const data = await response.json();
      console.log("✅ Registered:", data);

      alert("Registration successful! You can now log in.");
      window.location.href = "/login.html";
    } catch (err) {
      console.error("❌ Registration error:", err);
      errorDisplay.textContent = err.message;
    }
  });
});

