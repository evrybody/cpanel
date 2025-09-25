"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  name: string;
  email: string;
  status: "активный" | "блокировка" | "в бане";
}

const data: User[] = [
  { id: "1", name: "Иван Петров", email: "ivan@example.com", status: "активный" },
  { id: "2", name: "Мария Иванова", email: "maria@example.com", status: "блокировка" },
  { id: "3", name: "Сергей Смирнов", email: "sergey@example.com", status: "в бане" },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Имя",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.getValue("status") as User["status"];
      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium
          ${
            status === "активный"
              ? "bg-green-100 text-green-700"
              : status === "блокировка"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => alert(`Вы нажали на ${row.original.name}`)}
        >
          Подробнее
        </Button>
      );
    },
  },
];

export function UsersTable() {
  const [filter, setFilter] = React.useState("");
  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Поиск по имени..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
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
    </div>
  );
}
