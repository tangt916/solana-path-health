import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export const PageShell = ({
  title,
  subtitle,
  showBack,
  onBack,
  children,
  className,
  headerAction,
}: PageShellProps) => {
  return (
    <div className={cn("max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12", className)}>
      <header className="mb-6 sm:mb-8">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
