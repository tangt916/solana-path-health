import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ClipboardList, Stethoscope, Truck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackEvent } from "@/lib/analytics";

/* ─── Hero ─── */
const HeroStatusCard = () => (
  <div className="animate-float relative z-10 border border-cream/20 bg-cream/10 backdrop-blur-sm rounded-[2px] px-6 py-5 w-64">
    <div className="flex items-center gap-3 mb-3">
      <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
      <span className="text-cream text-xs font-medium tracking-wide uppercase">Treatment Active</span>
    </div>
    <p className="text-cream/70 text-xs">Next refill ships in 12 days</p>
    <div className="mt-3 h-1.5 w-full bg-cream/10 rounded-full overflow-hidden">
      <div className="h-full w-3/4 bg-cream/40 rounded-full" />
    </div>
  </div>
);

const Hero = () => (
  <section className="relative min-h-[600px] lg:min-h-[640px]">
    <div className="grid lg:grid-cols-2 min-h-[600px] lg:min-h-[640px]">
      {/* Left — cream panel */}
      <div className="flex flex-col justify-center bg-cream px-8 py-20 lg:px-16 xl:px-24">
        <div className="max-w-lg">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest mb-6">
            FDA-approved GLP-1 medications
          </p>
          <h1 className="font-serif text-4xl font-light leading-[1.1] text-espresso md:text-5xl lg:text-[56px]">
            Medically guided
            <span className="block text-forest">weight loss</span>
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground max-w-md">
            Get evaluated by licensed providers online. If appropriate, receive
            clinician-prescribed GLP-1 medication delivered to your door — with
            ongoing medical support.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-forest hover:bg-forest-light text-cream border-0 rounded-[2px] px-8 text-sm font-medium transition-colors"
              asChild
            >
              <Link to="/quiz" onClick={() => trackEvent("quiz_started")}>
                Check if you qualify
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-espresso/20 text-espresso hover:bg-espresso/5 rounded-[2px] px-8 text-sm font-medium"
              asChild
            >
              <a href="#how-it-works">Learn more</a>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Starting from <span className="font-semibold text-espresso">$179/month</span> · Cancel anytime
          </p>
          <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
            Prescription required. Results vary. Subject to licensed provider approval. Not available in all states.
          </p>

          {/* Trust stats */}
          <div className="mt-10 flex gap-8 border-t border-border pt-6">
            <div>
              <p className="font-serif text-2xl font-light text-espresso">50</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">States served</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-light text-espresso">24–48h</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Review time</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-light text-espresso">Free</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Shipping</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — forest gradient panel */}
      <div className="relative hidden lg:flex items-center justify-center overflow-hidden gradient-hero">
        {/* Geometric circle outlines */}
        <div className="absolute top-16 right-16 h-72 w-72 rounded-full border border-cream/10" />
        <div className="absolute top-24 right-24 h-56 w-56 rounded-full border border-cream/[0.07]" />
        <div className="absolute bottom-20 left-12 h-40 w-40 rounded-full border border-cream/[0.08]" />
        <div className="absolute -bottom-10 right-32 h-64 w-64 rounded-full border border-cream/[0.05]" />
        <div className="absolute top-1/3 left-1/4 h-20 w-20 rounded-full border border-cream/[0.12]" />

        <HeroStatusCard />
      </div>
    </div>
  </section>
);

/* ─── Trust Bar ─── */
const TrustBar = () => (
  <section className="bg-espresso py-3">
    <div className="container">
      <p className="text-center text-[11px] uppercase tracking-[0.14em]" style={{ color: 'rgba(245,240,232,0.55)' }}>
        Licensed providers in all 50 supported states
        <span className="mx-2" style={{ color: 'hsl(42 70% 55%)' }}>·</span>
        HIPAA-compliant &amp; secure
        <span className="mx-2" style={{ color: 'hsl(42 70% 55%)' }}>·</span>
        Cancel anytime
      </p>
    </div>
  </section>
);

/* ─── How It Works ─── */
const HowItWorks = () => {
  const steps = [
    { icon: ClipboardList, title: "Complete your health intake", description: "Answer a brief questionnaire about your health history and goals. Takes about 5 minutes." },
    { icon: Stethoscope, title: "A licensed provider reviews your case", description: "An independent licensed clinician reviews your responses and determines whether a GLP-1 prescription is appropriate for you. Most reviews complete within 24–48 hours." },
    { icon: Truck, title: "Medication delivered to your door", description: "If prescribed, your medication is dispensed by a licensed pharmacy and shipped directly to you with free standard shipping." },
  ];

  return (
    <section id="how-it-works" className="bg-warm-white py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="font-serif text-3xl font-light text-espresso md:text-4xl">How it works</h2>
          <p className="mt-4 text-[15px] text-muted-foreground">Three simple steps to get started.</p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="group relative text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-[2px] border border-border bg-cream">
                <step.icon className="h-6 w-6 text-forest" />
              </div>
              <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-forest">Step {i + 1}</div>
              <h3 className="font-serif text-lg font-normal text-espresso mb-2">{step.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-[12px] italic text-muted-foreground max-w-xl mx-auto font-serif">
          All prescribing decisions are made solely by independent licensed healthcare providers. Approval is not guaranteed.
        </p>
      </div>
    </section>
  );
};

/* ─── Testimonials ─── */
const Testimonials = () => {
  const testimonials = [
    { quote: "I'd tried everything. Having an actual clinician review my health history made me feel like I was finally getting real medical care.", name: "Sarah M.", location: "Texas" },
    { quote: "The process was straightforward. My provider was thorough and the medication arrived quickly.", name: "Jennifer K.", location: "California" },
    { quote: "Clear pricing, no surprises, and a provider who explained exactly what to expect.", name: "Rachel T.", location: "Florida" },
  ];

  return (
    <section className="bg-forest py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-serif text-3xl font-light text-cream md:text-4xl">What our patients say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-cream/15 rounded-[2px] p-7 bg-cream/[0.05]">
              <p className="text-[14px] text-cream/85 leading-relaxed italic mb-4">"{t.quote}"</p>
              <p className="text-sm font-medium text-cream">— {t.name}, {t.location}</p>
              <p className="text-[11px] italic text-cream/40 mt-2">Individual results may vary.</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-[11px] text-cream/35 italic max-w-xl mx-auto">
          Placeholder testimonials — to be replaced with verified patient testimonials before launch. Individual results may vary and are not guaranteed.
        </p>
      </div>
    </section>
  );
};

/* ─── Pricing ─── */
const Pricing = () => (
  <section id="pricing" className="bg-cream py-24 md:py-32">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center mb-20">
        <h2 className="font-serif text-3xl font-light text-espresso md:text-4xl">Simple, transparent pricing</h2>
        <p className="mt-4 text-[15px] text-muted-foreground">Everything you need for your weight loss journey, one monthly subscription.</p>
      </div>
      <div className="mx-auto max-w-md">
        <div className="border border-border rounded-[2px] overflow-hidden">
          <div className="bg-forest p-8 text-center">
            <h3 className="font-serif text-xl font-light text-cream">GLP-1 Weight Loss Program</h3>
            <div className="mt-4">
              <span className="font-serif text-5xl font-light text-cream">$179</span>
              <span className="text-cream/70 ml-1 text-sm">/month</span>
            </div>
            <p className="mt-3 text-[13px] text-cream/70">Cancel anytime · No hidden fees</p>
          </div>
          <div className="p-8 bg-warm-white">
            <ul className="space-y-3.5">
              {[
                "Licensed provider medical review",
                "Clinician-prescribed GLP-1 medication (if appropriate)",
                "Free home delivery",
                "Ongoing provider check-ins",
                "Messaging with your care team",
                "Automatic refills",
                "Dosage adjustments as needed",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  <span className="text-[14px] text-espresso">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-8 w-full bg-forest hover:bg-forest-light text-cream rounded-[2px] border-0 transition-colors"
              size="lg"
              asChild
            >
              <Link to="/quiz" onClick={() => trackEvent("quiz_started")}>Check if you qualify</Link>
            </Button>
            <p className="mt-4 text-[11px] text-center text-muted-foreground">
              Prescription required. Subject to provider approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <Hero />
    <TrustBar />
    <HowItWorks />
    <Testimonials />
    <Pricing />
    <Footer />
  </div>
);

export default Index;
