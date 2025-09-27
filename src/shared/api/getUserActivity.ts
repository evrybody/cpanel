import activities from "@/entities/usersActivity.json";

function userActivities(id: string) {
  const response = activities.find((a) => a.id === id);

  return response?.activity ?? [];
}

export const getUserActivities = async (id: string) => {
  try {
    const res = await fetch(`https://example.com/api/users/${id}`);
    if (!res.ok) {
      return userActivities(id);
    }

    const data = await res.json();
    return data.activities || [];
  } catch {
    return userActivities(id);
  }
};
