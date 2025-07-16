import { TESTING_URL } from "./api";

export async function searchAll(q) {
  const res = await fetch(`${TESTING_URL}/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

