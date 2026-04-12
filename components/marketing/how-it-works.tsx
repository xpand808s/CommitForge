"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const DOMAINS = [
  {
    id: "health",
    label: "Health",
    color: "#ff6200",
    desc: "Your health commitment is precise: not 'get fit' but the specific outcome, the real reason, and the timeline you will hold.",
    detail: "1h deep work",
  },
  {
    id: "craft",
    label: "Craft",
    color: "#ff7a20",
    desc: "What you are willing to produce weekly. Consistent effort tracked against what you actually said you would do.",
    detail: "2h intentional evenings",
  },
  {
    id: "wealth",
    label: "Wealth",
    color: "#ff9240",
    desc: "Financial commitments require honest timelines. What you give up carries equal weight to what you build toward.",
    detail: "1h deep work",
  },
  {
    id: "relationships",
    label: "Relationships",
    color: "#ffaa60",
    desc: "Commit to how you show up — not to outcomes you cannot control. Consistency is the only variable fully in your possession.",
    detail: "2 intentional evenings",
  },
  {
    id: "direction",
    label: "Direction",
    color: "#ffc280",
    desc: "The meta-commitment. Every other domain serves a single honest answer: who am I becoming?",
    detail: "1h deep work",
  },
];

function HowItWorksSankey({ hoveredDomain }: { hoveredDomain: string | null }) {
  const SVG_W = 260;
  const SVG_H = 280;
  const sourceY = SVG_H / 2;
  const midX = SVG_W * 0.48;
  const domainY = DOMAINS.map((_, i) => 28 + i * 56);

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" height="100%" preserveAspectRatio="none">
      {DOMAINS.map((domain, i) => {
        const y = domainY[i];
        const isHov = hoveredDomain === domain.id;
        const dimmed = hoveredDomain !== null && !isHov;
        return (
          <motion.path
            key={domain.id}
            d={`M 0,${sourceY} C ${SVG_W * 0.18},${sourceY} ${SVG_W * 0.34},${y} ${midX},${y}`}
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

export function HowItWorks() {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Section label */}
      <p className="text-xs uppercase tracking-[0.22em] text-[#ff6200] mb-6">The Forge</p>

      {/* Centered heading */}
      <div className="text-center mb-16 max-w-[720px] mx-auto">
        <h2 className="text-[42px] font-bold text-white leading-tight tracking-tight mb-5">
          Define meaningful goals, then let AI break them down
        </h2>
        <p className="text-lg text-white/50 leading-relaxed">
          You set raw, honest commitments across every domain of your life.
          AI decomposes them into the smallest doable steps — not generic nudges,
          but specific actions traced directly back to the reason you committed.
        </p>
      </div>

      {/* Sankey map */}
      <div className="grid grid-cols-[auto_260px_auto_1fr] gap-0 items-stretch min-h-[280px]">

        {/* Raw goals rotated label */}
        <div className="flex items-center pr-4">
          <div className="bg-white/4 border border-white/8 rounded-lg px-4 py-2 rotate-[-90deg] origin-center whitespace-nowrap">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.18em]">Raw goals</p>
          </div>
        </div>

        {/* SVG fanout */}
        <div className="relative">
          <HowItWorksSankey hoveredDomain={hoveredDomain} />
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

        {/* Connector line + description cards */}
        <div className="flex flex-col justify-around py-1">
          {DOMAINS.map((domain) => {
            const isHov = hoveredDomain === domain.id;
            const dimmed = hoveredDomain !== null && !isHov;
            return (
              <div key={domain.id} className="flex items-center gap-0">
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
                  className="ml-2 rounded-lg border px-4 py-2.5 cursor-pointer flex-1"
                  animate={{
                    opacity: dimmed ? 0.2 : 1,
                    background: isHov ? `${domain.color}0a` : "rgba(255,255,255,0.02)",
                    borderColor: isHov ? `${domain.color}40` : "rgba(255,255,255,0.06)",
                    boxShadow: isHov ? `0 0 20px ${domain.color}18` : "none",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-[11px] text-white/50 leading-relaxed">{domain.desc}</p>
                  <p className="text-[10px] text-[#ff6200] mt-1.5 font-medium">{domain.detail}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
