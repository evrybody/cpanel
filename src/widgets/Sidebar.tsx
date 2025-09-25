"use client";

import { useState } from "react";
import { Menu, X, Clock, Settings, User, LogOut } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  const navigation = [
    { name: "История", href: "/history", icon: Clock },
    { name: "Настройки", href: "/settings", icon: Settings },
  ];

  return (
    <div
      className="flex h-screen transition-all duration-300"
      style={{
        ["--sidebar-width" as string]: open ? "250px" : "52px",
      }}
    >
      {/* Sidebar */}
      <aside
        className="bg-[oklch(0.200_0_0)] text-white flex flex-col transition-all duration-300"
        style={{ width: "var(--sidebar-width)" }}
      >
        <div className="p-4 h-18 flex items-center justify-between border-b-1 border-white">
          {open && <h1 className="text-lg font-bold">Control panel</h1>}
          <button onClick={() => setOpen(!open)} className="cursor-pointer">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Навигация */}
        <nav className="flex-1 space-y-2 p-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <Icon size={20} />
                {open && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Нижняя часть */}
        <div className="p-2 border-t border-gray-700">
          <button className="flex items-center justify-center lg:justify-start gap-3 px-1 py-2 rounded-md hover:bg-gray-800 transition-colors">
            <User size={20} />
            {open && <span>Профиль</span>}
          </button>
          <button className="flex items-center justify-center lg:justify-start gap-3 px-1 py-2 rounded-md hover:bg-gray-800 transition-colors">
            <LogOut size={20} />
            {open && <span>Выйти</span>}
          </button>
        </div>
      </aside>

      {/* Контент */}
      <main className="flex-1 bg-[oklch(0.269_0_0)] overflow-auto">
        {children}
      </main>
    </div>
  );
}
