"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  Column,
} from "@tanstack/react-table";

import { MoveDown, MoveUp } from "lucide-react";

import VipBadge from "@/shared/config/userVipLevel";
import StatusBadge from "@/shared/config/userStatusMap";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import rawUsers from "@/entities/users.json";
import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  currencyCode: z.string(),
  name: z.string(),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Некорректная дата",
  }),
  email: z.string().email(),
  // balance: z.number(),
  isEmailConfirmed: z.boolean(),
  status: z.enum(["active", "blocked", "banned"]),
  vipLevel: z.number().int().min(0).max(15),
});

export type User = z.infer<typeof UserSchema>;

function ActionButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.push(`/${id}`)}
      className="cursor-pointer"
    >
      Подробнее
    </Button>
  );
}

type SortableHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
};

function SortableHeader<TData, TValue>({
  column,
  title,
}: SortableHeaderProps<TData, TValue>) {
  const sortState = column.getIsSorted();
  return (
    <button
      onClick={() => column.toggleSorting()}
      className="flex items-center gap-1 cursor-pointer"
    >
      {title}
      {sortState === "asc" ? (
        <MoveUp size={16} />
      ) : sortState === "desc" ? (
        <MoveDown size={16} />
      ) : (
        ""
      )}
    </button>
  );
}

const data: User[] = z.array(UserSchema).parse(rawUsers).slice(0, 50);

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} title="Id" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
  },
  {
    accessorKey: "balance",
    header: ({ column }) => <SortableHeader column={column} title="Balance" />,
  },
  {
    accessorKey: "vipLevel",
    header: ({ column }) => (
      <SortableHeader column={column} title="VIP level" />
    ),
    cell: ({ row }) => <VipBadge level={row.getValue("vipLevel") as number} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <StatusBadge status={row.getValue("status") as User["status"]} />
    ),
  },
  {
    accessorKey: "activity",
    header: ({ column }) => (
      <SortableHeader column={column} title="Last activity" />
    ),
  },
  {
    accessorKey: "region",
    header: ({ column }) => <SortableHeader column={column} title="Region" />,
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => <ActionButton id={row.original.id} />,
  },
];

export function UsersTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <main className="bg-[oklch(0.269_0_0)] mx-3">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="text-white bg-[oklch(0.269_0_0)] hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="text-white font-thin">
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
