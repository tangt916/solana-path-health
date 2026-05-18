import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { FadeInOnScroll } from "./shared/FadeInOnScroll";

declare global {
  interface Window {
    klaviyo?: { push: (args: unknown[]) => void } & Record<string, unknown>;
  }
}

export const LeadMagnet = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return;
    try {
      window.klaviyo?.push(["identify", { email, $source: "homepage_lead_magnet" }]);
    } catch {}
    trackEvent("lead_magnet_submit", { email });
    setSubmitted(true);
  };

  return (
    <section
      className="py-24 md:py-28"
      style={{ background: "hsl(var(--sage-bg))" }}
    >
      <div className="container max-w-3xl text-center">
        <FadeInOnScroll>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent mb-4">
            Free guide
          </p>
          <h2 className="font-serif text-3xl md:text-4xl leading-[1.15] text-foreground font-normal">
            Not sure where to start?
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
            Download the free guide:{" "}
            <em className="not-italic text-foreground">
              &ldquo;Why You&apos;re Exhausted, Why the Weight Won&apos;t Move,
              and What Actually Works&rdquo;
            </em>{" "}
            — written by the Solana clinical team.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={120}>
          {submitted ? (
            <div className="mt-8 rounded-full bg-background border border-border px-6 py-4 inline-flex items-center gap-3 text-sm text-foreground">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                ✓
              </span>
              Check your inbox — your guide is on the way.
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-8 mx-auto flex flex-col sm:flex-row gap-2 max-w-xl"
            >
              <label htmlFor="lead-email" className="sr-only">
                Your email address
              </label>
              <input
                id="lead-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 rounded-full bg-background border border-border px-5 py-3.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:opacity-95 transition-opacity"
              >
                Send me the guide
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            No spam. One email with the guide, then occasional updates you can
            unsubscribe from anytime.
          </p>
        </FadeInOnScroll>
      </div>
    </section>
  );
};
