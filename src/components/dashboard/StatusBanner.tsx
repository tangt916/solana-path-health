import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STATUS_BANNER, type DashboardData } from "./types";

interface Props {
  caseRow: DashboardData["caseRow"];
}

export const StatusBanner = ({ caseRow }: Props) => {
  if (!caseRow) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">
          No case found yet. Once you complete checkout, your case will appear here.
        </p>
        <Button asChild className="mt-4">
          <Link to="/get-started">Start your intake</Link>
        </Button>
      </Card>
    );
  }

  const status = (caseRow.status ?? "OPEN").toUpperCase();
  const banner = STATUS_BANNER[status] ?? STATUS_BANNER.OPEN;

  return (
    <Card className={`p-5 border ${banner.tone}`}>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-wide opacity-80">Case status</p>
          <h2 className="font-serif text-xl mt-0.5">{banner.label}</h2>
          <p className="text-sm mt-1 opacity-90">{banner.description}</p>
        </div>
        {status === "REJECTED" && (
          <Button asChild variant="outline" size="sm">
            <Link to="/support">Contact support</Link>
          </Button>
        )}
      </div>
    </Card>
  );
};
