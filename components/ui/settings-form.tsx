"use client";

import { useTransition } from "react";
import { LoaderCircle, MoonStar, SunMedium } from "lucide-react";

import { updateSettingsAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type SettingsFormProps = {
  openAiApiKey?: string | null;
  preferredTheme?: string | null;
  weightedMode?: boolean;
};

const themes = ["dark", "light", "system"] as const;

export function SettingsForm({
  openAiApiKey,
  preferredTheme = "dark",
  weightedMode = false
}: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="space-y-5"
      action={(formData) =>
        startTransition(async () => {
          await updateSettingsAction({
            openAiApiKey: String(formData.get("openAiApiKey") ?? ""),
            preferredTheme: String(formData.get("preferredTheme") ?? "dark") as
              | "dark"
              | "light"
              | "system",
            weightedMode: formData.get("weightedMode") === "on"
          });
        })
      }
    >
      <div className="space-y-2">
        <Label htmlFor="openAiApiKey">Personal OpenAI API key</Label>
        <Input
          id="openAiApiKey"
          name="openAiApiKey"
          placeholder="sk-..."
          defaultValue={openAiApiKey ?? ""}
        />
        <p className="text-sm leading-6 text-white/50">
          When present, goal breakdowns use this key instead of the server default.
        </p>
      </div>

      <div className="space-y-3">
        <Label>Theme</Label>
        <div className="flex gap-3">
          {themes.map((theme) => (
            <label
              key={theme}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm capitalize transition-all",
                preferredTheme === theme
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/55"
              )}
            >
              <input
                type="radio"
                name="preferredTheme"
                value={theme}
                defaultChecked={preferredTheme === theme}
                className="sr-only"
              />
              {theme === "light" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
              {theme}
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div>
          <p className="text-sm font-medium text-white">Weighted commitment mode</p>
          <p className="mt-1 text-sm text-white/50">
            Optional alternative: weight the main bar by task volume instead of equal goal lanes.
          </p>
        </div>
        <Switch name="weightedMode" defaultChecked={weightedMode} />
      </label>

      <Button type="submit">
        {isPending ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save settings"
        )}
      </Button>
    </form>
  );
}
