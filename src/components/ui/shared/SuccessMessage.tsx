import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SuccessMessageProps {
  title: string;
  message?: string;
  ctaLabel?: string;
  onCta?: () => void;
  variant?: "inline" | "page";
  className?: string;
}

export const SuccessMessage = ({
  title,
  message,
  ctaLabel,
  onCta,
  variant = "inline",
  className,
}: SuccessMessageProps) => {
  const content = (
    <div
      className={cn(
        "flex flex-col items-center text-center bg-card border border-border rounded-lg p-6 sm:p-8",
        variant === "page" && "max-w-md w-full shadow-sm",
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-4">
        <CheckCircle2 className="w-8 h-8 text-success" />
      </div>
      <h3 className="font-serif text-2xl text-foreground mb-2">{title}</h3>
      {message && <p className="text-muted-foreground text-sm mb-4">{message}</p>}
      {ctaLabel && onCta && (
        <Button onClick={onCta} className="mt-2">
          {ctaLabel}
        </Button>
      )}
    </div>
  );

  if (variant === "page") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        {content}
      </div>
    );
  }

  return content;
};
