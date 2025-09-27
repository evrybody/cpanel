import user from "@/entities/usersBanned.json";

export function userStatus(id: string) {
  const response = user.find((u) => u.id === id);
  return response ?? null;
}

export async function getUserStatus(id: string) {
  const res = await fetch(`https://example.com/api/users/${id}`);
  if (!res.ok) return userStatus(id);
  return null;
}
