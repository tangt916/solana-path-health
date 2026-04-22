import { useState } from "react";
import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const CONDITIONS = [
  "Type 2 Diabetes",
  "High Blood Pressure",
  "Heart Disease",
  "High Cholesterol",
  "Sleep Apnea",
  "None of the above",
];

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export const Step2Health = ({ onBack, onNext }: Props) => {
  const { state, updateHealth } = useIntakeForm();
  const h = state.healthInfo;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleCondition = (c: string) => {
    if (c === "None of the above") {
      updateHealth({ conditions: h.conditions.includes(c) ? [] : [c] });
      return;
    }
    const without = h.conditions.filter((x) => x !== "None of the above");
    updateHealth({
      conditions: without.includes(c)
        ? without.filter((x) => x !== c)
        : [...without, c],
    });
  };

  const handleNext = () => {
    const e: Record<string, string> = {};
    const w = parseInt(h.weightLbs);
    if (!h.weightLbs || isNaN(w) || w < 50 || w > 800) {
      e.weightLbs = "Please enter a valid weight (50–800 lbs)";
    }
    if (!h.heightFeet) e.heightFeet = "Please select your height";
    if (h.hasAllergies && !h.allergiesDetail.trim()) {
      e.allergiesDetail = "Please list your allergies";
    }
    if (h.hasMedications && !h.medicationsDetail.trim()) {
      e.medicationsDetail = "Please list your medications";
    }
    if (h.triedGLP1 && !h.triedGLP1Detail.trim()) {
      e.triedGLP1Detail = "Please tell us which ones";
    }
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">Your health</h2>
        <p className="text-muted-foreground text-sm">
          Helps the provider build the right plan for you.
        </p>
      </div>

      {/* Weight */}
      <div className="space-y-1.5">
        <Label htmlFor="weight">How much do you currently weigh? (lbs)</Label>
        <Input
          id="weight"
          type="number"
          inputMode="numeric"
          value={h.weightLbs}
          onChange={(e) => updateHealth({ weightLbs: e.target.value })}
          aria-invalid={!!errors.weightLbs}
          placeholder="e.g. 210"
        />
        {errors.weightLbs && (
          <p className="text-xs text-destructive mt-1">{errors.weightLbs}</p>
        )}
      </div>

      {/* Height */}
      <div className="space-y-1.5">
        <Label>Height</Label>
        <div className="grid grid-cols-2 gap-3">
          <Select
            value={h.heightFeet || undefined}
            onValueChange={(v) => updateHealth({ heightFeet: v })}
          >
            <SelectTrigger aria-invalid={!!errors.heightFeet}>
              <SelectValue placeholder="Feet" />
            </SelectTrigger>
            <SelectContent>
              {[4, 5, 6, 7].map((ft) => (
                <SelectItem key={ft} value={String(ft)}>
                  {ft} ft
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={h.heightInches || undefined}
            onValueChange={(v) => updateHealth({ heightInches: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Inches" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }).map((_, i) => (
                <SelectItem key={i} value={String(i)}>
                  {i} in
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {errors.heightFeet && (
          <p className="text-xs text-destructive mt-1">{errors.heightFeet}</p>
        )}
      </div>

      {/* Allergies */}
      <YesNo
        label="Do you have any known allergies?"
        value={h.hasAllergies}
        onChange={(v) => updateHealth({ hasAllergies: v })}
      />
      {h.hasAllergies && (
        <div className="space-y-1.5">
          <Label htmlFor="allergies">Please list your allergies</Label>
          <Textarea
            id="allergies"
            rows={2}
            value={h.allergiesDetail}
            onChange={(e) => updateHealth({ allergiesDetail: e.target.value })}
            aria-invalid={!!errors.allergiesDetail}
          />
          {errors.allergiesDetail && (
            <p className="text-xs text-destructive mt-1">{errors.allergiesDetail}</p>
          )}
        </div>
      )}

      {/* Medications */}
      <YesNo
        label="Are you currently taking any medications?"
        value={h.hasMedications}
        onChange={(v) => updateHealth({ hasMedications: v })}
      />
      {h.hasMedications && (
        <div className="space-y-1.5">
          <Label htmlFor="meds">List your medications</Label>
          <Textarea
            id="meds"
            rows={2}
            value={h.medicationsDetail}
            onChange={(e) => updateHealth({ medicationsDetail: e.target.value })}
            aria-invalid={!!errors.medicationsDetail}
          />
          {errors.medicationsDetail && (
            <p className="text-xs text-destructive mt-1">{errors.medicationsDetail}</p>
          )}
        </div>
      )}

      {/* Conditions */}
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

      {/* Tried GLP-1 before */}
      <YesNo
        label="Have you tried GLP-1 medications before?"
        value={h.triedGLP1}
        onChange={(v) => updateHealth({ triedGLP1: v })}
      />
      {h.triedGLP1 && (
        <div className="space-y-1.5">
          <Label htmlFor="glp1-detail">Which ones?</Label>
          <Input
            id="glp1-detail"
            value={h.triedGLP1Detail}
            onChange={(e) => updateHealth({ triedGLP1Detail: e.target.value })}
            placeholder="e.g. Ozempic, Wegovy"
            aria-invalid={!!errors.triedGLP1Detail}
          />
          {errors.triedGLP1Detail && (
            <p className="text-xs text-destructive mt-1">{errors.triedGLP1Detail}</p>
          )}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
};

const YesNo = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div className="space-y-1.5">
    <Label>{label}</Label>
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChange(true)}
        aria-pressed={value === true}
        className={cn(
          "flex-1 h-11 rounded-xl border text-sm font-medium transition-all duration-200",
          value === true
            ? "bg-primary text-primary-foreground border-primary shadow-sm"
            : "bg-white border-border/60 text-muted-foreground hover:border-primary/40",
        )}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        aria-pressed={value === false}
        className={cn(
          "flex-1 h-11 rounded-xl border text-sm font-medium transition-all duration-200",
          value === false
            ? "bg-primary text-primary-foreground border-primary shadow-sm"
            : "bg-white border-border/60 text-muted-foreground hover:border-primary/40",
        )}
      >
        No
      </button>
    </div>
  </div>
);
