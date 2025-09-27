"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getTransactions } from "@/shared/api/getUserTransactions";

type Transaction = {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  paymentMethod: string;
};

export function UserTransaction({ id }: { id: string }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sortField, setSortField] = useState<keyof Transaction | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions(id);
        if (response && Array.isArray(response)) {
          setTransactions(response);
        } else {
          console.warn("Неожиданный формат данных:", response);
        }
      } catch (error) {
        console.error("Ошибка загрузки транзакций:", error);
      }
    };

    fetchTransactions();
  }, [id]);

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField];
    const valB = b[sortField];

    if (typeof valA === "number" && typeof valB === "number") {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    return sortOrder === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  return (
    <main className="bg-[oklch(0.200_0_0)] mx-3 rounded p-2 text-white">
      <Table className="mb-6">
        <TableHeader>
          <TableRow className="cursor-pointer select-none">
            {["type", "amount", "status", "date"].map((field) => (
              <TableHead
                key={field}
                onClick={() => handleSort(field as keyof Transaction)}
                className="uppercase text-sm tracking-wide"
              >
                {field}
                {sortField === field && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      </Table>

      {/* Основная таблица транзакций */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Payment Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.id}</TableCell>
              <TableCell>{tx.type}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.currency}</TableCell>
              <TableCell
                className={
                  tx.status === "success"
                    ? "text-green-400"
                    : tx.status === "pending"
                    ? "text-yellow-400"
                    : "text-red-400"
                }
              >
                {tx.status}
              </TableCell>
              <TableCell>{tx.date}</TableCell>
              <TableCell>{tx.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
