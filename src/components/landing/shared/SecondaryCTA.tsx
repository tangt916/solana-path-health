import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Props = {
  to?: string;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "lg";
};

export const SecondaryCTA = ({ to = "/quiz", children, className, size = "default" }: Props) => (
  <Link
    to={to}
    className={cn(
      "inline-flex items-center justify-center rounded-full border border-primary/30 text-primary font-medium tracking-tight transition-colors hover:bg-primary/5",
      size === "lg" ? "px-7 py-3.5 text-base" : "px-6 py-3 text-sm",
      className
    )}
  >
    {children}
  </Link>
);
