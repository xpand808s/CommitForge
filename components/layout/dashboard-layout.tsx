"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export function DashboardLayout({
  children,
  name,
  quickStat
}: {
  children: ReactNode;
  name?: string | null;
  quickStat: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 flex flex-col w-full">
        <div className="sm:hidden flex items-center gap-4 px-4 py-4 border-b border-white/8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white/55 hover:text-white transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="text-sm font-medium text-white/65">CommitForge</div>
        </div>
        <div className="flex-1 flex flex-col px-4 sm:px-10 py-6 sm:py-8">
          <Header name={name} quickStat={quickStat} />
          <div className="pt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
