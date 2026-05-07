import { Link } from "react-router-dom";
import { RefreshCw, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  caseStatus: string | null | undefined;
}

export const QuickLinks = ({ caseStatus }: Props) => (
  <section className="grid gap-3 sm:grid-cols-2">
    <Button asChild variant="outline" className="h-auto py-4 justify-start">
      <Link to="/support">
        <UserCog className="w-4 h-4 mr-2" />
        Contact support
      </Link>
    </Button>
    {caseStatus?.toUpperCase() === "APPROVED" && (
      <Button asChild variant="outline" className="h-auto py-4 justify-start">
        <Link to="/support">
          <RefreshCw className="w-4 h-4 mr-2" />
          Request refill
        </Link>
      </Button>
    )}
  </section>
);
