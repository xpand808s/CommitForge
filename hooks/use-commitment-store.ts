"use client";

import confetti from "canvas-confetti";
import { create } from "zustand";

type CommitmentState = {
  value: number;
  lastMilestone: number;
  setValue: (next: number) => void;
};

const milestones = [25, 50, 75, 100];

export const useCommitmentStore = create<CommitmentState>((set, get) => ({
  value: 0,
  lastMilestone: 0,
  setValue: (next) => {
    const current = get().value;
    const rounded = Math.max(0, Math.min(100, Math.round(next)));
    const crossed = milestones.find(
      (milestone) => current < milestone && rounded >= milestone && milestone > get().lastMilestone
    );

    if (crossed) {
      confetti({
        particleCount: 140,
        spread: 85,
        origin: { y: 0.6 }
      });
      set({ value: rounded, lastMilestone: crossed });
      return;
    }

    set({ value: rounded });
  }
}));
