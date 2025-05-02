export async function onLogin(event) {}
import { loginUser } from "../../src/js/ui/auth";

export async function onLogin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;

  try {
    const result = await loginUser({ email, password });
    localStorage.setItem("token", result.accessToken);
    localStorage.setItem("username", result.name);
    window.location.href = "/pages/feed/index.html";
  } catch (error) {
    alert("Login error: " + error.message);
  }
} 
fetch("https://v2.api.noroff.dev/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "myname",
    email: "myname@stud.noroff.no",
    password: "Password123"
  })
}).then(res => res.json()).then(console.log).catch(console.error);

