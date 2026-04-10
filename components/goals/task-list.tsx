"use client";

import { useOptimistic, useTransition } from "react";
import { CheckCircle2, LoaderCircle, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { addTaskAction, toggleTaskAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Task } from "@prisma/client";

const addTaskSchema = z.object({
  description: z.string().min(3, "Keep it specific.")
});

type TaskListProps = {
  goalId: string;
  tasks: Task[];
};

export function TaskList({ goalId, tasks }: TaskListProps) {
  const [optimisticTasks, updateOptimistic] = useOptimistic(tasks, (state, updated: Task[]) => updated);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      description: ""
    }
  });

  return (
    <div className="space-y-4">
      {optimisticTasks.map((task) => (
        <button
          key={task.id}
          className={cn(
            "flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all",
            task.completed
              ? "border-emerald-500/20 bg-emerald-500/10"
              : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
          )}
          onClick={() =>
            startTransition(async () => {
              updateOptimistic(
                optimisticTasks.map((item) =>
                  item.id === task.id ? { ...item, completed: !item.completed } : item
                )
              );
              await toggleTaskAction(task.id, !task.completed);
              router.refresh();
            })
          }
        >
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border",
              task.completed ? "border-emerald-400 bg-emerald-400/20" : "border-white/10"
            )}
          >
            <CheckCircle2 className={cn("h-4 w-4", task.completed ? "text-emerald-300" : "text-white/25")} />
          </div>
          <div className="flex-1">
            <p className={cn("text-sm", task.completed ? "text-white/70 line-through" : "text-white")}>
              {task.description}
            </p>
          </div>
          {isPending && <LoaderCircle className="h-4 w-4 animate-spin text-white/45" />}
        </button>
      ))}

      <form
        className="flex gap-3"
        onSubmit={form.handleSubmit((values) =>
          startTransition(async () => {
            await addTaskAction(goalId, values);
            form.reset();
            router.refresh();
          })
        )}
      >
        <Input placeholder="Add a sharp new micro-task" {...form.register("description")} />
        <Button type="submit" variant="secondary">
          <Plus className="h-4 w-4" />
          Add task
        </Button>
      </form>
      {form.formState.errors.description && (
        <p className="text-sm text-red-300">{form.formState.errors.description.message}</p>
      )}
    </div>
  );
}
