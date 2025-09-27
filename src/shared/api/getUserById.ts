import user from "@/entities/users.json";

function foundUser(id: string) {
  const response = user.find((u) => u.id === id);
  return response ?? null;
}

export async function getUserById(id: string) {
  const res = await fetch(`https://example.com/api/users/${id}`);
  if (!res.ok) return foundUser(id);
  return null;
}
