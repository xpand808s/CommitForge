import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";

import { GoalForm } from "@/components/goals/goal-form";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getDashboardData } from "@/lib/actions";

export default async function OnboardingPage() {
  const { user, goals } = await getDashboardData();
  const remaining = Math.max(0, 5 - goals.length);

  if (goals.length >= 5) {
    redirect("/dashboard");
  }

  return (
    <DashboardLayout
      name={user.name}
      quickStat={`${goals.length}/5 commitment lanes unlocked`}
    >
      <div className="space-y-6 sm:space-y-8">
        <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 sm:gap-8">
          <div className="rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#0f141d] p-6 sm:p-8 shadow-soft-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 sm:px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/45">
              <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 text-[#79e6a7]" />
              Mandatory setup
            </div>
            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white">
              Build all five lanes before the forge opens.
            </h1>
            <p className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base leading-7 sm:leading-8 text-white/55">
              CommitForge only becomes meaningful when your commitment is distributed across real life. Each goal you add creates another lane feeding the main bar.
            </p>

            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {[
                "Write a reason with emotional truth.",
                "Give it a real timeline.",
                "Define success so clearly it can be recognized.",
                "Let AI turn the goal into 8–20 execution steps."
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4 text-xs sm:text-sm text-white/70">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#79e6a7] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 rounded-[20px] sm:rounded-[24px] border border-white/10 bg-[#0b1017] p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">Progress to unlock</p>
              <p className="mt-2 sm:mt-3 text-3xl sm:text-4xl font-semibold text-white">{goals.length}/5</p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/55">
                {remaining === 0
                  ? "Dashboard unlocked."
                  : `${remaining} more goal${remaining === 1 ? "" : "s"} until the full interface is available.`}
              </p>
            </div>
          </div>

          <GoalForm stepLabel={`Goal ${goals.length + 1} of 5`} />
        </section>

        <section className="rounded-[24px] sm:rounded-[32px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <div className="mb-4 sm:mb-5 flex items-center gap-2 text-xs sm:text-sm text-white/55">
            <Sparkles className="h-4 w-4 text-[#8cb8ff]" />
            Already forged
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {Array.from({ length: 5 }).map((_, index) => {
              const goal = goals[index];
              return (
                <div
                  key={index}
                  className="rounded-[16px] sm:rounded-[24px] border border-white/10 bg-[#0f141d] p-3 sm:p-5"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-white/30">Lane {index + 1}</p>
                  <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-white line-clamp-2">
                    {goal ? goal.title : "Waiting for a real commitment"}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
