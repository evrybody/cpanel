"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export default function Header({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <header
        className="fixed top-0 z-50 w-screen h-18 bg-[oklch(0.200_0_0)] text-white shadow-md border-b border-white transition-all duration-300 flex items-center"
        style={{
          width: `calc(100% - var(--sidebar-width))`,
        }}
      >
        <div className="ml-4">
          <button
            className="flex items-center gap-3 font-bold text-lg cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Home size={20} />
          </button>
        </div>
      </header>
      {/* Контент */}
      <main className="flex-1 bg-[oklch(0.269_0_0)] overflow-auto my-20">
        {children}
      </main>
    </>
  );
}
