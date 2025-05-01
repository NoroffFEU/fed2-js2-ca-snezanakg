export async function createPost({ title, body, tags, media }) {}
import { API_SOCIAL_POSTS } from "../src/js/api/constants.js";
import { headers } from "../src/js/api/headers.js";

/**
 * Create a new post.
 */
export async function createPost({ title, body, tags = [], media }) {
  const res = await fetch(API_SOCIAL_POSTS, {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify({ title, body, tags, media }),
  });
  if (!res.ok) throw new Error("Could not create post");
  return await res.json();
}
