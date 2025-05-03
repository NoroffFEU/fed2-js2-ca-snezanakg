import { fetchPosts } from "../../api/post/read.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("feedContainer");

  try {
    const posts = await fetchPosts();

    if (posts.length === 0) {
      container.innerHTML = "<p>No posts found.</p>";
      return;
    }

    container.innerHTML = posts
      .map((post) => `
        <div class="post">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <p><strong>By:</strong> ${post.author.name}</p>
        </div>
      `)
      .join("");
  } catch (error) {
    container.innerHTML = `<p>Error loading feed: ${error.message}</p>`;
  }
});
