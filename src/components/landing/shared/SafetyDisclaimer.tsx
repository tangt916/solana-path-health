import { cn } from "@/lib/utils";

export const SafetyDisclaimer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <p
    className={cn(
      "text-xs leading-relaxed text-muted-foreground/80 max-w-2xl",
      className
    )}
  >
    {children ??
      "Compounded drug products are not approved or evaluated for safety, effectiveness, or quality by the FDA. Prescription products require an online consultation with a healthcare provider who will determine if a prescription is appropriate. Results may vary."}
  </p>
);
