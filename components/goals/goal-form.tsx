"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import { createGoalAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const goalSchema = z.object({
  title: z.string().min(3, "Give this goal a strong name."),
  reason: z.string().min(20, "Make the reason emotionally specific."),
  timeline: z.string().min(3, "Add a real timeline."),
  outcome: z.string().min(10, "Define a measurable outcome.")
});

type GoalFormProps = {
  stepLabel?: string;
  onCreated?: () => void;
};

export function GoalForm({ stepLabel, onCreated }: GoalFormProps) {
  const [breakdownPreview, setBreakdownPreview] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof goalSchema>>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: "",
      reason: "",
      timeline: "",
      outcome: ""
    }
  });

  return (
    <Card className="rounded-[32px]">
      <CardHeader>
        {stepLabel && <p className="text-sm uppercase tracking-[0.24em] text-white/40">{stepLabel}</p>}
        <CardTitle className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
          Design the next promise you intend to keep.
        </CardTitle>
        <p className="max-w-2xl text-sm leading-7 text-white/55">
          CommitForge turns clarity into executable momentum. Give the AI the truth, not the slogan.
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-[1.15fr_0.85fr] gap-8">
        <form
          className="space-y-5"
          onSubmit={form.handleSubmit((values) =>
            startTransition(async () => {
              const result = await createGoalAction(values);
              setBreakdownPreview(result.breakdown.tasks.map((task) => task.description));
              form.reset();
              router.refresh();
              onCreated?.();
            })
          )}
        >
          <div className="space-y-2">
            <Label htmlFor="title">Goal title</Label>
            <Input id="title" placeholder="Qualify for the Cape Town marathon" {...form.register("title")} />
            {form.formState.errors.title && <p className="text-sm text-red-300">{form.formState.errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="This matters because..."
              {...form.register("reason")}
            />
            {form.formState.errors.reason && <p className="text-sm text-red-300">{form.formState.errors.reason.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Input id="timeline" placeholder="90 days" {...form.register("timeline")} />
              {form.formState.errors.timeline && <p className="text-sm text-red-300">{form.formState.errors.timeline.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="outcome">Outcome</Label>
              <Input id="outcome" placeholder="Run a sub-3-hour marathon" {...form.register("outcome")} />
              {form.formState.errors.outcome && <p className="text-sm text-red-300">{form.formState.errors.outcome.message}</p>}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            {isPending ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Forging tasks...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Break this goal into momentum
              </>
            )}
          </Button>
        </form>

        <div className="rounded-[28px] border border-white/10 bg-[#0b1017] p-6">
          <div className="mb-5 flex items-center gap-2 text-sm text-white/55">
            <Sparkles className="h-4 w-4 text-[#79e6a7]" />
            AI task preview
          </div>
          <div className="space-y-3">
            {(breakdownPreview.length
              ? breakdownPreview
              : [
                  "Review tomorrow's effort before the day begins",
                  "Close one deliberate work block tied to the goal",
                  "Track one measurable win",
                  "Plan the next weekly push"
                ]
            ).map((task, index) => (
              <div key={`${task}-${index}`} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
                {task}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
