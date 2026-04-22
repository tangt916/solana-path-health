import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  className?: string;
}

export const StepIndicator = ({
  currentStep,
  totalSteps,
  labels = [],
  className,
}: StepIndicatorProps) => {
  const progressPct = Math.max(
    0,
    Math.min(100, ((currentStep - 1) / Math.max(1, totalSteps - 1)) * 100),
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Step dots + labels */}
      <div className="mt-4 flex items-start justify-between">
        {labels.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-300",
                  isCompleted && "bg-primary border-primary text-primary-foreground shadow-sm",
                  isCurrent &&
                    "bg-white border-primary text-primary ring-2 ring-primary/20 shadow-sm",
                  !isCompleted && !isCurrent &&
                    "bg-white border-border/60 text-muted-foreground",
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              <span
                className={cn(
                  "text-xs text-center max-w-[80px] transition-colors",
                  isCurrent
                    ? "text-foreground font-medium"
                    : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
