import { authGuard } from "../../src/js/utilities/authGuard.js";

authGuard();
import { authGuard } from "../src/js/utilities/authGuard.js";
import { readProfile } from "../src/js/api/post";

authGuard();

(async () => {
  const username = localStorage.getItem("username");
  const profile = await readProfile(username);
  document.querySelector(".profile-header h2").textContent = profile.name;
  document.querySelector(".avatar").src = profile.avatar;
  document.querySelector(".bio").textContent = profile.bio || "No bio";
})();
