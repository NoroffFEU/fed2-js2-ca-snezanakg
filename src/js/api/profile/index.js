import { authGuard } from "../authGuard.js";
import { setLogoutListener } from "../logout.js";
import { readProfile } from "./read.js";

authGuard();

document.addEventListener("DOMContentLoaded", async () => {
  const name = localStorage.getItem("username") || "User";
  const nameField = document.getElementById("profile-name");
  if (nameField) nameField.textContent = name;

  setLogoutListener();

  try {
    const profile = await readProfile(name);
    console.log("Profile loaded:", profile);
    // Optional: display profile data (avatar, banner, bio, etc.)
  } catch (error) {
    console.error("Failed to load profile", error);
  }
});
