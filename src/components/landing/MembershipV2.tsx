import { Check } from "lucide-react";
import { PrimaryCTA } from "./shared/PrimaryCTA";
import { FadeInOnScroll } from "./shared/FadeInOnScroll";

const INCLUDED = [
  "Free initial consultation with a licensed provider",
  "Medication delivered monthly (if prescribed)",
  "Ongoing provider check-ins and dose adjustments",
  "Dedicated care coordinator — message anytime",
  "Nutrition and habit coaching",
  "Treatment dashboard to track your progress",
];

export const MembershipV2 = () => (
  <section id="pricing" className="py-24 md:py-32 bg-background">
    <div className="container">
      <div className="grid gap-12 md:gap-16 md:grid-cols-2 items-center">
        <FadeInOnScroll>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent mb-4">
              Membership
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-foreground font-normal">
              More than a prescription. A complete program.
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
              Most telehealth clinics hand you a prescription and disappear.
              Solana stays with you.
            </p>
            <ul className="mt-8 space-y-3.5">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm md:text-base text-foreground/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={120}>
          <div
            className="rounded-3xl p-10 md:p-12 border border-border"
            style={{
              background:
                "linear-gradient(160deg, hsl(var(--sage-bg)) 0%, hsl(var(--background)) 100%)",
            }}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-accent mb-5">
              Membership pricing
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">From</span>
              <span className="font-serif text-6xl text-primary font-normal">
                $297
              </span>
              <span className="text-sm text-muted-foreground">/ month</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Cancel anytime. No long-term contracts.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <PrimaryCTA size="lg" className="w-full">
                Find My Protocol
              </PrimaryCTA>
              <a
                href="#treatments"
                className="text-center text-sm text-primary underline-offset-4 hover:underline"
              >
                See full pricing →
              </a>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground/80">
              Final pricing depends on the protocol your provider recommends.
              Medication costs are included in monthly membership when
              prescribed.
            </p>
          </div>
        </FadeInOnScroll>
      </div>
    </div>
  </section>
);
