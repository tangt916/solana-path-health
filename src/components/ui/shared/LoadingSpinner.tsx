import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-10 h-10",
};

export const LoadingSpinner = ({
  label,
  size = "md",
  className,
}: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-6",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Loader2 className={cn("animate-spin text-primary", sizeMap[size])} />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
