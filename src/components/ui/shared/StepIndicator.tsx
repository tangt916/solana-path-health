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
  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors border",
                    isCompleted &&
                      "bg-primary border-primary text-primary-foreground",
                    isActive &&
                      "bg-card border-primary text-primary ring-2 ring-primary/20",
                    !isCompleted &&
                      !isActive &&
                      "bg-card border-border text-muted-foreground"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{stepNum}</span>
                  )}
                </div>
                {labels[i] && (
                  <span
                    className={cn(
                      "mt-2 text-xs text-center max-w-[80px]",
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {labels[i]}
                  </span>
                )}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={cn(
                    "flex-1 h-px mx-2 transition-colors",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
