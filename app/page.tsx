import Image from "next/image";
import Link from "next/link";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { ForgeTerminal } from "@/components/marketing/forge-terminal";
import { ForgeOfEssence } from "@/components/marketing/forge-of-essence";
import { ConvictionsAccordion } from "@/components/marketing/convictions-accordion";
import { MouseSpotlight } from "@/components/motion/mouse-spotlight";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export default function HomePage() {
  return (
    <main className="min-h-screen min-w-[1440px] bg-background text-foreground">
      <MouseSpotlight />
      <section className="relative min-h-[100vh] overflow-hidden border-b border-white/8">
        <Image
          src="/hero-bg.png"
          alt="Subtle dark metallic background representing forging commitments"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,18,0.86)_0%,rgba(8,12,18,0.62)_38%,rgba(8,12,18,0.3)_100%)]" />
        <div className="absolute inset-x-0 top-0 z-10 px-12 py-8">
          <div className="mx-auto flex max-w-[1560px] items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div>
                <p className="text-lg font-semibold text-white">CommitForge</p>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">Commitment operating system</p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <a
                href="#forge"
                className="inline-flex h-11 items-center rounded-full bg-[#ff6200] px-5 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100vh] max-w-[1560px] flex-col items-center justify-center px-12 pb-14 pt-24 text-center">
          <ScrollReveal delay={0.1} className="flex w-full flex-col items-center justify-center">
            <div className="mb-10 inline-flex items-center rounded-full border border-[#ff6200]/25 bg-[#ff6200]/10 px-4 py-2.5 text-xs uppercase tracking-[0.24em] text-[#ff6200] backdrop-blur-md shadow-[0_0_24px_rgba(255,98,0,0.15)] transition-colors hover:border-[#ff6200]/40">
              Stop searching for yourself. Start forging yourself.
            </div>
            
            <div className="w-full flex justify-center" id="forge">
              <ForgeTerminal />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#0a0f16]">
        <ScrollReveal className="mx-auto max-w-[1560px] px-12 py-24">
          <div className="text-center mb-20 max-w-[800px] mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[#ff6200] mb-5">How it works</p>
            <h2 className="text-[40px] font-bold text-white leading-[1.05] tracking-tight mb-6">
              AI breaks down your goals. You execute. The bar moves.
            </h2>
            <p className="text-[18px] text-white/50 leading-relaxed font-light">
              Set a meaningful goal and AI decomposes it into 5-minute deeds — small enough to start, specific enough to finish. Every completed deed feeds your project score, and every project feeds the master commitment bar. It&apos;s a mirror of how well you&apos;re keeping promises to yourself.
            </p>
          </div>
          <ForgeOfEssence />
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-[1560px] px-12 py-24 border-b border-white/8">
        <div className="grid grid-cols-3 gap-16">
          <ScrollReveal delay={0.1}>
            <p className="text-sm uppercase tracking-[0.24em] text-[#ff6200]">The Fragmented Mind</p>
            <p className="mt-4 text-[19px] leading-8 text-white/72 font-light">
              Constant task-switching shrinks your capacity for sustained focus. Every notification is a withdrawal from your cognitive bank account.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-sm uppercase tracking-[0.24em] text-[#ff6200]">Digital Learned Helplessness</p>
            <p className="mt-4 text-[19px] leading-8 text-white/72 font-light">
              After hundreds of daily micro-experiences of losing control to algorithms, you begin to believe your effort is futile.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-sm uppercase tracking-[0.24em] text-[#ff6200]">The Mechanical Life</p>
            <p className="mt-4 text-[19px] leading-8 text-white/72 font-light">
              Rising, scrolling, reacting, repeating — until the "Why" finally arises. CommitForge exists for that moment.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1560px] px-12 py-28">
        <ScrollReveal>
          <ConvictionsAccordion />
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-[1560px] px-12 py-32 border-t border-white/8 bg-[#090d14]">
        <ScrollReveal className="mx-auto max-w-[840px]">
          <p className="text-sm uppercase tracking-[0.24em] text-[#ff6200]">The Moment of Lucidity</p>
          
          <h2 className="mt-8 text-[48px] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
            Most of us live in bad faith — play-acting as objects at the mercy of circumstance.
          </h2>
          
          <div className="mt-12 space-y-8 text-[22px] leading-[1.6] text-white/70 font-light">
            <p>
              We say &ldquo;I cannot&rdquo; when the truth is &ldquo;I will not.&rdquo; We yield to external pressures and disown our freedom.
            </p>
            <p>
              Lucidity is the clarity of mind to refuse these comforting illusions. It is the recognition that while the world may be unreasonable, your struggle gives life its majesty.
            </p>
            <blockquote className="border-l-[3px] border-[#ff6200]/40 pl-8 text-white/95 font-medium my-10 py-2">
              There is no fate that cannot be surmounted by scorn. You become the master of your days when you acknowledge the struggle and say &ldquo;Yes&rdquo; anyway.
            </blockquote>
            <p>
              Assumption of responsibility is the only basis for genuine change. You are the architect of your own distress, and therefore, you are the only one who can architect your liberation.
            </p>
            <p>
              CommitForge was born from that conviction. Not another habit tracker with streaks and checkboxes, but a tool built around one idea: <strong className="text-white font-medium">your fate belongs to you. Your rock is a thing you choose to move.</strong>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Final Waitlist CTA — bold, full-width, no image */}
      <section className="border-t border-white/8 bg-[#07090d]">
        <ScrollReveal className="mx-auto max-w-[1560px] px-12 py-32">
          <div className="mx-auto max-w-[980px] rounded-2xl border border-[#ff6200]/25 bg-[radial-gradient(circle_at_top,rgba(255,98,0,0.12),transparent_45%),#0b0e14] px-10 py-16 text-center shadow-[0_0_60px_rgba(255,98,0,0.12)]">
            <p className="text-xs uppercase tracking-[0.24em] text-[#ff6200] mb-6">The Final Inquiry</p>
            <h2 className="text-[56px] font-semibold leading-[1.02] tracking-[-0.05em] text-white max-w-[820px] mx-auto mb-6">
              Are you ready to stop eluding your life and start living it?
            </h2>
            <p className="text-xl text-white/55 leading-relaxed max-w-[600px] mx-auto mb-12 font-light">
              Every day without commitment is a vote against the person you intend to become. Sign the contract. Start the forge.
            </p>
            <div className="mx-auto max-w-[560px]">
              <WaitlistForm className="w-full max-w-none" />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
