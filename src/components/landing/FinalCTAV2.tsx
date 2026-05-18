import { PrimaryCTA } from "./shared/PrimaryCTA";
import { TrustBar } from "./shared/TrustBar";
import { SafetyDisclaimer } from "./shared/SafetyDisclaimer";
import { FadeInOnScroll } from "./shared/FadeInOnScroll";

export const FinalCTAV2 = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container max-w-3xl text-center">
      <FadeInOnScroll>
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-foreground font-normal">
          Ready to find out what&apos;s <em className="not-italic text-primary">actually going on?</em>
        </h2>
        <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
          Take the free 60-second assessment. Your provider will do the rest.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={120}>
        <div className="mt-9 flex justify-center">
          <PrimaryCTA size="lg">Take the Free Assessment</PrimaryCTA>
        </div>
        <TrustBar
          className="mt-7"
          items={["Free consultation", "No commitment", "Results in 24 hours"]}
        />
        <div className="mt-8">
          <SafetyDisclaimer className="mx-auto text-center" />
        </div>
      </FadeInOnScroll>
    </div>
  </section>
);
