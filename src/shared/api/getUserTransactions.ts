import transactions from "@/entities/usersTransactions.json";

function usersTransactions(id: string) {
  const response = transactions.find((t) => t.id === id);
  return response?.transactions ?? [];
}

export async function getTransactions(id: string) {
  try {
    const res = await fetch(`https://example.com/api/users/${id}`);
    if (!res.ok) {
      return usersTransactions(id);
    }

    const data = await res.json();
    return data.transactions || [];
  } catch {
    return usersTransactions(id);
  }
}
