import { ShieldCheck, Stethoscope, BadgeCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgesProps {
  className?: string;
}

const badges = [
  { icon: ShieldCheck, label: "HIPAA Compliant" },
  { icon: Stethoscope, label: "Licensed US Providers" },
  { icon: BadgeCheck, label: "FDA-Approved Medications" },
  { icon: Star, label: "4.9★ Rating" },
];

export const TrustBadges = ({ className }: TrustBadgesProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
        className
      )}
    >
      {badges.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2 bg-card border border-border rounded-md px-3 py-2.5"
        >
          <Icon className="w-4 h-4 text-primary shrink-0" />
          <span className="text-xs sm:text-sm text-foreground font-medium leading-tight">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};
