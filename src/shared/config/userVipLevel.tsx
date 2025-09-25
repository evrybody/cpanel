const VIP_LEVELS: Record<number, { label: string; className: string }> = {
  0: { label: "No VIP (0)", className: "bg-gray-100 text-gray-700" },
  1: {
    label: "Associate (1)",
    className: "bg-indigo-100 text-indigo-700",
  },
  2: { label: "Partner (2)", className: "bg-purple-100 text-purple-700" },
  3: { label: "Executive (3)", className: "bg-blue-100 text-blue-700" },
  4: { label: "Director (4)", className: "bg-teal-100 text-teal-700" },
  5: {
    label: "Shareholder (5)",
    className: "bg-green-100 text-green-700",
  },
  6: {
    label: "Vice President (6)",
    className: "bg-lime-100 text-lime-700",
  },
  7: {
    label: "President (7)",
    className: "bg-yellow-100 text-yellow-700",
  },
  8: {
    label: "Board Member (8)",
    className: "bg-orange-100 text-orange-700",
  },
  9: { label: "CEO (9)", className: "bg-red-100 text-red-700" },
  10: { label: "Owner (10)", className: "bg-pink-100 text-pink-700" },
  11: {
    label: "Investor (11)",
    className: "bg-fuchsia-100 text-fuchsia-700",
  },
  12: {
    label: "Founder (12)",
    className: "bg-violet-100 text-violet-700",
  },
  13: {
    label: "Bespoke Elite (13)",
    className: "bg-cyan-100 text-cyan-700",
  },
  14: { label: "Chairman (14)", className: "bg-rose-100 text-rose-700" },
  15: { label: "Legend (15)", className: "bg-amber-100 text-amber-700" },
};

export default function VipBadge({ level }: { level: number }) {
  const { label, className } = VIP_LEVELS[level];
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
