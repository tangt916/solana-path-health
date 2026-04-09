import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ClipboardList, Pill, Stethoscope, Truck, Shield, Clock, MessageSquare } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const FloatingPill = () => (
  <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
    <div className="relative">
      {/* Glow behind pill */}
      <div className="absolute inset-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
      {/* Pill shape */}
      <div className="relative animate-float">
        <div className="flex h-20 w-48 overflow-hidden rounded-full shadow-premium">
          <div className="w-1/2 bg-primary" />
          <div className="w-1/2 bg-primary-foreground border border-border" />
        </div>
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section className="relative overflow-hidden bg-hero-premium py-24 md:py-36">
    <div className="container relative z-10">
      <div className="mx-auto max-w-3xl text-center lg:text-left lg:max-w-none lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="text-xs font-medium text-primary">FDA-approved GLP-1 medications</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]">
            Medically guided
            <span className="block bg-gradient-to-r from-primary to-info bg-clip-text text-transparent"> weight loss</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Get evaluated by licensed providers online. If appropriate, receive FDA-approved GLP-1 medication delivered to your door — with ongoing medical support.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start sm:justify-center">
            <Button size="lg" className="w-full px-8 text-base sm:w-auto shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all duration-200" asChild>
              <Link to="/quiz">Check if you qualify</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full px-8 text-base sm:w-auto hover:-translate-y-0.5 transition-all duration-200" asChild>
              <a href="#how-it-works">Learn more</a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Starting from <span className="font-semibold text-foreground">$179/month</span> · Cancel anytime
          </p>
        </div>
        <FloatingPill />
      </div>
    </div>
    {/* Decorative radial */}
    <div className="absolute -top-60 -right-60 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/[0.03] blur-3xl" />
  </section>
);

const HowItWorks = () => {
  const steps = [
    { icon: ClipboardList, title: "Complete your evaluation", description: "Answer a few questions about your health and weight loss goals. Takes about 5 minutes." },
    { icon: Stethoscope, title: "Provider review", description: "A licensed medical provider reviews your information and determines if GLP-1 treatment is right for you." },
    { icon: Pill, title: "Get your prescription", description: "If appropriate, your provider prescribes medication tailored to your needs." },
    { icon: Truck, title: "Delivered to your door", description: "Your medication ships directly to you with free delivery. Refills are automatic." },
  ];

  return (
    <section id="how-it-works" className="bg-section-white py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">How it works</h2>
          <p className="mt-4 text-lg text-muted-foreground">Four simple steps to get started on your weight loss journey.</p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="group relative text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary shadow-card group-hover:shadow-premium transition-shadow duration-300">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary">Step {i + 1}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  const benefits = [
    { icon: Shield, title: "Licensed providers", description: "Every prescription is reviewed and approved by a licensed medical professional." },
    { icon: Clock, title: "Quick & convenient", description: "Complete your evaluation online in minutes. No waiting rooms or appointments." },
    { icon: Truck, title: "Free home delivery", description: "Medication shipped directly to your door with discreet packaging." },
    { icon: MessageSquare, title: "Ongoing support", description: "Message your care team anytime. We're here throughout your journey." },
  ];

  return (
    <section className="bg-section-soft py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Why Solana Health</h2>
          <p className="mt-4 text-lg text-muted-foreground">A better approach to weight loss — guided by medicine, designed for convenience.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map((b, i) => (
            <Card key={i} className="border-0 shadow-card hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 bg-card">
              <CardContent className="flex gap-5 p-7">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1.5">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => (
  <section id="pricing" className="bg-section-white py-24 md:py-32">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center mb-20">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Simple, transparent pricing</h2>
        <p className="mt-4 text-lg text-muted-foreground">Everything you need for your weight loss journey, one monthly subscription.</p>
      </div>
      <div className="mx-auto max-w-md">
        <Card className="shadow-premium-hover border-0 overflow-hidden">
          <div className="gradient-hero p-8 text-center">
            <h3 className="text-xl font-semibold text-primary-foreground">GLP-1 Weight Loss Program</h3>
            <div className="mt-4">
              <span className="text-5xl font-extrabold text-primary-foreground">$179</span>
              <span className="text-primary-foreground/80 ml-1">/month</span>
            </div>
            <p className="mt-3 text-sm text-primary-foreground/80">Cancel anytime · No hidden fees</p>
          </div>
          <CardContent className="p-8">
            <ul className="space-y-3.5">
              {[
                "Licensed provider medical review",
                "GLP-1 prescription (if appropriate)",
                "Free home delivery",
                "Ongoing provider check-ins",
                "Messaging with your care team",
                "Automatic refills",
                "Dosage adjustments as needed",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all duration-200" size="lg" asChild>
              <Link to="/quiz">Check if you qualify</Link>
            </Button>
            <p className="mt-4 text-xs text-center text-muted-foreground">
              Prescription required. Subject to provider approval.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const faqs = [
    { q: "What are GLP-1 medications?", a: "GLP-1 receptor agonists are FDA-approved medications that can help with weight management. They work by regulating appetite and food intake. Your provider will determine if they're appropriate for you." },
    { q: "How does the medical evaluation work?", a: "You'll complete a brief online questionnaire about your health history and weight loss goals. A licensed provider reviews your information and determines if GLP-1 treatment is appropriate for you." },
    { q: "How much does it cost?", a: "Our program starts at $179/month, which includes your medical evaluation, prescription (if appropriate), medication, free delivery, and ongoing care. You can cancel anytime." },
    { q: "How quickly will I receive my medication?", a: "Once your provider approves your treatment, your medication typically ships within 2-3 business days with free delivery." },
    { q: "Can I cancel my subscription?", a: "Yes, you can cancel your subscription at any time. There are no long-term commitments or cancellation fees." },
    { q: "Is this safe?", a: "GLP-1 medications are FDA-approved and prescribed by licensed medical providers. Your provider will review your full health history to ensure the treatment is safe and appropriate for you." },
  ];

  return (
    <section id="faq" className="bg-section-soft py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Frequently asked questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">Everything you need to know about our program.</p>
        </div>
        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border-0 bg-card px-6 shadow-card hover:shadow-premium transition-shadow duration-300">
                <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="bg-section-white py-24 md:py-32">
    <div className="container">
      <div className="mx-auto max-w-3xl rounded-3xl gradient-hero p-12 text-center md:p-20 shadow-elevated relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">Ready to start your journey?</h2>
          <p className="mx-auto mt-5 max-w-lg text-primary-foreground/80 leading-relaxed">
            Take a quick eligibility check to see if GLP-1 treatment may be right for you. It only takes 5 minutes.
          </p>
          <Button size="lg" variant="secondary" className="mt-10 px-10 text-base shadow-elevated hover:-translate-y-0.5 transition-all duration-200" asChild>
            <Link to="/quiz">Check if you qualify</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <Hero />
    <HowItWorks />
    <Benefits />
    <Pricing />
    <FAQ />
    <CTA />
    <Footer />
  </div>
);

export default Index;
