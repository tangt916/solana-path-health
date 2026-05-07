import { Gift } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DashboardData } from "./types";

interface Props {
  credits: DashboardData["credits"];
}

export const ReferralCreditsCard = ({ credits }: Props) => {
  if (credits.length === 0) return null;
  const total = credits.reduce((sum, c) => sum + (c.amount ?? 0), 0);
  return (
    <Card className="p-5 bg-gradient-to-br from-success/5 to-primary/5 border-success/30">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
          <Gift className="w-5 h-5 text-success" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">
            You have ${total.toFixed(0)} in referral credits
          </h3>
          {credits[0]?.expires_at && (
            <p className="text-sm text-muted-foreground">
              Expires {new Date(credits[0].expires_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};
