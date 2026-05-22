import { useState } from "react";
import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const AGE_RANGES = ["18-29", "30-39", "40-49", "50-59", "60+"];
const GENDERS = ["Female", "Male", "Non-binary", "Prefer not to say"];
const MOTIVATIONS = [
  "How I feel day-to-day",
  "How I look",
  "Confidence",
  "Energy & performance",
  "A specific medical concern",
  "Longevity & prevention",
];
const URGENCY = ["Ready to start now", "Within the next month", "Just exploring"];
const BUDGETS = ["Under $100/mo", "$100–200/mo", "$200+/mo", "Not sure yet"];

const ChipGroup = ({
  options,
  value,
  onChange,
  multiline = false,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) => (
  <div className={cn("flex flex-wrap gap-2", multiline && "flex-col sm:flex-row")}>
    {options.map((o) => {
      const sel = value === o;
      return (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          aria-pressed={sel}
          className={cn(
            "px-4 py-2.5 rounded-xl border text-sm transition-all duration-200",
            sel
              ? "bg-primary text-primary-foreground border-primary shadow-sm font-medium"
              : "bg-white border-border/60 text-foreground/70 hover:border-primary/40 hover:text-foreground"
          )}
        >
          {o}
        </button>
      );
    })}
  </div>
);

export const Step1Segmentation = ({ onBack, onNext }: Props) => {
  const { state, updateSegmentation } = useIntakeForm();
  const s = state.segmentation;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const e: Record<string, string> = {};
    if (!s.ageRange) e.ageRange = "Pick one";
    if (!s.gender) e.gender = "Pick one";
    if (!s.primaryMotivation) e.primaryMotivation = "Pick one";
    if (!s.urgency) e.urgency = "Pick one";
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">A little about you</h2>
        <p className="text-muted-foreground text-sm">
          So we can match you with the right care path and message.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label>Age range</Label>
        <ChipGroup options={AGE_RANGES} value={s.ageRange} onChange={(v) => updateSegmentation({ ageRange: v })} />
        {errors.ageRange && <p className="text-xs text-destructive">{errors.ageRange}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Gender</Label>
        <ChipGroup options={GENDERS} value={s.gender} onChange={(v) => updateSegmentation({ gender: v })} />
        {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>What matters most to you right now?</Label>
        <ChipGroup
          options={MOTIVATIONS}
          value={s.primaryMotivation}
          onChange={(v) => updateSegmentation({ primaryMotivation: v })}
          multiline
        />
        {errors.primaryMotivation && <p className="text-xs text-destructive">{errors.primaryMotivation}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>How soon do you want to start?</Label>
        <ChipGroup options={URGENCY} value={s.urgency} onChange={(v) => updateSegmentation({ urgency: v })} />
        {errors.urgency && <p className="text-xs text-destructive">{errors.urgency}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Budget you're comfortable with</Label>
        <ChipGroup options={BUDGETS} value={s.budgetComfort} onChange={(v) => updateSegmentation({ budgetComfort: v })} />
        <p className="text-xs text-muted-foreground">Optional — helps us recommend the right protocol.</p>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} className="flex-1">Continue</Button>
      </div>
    </div>
  );
};
