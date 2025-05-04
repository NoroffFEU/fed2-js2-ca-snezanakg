import { authGuard } from "../src/js/utilities/authGuard.js";
import { getPosts } from "../src/js/api/post";

authGuard();

(async () => {
  const container = document.querySelector(".posts");
  const posts = await getPosts();

  posts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";
    card.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <img src="${post.media}" alt="Post Image" />
      <p><small>Posted by <strong>${post.author.name}</strong></small></p>
    `;
    container.appendChild(card);
  });
})();
