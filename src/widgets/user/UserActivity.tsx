"use client";

import React, { useState, useEffect } from "react";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { getUserActivities } from "@/shared/api/getUserActivity";

type TActivities = {
  id: string;
  date: string;
  slot: string;
  bet: number;
  winnings: number;
};

export const UserActivity = ({ id }: { id: string }) => {
  const [activities, setActivities] = useState<TActivities[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getUserActivities(id);
        if (response && Array.isArray(response)) {
          setActivities(response);
        } else {
          console.warn("Неожиданный формат данных:", response);
        }
      } catch (error) {
        console.error("Ошибка загрузки активностей:", error);
      }
    };

    fetchActivities();
  }, [id]);

  return (
    <main className="bg-[oklch(0.200_0_0)] mx-3 rounded p-2 text-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Date</TableHead>
            <TableHead>Slot</TableHead>
            <TableHead>Bet</TableHead>
            <TableHead>Winnings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((av) => (
            <TableRow key={av.id}>
              <TableCell>{av.id}</TableCell>
              <TableCell>{av.date}</TableCell>
              <TableCell>{av.slot}</TableCell>
              <TableCell>{av.bet}</TableCell>
              <TableCell>{av.winnings}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};
