export async function fetchPosts() {
  const token = localStorage.getItem('token');

  const res = await fetch("https://v2.api.noroff.dev/social/posts?_author=true&_comments=true&_reactions=true", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return await res.json();
}
