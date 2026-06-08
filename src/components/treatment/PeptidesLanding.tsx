import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Sparkles, Zap, Activity, Heart, Leaf, ArrowRight, ShieldCheck, Stethoscope, Truck,
  Sun, FlaskConical, Droplets, Flame, Star, ChevronDown,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SafetyInfo } from "@/components/landing/SafetyInfo";
import { trackEvent } from "@/lib/analytics";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { FOREST, GOLD, WARM_WHITE, SAGE } from "./shared";

const QUIZ = "/get-started/anti-aging";

/* ----------------------------- tokens ----------------------------- */
const eyebrow = "text-[11px] font-medium uppercase tracking-[0.22em]";
const heading = "font-serif leading-[1.08]";

const PrimaryBtn = ({ to, children, onClick, className = "" }: { to: string; children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white shadow-[0_12px_30px_-10px_rgba(28,58,46,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(28,58,46,0.55)] ${className}`}
    style={{ background: `linear-gradient(135deg, ${FOREST} 0%, #2d5a3d 60%, ${FOREST} 100%)` }}
  >
    {children}
    <ArrowRight className="h-4 w-4" />
  </Link>
);

const GhostBtn = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-medium transition-all hover:bg-white"
    style={{ borderColor: `${FOREST}33`, color: FOREST }}
  >
    {children}
  </Link>
);

/* ----------------------------- HERO ----------------------------- */
const Hero = () => (
  <section className="relative overflow-hidden bg-white">
    {/* glow washes */}
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(168,200,160,0.55), transparent)" }} />
      <div className="absolute -bottom-40 -right-20 h-[520px] w-[520px] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(closest-side, rgba(201,169,110,0.35), transparent)" }} />
      <div className="absolute top-1/2 left-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(closest-side, rgba(232,237,230,0.9), transparent)" }} />
    </div>

    <div className="container relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 ${eyebrow}`}
          style={{ borderColor: `${FOREST}22`, color: FOREST, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
          <Sparkles className="h-3.5 w-3.5" style={{ color: GOLD }} /> Peptides &amp; Longevity
        </span>

        <h1 className={`mt-6 ${heading}`} style={{ fontSize: "clamp(2.6rem, 5.4vw, 4.6rem)", fontWeight: 300, color: FOREST }}>
          The <em className="not-italic" style={{ background: `linear-gradient(135deg, ${GOLD}, #8a6a2a)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Glow + Energy</em><br />Stack.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: "#2d4a3a" }}>
          Clinician-guided peptide and wellness therapies designed to support energy, recovery, skin health, libido, and healthy aging.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <PrimaryBtn to={QUIZ} onClick={() => trackEvent("quiz_started", { treatment: "peptides", cta: "hero" })}>
            Find My Stack
          </PrimaryBtn>
          <GhostBtn to="#treatments">Explore Treatments</GhostBtn>
        </div>

        <p className="mt-6 text-xs" style={{ color: "#5a7060" }}>
          Personalized care. Licensed clinician review. Prescription treatments when appropriate.
        </p>
      </div>

      {/* Glassmorphism stack visual */}
      <div className="relative hidden lg:block">
        <div className="relative mx-auto h-[520px] w-full max-w-md">
          {/* abstract glow blob */}
          <div aria-hidden className="absolute inset-0 rounded-[2.5rem] overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${SAGE} 0%, rgba(232,220,200,0.55) 60%, #fff 100%)` }}>
            <div className="absolute -top-10 -right-10 h-72 w-72 rounded-full blur-3xl"
              style={{ background: `radial-gradient(circle, ${GOLD}55, transparent 60%)` }} />
            <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full blur-3xl"
              style={{ background: `radial-gradient(circle, #a8c8a088, transparent 60%)` }} />
          </div>

          {/* floating glass cards */}
          {[
            { icon: Zap, label: "Energy", sub: "NAD+", top: "8%", left: "4%", delay: 0 },
            { icon: Sparkles, label: "Glow", sub: "GHK-Cu", top: "22%", right: "4%", delay: 600 },
            { icon: Activity, label: "Recovery", sub: "Sermorelin", bottom: "26%", left: "6%", delay: 1200 },
            { icon: Heart, label: "Libido", sub: "PT-141", bottom: "8%", right: "8%", delay: 1800 },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="absolute"
                style={{ top: c.top, left: c.left, right: c.right, bottom: c.bottom, animation: `floatY 6s ease-in-out ${c.delay}ms infinite` }}>
                <div className="rounded-2xl border bg-white/55 px-5 py-3.5 backdrop-blur-xl shadow-[0_12px_30px_-12px_rgba(28,58,46,0.25)]"
                  style={{ borderColor: "rgba(255,255,255,0.7)" }}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ background: `linear-gradient(135deg, ${SAGE}, #dceadd)` }}>
                      <Icon className="h-4 w-4" style={{ color: FOREST }} />
                    </span>
                    <div>
                      <p className="text-sm font-medium leading-tight" style={{ color: FOREST }}>{c.label}</p>
                      <p className="text-[11px] uppercase tracking-wider" style={{ color: GOLD }}>{c.sub}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    <style>{`@keyframes floatY {0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)}}`}</style>
  </section>
);

/* --------------------- GOALS --------------------- */
const GOALS = [
  { title: "Glow & Skin Quality", body: "Support smoother-looking, healthier-feeling skin from within.", icon: Sparkles },
  { title: "Energy & Cellular Wellness", body: "Support energy metabolism and whole-body vitality.", icon: Zap },
  { title: "Recovery & Body Composition", body: "Support better recovery, resilience, and performance.", icon: Activity },
  { title: "Libido & Intimacy", body: "Clinician-guided options for desire and sexual wellness.", icon: Heart },
  { title: "Healthy Aging", body: "A proactive wellness plan built around how you want to feel.", icon: Leaf },
];

const Goals = () => (
  <section className="relative py-24 md:py-28" style={{ background: "linear-gradient(180deg, #fff 0%, #f6f8f4 100%)" }}>
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <p className={eyebrow} style={{ color: GOLD }}>Choose your goal</p>
        <h2 className={`mt-4 ${heading}`} style={{ fontSize: "clamp(2rem,3.6vw,3rem)", fontWeight: 300, color: FOREST }}>
          What do you want to <em className="not-italic" style={{ color: GOLD }}>improve?</em>
        </h2>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GOALS.map((g, i) => {
          const Icon = g.icon;
          return (
            <Link
              key={g.title}
              to={QUIZ}
              onClick={() => trackEvent("quiz_started", { treatment: "peptides", goal: g.title })}
              className="group relative overflow-hidden rounded-3xl border bg-white/70 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(28,58,46,0.25)]"
              style={{ borderColor: "rgba(255,255,255,0.8)", boxShadow: "0 8px 24px -16px rgba(28,58,46,0.18)" }}
            >
              <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: i % 2 ? `radial-gradient(circle, ${GOLD}66, transparent)` : "radial-gradient(circle, #a8c8a066, transparent)" }} />
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${SAGE}, #dceadd)` }}>
                  <Icon className="h-5 w-5" style={{ color: FOREST }} />
                </span>
                <h3 className="mt-5 font-serif text-xl" style={{ color: FOREST, fontWeight: 500 }}>{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#3a5a44" }}>{g.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium transition-all group-hover:gap-2.5" style={{ color: GOLD }}>
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <PrimaryBtn to={QUIZ} onClick={() => trackEvent("quiz_started", { treatment: "peptides", cta: "goals" })}>
          Build My Personalized Plan
        </PrimaryBtn>
      </div>
    </div>
  </section>
);

/* --------------------- TREATMENTS CAROUSEL --------------------- */
type Treatment = {
  name: string;
  tagline: string;
  what: string;
  best: string[];
  icon: typeof Sparkles;
  gradient: string;
  accent: string;
};

const TREATMENTS: Treatment[] = [
  {
    name: "NAD+",
    tagline: "Cellular energy & healthy aging support.",
    what: "NAD+ helps support the body's natural energy metabolism and wellness processes.",
    best: ["Energy support", "Healthy aging routines", "Recovery-focused wellness", "Feel more optimized"],
    icon: Zap,
    gradient: "linear-gradient(135deg,#a8c8a0,#3d6b4a)",
    accent: "#3d6b4a",
  },
  {
    name: "Sermorelin",
    tagline: "Recovery, sleep & body composition.",
    what: "Sermorelin supports the body's natural growth-hormone signaling pathways as part of a clinician-guided wellness plan.",
    best: ["Recovery support", "Sleep quality", "Body composition", "Wellness optimization"],
    icon: Activity,
    gradient: "linear-gradient(135deg,#c7d6c0,#5a8a5c)",
    accent: "#2d5a3d",
  },
  {
    name: "GHK-Cu",
    tagline: "Skin, hair & visible aging support.",
    what: "GHK-Cu is commonly used in aesthetic wellness protocols focused on skin quality, hair health, and overall appearance.",
    best: ["Skin quality", "Glow-focused routines", "Hair wellness", "Appearance-focused aging"],
    icon: Sparkles,
    gradient: "linear-gradient(135deg,#e8dcc8,#c9a96e)",
    accent: "#8a6a2a",
  },
  {
    name: "PT-141",
    tagline: "Libido & intimacy support.",
    what: "PT-141 may be considered for those looking for clinician-guided support around desire and sexual wellness.",
    best: ["Low desire", "Intimacy support", "Sexual wellness", "Body confidence"],
    icon: Heart,
    gradient: "linear-gradient(135deg,#f0d4d4,#c97070)",
    accent: "#8a3a3a",
  },
  {
    name: "Glutathione",
    tagline: "Antioxidant & glow support.",
    what: "Glutathione is a naturally occurring antioxidant that supports the body's defense against oxidative stress.",
    best: ["Antioxidant support", "Glow-focused wellness", "Healthy aging", "Cellular wellness"],
    icon: Droplets,
    gradient: "linear-gradient(135deg,#d4e8e0,#5a9a8a)",
    accent: "#2d5a4d",
  },
];

const FeaturedTreatments = () => (
  <section id="treatments" className="relative bg-white py-24 md:py-28">
    <div className="container">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className={eyebrow} style={{ color: GOLD }}>Featured treatments</p>
          <h2 className={`mt-4 ${heading}`} style={{ fontSize: "clamp(2rem,3.6vw,3rem)", fontWeight: 300, color: FOREST }}>
            Your stack, <em className="not-italic" style={{ color: GOLD }}>personalized.</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "#3a5a44" }}>
            Clinician-guided therapies that can be used individually or as part of a personalized protocol.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-5">
            {TREATMENTS.map((t) => {
              const Icon = t.icon;
              return (
                <CarouselItem key={t.name} className="pl-5 md:basis-1/2 lg:basis-1/3">
                  <div className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-[0_12px_36px_-20px_rgba(28,58,46,0.25)] transition-all hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(28,58,46,0.3)]"
                    style={{ borderColor: "rgba(28,58,46,0.08)" }}>
                    <div className="relative h-40 overflow-hidden" style={{ background: t.gradient }}>
                      <div aria-hidden className="absolute inset-0 opacity-50"
                        style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent 60%)" }} />
                      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 backdrop-blur-xl">
                          <Icon className="h-5 w-5" style={{ color: t.accent }} />
                        </span>
                        <span className="rounded-full bg-white/65 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur"
                          style={{ color: FOREST }}>Protocol</span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-serif text-2xl" style={{ color: FOREST, fontWeight: 500 }}>{t.name}</h3>
                      <p className="mt-1 text-sm italic" style={{ color: GOLD }}>{t.tagline}</p>
                      <p className="mt-3 text-sm leading-relaxed" style={{ color: "#3a5a44" }}>{t.what}</p>
                      <p className={`mt-5 ${eyebrow}`} style={{ color: FOREST }}>Best for</p>
                      <ul className="mt-2 space-y-1.5">
                        {t.best.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "#2d4a3a" }}>
                            <span style={{ color: GOLD }}>•</span> {b}
                          </li>
                        ))}
                      </ul>
                      <Link to={QUIZ}
                        onClick={() => trackEvent("quiz_started", { treatment: "peptides", item: t.name })}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-2.5"
                        style={{ color: FOREST }}>
                        Learn about {t.name} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="mt-8 hidden justify-end gap-3 md:flex">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </div>
  </section>
);

/* --------------------- NOT SURE --------------------- */
const NotSure = () => (
  <section className="relative overflow-hidden py-24 md:py-28">
    <div aria-hidden className="absolute inset-0"
      style={{ background: `linear-gradient(135deg, ${SAGE} 0%, #fff 50%, rgba(232,220,200,0.5) 100%)` }} />
    <div aria-hidden className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl opacity-50"
      style={{ background: `radial-gradient(circle, ${GOLD}44, transparent)` }} />

    <div className="container relative">
      <div className="mx-auto max-w-2xl rounded-[2rem] border bg-white/70 p-10 text-center backdrop-blur-xl md:p-14"
        style={{ borderColor: "rgba(255,255,255,0.8)", boxShadow: "0 24px 60px -25px rgba(28,58,46,0.25)" }}>
        <p className={eyebrow} style={{ color: GOLD }}>Not sure what you need?</p>
        <h2 className={`mt-4 ${heading}`} style={{ fontSize: "clamp(1.9rem,3.4vw,2.8rem)", fontWeight: 300, color: FOREST }}>
          You don't need to know your <em className="not-italic" style={{ color: GOLD }}>stack yet.</em>
        </h2>
        <p className="mt-5 text-base leading-relaxed" style={{ color: "#3a5a44" }}>
          Most people come to Solana Health with a goal, not a treatment name. Tell us what you want to improve, and a licensed clinician will review your health history and help determine whether treatment is appropriate.
        </p>
        <div className="mt-8 flex justify-center">
          <PrimaryBtn to={QUIZ} onClick={() => trackEvent("quiz_started", { treatment: "peptides", cta: "not_sure" })}>
            Start Assessment
          </PrimaryBtn>
        </div>
      </div>
    </div>
  </section>
);

/* --------------------- HOW IT WORKS --------------------- */
const HowItWorks = () => {
  const steps = [
    { n: "01", title: "Tell Us Your Goals", body: "Complete a short online assessment about your health, lifestyle, and wellness priorities.", icon: Star },
    { n: "02", title: "Get Clinician Guidance", body: "A licensed clinician reviews your information and recommends options when appropriate.", icon: Stethoscope },
    { n: "03", title: "Start Your Plan", body: "If prescribed, your treatment is shipped to your door with ongoing support.", icon: Truck },
  ];
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className={eyebrow} style={{ color: GOLD }}>How it works</p>
          <h2 className={`mt-4 ${heading}`} style={{ fontSize: "clamp(2rem,3.6vw,3rem)", fontWeight: 300, color: FOREST }}>
            Personalized wellness <em className="not-italic" style={{ color: GOLD }}>in 3 steps.</em>
          </h2>
        </div>

        <div className="relative mt-16">
          <div aria-hidden className="absolute left-0 right-0 top-10 hidden h-px md:block"
            style={{ background: `linear-gradient(90deg, transparent, ${FOREST}33 20%, ${FOREST}33 80%, transparent)` }} />
          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.n} className="relative rounded-3xl border bg-white/70 p-7 text-center backdrop-blur-xl"
                  style={{ borderColor: "rgba(28,58,46,0.08)", boxShadow: "0 12px 36px -20px rgba(28,58,46,0.2)" }}>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border bg-white"
                    style={{ borderColor: `${FOREST}22`, boxShadow: "0 8px 20px -10px rgba(28,58,46,0.25)" }}>
                    <Icon className="h-6 w-6" style={{ color: FOREST }} />
                  </div>
                  <p className="mt-4 font-serif text-sm tracking-[0.18em]" style={{ color: GOLD }}>{s.n}</p>
                  <h3 className="mt-2 font-serif text-xl" style={{ color: FOREST }}>{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#3a5a44" }}>{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* --------------------- WHY --------------------- */
const Why = () => {
  const items = [
    { icon: Stethoscope, title: "Licensed Clinicians", body: "US-based providers — not chatbots." },
    { icon: FlaskConical, title: "Compounded Quality", body: "Prepared at licensed compounding pharmacies." },
    { icon: ShieldCheck, title: "Evidence-Based", body: "Protocols grounded in current research." },
    { icon: Truck, title: "Delivered Discreetly", body: "Shipped to your door with ongoing support." },
  ];
  return (
    <section className="py-20" style={{ background: "linear-gradient(180deg,#fff,#f6f8f4)" }}>
      <div className="container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border bg-white/70 p-6 backdrop-blur-xl transition-all hover:-translate-y-1"
              style={{ borderColor: "rgba(28,58,46,0.08)" }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `linear-gradient(135deg, ${SAGE}, #dceadd)` }}>
                <Icon className="h-5 w-5" style={{ color: FOREST }} />
              </span>
              <h3 className="mt-4 font-serif text-lg" style={{ color: FOREST }}>{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#3a5a44" }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --------------------- FAQ ACCORDION --------------------- */
const FAQS = [
  { q: "Are these peptides FDA-approved?", a: "Most compounded peptides are not individually FDA-approved drug products. Your provider will only recommend protocols where the evidence supports their use for your specific goals." },
  { q: "How do I know which protocol is right for me?", a: "Your provider reviews your goals, health history, and current medications during the free consultation and builds a protocol specific to you. Most patients start with 1–2 targeted options before adding complexity." },
  { q: "Do all peptides require injections?", a: "No. NAD+ is available as an oral, nasal, or injectable protocol. GHK-Cu can be topical. Some peptides (Sermorelin) are typically administered as small-gauge subcutaneous injections." },
  { q: "How long until I notice results?", a: "It depends on the protocol. NAD+ energy effects are often felt within 1–3 weeks. Growth-hormone peptides like Sermorelin typically show meaningful results at 3–6 months. Results vary by individual." },
  { q: "Are there drug interactions I should know about?", a: "Yes — some peptides interact with medications, particularly those affecting hormones, blood sugar, or immune function. Disclose all current medications during your intake." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="container max-w-3xl">
        <div className="mb-12 text-center">
          <p className={eyebrow} style={{ color: GOLD }}>FAQ</p>
          <h2 className={`mt-4 ${heading}`} style={{ fontSize: "clamp(2rem,3.6vw,3rem)", fontWeight: 300, color: FOREST }}>
            Common <em className="not-italic" style={{ color: GOLD }}>questions.</em>
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-2xl border bg-white/70 backdrop-blur-xl transition-all"
                style={{ borderColor: "rgba(28,58,46,0.1)", boxShadow: isOpen ? "0 12px 30px -20px rgba(28,58,46,0.3)" : "none" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left"
                >
                  <span className="font-serif text-base md:text-lg" style={{ color: FOREST }}>{f.q}</span>
                  <ChevronDown className="mt-1 h-5 w-5 shrink-0 transition-transform"
                    style={{ color: GOLD, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                <div className="grid overflow-hidden transition-all duration-300"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="min-h-0">
                    <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#3a5a44" }}>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* --------------------- FINAL CTA --------------------- */
const FinalCta = () => (
  <section className="relative overflow-hidden py-24 md:py-32" style={{ background: FOREST }}>
    <div aria-hidden className="absolute inset-0 opacity-60"
      style={{ background: `radial-gradient(circle at 20% 20%, ${GOLD}33, transparent 50%), radial-gradient(circle at 80% 80%, #a8c8a044, transparent 50%)` }} />
    <div className="container relative max-w-2xl text-center">
      <Flame className="mx-auto h-7 w-7" style={{ color: GOLD }} />
      <h2 className={`mt-6 ${heading}`} style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, color: WARM_WHITE }}>
        Build your personalized<br /><em className="not-italic" style={{ color: GOLD }}>Glow + Energy</em> stack.
      </h2>
      <p className="mt-5 text-sm leading-relaxed md:text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
        Take the assessment and see which treatment options may fit your goals.
      </p>
      <div className="mt-9 flex justify-center">
        <Link to={QUIZ}
          onClick={() => trackEvent("quiz_started", { treatment: "peptides", cta: "final" })}
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium shadow-xl transition-all hover:-translate-y-0.5"
          style={{ color: FOREST }}>
          Find My Stack <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <p className="mt-10 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
        Treatment requires clinician review. Prescription treatments are only provided when medically appropriate. Results vary.
      </p>
    </div>
  </section>
);

/* --------------------- STICKY MOBILE CTA --------------------- */
const StickyMobileCta = () => (
  <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/90 p-3 backdrop-blur-xl md:hidden"
    style={{ borderColor: "rgba(28,58,46,0.12)", boxShadow: "0 -12px 30px -15px rgba(28,58,46,0.25)" }}>
    <Link to={QUIZ}
      onClick={() => trackEvent("quiz_started", { treatment: "peptides", cta: "sticky_mobile" })}
      className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white"
      style={{ background: `linear-gradient(135deg, ${FOREST}, #2d5a3d)` }}>
      Find My Stack <ArrowRight className="h-4 w-4" />
    </Link>
  </div>
);

export const PeptidesLanding = () => (
  <div className="min-h-screen bg-white">
    <Header />
    <Hero />
    <Goals />
    <FeaturedTreatments />
    <NotSure />
    <HowItWorks />
    <Why />
    <FAQ />
    <FinalCta />
    <SafetyInfo />
    <Footer />
    <StickyMobileCta />
    <div className="h-20 md:hidden" />
  </div>
);

export default PeptidesLanding;
