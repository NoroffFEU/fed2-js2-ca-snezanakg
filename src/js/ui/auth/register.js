export async function onRegister(event) {}
import { registerUser } from "../../src/js/ui/auth";

export async function onRegister(event) {
  event.preventDefault();
  const form = event.target;
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;

  try {
    await registerUser({ username, email, password });
    alert("Registered successfully!");
    window.location.href = "/src/js/api/auth/login.js/";
  } catch (error) {
    alert("Register error: " + error.message);
  }
}
