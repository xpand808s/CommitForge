import Image from "next/image";
import { Search, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function Header({
  name,
  quickStat
}: {
  name?: string | null;
  quickStat: string;
}) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8 border-b border-white/8 pb-6 sm:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 flex-1 min-w-0">
        <div className="relative w-full sm:w-[360px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <Input placeholder="Search goals, tasks..." className="pl-11" />
        </div>
        <div className="hidden sm:block rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/65 whitespace-nowrap">
          {quickStat}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/65 whitespace-nowrap">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#79e6a7] flex-shrink-0" />
          <span className="hidden sm:inline">Forge is live</span>
        </div>
        <Avatar className="h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0">
          <AvatarFallback>{name?.slice(0, 1) ?? "F"}</AvatarFallback>
        </Avatar>
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
          alt="User avatar"
          width={44}
          height={44}
          className="hidden sm:block rounded-full border border-white/10 object-cover"
        />
      </div>
    </header>
  );
}
