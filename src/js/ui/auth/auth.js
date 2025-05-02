/**
 * Logs in a user using Noroff Auth API.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<Object>}
 */
export async function loginUser({ email, password }) {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Login failed.");
    }
  
    return data;
  }
  
  