import { useState } from "react";
import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PROBLEM_OPTIONS } from "./problems-data";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export const Step0Problems = ({ onBack, onNext }: Props) => {
  const { state, setProblems } = useIntakeForm();
  const [error, setError] = useState<string | null>(null);

  const toggle = (slug: string) => {
    const cur = state.problems;
    setProblems(cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]);
  };

  const handleNext = () => {
    if (state.problems.length === 0) {
      setError("Pick at least one — even just the closest match.");
      return;
    }
    setError(null);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">
          What's going on?
        </h2>
        <p className="text-muted-foreground text-sm">
          Pick everything that resonates — we'll personalize the rest from here.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-2.5">
        {PROBLEM_OPTIONS.map((p) => {
          const sel = state.problems.includes(p.slug);
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => toggle(p.slug)}
              aria-pressed={sel}
              className={cn(
                "text-left p-4 rounded-xl border transition-all duration-200",
                sel
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                  : "bg-white border-border/60 hover:border-primary/40"
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl leading-none mt-0.5" aria-hidden>{p.emoji}</span>
                <div>
                  <p className={cn("text-sm", sel ? "font-medium text-foreground" : "text-foreground")}>
                    {p.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} className="flex-1">Continue</Button>
      </div>
    </div>
  );
};
