import type { GoalWithTasks, CommitmentHistoryPoint } from "@/types/goal";

export const demoUser = {
  id: "demo-user",
  email: "demo@commitforge.app",
  name: "Forge Demo",
  createdAt: new Date(),
  settings: {
    id: "demo-settings",
    userId: "demo-user",
    openAiApiKey: null,
    preferredTheme: "dark",
    weightedMode: false,
    updatedAt: new Date()
  }
};

export const demoGoals: GoalWithTasks[] = [
  {
    id: "goal-1",
    userId: "demo-user",
    title: "Build elite endurance",
    reason: "I want my body to feel trustworthy under pressure and recover faster when the week gets demanding.",
    timeline: "90 days",
    outcome: "Run a half marathon without walking",
    createdAt: new Date(),
    tasks: [
      { id: "task-1", goalId: "goal-1", description: "Complete three zone 2 runs this week", completed: true, completedAt: new Date() },
      { id: "task-2", goalId: "goal-1", description: "Finish one interval session", completed: true, completedAt: new Date() },
      { id: "task-3", goalId: "goal-1", description: "Log one long run", completed: false, completedAt: null },
      { id: "task-4", goalId: "goal-1", description: "Do two mobility sessions", completed: false, completedAt: null }
    ]
  },
  {
    id: "goal-2",
    userId: "demo-user",
    title: "Ship CommitForge",
    reason: "I want proof that I can turn a sharp product instinct into a premium experience people actually return to.",
    timeline: "by Aug 31 2026",
    outcome: "Launch v1 with 100 active users",
    createdAt: new Date(),
    tasks: [
      { id: "task-5", goalId: "goal-2", description: "Refine dashboard interactions", completed: true, completedAt: new Date() },
      { id: "task-6", goalId: "goal-2", description: "Close one onboarding UX gap", completed: false, completedAt: null },
      { id: "task-7", goalId: "goal-2", description: "Interview one user", completed: false, completedAt: null },
      { id: "task-8", goalId: "goal-2", description: "Publish one product update", completed: false, completedAt: null }
    ]
  },
  {
    id: "goal-3",
    userId: "demo-user",
    title: "Master strategic writing",
    reason: "Clear writing sharpens my thinking and lets me be known for substance rather than scattered ideas.",
    timeline: "ongoing",
    outcome: "Publish 24 thoughtful essays",
    createdAt: new Date(),
    tasks: [
      { id: "task-9", goalId: "goal-3", description: "Draft one essay outline", completed: true, completedAt: new Date() },
      { id: "task-10", goalId: "goal-3", description: "Write 500 words", completed: true, completedAt: new Date() },
      { id: "task-11", goalId: "goal-3", description: "Edit one draft", completed: false, completedAt: null },
      { id: "task-12", goalId: "goal-3", description: "Publish one insight post", completed: false, completedAt: null }
    ]
  },
  {
    id: "goal-4",
    userId: "demo-user",
    title: "Deepen family rituals",
    reason: "I want the people I love to feel deliberately prioritized instead of merely fitted around work.",
    timeline: "6 months",
    outcome: "Hold 20 intentional family evenings",
    createdAt: new Date(),
    tasks: [
      { id: "task-13", goalId: "goal-4", description: "Plan one family dinner", completed: true, completedAt: new Date() },
      { id: "task-14", goalId: "goal-4", description: "Schedule one no-phone evening", completed: false, completedAt: null },
      { id: "task-15", goalId: "goal-4", description: "Prepare one shared activity", completed: false, completedAt: null },
      { id: "task-16", goalId: "goal-4", description: "Capture one memory note", completed: false, completedAt: null }
    ]
  },
  {
    id: "goal-5",
    userId: "demo-user",
    title: "Read with range",
    reason: "I want more original inputs shaping how I think, decide, and create.",
    timeline: "12 months",
    outcome: "Read 30 books across 5 disciplines",
    createdAt: new Date(),
    tasks: [
      { id: "task-17", goalId: "goal-5", description: "Read 40 pages", completed: true, completedAt: new Date() },
      { id: "task-18", goalId: "goal-5", description: "Write one chapter summary", completed: true, completedAt: new Date() },
      { id: "task-19", goalId: "goal-5", description: "Share one idea from reading", completed: false, completedAt: null },
      { id: "task-20", goalId: "goal-5", description: "Finish one book", completed: false, completedAt: null }
    ]
  }
];

export const demoHistory: CommitmentHistoryPoint[] = [
  { label: "Mar 28", value: 22 },
  { label: "Mar 29", value: 25 },
  { label: "Mar 30", value: 27 },
  { label: "Mar 31", value: 30 },
  { label: "Apr 1", value: 32 },
  { label: "Apr 2", value: 36 },
  { label: "Apr 3", value: 39 },
  { label: "Apr 4", value: 41 },
  { label: "Apr 5", value: 43 },
  { label: "Apr 6", value: 46 },
  { label: "Apr 7", value: 48 },
  { label: "Apr 8", value: 51 },
  { label: "Apr 9", value: 54 },
  { label: "Apr 10", value: 55 }
];
