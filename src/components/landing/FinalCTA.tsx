import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

export const FinalCTA = () => (
  <section className="py-20" style={{ background: 'hsl(var(--primary))' }}>
    <div className="container max-w-lg text-center">
      <h2 className="font-serif text-4xl leading-tight" style={{ fontWeight: 300, color: '#ffffff' }}>
        Ready to try something that
        <br />
        <em style={{ color: '#b8e070' }}>actually works?</em>
      </h2>
      <p className="mt-5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
        Join thousands of patients who finally found a solution that works with their biology, not against it.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4">
        <Link
          to="/get-started"
          onClick={() => trackEvent("quiz_started")}
          className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: '#a8d44a', color: '#0f1f12' }}
        >
          Start Losing Weight →
        </Link>
        <Link
          to="/support"
          className="text-xs underline-offset-4 hover:underline transition-opacity hover:opacity-90"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          Have questions? Talk to support
        </Link>
      </div>

      <p className="mt-6" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
        No prescription guaranteed. Results vary by individual.
      </p>
    </div>
  </section>
);
