"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const PILLARS = [
  {
    title: "Identity-Based Action",
    body: "True change does not come from finishing tasks — it comes from chiseling your future self. We don\u2019t ask what you want to do. We ask who you want to become. Every small commitment you keep is a vote for that identity.",
  },
  {
    title: "The Skin-in-the-Game Contract",
    body: "Humans are hardwired with present bias — we overvalue immediate pleasure over long-term goals. Commitment Contracts leverage loss aversion to bind your future self to your current intentions. When you have real stakes, commitment becomes intuitive.",
  },
  {
    title: "Micro-Wins & The Pull to Finish",
    body: "The hardest part of any journey is the activation energy required to start. We break massive aspirations into 5-minute micro-goals. By starting just a tiny portion, you create a mental pull that makes your brain want to return and finish what you began.",
  },
  {
    title: "Forgiving Continuity",
    body: "Perfectionism is the enemy of persistence. We replace the all-or-nothing trap with forgiving streaks. If you miss a day, you don\u2019t reset to zero — you forge a recovery. Consistency balanced with the compassion needed for long-term growth.",
  },
];

export function ConvictionsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="w-full">
      {/* Centered heading */}
      <div className="text-center max-w-[760px] mx-auto mb-16">
        <p className="text-xs uppercase tracking-[0.22em] text-[#ff6200] mb-6">Our Pillars</p>
        <h2 className="text-[48px] font-semibold leading-[1.05] tracking-[-0.04em] text-white mb-6">
          Before you commit, accept the weight of what that means.
        </h2>
        <p className="text-lg text-white/50 leading-relaxed">
          We don&apos;t offer productivity hacks. We offer a framework for self-creation.
          These are the convictions that underpin everything CommitForge is built on.
        </p>
      </div>

      {/* Accordion items */}
      <div className="max-w-[860px] mx-auto space-y-0">
        {PILLARS.map((pillar, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={pillar.title} className="border-t border-white/8 first:border-t-0">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-7 text-left group cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <span className="text-sm font-mono text-[#ff6200]/70 w-6 text-right shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <motion.h3
                    className="text-2xl font-medium tracking-[-0.02em]"
                    animate={{ color: isOpen ? "#ff6200" : "rgba(255,255,255,0.85)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {pillar.title}
                  </motion.h3>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 ml-6"
                >
                  <ChevronDown className="w-5 h-5 text-white/40" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-11 pb-8 pr-12">
                      <p className="text-lg text-white/55 leading-relaxed max-w-[640px]">
                        {pillar.body}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
