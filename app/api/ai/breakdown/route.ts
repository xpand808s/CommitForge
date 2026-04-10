import { NextResponse } from "next/server";

import { generateGoalBreakdown } from "@/lib/ai/goal-breakdown";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await generateGoalBreakdown(body);
  return NextResponse.json(result);
}
