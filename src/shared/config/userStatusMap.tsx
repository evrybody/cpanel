import type { User } from "@/widgets/user/UsersTable";

const STATUS_MAP: Record<User["status"], { label: string; className: string }> = {
  active: { label: "Active", className: "bg-green-100 text-green-700" },
  blocked: { label: "Blocked", className: "bg-yellow-100 text-yellow-700" },
  banned: { label: "Бан", className: "bg-red-100 text-red-700" },
};

export default function StatusBadge({ status }: { status: User["status"] }) {
  const { label, className } = STATUS_MAP[status];
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
