import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const outputSchema = z.object({
  titleRefinement: z.string(),
  planningNotes: z.string(),
  tasks: z.array(
    z.object({
      description: z.string(),
      cadence: z.enum(["daily", "weekly"]),
      rationale: z.string()
    })
  ).min(8).max(20)
});

export const goalBreakdownPrompt = `
You are CommitForge, a premium strategic habit architect. Break a meaningful life goal into a realistic execution ladder.

Rules:
- Return 8 to 20 micro-tasks.
- Tasks must be concrete, trackable, and phrased as actions.
- Prefer daily or weekly behaviors over vague milestones.
- Mix consistency tasks and advancement tasks.
- Respect the timeline and the ambition of the outcome.
- Avoid duplicate tasks and avoid platitudes.
- Do not include numbering in the description.
- The user needs momentum quickly, so the first three tasks should feel immediately doable.
- The plan should feel elite, humane, and sustainable.

For each task, provide:
- description: short action statement
- cadence: "daily" or "weekly"
- rationale: one sentence explaining why it matters
`;

type GoalBreakdownInput = {
  title: string;
  reason: string;
  timeline: string;
  outcome: string;
  apiKey?: string | null;
};

export async function generateGoalBreakdown({
  title,
  reason,
  timeline,
  outcome,
  apiKey
}: GoalBreakdownInput) {
  const key = apiKey || process.env.OPENAI_API_KEY;

  if (!key) {
    return buildFallbackBreakdown({ title, reason, timeline, outcome });
  }

  const openai = createOpenAI({ apiKey: key });
  const result = await generateObject({
    model: openai("gpt-4o"),
    schema: outputSchema,
    temperature: 0.7,
    system: goalBreakdownPrompt,
    prompt: `
Goal title: ${title}
Reason: ${reason}
Timeline: ${timeline}
Outcome: ${outcome}

Generate the strongest realistic task system for this goal.
`
  });

  return result.object;
}

function buildFallbackBreakdown({
  title,
  reason,
  timeline,
  outcome
}: Omit<GoalBreakdownInput, "apiKey">) {
  const focusWord = title.split(" ").slice(0, 3).join(" ");
  return {
    titleRefinement: title,
    planningNotes: `This fallback plan is anchored on ${focusWord}. It turns the emotional pull of "${reason}" into repeatable weekly proof within ${timeline}, aimed at ${outcome}.`,
    tasks: [
      { description: `Review the week's ${focusWord.toLowerCase()} priority`, cadence: "daily" as const, rationale: "Keeps attention locked on the goal." },
      { description: `Complete one focused work block for ${focusWord.toLowerCase()}`, cadence: "daily" as const, rationale: "Creates steady progress without requiring perfect days." },
      { description: `Log a visible win connected to ${focusWord.toLowerCase()}`, cadence: "daily" as const, rationale: "Turns progress into motivation." },
      { description: `Plan next week's milestone for ${focusWord.toLowerCase()}`, cadence: "weekly" as const, rationale: "Maintains strategic direction." },
      { description: `Remove one friction point slowing this goal`, cadence: "weekly" as const, rationale: "Improves consistency by redesigning the environment." },
      { description: `Measure progress against the desired outcome`, cadence: "weekly" as const, rationale: "Ensures the system stays tied to results." },
      { description: `Reflect on why this goal matters right now`, cadence: "weekly" as const, rationale: "Reconnects action with meaning." },
      { description: `Close one meaningful task that advances the final outcome`, cadence: "weekly" as const, rationale: "Balances repetition with forward movement." }
    ]
  };
}
