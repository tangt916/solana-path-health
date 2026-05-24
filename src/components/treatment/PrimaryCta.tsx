import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { FOREST, WARM_WHITE } from "./shared";

type Props = {
  to: string;
  treatment: string;
  label?: string;
};

export const PrimaryCta = ({ to, treatment, label = "Take the Free Assessment →" }: Props) => (
  <Link
    to={to}
    onClick={() => trackEvent("quiz_started", { treatment })}
    className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
    style={{ background: FOREST, color: WARM_WHITE }}
  >
    {label}
  </Link>
);
