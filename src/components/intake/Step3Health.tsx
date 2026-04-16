import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

export const Step3Health = ({ onBack, onNext }: Props) => {
  const { state, updateHealth } = useIntakeForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleCondition = (c: string) => {
    const has = state.healthInfo.conditions.includes(c);
    let next: string[];
    if (c === "None of the above") {
      next = has ? [] : ["None of the above"];
    } else {
      next = has
        ? state.healthInfo.conditions.filter((x) => x !== c)
        : [...state.healthInfo.conditions.filter((x) => x !== "None of the above"), c];
    }
    updateHealth({ conditions: next });
  };

  const handleNext = () => {
    const errs: Record<string, string> = {};
    const w = parseFloat(state.healthInfo.weightLbs);
    if (!w || w < 50 || w > 800) errs.weightLbs = "Enter a valid weight (50–800 lbs)";
    if (!state.healthInfo.heightFeet) errs.heightFeet = "Required";
    if (state.healthInfo.hasAllergies && !state.healthInfo.allergiesDetail.trim())
      errs.allergiesDetail = "Please list your allergies";
    if (state.healthInfo.hasMedications && !state.healthInfo.medicationsDetail.trim())
      errs.medicationsDetail = "Please list your medications";
    setErrors(errs);
    if (Object.keys(errs).length === 0) onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">Your health</h2>
        <p className="text-muted-foreground text-sm">Used by our medical team to personalize your plan.</p>
      </div>

      <div>
        <Label htmlFor="weigh">How much do you weigh? (lbs)</Label>
        <Input
          id="weigh"
          type="number"
          inputMode="decimal"
          value={state.healthInfo.weightLbs}
          onChange={(e) => updateHealth({ weightLbs: e.target.value })}
          placeholder="e.g. 210"
        />
        {errors.weightLbs && <p className="text-xs text-destructive mt-1">{errors.weightLbs}</p>}
      </div>

      <div>
        <Label>Height</Label>
        <div className="grid grid-cols-2 gap-3 mt-1">
          <Select
            value={state.healthInfo.heightFeet}
            onValueChange={(v) => updateHealth({ heightFeet: v })}
          >
            <SelectTrigger><SelectValue placeholder="Feet" /></SelectTrigger>
            <SelectContent>
              {[3, 4, 5, 6, 7].map((f) => (
                <SelectItem key={f} value={String(f)}>{f} ft</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={state.healthInfo.heightInches}
            onValueChange={(v) => updateHealth({ heightInches: v })}
          >
            <SelectTrigger><SelectValue placeholder="Inches" /></SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i).map((i) => (
                <SelectItem key={i} value={String(i)}>{i} in</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {errors.heightFeet && <p className="text-xs text-destructive mt-1">{errors.heightFeet}</p>}
      </div>

      <div>
        <Label>Known allergies?</Label>
        <div className="flex gap-2 mt-1">
          {[true, false].map((v) => (
            <Button
              key={String(v)}
              type="button"
              variant={state.healthInfo.hasAllergies === v ? "default" : "outline"}
              className="flex-1"
              onClick={() => updateHealth({ hasAllergies: v, allergiesDetail: v ? state.healthInfo.allergiesDetail : "" })}
            >
              {v ? "Yes" : "No"}
            </Button>
          ))}
        </div>
        {state.healthInfo.hasAllergies && (
          <div className="mt-2">
            <Textarea
              placeholder="Please list your allergies"
              value={state.healthInfo.allergiesDetail}
              onChange={(e) => updateHealth({ allergiesDetail: e.target.value })}
              maxLength={500}
            />
            {errors.allergiesDetail && <p className="text-xs text-destructive mt-1">{errors.allergiesDetail}</p>}
          </div>
        )}
      </div>

      <div>
        <Label>Currently taking any medications?</Label>
        <div className="flex gap-2 mt-1">
          {[true, false].map((v) => (
            <Button
              key={String(v)}
              type="button"
              variant={state.healthInfo.hasMedications === v ? "default" : "outline"}
              className="flex-1"
              onClick={() => updateHealth({ hasMedications: v, medicationsDetail: v ? state.healthInfo.medicationsDetail : "" })}
            >
              {v ? "Yes" : "No"}
            </Button>
          ))}
        </div>
        {state.healthInfo.hasMedications && (
          <div className="mt-2">
            <Textarea
              placeholder="Please list your current medications"
              value={state.healthInfo.medicationsDetail}
              onChange={(e) => updateHealth({ medicationsDetail: e.target.value })}
              maxLength={500}
            />
            {errors.medicationsDetail && <p className="text-xs text-destructive mt-1">{errors.medicationsDetail}</p>}
          </div>
        )}
      </div>

      <div>
        <Label>Health conditions (select all that apply)</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {CONDITIONS.map((c) => {
            const selected = state.healthInfo.conditions.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCondition(c)}
                className={cn(
                  "px-3 py-1.5 rounded-full border text-sm transition-colors",
                  selected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground hover:border-primary/60"
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} className="flex-1">Continue</Button>
      </div>
    </div>
  );
};
