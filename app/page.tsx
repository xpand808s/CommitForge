import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const steps = [
  {
    label: "01",
    title: "Name the commitments that deserve a real place in your life.",
    body:
      "CommitForge begins by looking at the whole person. Health, craft, money, relationships, discipline. The point is not quantity. The point is building a system sturdy enough to hold real life."
  },
  {
    label: "02",
    title: "Turn intention into trackable micro-moves.",
    body:
      "Each goal gets broken into clear actions you can complete daily or weekly. No vague promises. No motivational fog."
  },
  {
    label: "03",
    title: "Watch your total commitment become visible.",
    body:
      "Every completed task lifts the goal tracker and feeds the main Commitment Bar, so momentum feels cumulative instead of scattered."
  }
];

const principles = [
  "Streaks reward repetition. Commitment rewards alignment.",
  "Habits last longer when they are tied to identity, not guilt.",
  "Progress should feel physical, visible, and difficult to ignore."
];

export default function HomePage() {
  return (
    <main className="min-h-screen min-w-[1440px] bg-background text-foreground">
      <section className="relative min-h-[100vh] overflow-hidden border-b border-white/8">
        <Image
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=80"
          alt="Focused team planning with notebooks and laptops"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,18,0.86)_0%,rgba(8,12,18,0.62)_38%,rgba(8,12,18,0.3)_100%)]" />
        <div className="absolute inset-x-0 top-0 z-10 px-12 py-8">
          <div className="mx-auto flex max-w-[1560px] items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950 text-xl font-bold">
                C
              </div>
              <div>
                <p className="text-lg font-semibold text-white">CommitForge</p>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">Commitment operating system</p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/auth/sign-in"
                className="inline-flex h-11 items-center rounded-full border border-white/15 px-5 text-sm font-medium text-white/80 transition-colors hover:bg-white/8 hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
              >
                Enter the forge
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100vh] max-w-[1560px] flex-col justify-between px-12 pb-14 pt-32">
          <div className="grid grid-cols-[0.9fr_0.7fr] gap-16">
            <div className="max-w-[820px]">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/65 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-[#79e6a7]" />
                Built for people with more than one ambition
              </div>
              <h1 className="text-[96px] font-semibold leading-[0.94] tracking-[-0.07em] text-white">
                See how committed your life actually is.
              </h1>
              <p className="mt-8 max-w-[690px] text-xl leading-9 text-white/72">
                CommitForge is a habit tracker built around one central truth: isolated streaks are easy to game, but total commitment is harder to fake. Your Commitment Bar rises only when your goals are truly moving.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <Link
                  href="/auth/sign-in"
                  className="inline-flex h-14 items-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
                >
                  Start your commitments
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex h-14 items-center rounded-full border border-white/15 px-7 text-base font-medium text-white/82 transition-colors hover:bg-white/8 hover:text-white"
                >
                  View the dashboard
                </Link>
              </div>
            </div>

            <div className="flex items-end justify-end">
              <div className="w-[520px]">
                <div className="mb-4 flex items-center justify-between text-sm text-white/55">
                  <span>Total commitment level</span>
                  <span>55%</span>
                </div>
                <div className="relative h-[420px] overflow-hidden rounded-[34px] border border-white/12 bg-black/30 p-6 backdrop-blur-md">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_30%,rgba(0,0,0,0.12))]" />
                  <div className="absolute inset-x-6 bottom-6 top-6 rounded-[26px] border border-white/8" />
                  <div className="absolute bottom-6 left-6 top-6 w-[55%] rounded-[26px] bg-[linear-gradient(180deg,#7ae5a8_0%,#8bb8ff_58%,#d5b5ff_100%)] shadow-[0_0_80px_rgba(121,230,167,0.18)]" />
                  <div className="absolute left-6 right-6 top-10 grid grid-cols-5 gap-3">
                    {[68, 52, 74, 39, 41].map((value, index) => (
                      <div key={index} className="space-y-3">
                        <div className="text-center text-[11px] uppercase tracking-[0.18em] text-white/38">
                          G{index + 1}
                        </div>
                        <div className="h-[280px] overflow-hidden rounded-full bg-white/6">
                          <div
                            className="mt-auto rounded-full bg-white/90"
                            style={{ height: `${value}%`, opacity: 0.92 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-10 right-10 rounded-full border border-white/12 bg-black/35 px-4 py-2 text-sm text-white/72 backdrop-blur-md">
                    Building momentum
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-10">
            <div className="border-t border-white/12 pt-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/36">Why it hits different</p>
              <p className="mt-3 max-w-[340px] text-base leading-8 text-white/72">
                The main bar makes your effort legible across goals, not just inside one narrow routine.
              </p>
            </div>
            <div className="border-t border-white/12 pt-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/36">What AI does</p>
              <p className="mt-3 max-w-[340px] text-base leading-8 text-white/72">
                It turns emotional intent into daily or weekly micro-tasks you can actually execute.
              </p>
            </div>
            <div className="border-t border-white/12 pt-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/36">What you feel</p>
              <p className="mt-3 max-w-[340px] text-base leading-8 text-white/72">
                Less guilt about what you are not doing. More clarity about what is genuinely moving.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1560px] px-12 py-28">
        <div className="grid grid-cols-[0.72fr_1.08fr] gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/34">The purpose</p>
            <h2 className="mt-5 max-w-[540px] text-6xl font-semibold leading-[1] tracking-[-0.05em] text-white">
              Most trackers count habits. CommitForge measures seriousness.
            </h2>
          </div>

          <div className="space-y-8 text-lg leading-9 text-white/68">
            <p>
              It exists for people with meaningful ambitions in multiple parts of life who are tired of flat checklists pretending to represent real progress.
            </p>
            <p>
              A completed run, a finished deep-work block, a hard conversation, a saved amount, a published piece of writing. These are not separate little wins. They are signals of personal follow-through.
            </p>
            <p>
              CommitForge turns those signals into one visual answer: how committed am I, across the life I say I want?
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#0d131b]">
        <div className="mx-auto grid max-w-[1560px] grid-cols-[1fr_0.9fr] gap-0 px-12">
          <div className="py-24 pr-14">
            <p className="text-sm uppercase tracking-[0.24em] text-white/34">How it works</p>
            <div className="mt-10 space-y-12">
              {steps.map((step) => (
                <div key={step.label} className="grid grid-cols-[72px_1fr] gap-6 border-t border-white/8 pt-8 first:border-t-0 first:pt-0">
                  <div className="text-3xl font-semibold tracking-[-0.04em] text-white/28">{step.label}</div>
                  <div>
                    <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">{step.title}</h3>
                    <p className="mt-4 max-w-[640px] text-base leading-8 text-white/62">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[820px] overflow-hidden border-l border-white/8 bg-[radial-gradient(circle_at_top,rgba(140,184,255,0.16),transparent_28%),linear-gradient(180deg,#0e141d_0%,#0a0f16_100%)]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_25%,rgba(0,0,0,0.12))]" />
            <div className="absolute inset-10">
              <Image
                src="/commitment-trend-reference-v2.png"
                alt="Commitment trend visual showing momentum climbing and goal contributions building beneath it"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1560px] px-12 py-28">
        <div className="grid grid-cols-[0.86fr_1.14fr] gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/34">Three convictions</p>
          </div>
          <div className="space-y-6">
            {principles.map((item) => (
              <div key={item} className="border-t border-white/8 py-6 text-3xl font-medium leading-[1.28] tracking-[-0.03em] text-white/90">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/8">
        <Image
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80"
          alt="Modern workspace with focused lighting"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,13,19,0.92)_0%,rgba(9,13,19,0.76)_45%,rgba(9,13,19,0.5)_100%)]" />
        <div className="relative z-10 mx-auto flex max-w-[1560px] items-end justify-between gap-12 px-12 py-24">
          <div className="max-w-[780px]">
            <p className="text-sm uppercase tracking-[0.24em] text-white/34">Start clean</p>
            <h2 className="mt-5 text-6xl font-semibold leading-[0.98] tracking-[-0.05em] text-white">
              Start with what matters. Build the system. Let the bar tell the truth.
            </h2>
            <p className="mt-6 max-w-[620px] text-lg leading-8 text-white/66">
              Start with the commitments that deserve your real energy, then enter a dashboard where progress feels earned.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/auth/sign-in"
              className="inline-flex h-14 items-center rounded-full bg-white px-7 text-base font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
            >
              Create account
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-14 items-center rounded-full border border-white/14 px-7 text-base font-medium text-white/82 transition-colors hover:bg-white/8 hover:text-white"
            >
              Explore product
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
