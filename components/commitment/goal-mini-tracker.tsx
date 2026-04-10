"use client";

import { motion } from "framer-motion";

import { cn, formatPercent } from "@/lib/utils";

type GoalMiniTrackerProps = {
  value: number;
  compact?: boolean;
};

export function GoalMiniTracker({ value, compact = false }: GoalMiniTrackerProps) {
  return (
    <div className={cn("space-y-2", compact && "space-y-1")}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Commitment</span>
        <span>{formatPercent(value)}</span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#79e6a7] via-[#8cb8ff] to-[#d4b5ff]"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
