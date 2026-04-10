import { Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-10">
      <Card className="w-[620px] rounded-[32px]">
        <CardHeader>
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/50">
            <Sparkles className="h-4 w-4 text-[#79e6a7]" />
            Welcome back
          </div>
          <CardTitle className="text-4xl font-semibold tracking-[-0.04em] text-white">
            Enter the forge.
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Email address" />
          <Input placeholder="Your name for the demo credentials flow" />
          <Button className="w-full">Continue to CommitForge</Button>
        </CardContent>
      </Card>
    </div>
  );
}
