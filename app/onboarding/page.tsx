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
      <div className="space-y-8">
        <section className="grid grid-cols-[0.9fr_1.1fr] gap-8">
          <div className="rounded-[32px] border border-white/10 bg-[#0f141d] p-8 shadow-soft-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/45">
              <ShieldCheck className="h-4 w-4 text-[#79e6a7]" />
              Mandatory setup
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white">
              Build all five lanes before the forge opens.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/55">
              CommitForge only becomes meaningful when your commitment is distributed across real life. Each goal you add creates another lane feeding the main bar.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Write a reason with emotional truth.",
                "Give it a real timeline.",
                "Define success so clearly it can be recognized.",
                "Let AI turn the goal into 8–20 execution steps."
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
                  <CheckCircle2 className="h-4 w-4 text-[#79e6a7]" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[24px] border border-white/10 bg-[#0b1017] p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-white/35">Progress to unlock</p>
              <p className="mt-3 text-4xl font-semibold text-white">{goals.length}/5</p>
              <p className="mt-2 text-sm text-white/55">
                {remaining === 0
                  ? "Dashboard unlocked."
                  : `${remaining} more goal${remaining === 1 ? "" : "s"} until the full interface is available.`}
              </p>
            </div>
          </div>

          <GoalForm stepLabel={`Goal ${goals.length + 1} of 5`} />
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.035] p-8">
          <div className="mb-5 flex items-center gap-2 text-sm text-white/55">
            <Sparkles className="h-4 w-4 text-[#8cb8ff]" />
            Already forged
          </div>
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => {
              const goal = goals[index];
              return (
                <div
                  key={index}
                  className="rounded-[24px] border border-white/10 bg-[#0f141d] p-5"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-white/30">Lane {index + 1}</p>
                  <p className="mt-4 text-lg font-medium text-white">
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
