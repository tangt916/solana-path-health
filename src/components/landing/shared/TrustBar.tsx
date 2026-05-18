import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const TrustBar = ({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) => (
  <ul
    className={cn(
      "flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground",
      className
    )}
  >
    {items.map((item) => (
      <li key={item} className="inline-flex items-center gap-2">
        <Check className="h-4 w-4 text-accent" strokeWidth={2.5} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
