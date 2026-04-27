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

const US_STATES: Array<{ code: string; name: string }> = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" }, { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
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
    const gw = parseInt(h.goalWeight);
    if (!h.goalWeight || isNaN(gw) || gw < 50 || gw > 800) {
      e.goalWeight = "Please enter a valid goal weight (50–800 lbs)";
    }
    if (!h.heightFeet) e.heightFeet = "Please select your height";
    if (!h.state) e.state = "Please select your state";
    if (h.hasAllergies && !h.allergiesDetail.trim()) {
      e.allergiesDetail = "Please list your allergies";
    }
    if (h.hasMedications && !h.medicationsDetail.trim()) {
      e.medicationsDetail = "Please list your medications";
    }
    if (h.triedGLP1 && !h.triedGLP1Detail.trim()) {
      e.triedGLP1Detail = "Please tell us which ones";
    }
    if (h.hasInsurance && !h.insuranceProvider.trim()) {
      e.insuranceProvider = "Please enter your insurance provider";
    }
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">Your health</h2>
        <p className="text-muted-foreground text-sm">
          Helps your provider build the right plan for you.
        </p>
      </div>

      {/* State */}
      <div className="space-y-1.5">
        <Label htmlFor="state">What state do you live in?</Label>
        <Select
          value={h.state || undefined}
          onValueChange={(v) => updateHealth({ state: v })}
        >
          <SelectTrigger id="state" aria-invalid={!!errors.state}>
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent>
            {US_STATES.map((s) => (
              <SelectItem key={s.code} value={s.code}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.state && (
          <p className="text-xs text-destructive mt-1">{errors.state}</p>
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

      {/* Current weight */}
      <div className="space-y-1.5">
        <Label htmlFor="weight">Current weight (lbs)</Label>
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

      {/* Goal weight */}
      <div className="space-y-1.5">
        <Label htmlFor="goalWeight">Goal weight (lbs)</Label>
        <Input
          id="goalWeight"
          type="number"
          inputMode="numeric"
          value={h.goalWeight}
          onChange={(e) => updateHealth({ goalWeight: e.target.value })}
          aria-invalid={!!errors.goalWeight}
          placeholder="e.g. 175"
        />
        {errors.goalWeight && (
          <p className="text-xs text-destructive mt-1">{errors.goalWeight}</p>
        )}
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

      {/* Pregnancy / contraindications */}
      <YesNo
        label="Are you currently pregnant, breastfeeding, or planning pregnancy in the next year?"
        value={h.isPregnantOrPlanning}
        onChange={(v) => updateHealth({ isPregnantOrPlanning: v })}
      />

      {/* Insurance */}
      <YesNo
        label="Do you have health insurance you'd like us to consider?"
        value={h.hasInsurance}
        onChange={(v) => updateHealth({ hasInsurance: v })}
      />
      {h.hasInsurance && (
        <div className="space-y-1.5">
          <Label htmlFor="insurance">Insurance provider</Label>
          <Input
            id="insurance"
            value={h.insuranceProvider}
            onChange={(e) => updateHealth({ insuranceProvider: e.target.value })}
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
