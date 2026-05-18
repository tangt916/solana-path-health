import { Link } from "react-router-dom";
import { ArrowRight, Activity, Sparkles, Atom } from "lucide-react";
import { FadeInOnScroll } from "./shared/FadeInOnScroll";

const CARDS = [
  {
    icon: Activity,
    eyebrow: "Metabolic & Weight Health",
    headline: "Your metabolism changed. Your approach should too.",
    body:
      "For women whose weight stopped responding to diet and exercise — not because of willpower, but because of biology. Provider-guided metabolic programs, including GLP-1 therapy if appropriate, paired with nutrition and habit coaching.",
    features: [
      "Compounded semaglutide or tirzepatide, if prescribed",
      "Monthly provider check-ins included",
      "Nutrition + habit coaching — not just a prescription",
    ],
    to: "/treatments/weight-loss",
  },
  {
    icon: Sparkles,
    eyebrow: "Hormone Health",
    headline: "Hot flashes, mood swings, can't sleep — this isn't just stress.",
    body:
      "Hormonal shifts are behind more symptoms than most women realize: fatigue, weight gain, mood changes, poor sleep. Personalized bioidentical hormone therapy, adjusted to your symptoms and your stage.",
    features: [
      "Bioidentical estrogen, progesterone, testosterone (when indicated)",
      "Symptom-tracked dosing, adjusted over time",
      "Provider check-ins for safety and fine-tuning",
    ],
    to: "/treatments/hormone-therapy",
  },
  {
    icon: Atom,
    eyebrow: "NAD+ & Peptides",
    headline: "Cellular energy is the thing nobody talks about — until it's gone.",
    body:
      "NAD+ is the molecule your cells use for energy production, DNA repair, and metabolism. It declines by up to 50% between 40 and 60. Restoring it changes how you feel at the cellular level — not just on the surface.",
    features: [
      "NAD+ injections or oral protocols",
      "Peptide protocols for recovery, cellular health, and longevity",
      "Provider-guided, tracked, and adjusted over time",
    ],
    to: "/peptides",
  },
];

export const WhatWeTreatV2 = () => (
  <section id="treatments" className="py-24 md:py-32 bg-background">
    <div className="container">
      <FadeInOnScroll>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent mb-4">
            What we treat
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-foreground font-normal">
            One platform. Every piece of the puzzle.
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
            Most wellness programs address one symptom and ignore the rest.
            Solana looks at the full picture — because your energy, weight,
            hormones, and longevity are all connected.
          </p>
        </div>
      </FadeInOnScroll>

      <div className="grid gap-6 md:grid-cols-3">
        {CARDS.map((c, i) => {
          const Icon = c.icon;
          return (
            <FadeInOnScroll key={c.eyebrow} delay={i * 100}>
              <Link
                to={c.to}
                className="group flex h-full flex-col rounded-2xl bg-card border border-border p-8 transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_hsl(var(--primary)/0.10)]"
              >
                <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-medium mb-3">
                  {c.eyebrow}
                </p>
                <h3 className="font-serif text-2xl leading-snug text-foreground font-normal">
                  {c.headline}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {c.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-foreground/85"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </FadeInOnScroll>
          );
        })}
      </div>
    </div>
  </section>
);
