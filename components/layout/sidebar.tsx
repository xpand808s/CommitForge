"use client";

import Link from "next/link";
import { BarChart3, Flag, Settings, ShieldCheck, X } from "lucide-react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Command Center", icon: BarChart3 },
  { href: "/onboarding", label: "Forge Setup", icon: ShieldCheck },
  { href: "/goals/demo", label: "Goal Vault", icon: Flag },
  { href: "/settings", label: "Settings", icon: Settings }
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sidebarContent = (
    <>
      <Link href="/dashboard" className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#79e6a7] via-[#8cb8ff] to-[#d4b5ff] text-xl font-bold text-slate-950">
          C
        </div>
        <div className="hidden sm:block">
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
              onClick={onClose}
              className={cn(
                "flex h-12 items-center gap-3 rounded-2xl px-4 text-sm text-white/55 transition-all hover:bg-white/[0.05] hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden sm:block rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
        <p className="text-sm font-medium text-white">Your commitment creates the interface.</p>
        <p className="mt-2 text-sm leading-6 text-white/45">
          Five goals unlock the full dashboard because intensity needs enough lanes to feel real.
        </p>
      </div>
    </>
  );

  if (!isMounted) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden sm:sticky sm:top-0 sm:flex sm:h-screen sm:w-[280px] sm:flex-col sm:border-r sm:border-white/8 sm:bg-[#0b1017] sm:px-6 sm:py-8">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 sm:hidden"
            onClick={onClose}
          />
          {/* Mobile Drawer */}
          <aside className="fixed inset-y-0 left-0 z-50 w-[280px] flex-col border-r border-white/8 bg-[#0b1017] px-6 py-8 sm:hidden overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#79e6a7] via-[#8cb8ff] to-[#d4b5ff] text-sm font-bold text-slate-950">
                C
              </div>
              <button
                onClick={onClose}
                className="text-white/55 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
