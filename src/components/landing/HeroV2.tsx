import { PrimaryCTA } from "./shared/PrimaryCTA";
import { SecondaryCTA } from "./shared/SecondaryCTA";
import { TrustBar } from "./shared/TrustBar";
import { SafetyDisclaimer } from "./shared/SafetyDisclaimer";
import { FadeInOnScroll } from "./shared/FadeInOnScroll";

export const HeroV2 = () => (
  <section className="relative overflow-hidden bg-background">
    {/* Soft sage shape */}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full opacity-60"
      style={{
        background:
          "radial-gradient(closest-side, hsl(var(--sage-bg)) 0%, transparent 70%)",
      }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full opacity-50"
      style={{
        background:
          "radial-gradient(closest-side, hsl(var(--accent) / 0.18) 0%, transparent 70%)",
      }}
    />

    <div className="container relative pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="max-w-3xl mx-auto text-center">
        <FadeInOnScroll>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05] tracking-tight text-foreground font-normal">
            You shouldn&apos;t have to
            <br />
            <em className="not-italic text-primary">feel this way.</em>
          </h1>
        </FadeInOnScroll>

        <FadeInOnScroll delay={120}>
          <p className="mt-7 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            The exhaustion, weight gain, and mental fog most women accept as
            &ldquo;just getting older&rdquo; are treatable. Solana pairs you
            with a licensed provider who looks at your whole biology — and
            builds a protocol actually designed for you.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={220}>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <PrimaryCTA size="lg">Take the Free Assessment</PrimaryCTA>
            <a
              href="#treatments"
              className="inline-flex items-center justify-center rounded-full border border-primary/30 text-primary font-medium tracking-tight transition-colors hover:bg-primary/5 px-7 py-3.5 text-base"
            >
              Explore Treatments
            </a>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={320}>
          <TrustBar
            className="mt-8"
            items={[
              "Licensed US providers",
              "Free consultation",
              "Delivered to your door",
            ]}
          />
        </FadeInOnScroll>

        <FadeInOnScroll delay={400}>
          <div className="mt-8 mx-auto">
            <SafetyDisclaimer className="mx-auto text-center" />
          </div>
        </FadeInOnScroll>
      </div>
    </div>
  </section>
);
