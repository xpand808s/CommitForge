import Link from "next/link";
import { BarChart3, Flag, Settings, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Command Center", icon: BarChart3 },
  { href: "/onboarding", label: "Forge Setup", icon: ShieldCheck },
  { href: "/goals/demo", label: "Goal Vault", icon: Flag },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[280px] flex-col border-r border-white/8 bg-[#0b1017] px-6 py-8">
      <Link href="/dashboard" className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#79e6a7] via-[#8cb8ff] to-[#d4b5ff] text-xl font-bold text-slate-950">
          C
        </div>
        <div>
          <p className="text-lg font-semibold text-white">CommitForge</p>
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">Premium tracker</p>
        </div>
      </Link>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-12 items-center gap-3 rounded-2xl px-4 text-sm text-white/55 transition-all hover:bg-white/[0.05] hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
        <p className="text-sm font-medium text-white">Your commitment creates the interface.</p>
        <p className="mt-2 text-sm leading-6 text-white/45">
          Five goals unlock the full dashboard because intensity needs enough lanes to feel real.
        </p>
      </div>
    </aside>
  );
}
