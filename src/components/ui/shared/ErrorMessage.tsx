import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  title: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  variant?: "inline" | "page";
  className?: string;
}

export const ErrorMessage = ({
  title,
  message,
  onRetry,
  retryLabel = "Try again",
  variant = "inline",
  className,
}: ErrorMessageProps) => {
  const content = (
    <div
      className={cn(
        "flex flex-col items-center text-center bg-card border border-border rounded-lg p-6 sm:p-8",
        variant === "page" && "max-w-md w-full shadow-sm",
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <XCircle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="font-serif text-2xl text-foreground mb-2">{title}</h3>
      {message && <p className="text-muted-foreground text-sm mb-4">{message}</p>}
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-2">
          {retryLabel}
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
