import type { ReactNode } from "react";

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
  return (
    <div className="flex min-h-screen min-w-[1440px] bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 px-10 py-8">
        <Header name={name} quickStat={quickStat} />
        <div className="pt-8">{children}</div>
      </main>
    </div>
  );
}
