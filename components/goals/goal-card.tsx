import Link from "next/link";
import { ArrowUpRight, CalendarClock, CheckCircle2 } from "lucide-react";

import { GoalMiniTracker } from "@/components/commitment/goal-mini-tracker";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { calculateGoalProgress } from "@/lib/utils";
import type { GoalWithTasks } from "@/types/goal";

export function GoalCard({ goal }: { goal: GoalWithTasks }) {
  const progress = calculateGoalProgress(goal);
  const completedTasks = goal.tasks.filter((task) => task.completed).length;

  return (
    <Card className="group min-h-[280px] transition-transform duration-300 hover:-translate-y-1">
      <CardContent className="flex h-full flex-col gap-5 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">Goal</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
              {goal.title}
            </h3>
          </div>
          <Badge className="gap-2">
            <CalendarClock className="h-3.5 w-3.5" />
            {goal.timeline}
          </Badge>
        </div>

        <p className="line-clamp-3 text-sm leading-7 text-white/55">{goal.reason}</p>

        <GoalMiniTracker value={progress} />

        <div className="flex items-center justify-between text-sm text-white/55">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#79e6a7]" />
            {completedTasks}/{goal.tasks.length} tasks complete
          </div>
          <Link
            href={`/goals/${goal.id}`}
            className="inline-flex items-center gap-2 text-white transition-colors hover:text-[#8cb8ff]"
          >
            Expand
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
