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
    <div className="flex min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 px-4 md:px-10 py-6 md:py-8">
        <Header name={name} quickStat={quickStat} />
        <div className="pt-8">{children}</div>
      </main>
    </div>
  );
}
