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
    <header className="flex items-center justify-between gap-8 border-b border-white/8 pb-8">
      <div className="flex items-center gap-8">
        <div className="relative w-[360px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <Input placeholder="Search goals, tasks, momentum..." className="pl-11" />
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/65">
          {quickStat}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/65">
          <Sparkles className="h-4 w-4 text-[#79e6a7]" />
          Forge is live
        </div>
        <Avatar>
          <AvatarFallback>{name?.slice(0, 1) ?? "F"}</AvatarFallback>
        </Avatar>
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
          alt="User avatar"
          width={44}
          height={44}
          className="rounded-full border border-white/10 object-cover"
        />
      </div>
    </header>
  );
}
