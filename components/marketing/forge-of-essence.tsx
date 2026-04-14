"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Flame, ShieldAlert, ArrowUpRight, Clock, TrendingUp } from "lucide-react";

/* ── Types ─────────────────────────────────────────────── */
type DeedStatus = "pending" | "completed" | "abandoned";

type Deed = { id: string; task: string; duration: string; status: DeedStatus };

type Project = {
  id: string;
  name: string;
  subtitle: string;
  commitment_score: number;
  color: string;
  deeds: Deed[];
};

/* ── Data ──────────────────────────────────────────────── */
const INITIAL_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "The Marathon Project",
    subtitle: "Training for your first half-marathon",
    commitment_score: 45,
    color: "#ff6200",
    deeds: [
      { id: "d1", task: "5 min mobility stretch", duration: "5 min", status: "completed" },
      { id: "d2", task: "Lay out running clothes for tomorrow", duration: "2 min", status: "completed" },
      { id: "d3", task: "Review this week's mileage log", duration: "5 min", status: "pending" },
      { id: "d4", task: "Foam roll quads & calves", duration: "5 min", status: "pending" },
    ],
  },
  {
    id: "p2",
    name: "The Opus",
    subtitle: "Writing a short story collection",
    commitment_score: 28,
    color: "#ff7a20",
    deeds: [
      { id: "d5", task: "Free-write 200 words, no editing", duration: "5 min", status: "completed" },
      { id: "d6", task: "Re-read yesterday's paragraph", duration: "3 min", status: "pending" },
      { id: "d7", task: "Outline one scene for Chapter 4", duration: "5 min", status: "pending" },
    ],
  },
];

/* ── Heatmap seed (deterministic) ──────────────────────── */
const HEATMAP_DATA = [
  3, 0, 2, 4, 1, 3, 2, 4, 3, 0, 1, 4, 2, 3,
  1, 4, 3, 2, 0, 4, 1, 3, 2, 4, 0, 1, 3, 2,
  4, 3, 1, 0, 2, 4, 3, 1, 2, 0, 4, 3, 1, 2,
];

/* ── Lucidity copy engine ──────────────────────────────── */
function getLucidityInsight(index: number): string {
  if (index >= 85)
    return "You kept 90% of your promises to yourself this week. Your self-trust is rising.";
  if (index >= 65)
    return "Consistent follow-through detected. You're building real momentum — keep stacking.";
  if (index >= 45)
    return "You're showing up more than most. A few more completed deeds and this bar moves fast.";
  return "Early days. Every deed you finish here is proof that you can trust yourself again.";
}

/* ── Component ─────────────────────────────────────────── */
export function ForgeOfEssence() {
  const [identity] = useState("Architect of My Body");
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [abandonTarget, setAbandonTarget] = useState<{ projectId: string; deedId: string } | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  /* derived */
  const actualizationIndex = Math.round(
    projects.reduce((sum, p) => sum + p.commitment_score, 0) / projects.length
  );

  /* actions */
  const completeDeed = (projectId: string, deedId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const deeds = p.deeds.map((d) => (d.id === deedId ? { ...d, status: "completed" as DeedStatus } : d));
        const completedCount = deeds.filter((d) => d.status === "completed").length;
        return { ...p, deeds, commitment_score: Math.min(100, Math.round((completedCount / deeds.length) * 100)) };
      })
    );
    showToast("Identity reinforced. That deed just moved the bar.");
  };

  const confirmAbandon = (choice: "bad-faith" | "lucidity") => {
    if (!abandonTarget) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== abandonTarget.projectId) return p;
        const deeds = p.deeds.map((d) =>
          d.id === abandonTarget.deedId ? { ...d, status: "abandoned" as DeedStatus } : d
        );
        return { ...p, deeds, commitment_score: Math.max(0, p.commitment_score - 5) };
      })
    );
    setAbandonTarget(null);
    showToast(
      choice === "lucidity"
        ? "A conscious choice. You own this — and you can recover tomorrow."
        : "Noted. The bar remembers. Come back when you're ready."
    );
  };

  const showToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(null), 4000);
  };

  return (
    <div className="w-full relative">
      {/* ── Toast ────────────────────────────────────── */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0c121a] border border-[#ff6200]/30 shadow-[0_0_40px_rgba(255,98,0,0.12)] rounded-xl px-6 py-3.5"
          >
            <p className="text-white/90 text-sm tracking-wide flex items-center gap-3">
              <Flame className="w-4 h-4 text-[#ff6200] shrink-0" />
              {activeToast}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1200px] mx-auto">

        {/* ════════════════════════════════════════════════
            ROW 1 — Identity + Architect's Bar
            ════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 lg:gap-12 items-start mb-16">
          {/* Left: identity declaration */}
          <div className="pt-2">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#ff6200]/70 mb-3 font-semibold">
              Your declared identity
            </p>
            <h2 className="text-3xl md:text-[42px] font-bold tracking-tight text-white leading-[1.05] mb-4">
              {identity}
            </h2>
            <p className="text-[17px] text-white/50 leading-relaxed max-w-lg">
              Every project below feeds this bar. Every completed deed is a vote
              for this identity. The number doesn't lie — it's a mirror of how
              well you're keeping promises to yourself.
            </p>
          </div>

          {/* Right: the architect's bar */}
          <div className="bg-[#070a0e] border border-white/8 rounded-2xl p-7 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6200]/30 to-transparent" />

            <div className="flex items-baseline justify-between mb-2">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/35 font-semibold">
                Commitment Index
              </p>
              <p className="text-3xl font-bold tabular-nums text-white">
                {actualizationIndex}
                <span className="text-base font-normal text-white/30 ml-0.5">%</span>
              </p>
            </div>

            <p className="text-xs text-white/30 mb-5">
              Weighted average of all active projects
            </p>

            {/* master bar */}
            <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden mb-6 relative">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #ff6200, #ffaa60)",
                  boxShadow: "0 0 20px rgba(255,98,0,0.5)",
                }}
                animate={{ width: `${actualizationIndex}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* project mini-bars */}
            <div className="space-y-3 mb-6">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 group cursor-pointer"
                  onMouseEnter={() => setHoveredProject(p.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <span className="text-[11px] text-white/40 w-[120px] truncate group-hover:text-white/70 transition-colors">
                    {p.name}
                  </span>
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: p.color }}
                      animate={{
                        width: `${p.commitment_score}%`,
                        opacity: hoveredProject === p.id ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-white/30 w-8 text-right">
                    {p.commitment_score}%
                  </span>
                </div>
              ))}
            </div>

            {/* insight */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <TrendingUp className="w-3 h-3 text-[#ff6200]/60" />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/25">
                  Weekly insight
                </p>
              </div>
              <p className="text-[13px] text-white/55 leading-relaxed">
                {getLucidityInsight(actualizationIndex)}
              </p>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            ROW 2 — Projects + Deeds
            ════════════════════════════════════════════════ */}
        <div className="space-y-6">
          {projects.map((project) => {
            const completedCount = project.deeds.filter((d) => d.status === "completed").length;
            const totalCount = project.deeds.length;
            const isNearFinish = project.commitment_score >= 75;

            return (
              <motion.div
                key={project.id}
                className="border border-white/6 bg-[#080c12] rounded-2xl overflow-hidden"
                animate={{
                  borderColor:
                    hoveredProject === project.id ? "rgba(255,98,0,0.15)" : "rgba(255,255,255,0.06)",
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* project header */}
                <div className="px-8 pt-7 pb-6 border-b border-white/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff6200]/60 mb-1.5 font-semibold">
                        Active project
                      </p>
                      <h3 className="text-[22px] font-bold text-white tracking-tight mb-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-white/40">{project.subtitle}</p>
                    </div>
                    <div className="text-right pt-1">
                      <p className="text-2xl font-bold text-white tabular-nums">
                        {project.commitment_score}
                        <span className="text-sm font-normal text-white/25 ml-0.5">%</span>
                      </p>
                      <p className="text-[11px] text-white/30 mt-0.5">
                        {completedCount}/{totalCount} deeds done
                      </p>
                    </div>
                  </div>

                  {/* project bar */}
                  <div className="mt-5 h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${project.color}, ${project.color}cc)`,
                        boxShadow: isNearFinish ? `0 0 16px ${project.color}80` : "none",
                      }}
                      animate={{ width: `${project.commitment_score}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>

                  {/* near-finish encouragement */}
                  <AnimatePresence>
                    {isNearFinish && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-xs text-[#ff6200]/70 mt-3 flex items-center gap-1.5"
                      >
                        <Flame className="w-3 h-3" />
                        Almost there — finish strong and lock this in.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* deeds + heatmap */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] min-h-[200px]">
                  {/* deeds list */}
                  <div className="px-6 md:px-8 py-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 mb-4 font-semibold">
                      Today's deeds — broken down by AI
                    </p>
                    <div className="space-y-2">
                      {project.deeds.map((deed) => (
                        <div
                          key={deed.id}
                          className={`group flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${
                            deed.status === "completed"
                              ? "bg-[#ff6200]/[0.04] border-[#ff6200]/15"
                              : deed.status === "abandoned"
                              ? "bg-white/[0.01] border-white/5 opacity-40"
                              : "bg-white/[0.015] border-white/6 hover:border-[#ff6200]/25 hover:bg-white/[0.03]"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            {/* status indicator */}
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                                deed.status === "completed"
                                  ? "bg-[#ff6200] border-[#ff6200] text-black"
                                  : deed.status === "abandoned"
                                  ? "bg-white/5 border-white/10 text-white/20"
                                  : "bg-black/40 border-white/15 text-white/30 group-hover:border-[#ff6200]/40 group-hover:text-[#ff6200]/70"
                              }`}
                            >
                              {deed.status === "completed" ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : deed.status === "abandoned" ? (
                                <X className="w-3.5 h-3.5" />
                              ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                              )}
                            </div>

                            <div>
                              <span
                                className={`text-[15px] font-medium ${
                                  deed.status === "completed"
                                    ? "text-white/70 line-through decoration-white/15"
                                    : deed.status === "abandoned"
                                    ? "text-white/30 line-through"
                                    : "text-white/85"
                                }`}
                              >
                                {deed.task}
                              </span>
                              {deed.status === "pending" && (
                                <span className="ml-2.5 text-[11px] text-white/20 font-mono flex items-center gap-1 inline-flex">
                                  <Clock className="w-3 h-3" />
                                  {deed.duration}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* action buttons */}
                          {deed.status === "pending" && (
                            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => setAbandonTarget({ projectId: project.id, deedId: deed.id })}
                                className="px-2.5 py-1 text-[11px] text-white/30 hover:text-red-400 rounded-md transition-colors"
                              >
                                Skip
                              </button>
                              <button
                                onClick={() => completeDeed(project.id, deed.id)}
                                className="px-3 py-1 text-[11px] font-semibold bg-[#ff6200]/10 text-[#ff6200] hover:bg-[#ff6200] hover:text-black rounded-md transition-all flex items-center gap-1"
                              >
                                Done <ArrowUpRight className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* heatmap */}
                  <div className="border-t lg:border-t-0 lg:border-l border-white/5 px-6 md:px-8 py-6 flex flex-col">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-2 font-semibold">
                      28-day commitment record
                    </p>
                    <p className="text-[11px] text-white/30 mb-5 leading-relaxed">
                      Every bright square is a day you showed up. Don't break the pattern.
                    </p>
                    <div className="grid grid-cols-7 gap-[5px] mt-auto">
                      {HEATMAP_DATA.slice(0, 28).map((v, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-[3px]"
                          style={{
                            backgroundColor:
                              v === 0
                                ? "rgba(255,255,255,0.03)"
                                : `rgba(255, 98, 0, ${0.12 + v * 0.22})`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[10px] text-white/20">Less</span>
                      <div className="flex gap-[3px]">
                        {[0, 1, 2, 3, 4].map((v) => (
                          <div
                            key={v}
                            className="w-2.5 h-2.5 rounded-[2px]"
                            style={{
                              backgroundColor:
                                v === 0
                                  ? "rgba(255,255,255,0.03)"
                                  : `rgba(255, 98, 0, ${0.12 + v * 0.22})`,
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-white/20">More</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          "Why" Checkpoint Modal
          ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {abandonTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              className="w-full max-w-md bg-[#0a0f16] border border-white/8 shadow-2xl rounded-2xl p-8"
            >
              <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white/40">
                <ShieldAlert className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Before you skip this
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-7">
                Skipping isn't failing — but the reason matters. Be honest with yourself: why are you walking away from this one?
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => confirmAbandon("bad-faith")}
                  className="w-full p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 text-left transition-all"
                >
                  <p className="font-semibold text-white/80 text-sm mb-0.5">
                    I'm making excuses
                  </p>
                  <p className="text-xs text-white/35">
                    Circumstances feel hard but honestly I could do this.
                  </p>
                </button>
                <button
                  onClick={() => confirmAbandon("lucidity")}
                  className="w-full p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 text-left transition-all"
                >
                  <p className="font-semibold text-white/80 text-sm mb-0.5">
                    I'm choosing consciously
                  </p>
                  <p className="text-xs text-white/35">
                    I understand the cost. I accept responsibility for this choice.
                  </p>
                </button>
              </div>

              <div className="mt-7 pt-5 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setAbandonTarget(null)}
                  className="px-5 py-2 bg-[#ff6200] text-black text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(255,98,0,0.35)] transition-all"
                >
                  Actually, I'll do it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
