import Link from "next/link";
import { Plus } from "lucide-react";

export function NewGoalFab() {
  return (
    <Link
      href="/onboarding"
      className="fixed bottom-10 right-10 inline-flex h-14 items-center gap-3 rounded-full border border-white/10 bg-white text-slate-950 px-6 text-sm font-semibold shadow-soft-xl"
    >
      <Plus className="h-4 w-4" />
      New Goal
    </Link>
  );
}
