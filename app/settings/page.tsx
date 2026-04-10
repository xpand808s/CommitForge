import { KeyRound, MoonStar } from "lucide-react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsForm } from "@/components/ui/settings-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardData } from "@/lib/actions";

export default async function SettingsPage() {
  const { user } = await getDashboardData();

  return (
    <DashboardLayout name={user.name} quickStat="Refine how the forge behaves">
      <div className="grid grid-cols-[0.95fr_1.05fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-[#79e6a7]" />
              AI settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SettingsForm
              openAiApiKey={user.settings?.openAiApiKey}
              preferredTheme={user.settings?.preferredTheme}
              weightedMode={user.settings?.weightedMode}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MoonStar className="h-5 w-5 text-[#d4b5ff]" />
              Commitment math
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-sm leading-7 text-white/65">
            <p>
              Default mode uses the cleanest interpretation of the product: each goal contributes equally to the main Commitment Bar, so with exactly five goals, each goal owns a clean 20% lane.
            </p>
            <p>
              Formula in production: main bar = average of all active goal mini-trackers.
            </p>
            <p>
              Optional weighted mode is included for experimentation. It calculates commitment by completed tasks divided by total tasks across all active goals. That can be useful later if goals vary wildly in task count, but it dilutes the elegance of the five-lane story, so it stays off by default.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
