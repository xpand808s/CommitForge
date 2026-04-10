import type { Goal, Task } from "@prisma/client";

export type GoalWithTasks = Goal & {
  tasks: Task[];
};

export type CommitmentHistoryPoint = {
  label: string;
  value: number;
};
