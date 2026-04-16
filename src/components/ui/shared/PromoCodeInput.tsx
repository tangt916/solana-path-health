import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validatePromo } from "@/lib/api";
import { cn } from "@/lib/utils";

interface PromoCodeInputProps {
  onApply: (
    code: string,
    discountType: "percent" | "flat",
    discountValue: number
  ) => void;
  onRemove?: () => void;
  bundleId?: string;
  disabled?: boolean;
  className?: string;
}

export const PromoCodeInput = ({
  onApply,
  onRemove,
  bundleId,
  disabled,
  className,
}: PromoCodeInputProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState<{
    code: string;
    label: string;
  } | null>(null);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await validatePromo(code.trim(), bundleId);
      if (!result.valid || !result.discountType || !result.discountValue) {
        setError("Invalid or expired code");
        return;
      }
      const label =
        result.discountType === "percent"
          ? `${result.discountValue}% OFF applied!`
          : `$${result.discountValue} OFF applied!`;
      setApplied({ code: result.code, label });
      onApply(result.code, result.discountType, result.discountValue);
    } catch {
      setError("Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setApplied(null);
    setCode("");
    setError(null);
    onRemove?.();
  };

  if (applied) {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-3 bg-success/10 border border-success/30 rounded-md px-3 py-2",
          className
        )}
      >
        <div className="flex items-center gap-2 text-success text-sm font-medium">
          <Check className="w-4 h-4" />
          <span>{applied.label}</span>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          disabled={disabled}
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          <X className="w-3.5 h-3.5" /> Remove
        </button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleApply())}
          placeholder="Promo code"
          disabled={disabled || loading}
          aria-invalid={!!error}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleApply}
          disabled={disabled || loading || !code.trim()}
          variant="outline"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
