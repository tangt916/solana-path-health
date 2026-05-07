import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CONDITIONS } from "./health-data";
import { YesNo } from "./YesNo";

type HealthState = {
  triedGLP1: boolean;
  triedGLP1Detail: string;
  hasMedications: boolean;
  medicationsDetail: string;
  hasAllergies: boolean;
  allergiesDetail: string;
  conditions: string[];
  isPregnantOrPlanning: boolean;
  hasInsurance: boolean;
  insuranceProvider: string;
};

interface Props {
  h: HealthState;
  errors: Record<string, string>;
  update: (patch: Partial<HealthState>) => void;
}

export const MedicalHistoryFields = ({ h, errors, update }: Props) => {
  const toggleCondition = (c: string) => {
    if (c === "None of the above") {
      update({ conditions: h.conditions.includes(c) ? [] : [c] });
      return;
    }
    const without = h.conditions.filter((x) => x !== "None of the above");
    update({
      conditions: without.includes(c)
        ? without.filter((x) => x !== c)
        : [...without, c],
    });
  };

  return (
    <>
      <YesNo
        label="Have you tried GLP-1 medications before?"
        value={h.triedGLP1}
        onChange={(v) => update({ triedGLP1: v })}
      />
      {h.triedGLP1 && (
        <div className="space-y-1.5">
          <Label htmlFor="glp1-detail">Which ones?</Label>
          <Input
            id="glp1-detail"
            value={h.triedGLP1Detail}
            onChange={(e) => update({ triedGLP1Detail: e.target.value })}
            placeholder="e.g. Ozempic, Wegovy"
            aria-invalid={!!errors.triedGLP1Detail}
          />
          {errors.triedGLP1Detail && (
            <p className="text-xs text-destructive mt-1">{errors.triedGLP1Detail}</p>
          )}
        </div>
      )}

      <YesNo
        label="Are you currently taking any medications?"
        value={h.hasMedications}
        onChange={(v) => update({ hasMedications: v })}
      />
      {h.hasMedications && (
        <div className="space-y-1.5">
          <Label htmlFor="meds">List your medications</Label>
          <Textarea
            id="meds" rows={2} value={h.medicationsDetail}
            onChange={(e) => update({ medicationsDetail: e.target.value })}
            aria-invalid={!!errors.medicationsDetail}
          />
          {errors.medicationsDetail && (
            <p className="text-xs text-destructive mt-1">{errors.medicationsDetail}</p>
          )}
        </div>
      )}

      <YesNo
        label="Do you have any known allergies?"
        value={h.hasAllergies}
        onChange={(v) => update({ hasAllergies: v })}
      />
      {h.hasAllergies && (
        <div className="space-y-1.5">
          <Label htmlFor="allergies">Please list your allergies</Label>
          <Textarea
            id="allergies" rows={2} value={h.allergiesDetail}
            onChange={(e) => update({ allergiesDetail: e.target.value })}
            aria-invalid={!!errors.allergiesDetail}
          />
          {errors.allergiesDetail && (
            <p className="text-xs text-destructive mt-1">{errors.allergiesDetail}</p>
          )}
        </div>
      )}

      <div className="space-y-1.5">
        <Label>Do you have any of the following conditions?</Label>
        <div className="flex flex-wrap gap-2">
          {CONDITIONS.map((c) => {
            const selected = h.conditions.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCondition(c)}
                aria-pressed={selected}
                className={cn(
                  "px-4 py-2.5 rounded-xl border text-sm transition-all duration-200",
                  selected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm font-medium"
                    : "bg-white border-border/60 text-foreground/70 hover:border-primary/40 hover:text-foreground",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <YesNo
        label="Are you currently pregnant, breastfeeding, or planning pregnancy in the next year?"
        value={h.isPregnantOrPlanning}
        onChange={(v) => update({ isPregnantOrPlanning: v })}
      />

      <YesNo
        label="Do you have health insurance you'd like us to consider?"
        value={h.hasInsurance}
        onChange={(v) => update({ hasInsurance: v })}
      />
      {h.hasInsurance && (
        <div className="space-y-1.5">
          <Label htmlFor="insurance">Insurance provider</Label>
          <Input
            id="insurance"
            value={h.insuranceProvider}
            onChange={(e) => update({ insuranceProvider: e.target.value })}
            placeholder="e.g. Blue Cross Blue Shield"
            aria-invalid={!!errors.insuranceProvider}
          />
          <p className="text-xs text-muted-foreground">
            Insurance is not required — most members choose self-pay for faster access.
          </p>
          {errors.insuranceProvider && (
            <p className="text-xs text-destructive mt-1">{errors.insuranceProvider}</p>
          )}
        </div>
      )}
    </>
  );
};
