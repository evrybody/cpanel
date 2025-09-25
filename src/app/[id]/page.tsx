import { getUserById } from "@/shared/api/getUserById";

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);

  if (!user) return <div>Пользователь не найден</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Дата рождения: {user.dateOfBirth}</p>
      <p>Статус: {user.status}</p>
    </div>
  );
}
