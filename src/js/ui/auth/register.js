document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const errorDisplay = document.getElementById("registerError");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const avatar = document.getElementById("avatar").value.trim();

    if (password !== confirmPassword) {
      errorDisplay.textContent = "❌ Passwords do not match.";
      return;
    }

    if (!email.endsWith("noroff.no")) {
      errorDisplay.textContent = "❌ Email must be a valid Noroff email address.";
      return;
    }

   
    let data = null;

    try {
      const resBody = await response.text();
      data = resBody ? JSON.parse(resBody) : {};
    } catch {
      throw new Error("❌ Could not parse server response.");
    }
    
    if (!response.ok) {
      throw new Error(data?.errors?.[0]?.message || "Registration failed");
    }
    
    

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Registration failed");
      }

      console.log("✅ Registered:", data);
      alert("✅ Registration successful! Redirecting to login...");
      window.location.href = "/login.html";
    } catch (err) {
      console.error("❌ Registration error:", err);
      errorDisplay.textContent = err.message;
    }
  });
