import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Sparkles, Zap, Activity, Heart, Leaf, ArrowRight, ShieldCheck, Stethoscope, Truck,
  Droplets, ClipboardList, Package, ChevronDown,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SafetyInfo } from "@/components/landing/SafetyInfo";
import { trackEvent } from "@/lib/analytics";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { FOREST, GOLD, WARM_WHITE, SAGE } from "./shared";

const QUIZ = "/get-started/anti-aging";
const eyebrow = "text-[11px] font-medium uppercase tracking-[0.22em]";
const heading = "font-serif leading-[1.05]";

/* ----------------------------- buttons ----------------------------- */
const PrimaryBtn = ({ to, children, onClick, className = "" }: { to: string; children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <Link to={to} onClick={onClick}
    className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white shadow-[0_12px_30px_-10px_rgba(28,58,46,0.5)] transition-all hover:-translate-y-0.5 ${className}`}
    style={{ background: `linear-gradient(135deg, ${FOREST} 0%, #2d5a3d 60%, ${FOREST} 100%)` }}>
    {children}<ArrowRight className="h-4 w-4" />
  </Link>
);

const GhostBtn = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-medium transition-all hover:bg-white"
    style={{ borderColor: `${FOREST}33`, color: FOREST }}>{children}</Link>
);

/* ----------------------------- HERO ----------------------------- */
const Hero = () => (
  <section className="relative overflow-hidden bg-white">
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(168,200,160,0.55), transparent)" }} />
      <div className="absolute -bottom-40 -right-20 h-[520px] w-[520px] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(closest-side, rgba(201,169,110,0.35), transparent)" }} />
    </div>
    <div className="container relative grid items-center gap-12 py-20 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 ${eyebrow}`}
          style={{ borderColor: `${FOREST}22`, color: FOREST, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
          <Sparkles className="h-3.5 w-3.5" style={{ color: GOLD }} /> Peptides &amp; Longevity
        </span>
        <h1 className={`mt-6 ${heading}`} style={{ fontSize: "clamp(2.6rem, 5.6vw, 4.8rem)", fontWeight: 300, color: FOREST }}>
          The <em className="not-italic" style={{ background: `linear-gradient(135deg, ${GOLD}, #8a6a2a)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Glow + Energy</em><br />Stack.
        </h1>
        <p className="mt-5 max-w-md text-base" style={{ color: "#3a5a44" }}>
          Clinician-guided peptides for energy, skin, recovery, and libido.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PrimaryBtn to={QUIZ} onClick={() => trackEvent("quiz_started", { treatment: "peptides", cta: "hero" })}>Find My Stack</PrimaryBtn>
          <GhostBtn to="#stacks">Explore Stacks</GhostBtn>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <div className="relative mx-auto h-[480px] w-full max-w-md">
          <div aria-hidden className="absolute inset-0 rounded-[2.5rem] overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${SAGE} 0%, rgba(232,220,200,0.55) 60%, #fff 100%)` }}>
            <div className="absolute -top-10 -right-10 h-72 w-72 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${GOLD}55, transparent 60%)` }} />
            <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, #a8c8a088, transparent 60%)` }} />
          </div>
          {[
            { icon: Zap, label: "Energy", top: "8%", left: "4%", delay: 0 },
            { icon: Sparkles, label: "Glow", top: "20%", right: "4%", delay: 600 },
            { icon: Activity, label: "Recovery", bottom: "26%", left: "6%", delay: 1200 },
            { icon: Heart, label: "Libido", bottom: "8%", right: "8%", delay: 1800 },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="absolute" style={{ top: c.top, left: c.left, right: c.right, bottom: c.bottom, animation: `floatY 6s ease-in-out ${c.delay}ms infinite` }}>
                <div className="rounded-2xl border bg-white/55 px-5 py-3.5 backdrop-blur-xl shadow-[0_12px_30px_-12px_rgba(28,58,46,0.25)]" style={{ borderColor: "rgba(255,255,255,0.7)" }}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg, ${SAGE}, #dceadd)` }}>
                      <Icon className="h-4 w-4" style={{ color: FOREST }} />
                    </span>
                    <p className="text-sm font-medium" style={{ color: FOREST }}>{c.label}</p>
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

/* --------------------- GOAL SELECTION --------------------- */
const GOALS = [
  { title: "Glow & Skin", emoji: "✨", icon: Sparkles, gradient: "linear-gradient(135deg,#fdf4e8,#e8dcc8)" },
  { title: "Energy", emoji: "⚡", icon: Zap, gradient: "linear-gradient(135deg,#f0f7e8,#c7d6c0)" },
  { title: "Recovery", emoji: "💪", icon: Activity, gradient: "linear-gradient(135deg,#e8f4ee,#a8c8a0)" },
  { title: "Libido", emoji: "❤️", icon: Heart, gradient: "linear-gradient(135deg,#fbeaea,#f0d4d4)" },
  { title: "Healthy Aging", emoji: "🌱", icon: Leaf, gradient: "linear-gradient(135deg,#eef5ee,#c7d6c0)" },
];

const GoalSelection = () => (
  <section className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg,#fff,#f6f8f4)" }}>
    <div className="container">
      <div className="mx-auto max-w-xl text-center">
        <p className={eyebrow} style={{ color: GOLD }}>Choose your goal</p>
        <h2 className={`mt-3 ${heading}`} style={{ fontSize: "clamp(1.8rem,3.2vw,2.6rem)", fontWeight: 300, color: FOREST }}>
          What do you want to <em className="not-italic" style={{ color: GOLD }}>improve?</em>
        </h2>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {GOALS.map((g) => (
          <Link key={g.title} to={QUIZ}
            onClick={() => trackEvent("quiz_started", { treatment: "peptides", goal: g.title })}
            className="group relative overflow-hidden rounded-3xl border bg-white/70 p-6 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_24px_50px_-20px_rgba(28,58,46,0.25)]"
            style={{ borderColor: "rgba(255,255,255,0.8)", boxShadow: "0 8px 24px -16px rgba(28,58,46,0.18)" }}>
            <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: g.gradient }} />
            <div className="relative">
              <div className="mx-auto mb-3 text-4xl transition-transform duration-500 group-hover:scale-125">{g.emoji}</div>
              <p className="font-serif text-base" style={{ color: FOREST, fontWeight: 500 }}>{g.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* --------------------- BUILD YOUR STACK --------------------- */
const STACKS = [
  { name: "Glow Stack", contains: "GHK-Cu + Glutathione", icon: Sparkles, gradient: "linear-gradient(135deg,#fdf4e8,#e8dcc8 60%,#c9a96e)", accent: "#8a6a2a" },
  { name: "Energy Stack", contains: "NAD+", icon: Zap, gradient: "linear-gradient(135deg,#f0f7e8,#a8c8a0 60%,#3d6b4a)", accent: "#2d5a3d" },
  { name: "Recovery Stack", contains: "Sermorelin", icon: Activity, gradient: "linear-gradient(135deg,#e8f4ee,#c7d6c0 60%,#5a8a5c)", accent: "#2d5a3d" },
  { name: "Intimacy Stack", contains: "PT-141", icon: Heart, gradient: "linear-gradient(135deg,#fbeaea,#f0d4d4 60%,#c97070)", accent: "#8a3a3a" },
];

const BuildYourStack = () => (
  <section id="stacks" className="relative overflow-hidden bg-white py-20 md:py-24">
    <div aria-hidden className="absolute inset-0 opacity-50 pointer-events-none"
      style={{ background: `radial-gradient(circle at 80% 10%, ${GOLD}22, transparent 50%), radial-gradient(circle at 10% 90%, #a8c8a033, transparent 50%)` }} />
    <div className="container relative">
      <div className="mx-auto max-w-xl text-center">
        <p className={eyebrow} style={{ color: GOLD }}>Build your stack</p>
        <h2 className={`mt-3 ${heading}`} style={{ fontSize: "clamp(1.8rem,3.2vw,2.6rem)", fontWeight: 300, color: FOREST }}>
          Pre-built <em className="not-italic" style={{ color: GOLD }}>protocols.</em>
        </h2>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STACKS.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.name} to={QUIZ}
              onClick={() => trackEvent("quiz_started", { treatment: "peptides", stack: s.name })}
              className="group relative overflow-hidden rounded-3xl border bg-white/50 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2"
              style={{ borderColor: "rgba(255,255,255,0.7)", boxShadow: "0 16px 40px -20px rgba(28,58,46,0.2)" }}>
              <div aria-hidden className="absolute inset-0 opacity-90" style={{ background: s.gradient }} />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/10 to-white/40" />
              {/* bottle mockup */}
              <div aria-hidden className="absolute -right-6 -bottom-6 h-40 w-24 rounded-[40%_40%_30%_30%/55%_55%_15%_15%] opacity-60 blur-[2px] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                style={{ background: `linear-gradient(180deg, ${s.accent}aa, ${s.accent}55)` }} />
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 backdrop-blur-xl">
                  <Icon className="h-5 w-5" style={{ color: s.accent }} />
                </span>
                <h3 className="mt-5 font-serif text-xl" style={{ color: FOREST, fontWeight: 500 }}>{s.name}</h3>
                <p className="mt-1 text-sm" style={{ color: s.accent }}>{s.contains}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium transition-all group-hover:gap-2.5" style={{ color: FOREST }}>
                  Start <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

/* --------------------- BENEFIT METERS --------------------- */
type Meter = { label: string; value: number };
type Bene = { name: string; tagline: string; meters: Meter[]; accent: string };

const BENEFITS: Bene[] = [
  { name: "NAD+", tagline: "Cellular energy", accent: "#3d6b4a", meters: [{ label: "Energy", value: 95 }, { label: "Recovery", value: 75 }, { label: "Skin", value: 30 }] },
  { name: "GHK-Cu", tagline: "Skin & hair", accent: "#8a6a2a", meters: [{ label: "Skin", value: 95 }, { label: "Hair", value: 85 }, { label: "Glow", value: 85 }] },
  { name: "Sermorelin", tagline: "Sleep & recovery", accent: "#2d5a3d", meters: [{ label: "Recovery", value: 90 }, { label: "Sleep", value: 85 }, { label: "Body comp", value: 75 }] },
  { name: "PT-141", tagline: "Libido & intimacy", accent: "#8a3a3a", meters: [{ label: "Libido", value: 95 }, { label: "Confidence", value: 75 }] },
  { name: "Glutathione", tagline: "Antioxidant & glow", accent: "#2d5a4d", meters: [{ label: "Antioxidant", value: 90 }, { label: "Glow", value: 80 }, { label: "Detox", value: 70 }] },
];

const BenefitCard = ({ b }: { b: Bene }) => (
  <div className="h-full rounded-3xl border bg-white/70 p-6 backdrop-blur-xl transition-all hover:-translate-y-1"
    style={{ borderColor: "rgba(28,58,46,0.08)", boxShadow: "0 12px 30px -18px rgba(28,58,46,0.2)" }}>
    <div className="flex items-baseline justify-between">
      <h3 className="font-serif text-2xl" style={{ color: FOREST, fontWeight: 500 }}>{b.name}</h3>
      <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: b.accent }}>{b.tagline}</span>
    </div>
    <div className="mt-6 space-y-4">
      {b.meters.map((m) => (
        <div key={m.label}>
          <div className="flex items-center justify-between text-xs" style={{ color: FOREST }}>
            <span className="font-medium">{m.label}</span>
            <span style={{ color: b.accent }}>{m.value}</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full" style={{ background: `${b.accent}1a` }}>
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${m.value}%`, background: `linear-gradient(90deg, ${b.accent}cc, ${b.accent})` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BenefitMeters = () => (
  <section className="py-20 md:py-24" style={{ background: "linear-gradient(180deg,#f6f8f4,#fff)" }}>
    <div className="container">
      <div className="mx-auto max-w-xl text-center">
        <p className={eyebrow} style={{ color: GOLD }}>Compare</p>
        <h2 className={`mt-3 ${heading}`} style={{ fontSize: "clamp(1.8rem,3.2vw,2.6rem)", fontWeight: 300, color: FOREST }}>
          What each one <em className="not-italic" style={{ color: GOLD }}>does best.</em>
        </h2>
      </div>

      {/* desktop grid */}
      <div className="mt-12 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b) => <BenefitCard key={b.name} b={b} />)}
      </div>

      {/* mobile carousel */}
      <div className="mt-12 md:hidden">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent className="-ml-4">
            {BENEFITS.map((b) => (
              <CarouselItem key={b.name} className="basis-[85%] pl-4">
                <BenefitCard b={b} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  </section>
);

/* --------------------- INTERACTIVE QUIZ --------------------- */
const QUIZ_GOALS: { key: string; label: string; emoji: string; recs: string[] }[] = [
  { key: "glow", label: "Glow & Skin", emoji: "✨", recs: ["GHK-Cu", "Glutathione"] },
  { key: "energy", label: "Energy", emoji: "⚡", recs: ["NAD+"] },
  { key: "recovery", label: "Recovery", emoji: "💪", recs: ["Sermorelin", "NAD+"] },
  { key: "libido", label: "Libido", emoji: "❤️", recs: ["PT-141"] },
  { key: "aging", label: "Healthy Aging", emoji: "🌱", recs: ["NAD+", "GHK-Cu", "Glutathione"] },
];

const RecQuiz = () => {
  const [pick, setPick] = useState<string | null>(null);
  const selected = QUIZ_GOALS.find((g) => g.key === pick);
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div aria-hidden className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${SAGE} 0%, #fff 50%, rgba(232,220,200,0.4) 100%)` }} />
      <div className="container relative">
        <div className="mx-auto max-w-3xl rounded-[2rem] border bg-white/75 p-8 backdrop-blur-xl md:p-12"
          style={{ borderColor: "rgba(255,255,255,0.8)", boxShadow: "0 24px 60px -25px rgba(28,58,46,0.25)" }}>
          <p className={`text-center ${eyebrow}`} style={{ color: GOLD }}>Find your match</p>
          <h2 className={`mt-3 text-center ${heading}`} style={{ fontSize: "clamp(1.8rem,3.2vw,2.4rem)", fontWeight: 300, color: FOREST }}>
            What are you looking to <em className="not-italic" style={{ color: GOLD }}>improve?</em>
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {QUIZ_GOALS.map((g) => {
              const active = pick === g.key;
              return (
                <button key={g.key} onClick={() => { setPick(g.key); trackEvent("quiz_started", { treatment: "peptides", quiz_pick: g.key }); }}
                  className="rounded-full border px-5 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5"
                  style={{
                    borderColor: active ? FOREST : `${FOREST}25`,
                    background: active ? FOREST : "white",
                    color: active ? "white" : FOREST,
                  }}>
                  <span className="mr-2">{g.emoji}</span>{g.label}
                </button>
              );
            })}
          </div>

          {selected && (
            <div key={selected.key} className="mt-10 animate-fade-in">
              <p className={`text-center ${eyebrow}`} style={{ color: GOLD }}>Recommended for you</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {selected.recs.map((name) => {
                  const b = BENEFITS.find((x) => x.name === name);
                  if (!b) return null;
                  return <BenefitCard key={b.name} b={b} />;
                })}
              </div>
              <div className="mt-8 flex justify-center">
                <PrimaryBtn to={QUIZ} onClick={() => trackEvent("quiz_started", { treatment: "peptides", cta: "quiz_continue" })}>
                  Continue Assessment
                </PrimaryBtn>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* --------------------- VISUAL TIMELINE --------------------- */
const TIMELINE = [
  { icon: ClipboardList, label: "Assessment", sub: "5 minutes" },
  { icon: Stethoscope, label: "Clinician Review", sub: "Within 24 hours" },
  { icon: Sparkles, label: "Personalized Plan", sub: "Built for you" },
  { icon: Truck, label: "Delivered To You", sub: "Discreet shipping" },
];

const Timeline = () => (
  <section className="bg-white py-20 md:py-24">
    <div className="container">
      <div className="mx-auto max-w-xl text-center">
        <p className={eyebrow} style={{ color: GOLD }}>How it works</p>
        <h2 className={`mt-3 ${heading}`} style={{ fontSize: "clamp(1.8rem,3.2vw,2.6rem)", fontWeight: 300, color: FOREST }}>
          From goal to <em className="not-italic" style={{ color: GOLD }}>doorstep.</em>
        </h2>
      </div>

      <div className="relative mt-16">
        <div aria-hidden className="absolute left-0 right-0 top-9 hidden h-px md:block"
          style={{ background: `linear-gradient(90deg, transparent, ${FOREST}30 15%, ${FOREST}30 85%, transparent)` }} />
        <div className="grid gap-10 md:grid-cols-4">
          {TIMELINE.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="relative text-center animate-fade-in" style={{ animationDelay: `${i * 120}ms`, animationFillMode: "both" }}>
                <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border bg-white shadow-[0_8px_22px_-10px_rgba(28,58,46,0.3)]"
                  style={{ borderColor: `${FOREST}22` }}>
                  <Icon className="h-5 w-5" style={{ color: FOREST }} />
                </div>
                <p className="mt-5 font-serif text-lg" style={{ color: FOREST }}>{s.label}</p>
                <p className="mt-1 text-xs" style={{ color: GOLD }}>{s.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

/* --------------------- WHY --------------------- */
const Why = () => {
  const items = [
    { icon: Stethoscope, title: "Licensed Clinicians" },
    { icon: ShieldCheck, title: "Evidence-Based" },
    { icon: Droplets, title: "Compounded Quality" },
    { icon: Truck, title: "Delivered Discreetly" },
  ];
  return (
    <section className="py-16" style={{ background: "linear-gradient(180deg,#fff,#f6f8f4)" }}>
      <div className="container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-center gap-4 rounded-2xl border bg-white/70 p-5 backdrop-blur-xl transition-all hover:-translate-y-1"
              style={{ borderColor: "rgba(28,58,46,0.08)" }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg, ${SAGE}, #dceadd)` }}>
                <Icon className="h-5 w-5" style={{ color: FOREST }} />
              </span>
              <p className="font-serif text-base" style={{ color: FOREST }}>{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --------------------- FAQ --------------------- */
const FAQS = [
  { q: "Are these FDA-approved?", a: "Most compounded peptides are not individually FDA-approved. Your provider only recommends what's appropriate for your goals." },
  { q: "How do I pick a protocol?", a: "Your provider reviews your goals and health history in the free consultation and builds your plan." },
  { q: "Do all require injections?", a: "No. NAD+ comes oral, nasal, or injectable. GHK-Cu can be topical. Sermorelin is a small-gauge subcutaneous injection." },
  { q: "When will I notice results?", a: "NAD+ energy: 1–3 weeks. Sermorelin: 3–6 months. Results vary by individual." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container max-w-2xl">
        <div className="mb-10 text-center">
          <p className={eyebrow} style={{ color: GOLD }}>FAQ</p>
          <h2 className={`mt-3 ${heading}`} style={{ fontSize: "clamp(1.8rem,3.2vw,2.4rem)", fontWeight: 300, color: FOREST }}>
            Quick <em className="not-italic" style={{ color: GOLD }}>answers.</em>
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-2xl border bg-white/70 backdrop-blur-xl"
                style={{ borderColor: "rgba(28,58,46,0.1)", boxShadow: isOpen ? "0 12px 30px -20px rgba(28,58,46,0.3)" : "none" }}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                  <span className="font-serif text-base" style={{ color: FOREST }}>{f.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform" style={{ color: GOLD, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                <div className="grid overflow-hidden transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="min-h-0"><p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#3a5a44" }}>{f.a}</p></div>
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
  <section className="relative overflow-hidden py-24 md:py-28" style={{ background: FOREST }}>
    <div aria-hidden className="absolute inset-0 opacity-60"
      style={{ background: `radial-gradient(circle at 20% 20%, ${GOLD}33, transparent 50%), radial-gradient(circle at 80% 80%, #a8c8a044, transparent 50%)` }} />
    <div className="container relative max-w-xl text-center">
      <Package className="mx-auto h-7 w-7" style={{ color: GOLD }} />
      <h2 className={`mt-5 ${heading}`} style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", fontWeight: 300, color: WARM_WHITE }}>
        Your <em className="not-italic" style={{ color: GOLD }}>Glow + Energy</em> stack awaits.
      </h2>
      <div className="mt-8 flex justify-center">
        <Link to={QUIZ} onClick={() => trackEvent("quiz_started", { treatment: "peptides", cta: "final" })}
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium shadow-xl transition-all hover:-translate-y-0.5" style={{ color: FOREST }}>
          Find My Stack <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <p className="mt-10 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
        Treatment requires clinician review. Prescription treatments are only provided when medically appropriate. Results vary.
      </p>
    </div>
  </section>
);

const StickyMobileCta = () => (
  <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/90 p-3 backdrop-blur-xl md:hidden"
    style={{ borderColor: "rgba(28,58,46,0.12)", boxShadow: "0 -12px 30px -15px rgba(28,58,46,0.25)" }}>
    <Link to={QUIZ} onClick={() => trackEvent("quiz_started", { treatment: "peptides", cta: "sticky_mobile" })}
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
    <GoalSelection />
    <BuildYourStack />
    <BenefitMeters />
    <RecQuiz />
    <Timeline />
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
