import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ClipboardList, Pill, Stethoscope, Truck, Shield, Clock, MessageSquare } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50 py-20 md:py-32">
    <div className="container relative z-10">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
          <span className="text-xs font-medium text-primary">Clinically proven GLP-1 medications</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Medically guided
          <span className="block text-primary"> weight loss</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Get evaluated by licensed providers online. If appropriate, receive GLP-1 medication delivered to your door — with ongoing medical support.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="w-full px-8 text-base sm:w-auto" asChild>
            <Link to="/quiz">Check if you qualify</Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full px-8 text-base sm:w-auto" asChild>
            <a href="#how-it-works">Learn more</a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Starting from <span className="font-semibold text-foreground">$179/month</span> · Cancel anytime
        </p>
      </div>
    </div>
    {/* Decorative elements */}
    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
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
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">How it works</h2>
          <p className="mt-4 text-lg text-muted-foreground">Four simple steps to get started on your weight loss journey.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">Step {i + 1}</div>
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
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Why Solana Health</h2>
          <p className="mt-4 text-lg text-muted-foreground">A better approach to weight loss — guided by medicine, designed for convenience.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map((b, i) => (
            <Card key={i} className="shadow-card hover:shadow-card-hover transition-shadow duration-300">
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{b.title}</h3>
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
  <section id="pricing" className="py-20 md:py-28">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Simple, transparent pricing</h2>
        <p className="mt-4 text-lg text-muted-foreground">Everything you need for your weight loss journey, one monthly subscription.</p>
      </div>
      <div className="mx-auto max-w-md">
        <Card className="shadow-elevated border-primary/20 overflow-hidden">
          <div className="gradient-hero p-6 text-center">
            <h3 className="text-xl font-semibold text-primary-foreground">GLP-1 Weight Loss Program</h3>
            <div className="mt-3">
              <span className="text-4xl font-bold text-primary-foreground">$179</span>
              <span className="text-primary-foreground/80">/month</span>
            </div>
            <p className="mt-2 text-sm text-primary-foreground/80">Cancel anytime · No hidden fees</p>
          </div>
          <CardContent className="p-6">
            <ul className="space-y-3">
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
            <Button className="mt-6 w-full" size="lg" asChild>
              <Link to="/quiz">Check if you qualify</Link>
            </Button>
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
    <section id="faq" className="bg-muted/50 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Frequently asked questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">Everything you need to know about our program.</p>
        </div>
        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-lg border border-border bg-card px-6 shadow-card">
                <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
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
  <section className="py-20 md:py-28">
    <div className="container">
      <div className="mx-auto max-w-3xl rounded-2xl gradient-hero p-10 text-center md:p-16">
        <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">Ready to start your journey?</h2>
        <p className="mx-auto mt-4 max-w-lg text-primary-foreground/80">
          Take a quick eligibility check to see if GLP-1 treatment may be right for you. It only takes 5 minutes.
        </p>
        <Button size="lg" variant="secondary" className="mt-8 px-8 text-base" asChild>
          <Link to="/quiz">Check if you qualify</Link>
        </Button>
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
