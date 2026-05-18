import { ClipboardList, Video, Package, MessageCircle } from "lucide-react";
import { PrimaryCTA } from "./shared/PrimaryCTA";
import { FadeInOnScroll } from "./shared/FadeInOnScroll";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Tell us about yourself",
    body:
      "Answer a few questions about your health, goals, and what you've already tried. No blood tests, no office visits required to get started.",
  },
  {
    icon: Video,
    title: "Meet your provider",
    body:
      "A licensed clinician reviews your intake and meets with you via video. They'll build a plan around your specific biology — usually within 24 hours.",
  },
  {
    icon: Package,
    title: "Your protocol, delivered",
    body:
      "If prescribed, your medication ships from a licensed compounding pharmacy directly to your home. Discreet packaging, free shipping.",
  },
  {
    icon: MessageCircle,
    title: "Supported every step",
    body:
      "Monthly provider check-ins, dose adjustments as you progress, and a care team you can actually message.",
  },
];

export const HowItWorksV2 = () => (
  <section
    id="how-it-works"
    className="py-24 md:py-32"
    style={{ background: "hsl(var(--sage-bg))" }}
  >
    <div className="container">
      <FadeInOnScroll>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent mb-4">
            How it works
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-foreground font-normal">
            Simple steps. Real results.
          </h2>
        </div>
      </FadeInOnScroll>

      <div className="grid gap-8 md:grid-cols-4">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <FadeInOnScroll key={s.title} delay={i * 90}>
              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className="font-serif text-2xl text-accent">
                    0{i + 1}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary border border-border">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl text-foreground font-normal mb-2.5">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </FadeInOnScroll>
          );
        })}
      </div>

      <FadeInOnScroll delay={200}>
        <div className="mt-14 flex flex-col items-center gap-4">
          <PrimaryCTA size="lg">Take the Free Assessment</PrimaryCTA>
          <p className="text-xs text-muted-foreground max-w-xl text-center">
            All prescribing decisions are made solely by independent licensed
            healthcare providers. Approval and treatment options vary based on
            your individual health profile.
          </p>
        </div>
      </FadeInOnScroll>
    </div>
  </section>
);
