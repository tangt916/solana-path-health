import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  to?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  size?: "default" | "lg";
};

export const PrimaryCTA = ({
  to = "/quiz",
  children = "Find My Protocol",
  className,
  onClick,
  size = "default",
}: Props) => (
  <Link
    to={to}
    onClick={onClick}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-medium tracking-tight transition-all hover:opacity-95 hover:-translate-y-0.5 shadow-[0_8px_24px_hsl(var(--primary)/0.18)]",
      size === "lg" ? "px-7 py-3.5 text-base" : "px-6 py-3 text-sm",
      className
    )}
  >
    {children}
    <ArrowRight className="h-4 w-4" />
  </Link>
);
