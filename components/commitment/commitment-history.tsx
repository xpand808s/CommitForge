"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CommitmentHistoryPoint } from "@/types/goal";

export function CommitmentHistory({ data }: { data: CommitmentHistoryPoint[] }) {
  return (
    <Card className="h-[320px]">
      <CardHeader>
        <CardTitle>Commitment History</CardTitle>
        <p className="text-sm text-muted-foreground">Daily forge temperature across the last two weeks.</p>
      </CardHeader>
      <CardContent className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
            <XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" />
            <YAxis stroke="rgba(255,255,255,0.4)" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                background: "#121923",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#79e6a7"
              strokeWidth={3}
              dot={{ fill: "#8cb8ff", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
