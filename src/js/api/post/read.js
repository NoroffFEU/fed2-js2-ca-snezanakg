export async function readPost(id) {}

export async function readPosts(limit = 12, page = 1, tag) {}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../src/js/api/constants.js";
import { headers } from "../src/js/api/headers.js";

/**
 * Fetch all posts.
 */
export async function getPosts() {
  const res = await fetch(API_SOCIAL_POSTS, {
    headers: headers(true),
  });
  return await res.json();
}

/**
 * Read profile info of a user.
 */
export async function readProfile(username) {
  const res = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
    headers: headers(true),
  });
  return await res.json();
}
