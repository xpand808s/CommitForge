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
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="text-sm text-white/45 transition-colors hover:text-white">
              Back to dashboard
            </Link>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-white">{goal.title}</h1>
          </div>
          <div className="flex gap-3">
            <form action={async () => { "use server"; await regenerateGoalTasksAction(goal.id); }}>
              <Button variant="secondary">
                <RefreshCw className="h-4 w-4" />
                Regenerate tasks
              </Button>
            </form>
            <form action={async () => { "use server"; await archiveGoalAction(goal.id); }}>
              <Button variant="outline">
                <Trash2 className="h-4 w-4" />
                Archive goal
              </Button>
            </form>
          </div>
        </div>

        <section className="grid grid-cols-[0.88fr_1.12fr] gap-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Goal brief</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/35">Reason</p>
                <p className="text-sm leading-7 text-white/70">{goal.reason}</p>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/35">Outcome</p>
                <p className="text-sm leading-7 text-white/70">{goal.outcome}</p>
              </div>
              <div className="flex items-center justify-between">
                <Badge className="gap-2">
                  <CalendarClock className="h-3.5 w-3.5" />
                  {goal.timeline}
                </Badge>
                <p className="text-sm text-white/55">
                  {goal.tasks.filter((task) => task.completed).length}/{goal.tasks.length} complete
                </p>
              </div>
              <GoalMiniTracker value={progress} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Micro-task system</CardTitle>
              <p className="text-sm text-white/55">Every completion updates both this goal and the global Commitment Bar.</p>
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
