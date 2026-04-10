import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { GoalWithTasks } from "@/types/goal";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateGoalProgress(goal: GoalWithTasks) {
  if (!goal.tasks.length) {
    return 0;
  }

  const completed = goal.tasks.filter((task) => task.completed).length;
  return Math.round((completed / goal.tasks.length) * 100);
}

export function calculateCommitmentAverage(goals: GoalWithTasks[]) {
  if (!goals.length) {
    return 0;
  }

  const total = goals.reduce((sum, goal) => sum + calculateGoalProgress(goal), 0);
  return Math.round(total / goals.length);
}

export function calculateCommitmentWeighted(goals: GoalWithTasks[]) {
  if (!goals.length) {
    return 0;
  }

  const totalTasks = goals.reduce((sum, goal) => sum + goal.tasks.length, 0);
  if (!totalTasks) {
    return 0;
  }

  const completedTasks = goals.reduce(
    (sum, goal) => sum + goal.tasks.filter((task) => task.completed).length,
    0
  );

  return Math.round((completedTasks / totalTasks) * 100);
}

export function getCommitmentLabel(value: number) {
  if (value <= 20) {
    return "Just starting";
  }
  if (value <= 50) {
    return "Building momentum";
  }
  if (value <= 80) {
    return "Deeply committed";
  }
  return "Forge Master";
}

export function getDailyInsight(value: number, date = new Date()) {
  const day = date.toISOString().slice(0, 10);
  const low = [
    "Momentum begins the moment you keep the promise small enough to repeat.",
    "Today is for lighting the forge, not finishing the blade.",
    "Five deliberate moves beat one dramatic reset."
  ];
  const mid = [
    "Your system is starting to trust you. Protect that feeling with one more rep.",
    "Momentum compounds when the next task feels inevitable.",
    "Consistency is turning your plans into evidence."
  ];
  const high = [
    "You are past motivation now. This is identity under construction.",
    "Commitment at this level deserves precision, not panic.",
    "Your bar is glowing because your habits are no longer theoretical."
  ];
  const pool = value <= 35 ? low : value <= 75 ? mid : high;
  return pool[Number.parseInt(day.replaceAll("-", ""), 10) % pool.length];
}

export function formatPercent(value: number) {
  return `${Math.max(0, Math.min(100, Math.round(value)))}%`;
}
