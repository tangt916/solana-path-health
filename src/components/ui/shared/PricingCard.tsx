import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  monthlyPrice: number;
  months: number;
  discountPercent?: number;
  totalPrice: number;
  originalTotal?: number;
  savings?: number;
  isSelected?: boolean;
  onSelect?: () => void;
  badge?: string;
  className?: string;
}

const formatPrice = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export const PricingCard = ({
  title,
  monthlyPrice,
  months,
  discountPercent,
  totalPrice,
  originalTotal,
  savings,
  isSelected,
  onSelect,
  badge,
  className,
}: PricingCardProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        "relative w-full text-left bg-card border rounded-lg p-5 transition-all hover:border-primary/60",
        isSelected
          ? "border-primary ring-2 ring-primary/20 shadow-sm"
          : "border-border",
        className
      )}
    >
      {badge && (
        <span className="absolute -top-2.5 left-4 bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 rounded-sm">
          {badge}
        </span>
      )}

      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-serif text-lg text-foreground">{title}</h3>
        {discountPercent ? (
          <span className="text-xs font-medium text-success">
            Save {discountPercent}%
          </span>
        ) : null}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="font-serif text-3xl text-foreground">
          {formatPrice(monthlyPrice)}
        </span>
        <span className="text-sm text-muted-foreground">/mo</span>
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        {originalTotal && originalTotal > totalPrice && (
          <span className="line-through mr-2">{formatPrice(originalTotal)}</span>
        )}
        <span className="text-foreground font-medium">
          {formatPrice(totalPrice)}
        </span>{" "}
        total · {months} {months === 1 ? "month" : "months"}
      </div>

      {savings && savings > 0 && (
        <div className="mt-1 text-xs text-success font-medium">
          You save {formatPrice(savings)}
        </div>
      )}
    </button>
  );
};
