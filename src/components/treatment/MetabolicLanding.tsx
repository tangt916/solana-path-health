import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Sparkles, TrendingDown, Brain, Salad, HeartPulse, ShieldCheck, Stethoscope, Truck,
  ArrowRight, ChevronDown, ClipboardList, Pill, RefreshCw, Target, Activity, Smile,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SafetyInfo } from "@/components/landing/SafetyInfo";
import { trackEvent } from "@/lib/analytics";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { FOREST, GOLD, WARM_WHITE, SAGE } from "./shared";

const QUIZ = "/get-started/weight-loss";
const eyebrow = "text-[11px] font-medium uppercase tracking-[0.22em]";
const heading = "font-serif leading-[1.05]";

/* ----------------------------- buttons ----------------------------- */
const PrimaryBtn = ({ to = QUIZ, children, onClick, className = "" }: { to?: string; children: React.ReactNode; onClick?: () => void; className?: string }) => (
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
const JourneyChart = () => {
  const milestones = [
    { label: "Week 1", y: 88, note: "Start" },
    { label: "Week 4", y: 70, note: "Adjustment" },
    { label: "Week 12", y: 45, note: "Momentum" },
    { label: "Week 24", y: 22, note: "Sustained" },
  ];
  const w = 360, h = 200, pad = 24;
  const xs = (i: number) => pad + (i * (w - pad * 2)) / (milestones.length - 1);
  const ys = (v: number) => pad + ((100 - v) * (h - pad * 2)) / 100;
  const path = milestones.map((m, i) => `${i === 0 ? "M" : "L"} ${xs(i)} ${ys(m.y)}`).join(" ");
  const area = `${path} L ${xs(milestones.length - 1)} ${h - pad} L ${xs(0)} ${h - pad} Z`;

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="relative overflow-hidden rounded-[2rem] border bg-white/55 p-6 backdrop-blur-xl"
        style={{ borderColor: "rgba(255,255,255,0.8)", boxShadow: "0 24px 60px -25px rgba(28,58,46,0.3)" }}>
        <div aria-hidden className="absolute inset-0 -z-10"
          style={{ background: `linear-gradient(135deg, ${SAGE} 0%, rgba(232,220,200,0.5) 60%, #fff 100%)` }} />

        <div className="flex items-center justify-between">
          <div>
            <p className={eyebrow} style={{ color: GOLD }}>Your Progress</p>
            <p className="mt-1 font-serif text-lg" style={{ color: FOREST }}>Sustainable journey</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs backdrop-blur" style={{ color: FOREST }}>
            <TrendingDown className="h-3.5 w-3.5" style={{ color: GOLD }} /> On track
          </span>
        </div>

        <svg viewBox={`0 0 ${w} ${h}`} className="mt-5 w-full">
          <defs>
            <linearGradient id="areaG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={FOREST} stopOpacity="0.35" />
              <stop offset="100%" stopColor={FOREST} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#areaG)" />
          <path d={path} fill="none" stroke={FOREST} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {milestones.map((m, i) => (
            <g key={m.label}>
              <circle cx={xs(i)} cy={ys(m.y)} r="6" fill="white" stroke={GOLD} strokeWidth="2.5" />
              <text x={xs(i)} y={h - 6} textAnchor="middle" fontSize="10" fill={FOREST} opacity="0.7">{m.label}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* floating cards */}
      {[
        { icon: Brain, label: "Reduced Cravings", top: "-4%", left: "-10%", delay: 0 },
        { icon: Salad, label: "Better Portions", top: "30%", right: "-12%", delay: 600 },
        { icon: TrendingDown, label: "Sustainable Progress", bottom: "10%", left: "-12%", delay: 1200 },
        { icon: HeartPulse, label: "Personalized Care", bottom: "-6%", right: "-6%", delay: 1800 },
      ].map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="absolute hidden md:block"
            style={{ top: c.top, left: c.left, right: c.right, bottom: c.bottom, animation: `floatY 6s ease-in-out ${c.delay}ms infinite` }}>
            <div className="rounded-2xl border bg-white/65 px-4 py-2.5 backdrop-blur-xl shadow-[0_12px_30px_-12px_rgba(28,58,46,0.25)]"
              style={{ borderColor: "rgba(255,255,255,0.7)" }}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg, ${SAGE}, #dceadd)` }}>
                  <Icon className="h-3.5 w-3.5" style={{ color: FOREST }} />
                </span>
                <p className="text-xs font-medium" style={{ color: FOREST }}>{c.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Hero = () => (
  <section className="relative overflow-hidden bg-white">
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(168,200,160,0.55), transparent)" }} />
      <div className="absolute -bottom-40 -right-20 h-[520px] w-[520px] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(closest-side, rgba(201,169,110,0.3), transparent)" }} />
    </div>

    <div className="container relative grid items-center gap-12 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 ${eyebrow}`}
          style={{ borderColor: `${FOREST}22`, color: FOREST, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
          <Sparkles className="h-3.5 w-3.5" style={{ color: GOLD }} /> Medical Weight Loss
        </span>
        <h1 className={`mt-6 ${heading}`} style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)", fontWeight: 300, color: FOREST }}>
          Weight loss that works <em className="not-italic" style={{ background: `linear-gradient(135deg, ${GOLD}, #8a6a2a)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>with your body.</em>
        </h1>
        <p className="mt-5 max-w-xl text-base md:text-lg" style={{ color: "#3a5a44" }}>
          Personalized medical weight loss with compounded, branded, and microdose GLP-1 options.
        </p>
        <p className="mt-3 max-w-xl text-sm" style={{ color: "#5a7060" }}>
          No crash diets. No all-or-nothing approach. Just a plan built around your goals, lifestyle, and long-term success.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PrimaryBtn onClick={() => trackEvent("quiz_started", { treatment: "weight-loss", cta: "hero" })}>Check Eligibility</PrimaryBtn>
          <GhostBtn to="#options">Explore Options</GhostBtn>
        </div>
      </div>

      <JourneyChart />
    </div>

    <style>{`@keyframes floatY {0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)}}`}</style>
  </section>
);

/* --------------------- GOALS --------------------- */
const GOALS = [
  { title: "Feel More In Control Around Food", body: "Reduce food noise and build healthier eating habits.", icon: Brain },
  { title: "Lose Weight Sustainably", body: "Long-term progress, not short-term dieting.", icon: TrendingDown },
  { title: "Improve Metabolic Health", body: "Support overall health alongside weight loss.", icon: HeartPulse },
  { title: "Feel Better In Your Body", body: "Move, dress, and live with greater confidence.", icon: Smile },
];

const Goals = () => (
  <section className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg,#fff,#f6f8f4)" }}>
    <div className="container">
      <div className="mx-auto max-w-xl text-center">
        <p className={eyebrow} style={{ color: GOLD }}>Your goals</p>
        <h2 className={`mt-3 ${heading}`} style={{ fontSize: "clamp(1.9rem,3.4vw,2.8rem)", fontWeight: 300, color: FOREST }}>
          What are you hoping to <em className="not-italic" style={{ color: GOLD }}>change?</em>
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {GOALS.map((g) => {
          const Icon = g.icon;
          return (
            <Link key={g.title} to={QUIZ}
              onClick={() => trackEvent("quiz_started", { treatment: "weight-loss", goal: g.title })}
              className="group relative overflow-hidden rounded-3xl border bg-white/70 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_-20px_rgba(28,58,46,0.25)]"
              style={{ borderColor: "rgba(255,255,255,0.8)", boxShadow: "0 8px 24px -16px rgba(28,58,46,0.18)" }}>
              <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle, ${GOLD}55, transparent)` }} />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${SAGE}, #dceadd)` }}>
                <Icon className="h-5 w-5" style={{ color: FOREST }} />
              </span>
              <h3 className="relative mt-5 font-serif text-lg" style={{ color: FOREST, fontWeight: 500 }}>{g.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed" style={{ color: "#3a5a44" }}>{g.body}</p>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

/* --------------------- OPTIONS --------------------- */
type Opt = { name: string; best: string; highlights: string[]; tag?: string; gradient: string; accent: string };
const OPTIONS: Opt[] = [
  {
    name: "Compounded GLP-1",
    best: "Budget-conscious patients.",
    highlights: ["Lower cost", "Flexible dosing", "Personalized approach"],
    gradient: "linear-gradient(135deg,#f0f7e8,#a8c8a0 70%,#3d6b4a)",
    accent: "#2d5a3d",
  },
  {
    name: "Branded GLP-1",
    best: "Patients seeking FDA-approved branded medications.",
    highlights: ["Brand-name medications", "Established treatment options"],
    tag: "Most popular",
    gradient: "linear-gradient(135deg,#fdf4e8,#e8dcc8 70%,#c9a96e)",
    accent: "#8a6a2a",
  },
  {
    name: "Microdose GLP-1",
    best: "A lower-dose wellness-focused approach.",
    highlights: ["Smaller doses", "Appetite support", "Weight maintenance support"],
    gradient: "linear-gradient(135deg,#e8f4ee,#c7d6c0 70%,#5a8a5c)",
    accent: "#2d5a4d",
  },
];

const OptionCard = ({ o }: { o: Opt }) => (
  <div className="group relative h-full overflow-hidden rounded-3xl border bg-white/60 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2"
    style={{ borderColor: "rgba(255,255,255,0.7)", boxShadow: "0 16px 40px -20px rgba(28,58,46,0.22)" }}>
    <div aria-hidden className="absolute inset-0 opacity-90" style={{ background: o.gradient }} />
    <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/15 to-white/40" />
    <div aria-hidden className="absolute -right-8 -bottom-8 h-40 w-24 rounded-[40%_40%_30%_30%/55%_55%_15%_15%] opacity-60 blur-[2px] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
      style={{ background: `linear-gradient(180deg, ${o.accent}aa, ${o.accent}55)` }} />
    <div className="relative">
      {o.tag && (
        <span className="mb-4 inline-flex rounded-full bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur"
          style={{ color: o.accent }}>{o.tag}</span>
      )}
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 backdrop-blur-xl">
        <Pill className="h-5 w-5" style={{ color: o.accent }} />
      </span>
      <h3 className="mt-5 font-serif text-2xl" style={{ color: FOREST, fontWeight: 500 }}>{o.name}</h3>
      <p className={`mt-4 ${eyebrow}`} style={{ color: o.accent }}>Best for</p>
      <p className="mt-1 text-sm" style={{ color: "#3a5a44" }}>{o.best}</p>
      <p className={`mt-5 ${eyebrow}`} style={{ color: o.accent }}>Highlights</p>
      <ul className="mt-2 space-y-1.5">
        {o.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm" style={{ color: "#2d4a3a" }}>
            <span style={{ color: o.accent }}>•</span> {h}
          </li>
        ))}
      </ul>
      <Link to={QUIZ} onClick={() => trackEvent("quiz_started", { treatment: "weight-loss", option: o.name })}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5" style={{ color: FOREST }}>
        See if it fits <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  </div>
);

const Options = () => (
  <section id="options" className="relative bg-white py-20 md:py-24">
    <div className="container">
      <div className="mx-auto max-w-xl text-center">
        <p className={eyebrow} style={{ color: GOLD }}>Your options</p>
        <h2 className={`mt-3 ${heading}`} style={{ fontSize: "clamp(1.9rem,3.4vw,2.8rem)", fontWeight: 300, color: FOREST }}>
          Choose the approach that <em className="not-italic" style={{ color: GOLD }}>fits your goals.</em>
        </h2>
      </div>

      <div className="mt-12 hidden gap-6 md:grid md:grid-cols-3">
        {OPTIONS.map((o) => <OptionCard key={o.name} o={o} />)}
      </div>
      <div className="mt-12 md:hidden">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent className="-ml-4">
            {OPTIONS.map((o) => (
              <CarouselItem key={o.name} className="basis-[88%] pl-4"><OptionCard o={o} /></CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  </section>
);

/* --------------------- WHY --------------------- */
const WHY = [
  { icon: Brain, title: "Reduced Food Noise" },
  { icon: Target, title: "Appetite Control" },
  { icon: Salad, title: "Healthier Habits" },
  { icon: HeartPulse, title: "Personalized Support" },
  { icon: RefreshCw, title: "Long-Term Sustainability" },
  { icon: Stethoscope, title: "Clinician Guidance" },
];

const Why = () => (
  <section className="py-20" style={{ background: "linear-gradient(180deg,#f6f8f4,#fff)" }}>
    <div className="container">
      <div className="mx-auto max-w-xl text-center">
        <p className={eyebrow} style={{ color: GOLD }}>Why GLP-1</p>
        <h2 className={`mt-3 ${heading}`} style={{ fontSize: "clamp(1.9rem,3.4vw,2.6rem)", fontWeight: 300, color: FOREST }}>
          Why patients <em className="not-italic" style={{ color: GOLD }}>choose GLP-1.</em>
        </h2>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHY.map(({ icon: Icon, title }) => (
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

/* --------------------- TIMELINE --------------------- */
const STEPS = [
  { icon: ClipboardList, label: "Complete Assessment", sub: "5 minutes" },
  { icon: Stethoscope, label: "Clinician Review", sub: "Personalized recommendations" },
  { icon: Pill, label: "Start Treatment", sub: "Shipped if prescribed" },
  { icon: Activity, label: "Ongoing Support", sub: "Adjustments & follow-up" },
];

const Timeline = () => (
  <section className="bg-white py-20 md:py-24">
    <div className="container">
      <div className="mx-auto max-w-xl text-center">
        <p className={eyebrow} style={{ color: GOLD }}>How it works</p>
        <h2 className={`mt-3 ${heading}`} style={{ fontSize: "clamp(1.9rem,3.4vw,2.6rem)", fontWeight: 300, color: FOREST }}>
          From assessment to <em className="not-italic" style={{ color: GOLD }}>doorstep.</em>
        </h2>
      </div>

      <div className="relative mt-16">
        <div aria-hidden className="absolute left-0 right-0 top-9 hidden h-px md:block"
          style={{ background: `linear-gradient(90deg, transparent, ${FOREST}30 15%, ${FOREST}30 85%, transparent)` }} />
        <div className="grid gap-10 md:grid-cols-4">
          {STEPS.map((s, i) => {
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

/* --------------------- NOT SURE --------------------- */
const NotSure = () => (
  <section className="relative overflow-hidden py-20 md:py-24">
    <div aria-hidden className="absolute inset-0"
      style={{ background: `linear-gradient(135deg, ${SAGE} 0%, #fff 50%, rgba(232,220,200,0.5) 100%)` }} />
    <div aria-hidden className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl opacity-50"
      style={{ background: `radial-gradient(circle, ${GOLD}44, transparent)` }} />
    <div className="container relative">
      <div className="mx-auto max-w-2xl rounded-[2rem] border bg-white/75 p-10 text-center backdrop-blur-xl md:p-14"
        style={{ borderColor: "rgba(255,255,255,0.8)", boxShadow: "0 24px 60px -25px rgba(28,58,46,0.25)" }}>
        <p className={eyebrow} style={{ color: GOLD }}>Not sure which option?</p>
        <h2 className={`mt-3 ${heading}`} style={{ fontSize: "clamp(1.8rem,3.2vw,2.6rem)", fontWeight: 300, color: FOREST }}>
          That's exactly why we start with <em className="not-italic" style={{ color: GOLD }}>your goals.</em>
        </h2>
        <p className="mt-5 text-base leading-relaxed" style={{ color: "#3a5a44" }}>
          Most people don't know whether compounded, branded, or microdose GLP-1 is the best fit. A licensed clinician reviews your information and helps determine which options may be appropriate.
        </p>
        <div className="mt-8 flex justify-center">
          <PrimaryBtn onClick={() => trackEvent("quiz_started", { treatment: "weight-loss", cta: "not_sure" })}>Start Assessment</PrimaryBtn>
        </div>
      </div>
    </div>
  </section>
);

/* --------------------- FAQ --------------------- */
const FAQS = [
  { q: "What is GLP-1?", a: "GLP-1 (glucagon-like peptide-1) is a hormone that helps regulate appetite and blood sugar. GLP-1 medications support feelings of fullness, reduce food noise, and slow stomach emptying." },
  { q: "What's the difference between compounded and branded GLP-1?", a: "Branded GLP-1 medications (like Wegovy® or Zepbound®) are FDA-approved products. Compounded GLP-1 is prepared by a licensed compounding pharmacy and is often more flexible and affordable, but is not individually FDA-approved." },
  { q: "What is microdosing?", a: "Microdosing uses smaller-than-standard GLP-1 doses for appetite support, gentler side-effect profiles, and weight maintenance — often after reaching a goal weight or for a more measured approach." },
  { q: "How quickly will I see results?", a: "Many patients notice reduced appetite within the first 1–2 weeks. Visible weight changes typically appear over 4–12 weeks. Results vary by individual and protocol." },
  { q: "Am I eligible?", a: "Eligibility depends on your health history, BMI, and clinical factors. The free assessment helps your clinician determine whether GLP-1 treatment is appropriate for you." },
  { q: "Do I need insurance?", a: "No. Solana operates as a direct-pay program with transparent monthly pricing — no insurance required." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container max-w-2xl">
        <div className="mb-10 text-center">
          <p className={eyebrow} style={{ color: GOLD }}>FAQ</p>
          <h2 className={`mt-3 ${heading}`} style={{ fontSize: "clamp(1.8rem,3.2vw,2.4rem)", fontWeight: 300, color: FOREST }}>
            Common <em className="not-italic" style={{ color: GOLD }}>questions.</em>
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
      <TrendingDown className="mx-auto h-7 w-7" style={{ color: GOLD }} />
      <h2 className={`mt-5 ${heading}`} style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", fontWeight: 300, color: WARM_WHITE }}>
        Take the first step toward <em className="not-italic" style={{ color: GOLD }}>sustainable weight loss.</em>
      </h2>
      <p className="mt-5 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
        Discover which GLP-1 options may fit your goals.
      </p>
      <div className="mt-8 flex justify-center">
        <Link to={QUIZ} onClick={() => trackEvent("quiz_started", { treatment: "weight-loss", cta: "final" })}
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium shadow-xl transition-all hover:-translate-y-0.5" style={{ color: FOREST }}>
          Check Eligibility <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <p className="mt-10 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
        Treatment requires clinician review and approval. Prescription medications are only provided when medically appropriate. Individual results vary.
      </p>
    </div>
  </section>
);

const StickyMobileCta = () => (
  <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/90 p-3 backdrop-blur-xl md:hidden"
    style={{ borderColor: "rgba(28,58,46,0.12)", boxShadow: "0 -12px 30px -15px rgba(28,58,46,0.25)" }}>
    <Link to={QUIZ} onClick={() => trackEvent("quiz_started", { treatment: "weight-loss", cta: "sticky_mobile" })}
      className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white"
      style={{ background: `linear-gradient(135deg, ${FOREST}, #2d5a3d)` }}>
      Check Eligibility <ArrowRight className="h-4 w-4" />
    </Link>
  </div>
);

export const MetabolicLanding = () => (
  <div className="min-h-screen bg-white">
    <Header />
    <Hero />
    <Goals />
    <Options />
    <Why />
    <Timeline />
    <NotSure />
    <FAQ />
    <FinalCta />
    <SafetyInfo />
    <Footer />
    <StickyMobileCta />
    <div className="h-20 md:hidden" />
  </div>
);

export default MetabolicLanding;
