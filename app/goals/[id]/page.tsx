import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, RefreshCw, Trash2 } from "lucide-react";

import { GoalMiniTracker } from "@/components/commitment/goal-mini-tracker";
import { TaskList } from "@/components/goals/task-list";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { archiveGoalAction, getDashboardData, regenerateGoalTasksAction } from "@/lib/actions";
import { calculateGoalProgress } from "@/lib/utils";

export default async function GoalDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user, goals } = await getDashboardData();
  const goal = goals.find((item) => item.id === id);

  if (!goal) {
    notFound();
  }

  const progress = calculateGoalProgress(goal);

  return (
    <DashboardLayout name={user.name} quickStat={`${goal.title} at ${progress}%`}>
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <Link href="/dashboard" className="text-sm text-white/45 transition-colors hover:text-white">
              Back to dashboard
            </Link>
            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.04em] text-white break-words">{goal.title}</h1>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <form action={async () => { "use server"; await regenerateGoalTasksAction(goal.id); }}>
              <Button variant="secondary" className="text-xs sm:text-sm">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Regenerate tasks</span>
              </Button>
            </form>
            <form action={async () => { "use server"; await archiveGoalAction(goal.id); }}>
              <Button variant="outline" className="text-xs sm:text-sm">
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Archive goal</span>
              </Button>
            </form>
          </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] gap-4 sm:gap-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Goal brief</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/35">Reason</p>
                <p className="text-sm leading-6 sm:leading-7 text-white/70">{goal.reason}</p>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/35">Outcome</p>
                <p className="text-sm leading-6 sm:leading-7 text-white/70">{goal.outcome}</p>
              </div>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <Badge className="text-xs gap-1 sm:text-sm sm:gap-2">
                  <CalendarClock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="truncate">{goal.timeline}</span>
                </Badge>
                <p className="text-xs sm:text-sm text-white/55">
                  {goal.tasks.filter((task) => task.completed).length}/{goal.tasks.length} complete
                </p>
              </div>
              <GoalMiniTracker value={progress} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Micro-task system</CardTitle>
              <p className="text-xs sm:text-sm text-white/55">Every completion updates both this goal and the global Commitment Bar.</p>
            </CardHeader>
            <CardContent>
              <TaskList goalId={goal.id} tasks={goal.tasks} />
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
