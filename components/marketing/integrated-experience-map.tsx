"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const DOMAINS = [
  { id: "health", label: "Health", sessions: 15, desc: "Physical commitments tracked against your stated standard — not aspirational, but contractual.", color: "#ff6200" },
  { id: "craft", label: "Craft", sessions: 21, desc: "What you produce each week. Skill commitments measured by output, not intention.", color: "#ff7a20" },
  { id: "wealth", label: "Wealth", sessions: 28, desc: "Financial discipline with honest timelines. What you sacrifice carries weight.", color: "#ff9240" },
  { id: "relationships", label: "Relationships", sessions: 15, desc: "How you show up for others, consistently. The only variable fully within your control.", color: "#ffaa60" },
  { id: "direction", label: "Direction", sessions: 2, desc: "The meta-commitment. Every other domain converges here: who are you becoming?", color: "#ffc280" },
];

const SPARKLINE = [5, 8, 12, 10, 18, 22, 30, 28, 38, 45, 50, 58, 63, 70, 78, 82, 87];

function Sparkline({ highlighted }: { highlighted: boolean }) {
  const W = 260;
  const H = 80;
  const pts = SPARKLINE.map((v, i) => [
    (i / (SPARKLINE.length - 1)) * W,
    H - (v / 100) * H,
  ]);
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x},${y}`).join(" ");
  const fill = pts.map(([x, y]) => `${x},${y}`).join(" ") + ` ${W},${H} 0,${H}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff6200" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ff6200" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fill} fill="url(#sparkGrad)" />
      <path d={d} fill="none" stroke="#ff6200" strokeWidth={highlighted ? 2 : 1.5} opacity={highlighted ? 1 : 0.7} />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={4} fill="#ff6200" />
    </svg>
  );
}

function TopSankey({ hoveredDomain }: { hoveredDomain: string | null }) {
  const SVG_W = 340;
  const SVG_H = 170;
  const labelY = DOMAINS.map((_, i) => 17 + i * 34);
  const convergenceY = SVG_H / 2;

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" height="100%" preserveAspectRatio="none">
      {DOMAINS.map((domain, i) => {
        const y = labelY[i];
        const isHov = hoveredDomain === domain.id;
        const dimmed = hoveredDomain !== null && !isHov;
        return (
          <motion.path
            key={domain.id}
            d={`M 0,${y} C ${SVG_W * 0.45},${y} ${SVG_W * 0.7},${convergenceY} ${SVG_W},${convergenceY}`}
            fill="none"
            stroke={domain.color}
            strokeWidth={isHov ? 3 : 1.5}
            animate={{
              opacity: dimmed ? 0.12 : isHov ? 1 : 0.45,
              filter: isHov ? `drop-shadow(0 0 6px ${domain.color})` : "none",
            }}
            transition={{ duration: 0.2 }}
          />
        );
      })}
    </svg>
  );
}

function ConvergenceSankey({ hoveredDomain }: { hoveredDomain: string | null }) {
  const SVG_W = 500;
  const SVG_H = 180;
  const domainY = DOMAINS.map((_, i) => 18 + i * 36);
  const barY = SVG_H / 2;

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" height="100%" preserveAspectRatio="none">
      {DOMAINS.map((domain, i) => {
        const y = domainY[i];
        const isHov = hoveredDomain === domain.id;
        const dimmed = hoveredDomain !== null && !isHov;
        return (
          <motion.path
            key={domain.id}
            d={`M 0,${y} C ${SVG_W * 0.4},${y} ${SVG_W * 0.65},${barY} ${SVG_W},${barY}`}
            fill="none"
            stroke={domain.color}
            strokeWidth={isHov ? 3.5 : 1.5}
            animate={{
              opacity: dimmed ? 0.1 : isHov ? 1 : 0.35,
              filter: isHov ? `drop-shadow(0 0 8px ${domain.color})` : "none",
            }}
            transition={{ duration: 0.2 }}
          />
        );
      })}
    </svg>
  );
}

function FanoutSankey({ hoveredDomain }: { hoveredDomain: string | null }) {
  const SVG_W = 240;
  const SVG_H = 280;
  const sourceY = SVG_H / 2;
  const midX = SVG_W * 0.5;
  const domainY = DOMAINS.map((_, i) => 28 + i * 56);

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" height="100%" preserveAspectRatio="none">
      {DOMAINS.map((domain) => {
        const i = DOMAINS.findIndex(d => d.id === domain.id);
        const y = domainY[i];
        const isHov = hoveredDomain === domain.id;
        const dimmed = hoveredDomain !== null && !isHov;
        return (
          <motion.path
            key={domain.id}
            d={`M 0,${sourceY} C ${SVG_W * 0.2},${sourceY} ${SVG_W * 0.35},${y} ${midX},${y}`}
            fill="none"
            stroke={domain.color}
            strokeWidth={isHov ? 3.5 : 1.8}
            animate={{
              opacity: dimmed ? 0.1 : isHov ? 1 : 0.4,
              filter: isHov ? `drop-shadow(0 0 6px ${domain.color})` : "none",
            }}
            transition={{ duration: 0.2 }}
          />
        );
      })}
    </svg>
  );
}

export function IntegratedExperienceMap() {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);
  const [progressLevel] = useState(87);

  const isDomainHighlighted = (id: string) => hoveredDomain === id;

  return (
    <div className="w-full space-y-0">

      {/* Section 1: The Forge (Fanout: Raw goals → domain definitions) */}
      <div className="mb-24">
        <div className="text-center mb-14 max-w-[640px] mx-auto">
          <p className="text-xs uppercase tracking-[0.22em] text-[#ff6200] mb-5">The Forge</p>
          <h2 className="text-2xl md:text-[36px] font-bold text-white leading-tight tracking-tight mb-4">
            Define meaningful goals, then let AI break them down
          </h2>
          <p className="text-base text-white/45 leading-relaxed">
            You set raw, honest commitments. AI decomposes them into the smallest doable steps —
            not generic nudges, but specific actions traced directly back to why you committed.
          </p>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col md:hidden space-y-3 mb-10">
          {DOMAINS.map(domain => (
            <div key={domain.id} className="rounded-xl border border-white/6 bg-white/[0.02] p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: domain.color, boxShadow: `0 0 10px ${domain.color}` }} />
                <p className="text-base font-semibold text-white/90">{domain.label}</p>
              </div>
              <p className="text-xs text-white/40 italic ml-5">Generating commitment protocol...</p>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block w-full overflow-hidden pb-6 custom-scrollbar">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[auto_240px_auto_1fr] gap-0 items-stretch min-h-[280px]">
              {/* Raw goals label */}
              <div className="flex items-center pr-4">
                <div className="bg-white/4 border border-white/8 rounded-lg px-4 py-2 rotate-[-90deg] origin-center whitespace-nowrap">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.18em]">Raw goals</p>
                </div>
              </div>

              {/* Fanout SVG */}
              <div className="relative">
                <FanoutSankey hoveredDomain={hoveredDomain} />
              </div>

              {/* Domain pills */}
              <div className="flex flex-col justify-around py-1">
                {DOMAINS.map((domain) => {
                  const isHov = hoveredDomain === domain.id;
                  const dimmed = hoveredDomain !== null && !isHov;
                  return (
                    <motion.div
                      key={domain.id}
                      onMouseEnter={() => setHoveredDomain(domain.id)}
                      onMouseLeave={() => setHoveredDomain(null)}
                      className="flex items-center cursor-pointer"
                      animate={{ opacity: dimmed ? 0.28 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border"
                        animate={{
                          background: isHov ? `${domain.color}20` : "rgba(255,255,255,0.04)",
                          borderColor: isHov ? `${domain.color}60` : "rgba(255,255,255,0.08)",
                          color: isHov ? domain.color : "rgba(255,255,255,0.65)",
                          boxShadow: isHov ? `0 0 18px ${domain.color}40` : "none",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {domain.label}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Description line to cards */}
              <div className="flex flex-col justify-around py-1">
                {DOMAINS.map((domain) => {
                  const isHov = hoveredDomain === domain.id;
                  const dimmed = hoveredDomain !== null && !isHov;
                  return (
                    <div key={domain.id} className="flex items-center">
                      <motion.div
                        className="w-10 shrink-0 flex items-center"
                        animate={{ opacity: dimmed ? 0.1 : isHov ? 1 : 0.35 }}
                      >
                        <motion.div
                          className="h-px w-full"
                          style={{ background: domain.color }}
                          animate={{ boxShadow: isHov ? `0 0 6px ${domain.color}` : "none" }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>
                      <motion.div
                        onMouseEnter={() => setHoveredDomain(domain.id)}
                        onMouseLeave={() => setHoveredDomain(null)}
                        className="ml-2 py-2 flex-1 pointer-events-none"
                      >
                        <p className="text-[11px] text-white/35 leading-relaxed tracking-wide italic">Generating commitment protocol...</p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Domain Cards (Shared source for growth) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border border-white/6 rounded-2xl overflow-hidden mb-16">
        {DOMAINS.map((domain, i) => {
          const hl = isDomainHighlighted(domain.id);
          return (
            <motion.div
              key={domain.id}
              onMouseEnter={() => setHoveredDomain(domain.id)}
              onMouseLeave={() => setHoveredDomain(null)}
              animate={{
                background: hl ? `rgba(255,98,0,0.07)` : "rgba(255,255,255,0.02)",
                boxShadow: hl
                  ? `inset 0 0 30px rgba(255,98,0,0.08)`
                  : "none",
              }}
              transition={{ duration: 0.2 }}
              className={`p-6 flex flex-col cursor-pointer ${i < 4 ? "border-b lg:border-b-0 lg:border-r border-white/6" : ""}`}
            >
              <motion.p
                className="text-base font-semibold mb-1"
                animate={{ color: hl ? domain.color : "rgba(255,255,255,0.85)" }}
              >
                {domain.label}
              </motion.p>
              <p className="text-xs text-white/35 mb-4">
                {domain.sessions} session{domain.sessions > 1 ? "s" : ""}
              </p>
              <p className="text-[12px] text-white/45 leading-relaxed mb-6">{domain.desc}</p>

              <div className="mt-auto pt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: domain.color }}
                  animate={{ width: hl ? `${(domain.sessions / 28) * 100}%` : "18%", opacity: hl ? 1 : 0.4 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Section 3: Commitment Growth (Convergence Panel) */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-[#ff6200] mb-8">Commitment Growth</p>
        
        <div className="flex flex-col lg:grid lg:grid-cols-[200px_1fr_300px] gap-0 lg:items-center border border-white/6 rounded-2xl overflow-hidden">
          {/* Domain label list */}
          <div className="bg-[#09111a] border-b lg:border-b-0 lg:border-r border-white/6 py-8 px-6 flex flex-col justify-center h-auto lg:h-[240px]">
            {DOMAINS.map((domain) => {
              const hl = isDomainHighlighted(domain.id);
              return (
                <motion.div
                  key={domain.id}
                  onMouseEnter={() => setHoveredDomain(domain.id)}
                  onMouseLeave={() => setHoveredDomain(null)}
                  animate={{ color: hl ? domain.color : "rgba(255,255,255,0.4)" }}
                  transition={{ duration: 0.15 }}
                  className="text-sm font-medium py-1.5 cursor-pointer flex items-center gap-2"
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    animate={{ background: hl ? domain.color : "rgba(255,255,255,0.18)", scale: hl ? 1.5 : 1 }}
                    transition={{ duration: 0.15 }}
                  />
                  {domain.label}
                </motion.div>
              );
            })}
          </div>

          {/* Sankey SVG + quote overlay */}
          <div className="bg-[#09111a] relative h-[240px] hidden lg:block border-b lg:border-b-0 border-white/6">
            <div className="absolute inset-0">
              <TopSankey hoveredDomain={hoveredDomain} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center px-10 pointer-events-none">
              <p className="text-xl font-semibold text-white/90 text-center leading-snug tracking-tight max-w-[260px]">
                Commitment grows when your life moves in one direction.
              </p>
            </div>
          </div>

          {/* Sparkline + level */}
          <div className="bg-[#09111a] lg:border-l border-white/6 p-6 md:p-8 h-auto lg:h-[240px] flex flex-col justify-between">
            <div className="mb-4 lg:mb-0">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Visualize the chisel</p>
              <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                Watch your commitment bar fill as every domain aligns.
              </p>
            </div>
            <div className="h-[96px] w-full">
              <Sparkline highlighted={hoveredDomain !== null} />
            </div>
            <p className="text-xs font-mono text-[#ff6200]">Commitment level {progressLevel}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
