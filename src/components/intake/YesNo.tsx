import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface YesNoProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

export const YesNo = ({ label, value, onChange }: YesNoProps) => (
  <div className="space-y-1.5">
    <Label>{label}</Label>
    <div className="flex gap-3">
      {[true, false].map((opt) => (
        <button
          key={String(opt)}
          type="button"
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={cn(
            "flex-1 h-11 rounded-xl border text-sm font-medium transition-all duration-200",
            value === opt
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-white border-border/60 text-muted-foreground hover:border-primary/40",
          )}
        >
          {opt ? "Yes" : "No"}
        </button>
      ))}
    </div>
  </div>
);
