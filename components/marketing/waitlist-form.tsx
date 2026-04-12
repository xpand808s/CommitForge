"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WaitlistForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call for now since we are mocking the visual state
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setStatus("success");
    setEmail("");
  };

  return (
    <div className={`w-full max-w-md ${className}`}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex h-14 items-center justify-center gap-2 rounded-full border border-[#ff6200]/30 bg-[#ff6200]/5 px-7 text-sm font-medium text-[#ff6200]"
          >
            <Check className="h-5 w-5" />
            <span>You&apos;re on the list. We&apos;ll be in touch.</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="relative flex items-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="h-14 w-full rounded-full border border-white/10 bg-black/40 pl-6 pr-32 text-sm text-white placeholder-white/40 outline-none transition-colors hover:border-white/20 focus:border-[#ff6200]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#ff6200]/50"
              disabled={status === "loading"}
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="absolute right-1.5 top-1.5 bottom-1.5 flex w-[120px] items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950 transition-transform disabled:opacity-80 enabled:hover:-translate-y-0.5"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Join Waitlist
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      
      {status !== "success" && (
        <p className="mt-3 text-center text-xs text-white/40">
          Limited early access opening soon.
        </p>
      )}
    </div>
  );
}
