import { Pill } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DashboardData } from "./types";

interface Props {
  prescriptions: DashboardData["prescriptions"];
  caseStatus: string | null | undefined;
}

export const PrescriptionsSection = ({ prescriptions, caseStatus }: Props) => {
  if (caseStatus?.toUpperCase() !== "APPROVED" || prescriptions.length === 0) return null;
  return (
    <section>
      <h2 className="font-serif text-xl mb-3">Your prescription</h2>
      <div className="grid gap-3">
        {prescriptions.map((rx) => (
          <Card key={rx.id} className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{rx.medication_name}</h3>
                {rx.dosage && (
                  <p className="text-sm text-muted-foreground">Dosage: {rx.dosage}</p>
                )}
                {rx.prescribing_provider && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Prescribed by {rx.prescribing_provider}
                  </p>
                )}
                <Badge variant="outline" className="mt-2 capitalize">
                  {rx.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
