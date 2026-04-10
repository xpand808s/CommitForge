"use server";

import { revalidatePath } from "next/cache";
import { startOfDay, subDays } from "date-fns";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { demoGoals, demoHistory, demoUser } from "@/lib/demo-data";
import { hasDatabaseUrl } from "@/lib/env";
import { generateGoalBreakdown } from "@/lib/ai/goal-breakdown";
import { prisma } from "@/lib/prisma";
import {
  calculateCommitmentAverage,
  calculateCommitmentWeighted,
  calculateGoalProgress
} from "@/lib/utils";
import type { CommitmentHistoryPoint } from "@/types/goal";

const taskSchema = z.object({
  description: z.string().min(3).max(120)
});

const goalSchema = z.object({
  title: z.string().min(3).max(80),
  reason: z.string().min(20).max(280),
  timeline: z.string().min(3).max(80),
  outcome: z.string().min(10).max(180)
});

const settingsSchema = z.object({
  openAiApiKey: z.string().optional().or(z.literal("")),
  preferredTheme: z.enum(["dark", "light", "system"]),
  weightedMode: z.boolean()
});

async function getAuthedUserId() {
  if (!hasDatabaseUrl()) {
    return demoUser.id;
  }

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    const fallback = await prisma.user.findUnique({
      where: { email: "demo@commitforge.app" }
    });
    if (fallback) {
      return fallback.id;
    }
    throw new Error("No authenticated user found.");
  }
  return userId;
}

export async function createGoalAction(input: z.infer<typeof goalSchema>) {
  if (!hasDatabaseUrl()) {
    throw new Error("Connect a PostgreSQL database to create persistent goals.");
  }
  const parsed = goalSchema.parse(input);
  const userId = await getAuthedUserId();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { settings: true }
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const breakdown = await generateGoalBreakdown({
    ...parsed,
    apiKey: user.settings?.openAiApiKey
  });

  const goal = await prisma.goal.create({
    data: {
      userId,
      ...parsed,
      tasks: {
        create: breakdown.tasks.map((task) => ({
          description: task.description
        }))
      }
    },
    include: {
      tasks: true
    }
  });

  await syncCommitmentSnapshot(userId);
  revalidatePath("/onboarding");
  revalidatePath("/dashboard");
  revalidatePath(`/goals/${goal.id}`);
  return { goal, breakdown };
}

export async function regenerateGoalTasksAction(goalId: string) {
  if (!hasDatabaseUrl()) {
    throw new Error("Connect a PostgreSQL database to regenerate tasks.");
  }
  const userId = await getAuthedUserId();
  const goal = await prisma.goal.findFirst({
    where: { id: goalId, userId },
    include: { tasks: true, user: { include: { settings: true } } }
  });

  if (!goal) {
    throw new Error("Goal not found.");
  }

  const breakdown = await generateGoalBreakdown({
    title: goal.title,
    reason: goal.reason,
    timeline: goal.timeline,
    outcome: goal.outcome,
    apiKey: goal.user.settings?.openAiApiKey
  });

  await prisma.task.deleteMany({ where: { goalId } });
  await prisma.goal.update({
    where: { id: goalId },
    data: {
      tasks: {
        create: breakdown.tasks.map((task) => ({
          description: task.description
        }))
      }
    }
  });

  await syncCommitmentSnapshot(userId);
  revalidatePath("/dashboard");
  revalidatePath(`/goals/${goalId}`);
}

export async function toggleTaskAction(taskId: string, completed: boolean) {
  if (!hasDatabaseUrl()) {
    return {
      goalId: taskId,
      progress: completed ? 100 : 0
    };
  }
  const userId = await getAuthedUserId();
  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      completed,
      completedAt: completed ? new Date() : null
    },
    include: {
      goal: {
        include: {
          tasks: true
        }
      }
    }
  });

  await syncCommitmentSnapshot(userId);
  revalidatePath("/dashboard");
  revalidatePath(`/goals/${task.goalId}`);
  return {
    goalId: task.goalId,
    progress: calculateGoalProgress(task.goal)
  };
}

export async function addTaskAction(goalId: string, input: z.infer<typeof taskSchema>) {
  if (!hasDatabaseUrl()) {
    throw new Error("Connect a PostgreSQL database to add tasks.");
  }
  const parsed = taskSchema.parse(input);
  await prisma.task.create({
    data: {
      goalId,
      description: parsed.description
    }
  });
  revalidatePath(`/goals/${goalId}`);
  revalidatePath("/dashboard");
}

export async function archiveGoalAction(goalId: string) {
  if (!hasDatabaseUrl()) {
    throw new Error("Connect a PostgreSQL database to archive goals.");
  }
  const userId = await getAuthedUserId();
  await prisma.goal.delete({
    where: { id: goalId }
  });
  await syncCommitmentSnapshot(userId);
  revalidatePath("/dashboard");
}

export async function updateSettingsAction(input: z.infer<typeof settingsSchema>) {
  if (!hasDatabaseUrl()) {
    return;
  }
  const userId = await getAuthedUserId();
  const parsed = settingsSchema.parse(input);
  await prisma.userSetting.upsert({
    where: { userId },
    create: {
      userId,
      ...parsed
    },
    update: parsed
  });

  revalidatePath("/settings");
}

export async function getDashboardData() {
  if (!hasDatabaseUrl()) {
    const commitmentValue = calculateCommitmentAverage(demoGoals);
    const totalCompletedTasks = demoGoals.reduce(
      (sum, goal) => sum + goal.tasks.filter((task) => task.completed).length,
      0
    );

    return {
      user: demoUser,
      goals: demoGoals,
      snapshots: demoHistory.map((item, index) => ({
        id: `snapshot-${index}`,
        userId: demoUser.id,
        recordedFor: new Date(),
        commitmentValue: item.value,
        createdAt: new Date()
      })),
      stats: {
        commitmentValue,
        completionRate: commitmentValue,
        totalGoals: demoGoals.length,
        totalCompletedTasks,
        longestActiveStreak: 12
      }
    };
  }

  const userId = await getAuthedUserId();
  const [user, goals, snapshots] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      include: { settings: true }
    }),
    prisma.goal.findMany({
      where: { userId },
      include: { tasks: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.commitmentSnapshot.findMany({
      where: { userId },
      orderBy: { recordedFor: "asc" },
      take: 14
    })
  ]);

  if (!user) {
    throw new Error("User not found.");
  }

  const commitmentValue = user.settings?.weightedMode
    ? calculateCommitmentWeighted(goals)
    : calculateCommitmentAverage(goals);
  const completionRate =
    goals.length === 0
      ? 0
      : Math.round(
          goals.reduce((sum, goal) => sum + calculateGoalProgress(goal), 0) / goals.length
        );
  const totalCompletedTasks = goals.reduce(
    (sum, goal) => sum + goal.tasks.filter((task) => task.completed).length,
    0
  );
  const totalTasks = goals.reduce((sum, goal) => sum + goal.tasks.length, 0);
  const longestActiveStreak = Math.max(
    1,
    Math.round((totalCompletedTasks / Math.max(totalTasks, 1)) * 21)
  );

  return {
    user,
    goals,
    snapshots,
    stats: {
      commitmentValue,
      completionRate,
      totalGoals: goals.length,
      totalCompletedTasks,
      longestActiveStreak
    }
  };
}

export async function getCommitmentHistory(): Promise<CommitmentHistoryPoint[]> {
  if (!hasDatabaseUrl()) {
    return demoHistory;
  }
  const userId = await getAuthedUserId();
  const snapshots = await prisma.commitmentSnapshot.findMany({
    where: { userId },
    orderBy: { recordedFor: "asc" },
    take: 14
  });

  return snapshots.map((item) => ({
    label: item.recordedFor.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: item.commitmentValue
  }));
}

async function syncCommitmentSnapshot(userId: string) {
  const goals = await prisma.goal.findMany({
    where: { userId },
    include: { tasks: true }
  });

  const commitmentValue = calculateCommitmentAverage(goals);

  await prisma.commitmentSnapshot.upsert({
    where: {
      userId_recordedFor: {
        userId,
        recordedFor: startOfDay(new Date())
      }
    },
    create: {
      userId,
      recordedFor: startOfDay(new Date()),
      commitmentValue
    },
    update: {
      commitmentValue
    }
  });

  const existing = await prisma.commitmentSnapshot.count({ where: { userId } });
  if (existing === 1) {
    await Promise.all(
      Array.from({ length: 13 }).map((_, index) =>
        prisma.commitmentSnapshot.upsert({
          where: {
            userId_recordedFor: {
              userId,
              recordedFor: startOfDay(subDays(new Date(), index + 1))
            }
          },
          create: {
            userId,
            recordedFor: startOfDay(subDays(new Date(), index + 1)),
            commitmentValue: Math.max(5, commitmentValue - (index + 1) * 2)
          },
          update: {}
        })
      )
    );
  }
}
