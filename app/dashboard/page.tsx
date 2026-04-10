import { Award, Flame, Flag, Target } from "lucide-react";
import { redirect } from "next/navigation";

import { CommitmentBar } from "@/components/commitment/commitment-bar";
import { CommitmentHistory } from "@/components/commitment/commitment-history";
import { GoalCard } from "@/components/goals/goal-card";
import { NewGoalFab } from "@/components/goals/new-goal-fab";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardData } from "@/lib/actions";
import { getDailyInsight } from "@/lib/utils";

export default async function DashboardPage() {
  const { user, goals, snapshots, stats } = await getDashboardData();

  if (goals.length < 5) {
    redirect("/onboarding");
  }

  const insight = getDailyInsight(stats.commitmentValue);

  return (
    <DashboardLayout
      name={user.name}
      quickStat={`${stats.commitmentValue}% commitment intensity today`}
    >
      <div className="space-y-8">
        <CommitmentBar
          value={stats.commitmentValue}
          goalCount={goals.length}
          totalCompletedTasks={stats.totalCompletedTasks}
          weightedMode={user.settings?.weightedMode}
        />

        <section className="grid grid-cols-4 gap-5">
          {[
            { label: "Total Goals", value: stats.totalGoals, icon: Flag },
            { label: "Completion Rate", value: `${stats.completionRate}%`, icon: Target },
            { label: "Longest Active Streak", value: `${stats.longestActiveStreak} days`, icon: Flame },
            { label: "Daily Insight", value: insight, icon: Award, long: true }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className={stat.long ? "col-span-1" : ""}>
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center gap-2 text-sm text-white/45">
                    <Icon className="h-4 w-4 text-[#79e6a7]" />
                    {stat.label}
                  </div>
                  <p className={stat.long ? "text-sm leading-7 text-white/75" : "text-3xl font-semibold text-white"}>
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid grid-cols-[1.4fr_0.8fr] gap-6">
          <div className="grid grid-cols-3 gap-5">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
          <CommitmentHistory
            data={snapshots.map((item) => ({
              label: item.recordedFor.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
              }),
              value: item.commitmentValue
            }))}
          />
        </section>
      </div>

      <NewGoalFab />
    </DashboardLayout>
  );
}
