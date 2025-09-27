import { getUserById } from "@/shared/api/getUserById";
import { UserTransaction } from "@/widgets/user/UserTransaction";
import { UserInfo } from "@/widgets/user/UserInfo";
import { UserActivity } from "@/widgets/user/UserActivity";

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);

  if (!user) return <div>Пользователь не найден</div>;

  return (
    <div className="grid gap-y-5">
      <UserInfo id={params.id} />
      <UserTransaction id={params.id} />
      <UserActivity id={params.id} />
    </div>
  );
}
