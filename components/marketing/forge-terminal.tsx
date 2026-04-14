"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame, SquareTerminal, Check } from "lucide-react";
import { WaitlistForm } from "./waitlist-form";

export function ForgeTerminal() {
  const [isMounted, setIsMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [identity, setIdentity] = useState("");
  const [microGoal, setMicroGoal] = useState("");
  const [pledged, setPledged] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    // Always start fresh as requested by user
    setIdentity("");
    setProgress(0);
    setStep(0);
  }, []);

  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identity.trim().length < 2) return;
    localStorage.setItem("forge_identity", identity.trim());
    setStep(1);
  };

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (microGoal.trim().length < 2 || !pledged) return;
    setStep(2);
  };

  const completeForge = () => {
    const newProgress = Math.min(progress + 25, 100);
    setProgress(newProgress);
    localStorage.setItem("forge_progress", newProgress.toString());
    setStep(3);
  };

  if (!isMounted) return <div className="h-[400px] w-full" />;

  return (
    <div className="w-full max-w-[640px] mx-auto mt-6 sm:mt-12 bg-[#080b0f] border border-[#ff6200]/20 rounded-2xl p-4 sm:p-6 md:p-10 shadow-[0_0_80px_rgba(255,98,0,0.06)] relative overflow-hidden">
      
      {/* Background Embers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,98,0,0.08),transparent_50%)] pointer-events-none" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.form
            key="step0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleIdentitySubmit}
            className="flex flex-col gap-4 sm:gap-6 relative z-10"
          >
            <div className="flex items-center gap-3 text-[#ff6200] opacity-80 mb-2">
              <SquareTerminal className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="uppercase text-xs tracking-[0.2em] font-medium">Identity Definition</span>
            </div>
            
            <label className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight text-left">
              Who do you intend to become today?
            </label>
            
            <div className="relative mt-4">
              <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white/40 text-base sm:text-lg md:text-xl font-medium">I am</span>
              <input
                type="text"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="a creator, a thinker, a builder..."
                autoFocus
                className="w-full h-12 sm:h-16 bg-black border border-white/10 rounded-xl pl-20 pr-4 sm:pr-6 text-base sm:text-lg md:text-xl text-white outline-none focus:border-[#ff6200]/50 focus:bg-[#ff6200]/5 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={identity.length < 2}
              className="mt-2 group relative h-12 sm:h-14 bg-[#ff6200] text-black font-semibold text-base sm:text-lg rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center justify-center gap-2">
                Lock Identity <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </button>
          </motion.form>
        )}

        {step === 1 && (
          <motion.form
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleGoalSubmit}
            className="flex flex-col gap-4 sm:gap-6 relative z-10 text-left"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 sm:pb-6 gap-3 sm:gap-0">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">Current Protocol</p>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff6200]" />
                  <p className="text-lg sm:text-2xl font-bold text-white tracking-tight break-words">I am {identity}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setStep(0)}
                className="text-white/40 text-xs sm:text-sm hover:text-white transition-colors w-fit"
                title="Reset Identity"
              >
                Reset
              </button>
            </div>
            
            <div className="pt-2">
              <label className="text-lg sm:text-2xl font-semibold text-white/90">
                What is your 5-minute commitment?
              </label>
              <p className="text-white/50 text-xs sm:text-sm mt-2 mb-4">Lower the activation energy. Break it down to the smallest possible move.</p>
              <input
                type="text"
                value={microGoal}
                onChange={(e) => setMicroGoal(e.target.value)}
                placeholder="e.g., Put on running shoes, open the IDE..."
                autoFocus
                className="w-full h-12 sm:h-14 bg-black border border-white/10 rounded-xl px-4 sm:px-5 text-base sm:text-lg text-white outline-none focus:border-[#ff6200]/50 mb-4 sm:mb-6"
              />
            </div>

            <div className="bg-[#10141a] border border-[#ff6200]/20 p-4 sm:p-5 rounded-xl flex gap-3 sm:gap-4 items-start cursor-pointer hover:bg-[#151a22] transition-colors"
                 onClick={() => setPledged(!pledged)}
            >
              <div className={`mt-0.5 shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center border ${pledged ? 'bg-[#ff6200] border-[#ff6200]' : 'border-white/20'}`}>
                {pledged && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black" />}
              </div>
              <div>
                <p className="text-white font-medium text-sm sm:text-base">The Commitment Contract</p>
                <p className="text-white/60 text-xs sm:text-sm mt-1 leading-relaxed">
                  I assume full responsibility for this change. I choose this without appeal. I am actively forging this identity.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={microGoal.length < 2 || !pledged}
              className="mt-4 group relative h-12 sm:h-14 bg-white text-black font-semibold text-base sm:text-lg rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative flex items-center justify-center gap-2">
                Start Now <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </span>
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.div
             key="step2"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="flex flex-col items-center py-6 sm:py-8 relative z-10 text-center"
          >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/10 flex items-center justify-center mb-6 sm:mb-8">
              {/* Pulsing ring */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-[#ff6200]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <Flame className="w-8 h-8 sm:w-12 sm:h-12 text-[#ff6200]" />
            </div>

            <h3 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">The Forge is Active</h3>
            <p className="text-white/60 text-sm sm:text-lg mb-6 sm:mb-8 max-w-sm px-2">
              Your 5-minute window for <strong>"{microGoal}"</strong> is open. Prove your identity.
            </p>

            <button
              onClick={completeForge}
              className="group relative h-11 sm:h-14 w-full px-4 bg-[#ff6200] text-black font-semibold text-base sm:text-lg rounded-xl shadow-[0_0_30px_rgba(255,98,0,0.4)] transition-all hover:shadow-[0_0_50px_rgba(255,98,0,0.6)]"
            >
              Complete Goal & Stoke the Forge
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
             key="step3"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-col relative z-10 text-center py-4 px-2"
          >
            <div className="mb-8 sm:mb-10 text-left">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#ff6200]">Total Forge Progress</p>
                <p className="text-xs font-mono text-white/50">{progress}%</p>
              </div>
              
              {/* Progress Bar Visualizer */}
              <div className="h-3 sm:h-4 w-full bg-black border border-white/10 rounded-full overflow-hidden shadow-inner relative">
                {/* Embers texture/glow */}
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-[#ff6200] shadow-[0_0_20px_rgba(255,98,0,0.8)]"
                  initial={{ width: `${Math.max(0, progress - 25)}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4)_50%,transparent)] w-full h-full mix-blend-overlay animate-[shimmer_2s_infinite]" />
                </motion.div>
              </div>
            </div>

            <h3 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-4 leading-tight">Momentum secured.</h3>
            <p className="text-white/60 text-sm sm:text-base mb-6 sm:mb-8 max-w-[400px] mx-auto px-2">
              You pushed the bar. But momentum dies if it isn't tracked. Secure your forge access before the waitlist closes.
            </p>

            <div className="w-full flex justify-center px-2">
               <WaitlistForm className="max-w-[440px] w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
