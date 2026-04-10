"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, Sparkles, Zap } from "lucide-react";

import { useCommitmentStore } from "@/hooks/use-commitment-store";
import { cn, formatPercent, getCommitmentLabel } from "@/lib/utils";

type CommitmentBarProps = {
  value: number;
  goalCount: number;
  totalCompletedTasks: number;
  weightedMode?: boolean;
};

export function CommitmentBar({
  value,
  goalCount,
  totalCompletedTasks,
  weightedMode = false
}: CommitmentBarProps) {
  const storeValue = useCommitmentStore((state) => state.value);
  const setValue = useCommitmentStore((state) => state.setValue);

  useEffect(() => {
    setValue(value);
  }, [setValue, value]);

  const glowLayers = useMemo(
    () => Math.max(1, Math.min(5, Math.ceil(goalCount / 2))),
    [goalCount]
  );

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#0f141d] px-12 py-10 shadow-soft-xl">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid opacity-90" />
      <div className="relative flex gap-10">
        <div className="w-[320px] space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            <Sparkles className="h-4 w-4 text-[#79e6a7]" />
            Commitment Bar
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-semibold leading-[1.02] tracking-[-0.04em] text-white">
              {formatPercent(storeValue)}
            </h1>
            <p className="text-lg text-white/75">{getCommitmentLabel(storeValue)}</p>
            <p className="max-w-[280px] text-sm leading-7 text-white/55">
              Every completed micro-task feeds the forge. The bar rises as your goals stop being ideas and start becoming evidence.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-white/50">Active goals</p>
              <p className="mt-2 text-2xl font-semibold text-white">{goalCount}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-white/50">Micro-wins</p>
              <p className="mt-2 text-2xl font-semibold text-white">{totalCompletedTasks}</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between text-sm text-white/50">
            <span>{weightedMode ? "Weighted mode available in settings" : "Balanced average across active goals"}</span>
            <span>5 goals = five equal 20% lanes</span>
          </div>

          <div className="relative h-[360px] overflow-hidden rounded-[28px] border border-white/8 bg-[#0b1118] px-8 py-8">
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(121,230,167,0.08),transparent_55%)]" />
            <div className="absolute inset-x-8 bottom-8 top-8 rounded-[22px] border border-white/[0.06]" />

            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="absolute bottom-8 top-8 w-px bg-white/8"
                style={{ left: `${12 + index * 17.6}%` }}
              />
            ))}

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${storeValue}%` }}
              transition={{ type: "spring", stiffness: 95, damping: 18, mass: 0.9 }}
              className="absolute bottom-8 left-8 top-8 overflow-hidden rounded-[22px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#79e6a7] via-[#8cb8ff] to-[#d4b5ff]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_35%,rgba(11,17,24,0.05))]" />
            </motion.div>

            {Array.from({ length: glowLayers }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "absolute bottom-6 top-6 rounded-[26px] border border-white/10 bg-gradient-to-r from-[#79e6a7]/7 via-[#8cb8ff]/8 to-[#d4b5ff]/9 blur-2xl",
                  index % 2 === 0 && "animate-bar-glow"
                )}
                style={{
                  left: 24 + index * 12,
                  right: Math.max(24, 220 - index * 26),
                  opacity: 0.28 + index * 0.08
                }}
              />
            ))}

            <div className="absolute bottom-14 right-10 flex items-center gap-3 rounded-full border border-white/10 bg-[#0f141d]/90 px-4 py-2 text-sm text-white/75 backdrop-blur-xl">
              <Zap className="h-4 w-4 text-[#79e6a7]" />
              Total momentum is capping cleanly at 100%
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-white/55">
              <Flame className="h-4 w-4 text-[#ffcf7d]" />
              When you pass 25, 50, 75, and 100, the forge celebrates with confetti.
            </div>
            <div className="text-sm text-white/45">
              Segment intensity grows beyond five goals even when fill remains capped.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
