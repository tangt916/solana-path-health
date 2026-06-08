import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Truck, HeartHandshake, BadgeCheck, Tag } from "lucide-react";
import heroWoman from "@/assets/hero-woman.jpg";
import walkingAutumn from "@/assets/walking-autumn.png.asset.json";
import sleepingWoman from "@/assets/sleeping-woman.jpg";
import yogaMeditation from "@/assets/yoga-meditation.png.asset.json";
import healthyHair from "@/assets/healthy-hair.jpg";
import outdoorHero from "@/assets/outdoor-hero.jpg";

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <div
    className={`animate-fade-in ${className}`}
    style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
  >
    {children}
  </div>
);

const PrimaryBtn = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(45,90,61,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgba(45,90,61,0.55)]"
    style={{ background: "linear-gradient(135deg,#3d6b4a 0%,#2d5a3d 60%,#1a3c2a 100%)" }}
  >
    {children}
    <ArrowRight className="h-4 w-4" />
  </Link>
);

const GhostBtn = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2d5a3d]/25 px-7 py-3.5 text-sm font-medium text-[#1a3c2a] transition-all hover:bg-[#2d5a3d]/5"
  >
    {children}
  </Link>
);

/* ----------------------------- HERO ----------------------------- */
const Hero = () => (
  <section className="relative overflow-hidden bg-white">
    {/* soft gradient washes */}
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -top-40 -left-40 h-[560px] w-[560px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(168,200,160,0.45), transparent)" }} />
      <div className="absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(232,220,200,0.55), transparent)" }} />
    </div>

    <div className="container relative pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* LEFT */}
        <div>
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2d5a3d]/15 bg-white/70 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#2d5a3d] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Personalized wellness
            </span>
          </FadeUp>
          <FadeUp delay={80}>
            <h1 className="mt-6 font-serif text-[clamp(2.6rem,5.6vw,4.6rem)] font-light leading-[1.02] tracking-tight text-[#0f1f12]">
              Feel better<br /> in your <em className="not-italic" style={{ color: "#3d6b4a" }}>body.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#4a5a4d] md:text-lg">
              Personalized treatments for weight, hormones, longevity, hair, and wellness — guided by licensed clinicians and built around your goals.
            </p>
          </FadeUp>
          <FadeUp delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryBtn to="/get-started">Get Started</PrimaryBtn>
              <GhostBtn to="#treatments">Explore Treatments</GhostBtn>
            </div>
          </FadeUp>
          <FadeUp delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#4a5a4d]">
              <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5 text-[#3d6b4a]" /> Licensed US clinicians</span>
              <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5 text-[#3d6b4a]" /> Free assessment</span>
              <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5 text-[#3d6b4a]" /> Delivered to your door</span>
            </div>
          </FadeUp>
        </div>

        {/* RIGHT — editorial image with floating glass cards */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(15,31,18,0.35)]">
            <img src={heroWoman} alt="" className="h-[520px] w-full object-cover md:h-[620px]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-[#1a3c2a]/15 via-transparent to-transparent" />
          </div>

          {/* floating glass cards */}
          {[
            { label: "Weight", top: "8%", left: "-6%", delay: 0 },
            { label: "Hormones", top: "30%", right: "-8%", delay: 600 },
            { label: "Longevity", bottom: "22%", left: "-8%", delay: 1200 },
            { label: "Hair", bottom: "6%", right: "-4%", delay: 1800 },
          ].map((c) => (
            <div
              key={c.label}
              className="absolute hidden md:block"
              style={{ top: c.top, left: c.left, right: c.right, bottom: c.bottom, animation: `floatY 5s ease-in-out ${c.delay}ms infinite` }}
            >
              <div className="rounded-2xl border border-white/60 bg-white/55 px-5 py-3 shadow-[0_10px_30px_-10px_rgba(15,31,18,0.25)] backdrop-blur-xl">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: "#3d6b4a" }} />
                  <span className="text-sm font-medium tracking-tight text-[#0f1f12]">{c.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <style>{`
      @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    `}</style>
  </section>
);

/* --------------------- WHAT TO IMPROVE --------------------- */
const ImproveCards = () => {
  const cards = [
    { title: "Weight Loss", img: walkingAutumn.url, copy: "Sustainable weight management with personalized GLP-1 options.", cta: "Explore Weight Loss", to: "/treatments/weight-loss" },
    { title: "Hormones", img: sleepingWoman, copy: "Support energy, mood, sleep, and overall wellbeing.", cta: "Explore Hormones", to: "/treatments/hormone-therapy" },
    { title: "Longevity", img: yogaMeditation.url, copy: "Advanced wellness therapies designed to support healthy aging.", cta: "Explore Longevity", to: "/treatments/anti-aging" },
    { title: "Hair", img: healthyHair, copy: "Clinically guided hair restoration treatments.", cta: "Explore Hair Health", to: "/treatments/hair-loss" },
  ];
  return (
    <section id="treatments" className="relative bg-white py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#3d6b4a]">Treatments</p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-[#0f1f12] md:text-5xl">
            What are you looking to <em className="not-italic" style={{ color: "#3d6b4a" }}>improve?</em>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="group relative block overflow-hidden rounded-3xl bg-white shadow-[0_8px_28px_-12px_rgba(15,31,18,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(15,31,18,0.3)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={c.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f12]/70 via-[#0f1f12]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-serif text-2xl font-normal">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">{c.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-white/95 transition-all group-hover:gap-2.5">
                    {c.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --------------------- HOW IT WORKS --------------------- */
const HowItWorks = () => {
  const steps = [
    { n: "01", title: "Complete Your Assessment", sub: "5 minutes" },
    { n: "02", title: "Meet With A Licensed Clinician", sub: "Personalized recommendations" },
    { n: "03", title: "Start Your Plan", sub: "Ongoing support, delivered to your door" },
  ];
  return (
    <section className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #f6f8f4 0%, #ffffff 100%)" }}>
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#3d6b4a]">How it works</p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-[#0f1f12] md:text-5xl">
            Healthcare designed <em className="not-italic" style={{ color: "#3d6b4a" }}>around you.</em>
          </h2>
        </div>

        <div className="relative mt-16">
          {/* connecting line */}
          <div aria-hidden className="absolute left-0 right-0 top-9 hidden h-px md:block"
            style={{ background: "linear-gradient(90deg, transparent, #c7d6c0 20%, #c7d6c0 80%, transparent)" }} />
          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative text-center">
                <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#3d6b4a]/20 bg-white shadow-[0_8px_24px_-8px_rgba(45,90,61,0.25)]">
                  <span className="font-serif text-xl text-[#3d6b4a]">{s.n}</span>
                </div>
                <h3 className="mt-6 font-serif text-xl text-[#0f1f12]">{s.title}</h3>
                <p className="mt-2 text-sm text-[#4a5a4d]">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* --------------------- POPULAR TREATMENTS CAROUSEL --------------------- */
const TREATMENT_GRADIENTS = [
  "linear-gradient(135deg,#a8c8a0,#3d6b4a)",
  "linear-gradient(135deg,#c7d6c0,#5a8a5c)",
  "linear-gradient(135deg,#e8dcc8,#a89878)",
  "linear-gradient(135deg,#b8d4c0,#2d5a3d)",
  "linear-gradient(135deg,#d4e0c8,#6b8a5e)",
  "linear-gradient(135deg,#e0d4c0,#8a7858)",
];
const PopularTreatments = () => {
  const treatments = [
    { name: "GLP-1 Weight Loss", desc: "Once-weekly support for sustainable weight loss." },
    { name: "GLP-1 Microdosing", desc: "Lower-dose protocols, fewer side effects." },
    { name: "Hormone Therapy", desc: "Restore energy, mood, and sleep." },
    { name: "NAD+", desc: "Cellular energy and longevity support." },
    { name: "Sermorelin", desc: "Recovery, sleep, and lean body composition." },
    { name: "Hair Loss", desc: "Clinically guided regrowth treatments." },
  ];
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#3d6b4a]">Popular treatments</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-[#0f1f12] md:text-5xl">
              Built for <em className="not-italic" style={{ color: "#3d6b4a" }}>real life.</em>
            </h2>
          </div>
          <Link to="/treatments" className="hidden text-sm font-medium text-[#3d6b4a] underline-offset-4 hover:underline md:inline-flex">
            View all treatments →
          </Link>
        </div>

        <div className="mt-12 -mx-4 overflow-x-auto px-4 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex snap-x snap-mandatory gap-5">
            {treatments.map((t, i) => (
              <div key={t.name} className="group w-[280px] shrink-0 snap-start sm:w-[320px]">
                <div className="overflow-hidden rounded-3xl border border-[#0f1f12]/5 bg-white shadow-[0_10px_30px_-15px_rgba(15,31,18,0.2)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(15,31,18,0.3)]">
                  <div className="relative h-44 overflow-hidden" style={{ background: TREATMENT_GRADIENTS[i] }}>
                    <div aria-hidden className="absolute inset-0 opacity-40"
                      style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 60%)" }} />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                      <span className="rounded-full bg-white/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#0f1f12] backdrop-blur">
                        Protocol
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-[#0f1f12]">{t.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4a5a4d]">{t.desc}</p>
                    <Link to="/get-started" className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#3d6b4a] transition-all group-hover:gap-2.5">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* --------------------- WHY SOLANA --------------------- */
const WhySolana = () => {
  const items = [
    { icon: Sparkles, title: "Personalized Care", desc: "Plans built around your goals and biology." },
    { icon: BadgeCheck, title: "Licensed Clinicians", desc: "US-based providers, not chatbots." },
    { icon: ShieldCheck, title: "Evidence-Based", desc: "Protocols grounded in current research." },
    { icon: Truck, title: "Home Delivery", desc: "Discreet, refrigerated when needed." },
    { icon: HeartHandshake, title: "Ongoing Support", desc: "Message your care team anytime." },
    { icon: Tag, title: "Transparent Pricing", desc: "Flat monthly pricing. Cancel anytime." },
  ];
  return (
    <section className="relative py-24 md:py-32"
      style={{ background: "linear-gradient(180deg,#ffffff,#f6f8f4)" }}>
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#3d6b4a]">Why Solana</p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-[#0f1f12] md:text-5xl">
            Premium care, <em className="not-italic" style={{ color: "#3d6b4a" }}>thoughtfully delivered.</em>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title}
              className="group rounded-3xl border border-white/70 bg-white/60 p-7 backdrop-blur-xl shadow-[0_8px_28px_-15px_rgba(15,31,18,0.15)] transition-all hover:-translate-y-1 hover:bg-white/85">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg,#dceadd,#a8c8a0)" }}>
                <Icon className="h-5 w-5 text-[#1a3c2a]" />
              </div>
              <h3 className="mt-5 font-serif text-xl text-[#0f1f12]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4a5a4d]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --------------------- FINAL CTA --------------------- */
const FinalCta = () => (
  <section className="relative overflow-hidden">
    <div className="relative h-[560px] w-full md:h-[640px]">
      <img src={outdoorHero} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#0f1f12]/55 via-[#0f1f12]/25 to-transparent" />
      <div className="container relative flex h-full items-center">
        <div className="max-w-2xl text-white">
          <FadeUp>
            <h2 className="font-serif text-4xl font-light leading-[1.05] md:text-6xl">
              Your health goals deserve more than <em className="not-italic">one-size-fits-all care.</em>
            </h2>
          </FadeUp>
          <FadeUp delay={120}>
            <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
              Become the healthiest, strongest, most confident version of yourself.
            </p>
          </FadeUp>
          <FadeUp delay={220}>
            <div className="mt-8">
              <Link to="/get-started"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-[#0f1f12] shadow-xl transition-all hover:-translate-y-0.5">
                Start Your Assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  </section>
);

export const SolanaHome = () => (
  <>
    <Hero />
    <ImproveCards />
    <HowItWorks />
    <PopularTreatments />
    <WhySolana />
    <FinalCta />
  </>
);
