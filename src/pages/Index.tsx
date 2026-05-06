import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackEvent } from "@/lib/analytics";
import { ChevronDown, ChevronUp } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   SVG COMPONENTS (unchanged)
   ═══════════════════════════════════════════════════════ */

const MainPill = () => (
  <svg width="190" height="190" viewBox="0 0 190 190">
    <defs>
      <radialGradient id="pillGrad" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#f8f5fc" />
        <stop offset="100%" stopColor="#a090c8" />
      </radialGradient>
    </defs>
    <ellipse cx="95" cy="95" rx="80" ry="80" fill="url(#pillGrad)" />
    <ellipse cx="70" cy="60" rx="35" ry="20" fill="rgba(255,255,255,0.35)" transform="rotate(-20 70 60)" />
    <text x="95" y="105" textAnchor="middle" fontFamily="'Fraunces', serif" fontStyle="italic" fontSize="22" fill="#6a5a8a" opacity="0.7">novo</text>
  </svg>
);

const SmallPill = ({ size = 40, color = "#c8b8e8" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <ellipse cx="20" cy="20" rx="16" ry="16" fill={color} opacity="0.6" />
    <ellipse cx="15" cy="14" rx="7" ry="4" fill="rgba(255,255,255,0.4)" transform="rotate(-15 15 14)" />
  </svg>
);

const InjectionPen = ({ rotation, color, label, delay }: { rotation: number; color: string; label: string; delay: number }) => (
  <div
    className={`animate-pen-${delay}`}
    style={{
      position: 'absolute',
      transformOrigin: '50% 100%',
      transform: `rotate(${rotation}deg)`,
    }}
  >
    <svg width="36" height="200" viewBox="0 0 36 200">
      <defs>
        <linearGradient id={`pen-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0ede8" />
          <stop offset="100%" stopColor="#d8d4cc" />
        </linearGradient>
      </defs>
      <rect x="8" y="30" width="20" height="140" rx="4" fill={`url(#pen-${label})`} />
      <rect x="14" y="0" width="8" height="35" rx="2" fill="#c8c4bc" />
      <rect x="8" y="90" width="20" height="30" rx="2" fill={color} />
      <text x="18" y="109" textAnchor="middle" fontSize="7" fill="white" fontFamily="'DM Sans', sans-serif" fontWeight="500">{label}</text>
      <rect x="10" y="170" width="16" height="20" rx="8" fill="#e0dcd4" />
    </svg>
  </div>
);

const CheckCircle = ({ filled = true }: { filled?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" className="shrink-0">
    {filled ? (
      <>
        <circle cx="11" cy="11" r="11" fill="#a8d44a" />
        <path d="M7 11l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        <circle cx="11" cy="11" r="10" fill="none" stroke="#a8d44a" strokeWidth="1.5" />
        <path d="M7 11l3 3 5-5" stroke="#a8d44a" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )}
  </svg>
);

/* ═══════════════════════════════════════════════════════
   HERO — wellness coach positioning
   ═══════════════════════════════════════════════════════ */
const Hero = () => (
  <section className="relative min-h-screen">
    <div className="absolute inset-0" style={{
      background: `
        radial-gradient(ellipse 60% 80% at 75% 55%, #e8f5d8 0%, transparent 65%),
        radial-gradient(ellipse 50% 60% at 15% 80%, #c8e0b0 0%, transparent 55%),
        linear-gradient(148deg, #faf6ee 0%, #eef6e4 50%, #ddeec8 100%)
      `,
    }} />

    <div className="container relative z-10 grid min-h-screen items-center lg:grid-cols-2 gap-12 py-24">
      {/* Left text */}
      <div className="max-w-lg">
        <p className="text-xs font-medium uppercase tracking-[0.18em] mb-6" style={{ color: '#2d4a1e' }}>
          Holistic health & wellness, delivered
        </p>
        <h1 className="font-serif leading-[1.08]" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', fontWeight: 300, color: '#0f1f12' }}>
          Look, feel, and live
          <br />
          <em style={{ color: '#1a3a1e' }}>like your best self.</em>
        </h1>
        <p className="mt-6 text-base leading-relaxed" style={{ fontWeight: 300, color: '#1e3a22' }}>
          Personalized care for the things that actually move the needle on how you feel — weight, skin and longevity, hormones, and hair. Licensed providers, a dedicated care team, and treatments shipped to your door.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/get-started"
            onClick={() => trackEvent("quiz_started")}
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: '#0f1f12', color: '#faf6ee' }}
          >
            Find my treatment →
          </Link>
          <a
            href="#treatments"
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium border transition-opacity hover:opacity-70"
            style={{ borderColor: '#0f1f12', color: '#0f1f12' }}
          >
            Explore treatments
          </a>
        </div>
        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            '🩺 Licensed US providers',
            '💬 1:1 coaching support',
            '📦 Delivered to your door',
          ].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full border border-border/40 bg-white/60 px-3 py-1.5 text-xs font-medium"
              style={{ color: '#1e3a22' }}
            >
              {badge}
            </span>
          ))}
        </div>
        <p className="mt-4" style={{ fontSize: '0.7rem', color: '#4a6040' }}>
          Membership required · Prescription not guaranteed
        </p>
      </div>

      {/* Right visual */}
      <div className="relative hidden lg:flex items-center justify-center" style={{ minHeight: '450px' }}>
        <div className="animate-shadow-pulse absolute" style={{ bottom: '60px', left: '50%', transform: 'translateX(-50%)' }}>
          <svg width="160" height="30" viewBox="0 0 160 30">
            <ellipse cx="80" cy="15" rx="70" ry="12" fill="rgba(0,0,0,0.1)" />
          </svg>
        </div>
        <div className="animate-pill-bounce relative z-10">
          <MainPill />
        </div>
        <div className="animate-small-pill-1 absolute" style={{ top: '40px', left: '30px' }}>
          <SmallPill size={36} color="#d8c8f0" />
        </div>
        <div className="animate-small-pill-2 absolute" style={{ bottom: '80px', right: '20px' }}>
          <SmallPill size={28} color="#b8e098" />
        </div>
        <div className="animate-small-pill-3 absolute" style={{ top: '50%', left: '-10px' }}>
          <SmallPill size={32} color="#c8d8f0" />
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   PILLARS — what's included in your wellness plan
   ═══════════════════════════════════════════════════════ */
const Pillars = () => {
  const pillars = [
    {
      title: 'Personal coaching',
      desc: 'A dedicated coach who helps you build sustainable habits around food, movement, and stress.',
    },
    {
      title: 'Clinical care',
      desc: 'Licensed providers review your health, answer your questions, and adjust your plan as you progress.',
    },
    {
      title: 'Whole-person support',
      desc: 'Nutrition, sleep, mindset, and (when appropriate) prescription options — all coordinated in one place.',
    },
  ];

  const stats: { number: string; label: string; cite: string }[] = [];

  return (
    <section className="py-16" style={{ background: '#ffffff' }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] mb-4" style={{ color: '#2d4a1e' }}>
            What you get
          </p>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 300, color: '#0f1f12' }}>
            More than a prescription — <em style={{ color: '#1a3a1e' }}>a complete plan.</em>
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border/30 bg-white p-6 shadow-sm"
            >
              <h3 className="font-serif text-xl mb-2" style={{ fontWeight: 400, color: '#0f1f12' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-2" style={{ borderTop: '1px solid #cddbc6', borderBottom: '1px solid #cddbc6' }}>
          {stats.map((s, i) => (
            <div
              key={s.number}
              className="text-center py-12 px-6"
              style={{ borderRight: i < stats.length - 1 ? '1px solid #cddbc6' : undefined }}
            >
              <p className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 300, color: '#0f1f12' }}>{s.number}</p>
              <p className="mt-2 text-sm" style={{ color: '#2a3e2e' }}>{s.label}</p>
              <p className="mt-1" style={{ fontSize: '0.68rem', color: '#4a6a50' }}>{s.cite}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   TREATMENTS — 4 focus areas (problem → solution)
   ═══════════════════════════════════════════════════════ */
const Treatments = () => {
  const areas = [
    {
      eyebrow: 'Weight loss',
      problem: 'Struggling to lose weight despite diet and exercise?',
      solution: 'Physician-guided GLP-1 programs (semaglutide, tirzepatide) paired with nutrition and lifestyle coaching for sustainable results.',
      bullets: ['Compounded GLP-1 options if appropriate', 'Monthly provider check-ins', 'Nutrition & habit coaching'],
      gradient: 'linear-gradient(145deg, #e0ecda, #cce0c0)',
    },
    {
      eyebrow: 'Anti-aging, skin & longevity',
      problem: 'Want sharper energy, better skin, and to age on your terms?',
      solution: 'Longevity-focused protocols including NAD+ and methylene blue, alongside skincare designed to support cellular health and a healthy glow.',
      bullets: ['NAD+ support for energy & cellular health', 'Methylene blue protocols', 'Provider-guided skin & longevity plan'],
      gradient: 'linear-gradient(145deg, #ede5f5, #d8c8ec)',
    },
    {
      eyebrow: 'Hormone therapy',
      problem: 'Perimenopause or menopause changing how you feel?',
      solution: 'Personalized hormone therapy for women navigating perimenopause and menopause — hot flashes, sleep, mood, libido, and more.',
      bullets: ['Bioidentical hormone options', 'Symptom-based personalized plans', 'Ongoing provider support'],
      gradient: 'linear-gradient(145deg, #f5e0ea, #ecc8d8)',
    },
    {
      eyebrow: 'Hair loss',
      problem: 'Noticing thinning hair or a receding hairline?',
      solution: 'Clinically proven hair loss treatments prescribed by licensed providers — topical and oral options tailored to your pattern of loss.',
      bullets: ['Finasteride, minoxidil & combinations', 'Personalized to your hair type', 'Discreetly shipped monthly'],
      gradient: 'linear-gradient(145deg, #e0e8f5, #c8d4ec)',
    },
  ];

  return (
    <section id="treatments" className="py-20" style={{ background: '#faf6ee' }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] mb-4" style={{ color: '#2d4a1e' }}>
            What we treat
          </p>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 300, color: '#0f1f12' }}>
            Care for what matters most — <em style={{ color: '#1a3a1e' }}>all in one place.</em>
          </h2>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>
            Find your concern below. A licensed provider will review your intake and build a plan tailored to you.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {areas.map((a) => (
            <div
              key={a.eyebrow}
              className="rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(45,74,50,0.15)]"
              style={{
                background: a.gradient,
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(45,74,50,0.08)',
              }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] mb-3" style={{ color: '#2d4a1e' }}>
                {a.eyebrow}
              </p>
              <h3 className="font-serif text-2xl leading-snug" style={{ fontWeight: 400, color: '#0f1f12' }}>
                {a.problem}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>
                {a.solution}
              </p>
              <ul className="mt-5 space-y-2">
                {a.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <CheckCircle filled />
                    <span className="text-sm" style={{ color: '#0f1f12' }}>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/get-started"
                onClick={() => trackEvent("quiz_started")}
                className="mt-6 inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: '#0f1f12', color: '#faf6ee' }}
              >
                Get started →
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center max-w-2xl mx-auto" style={{ fontSize: '0.7rem', color: '#4a6a50' }}>
          All prescribing decisions are made solely by independent licensed healthcare providers. Approval and treatment options vary based on your individual health profile. Results may vary.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════════════ */
const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Tell us about yourself', desc: 'Answer a few questions about your health history and weight loss journey. No blood tests, no office visits.' },
    { num: '02', title: 'Meet your provider', desc: "A licensed clinician reviews your intake and meets with you via video. They'll determine if GLP-1 therapy is right for you — usually within 24 hours." },
    { num: '03', title: 'Medication at your door', desc: 'If prescribed, your medication ships from a licensed compounding pharmacy directly to your home. Discreet packaging, free shipping.' },
    { num: '04', title: 'Supported every step', desc: 'Monthly check-ins with your care team, dose adjustments as you progress, and a provider you can message anytime.' },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl py-20 lg:py-24 px-6 lg:px-12">
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 70% 60% at 0% 100%, #c8dca8 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at 100% 0%, #e0ecce 0%, transparent 55%),
              linear-gradient(130deg, #e8f2da 0%, #f0f6e8 50%, #ddeac8 100%)
            `,
          }} />
          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-16" style={{ fontWeight: 300, color: '#0f1f12' }}>
              Simple steps to<br /><em style={{ color: '#1a3a1e' }}>real results</em>
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className="rounded-2xl p-6 transition-shadow hover:shadow-[0_4px_20px_rgba(45,74,50,0.08)]"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(168,212,74,0.3)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <p className="font-serif text-3xl mb-3" style={{ fontWeight: 300, color: '#a8d44a' }}>{s.num}</p>
                  <h4 className="text-sm font-medium mb-2" style={{ color: '#0f1f12', fontFamily: 'var(--font-sans)' }}>{s.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/get-started"
                onClick={() => trackEvent("quiz_started")}
                className="inline-flex items-center rounded-full px-8 py-3 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: '#0f1f12', color: '#faf6ee' }}
              >
                Start Losing Weight →
              </Link>
            </div>
            <p className="mt-8 text-center italic font-serif text-sm" style={{ color: '#2d4a2a' }}>
              All prescribing decisions are made solely by independent licensed healthcare providers. Approval is not guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Benefits section removed — copy was overly specific to a single FDA-approved indication */

/* ═══════════════════════════════════════════════════════
   MEMBERSHIP
   ═══════════════════════════════════════════════════════ */
const Membership = () => (
  <section id="membership" className="relative overflow-hidden">
    <div className="absolute inset-0" style={{
      background: `
        radial-gradient(ellipse 55% 70% at 80% 45%, #3a6040 0%, transparent 60%),
        radial-gradient(ellipse 40% 50% at 10% 90%, #a8c870 0%, transparent 50%),
        radial-gradient(ellipse 60% 40% at 50% 5%, #2a4030 0%, transparent 55%),
        linear-gradient(150deg, #1a2f1e 0%, #243828 40%, #1e3522 70%, #162418 100%)
      `,
    }} />
    <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 50% 50% at 55% 50%, rgba(168,212,74,0.1) 0%, transparent 65%)',
    }} />

    <div className="container relative z-10 grid lg:grid-cols-2 gap-12 py-24 lg:py-32 items-center">
      {/* Left text */}
      <div className="max-w-lg">
        <p className="text-xs font-medium uppercase tracking-[0.18em] mb-6" style={{ color: '#b8e070' }}>Membership</p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight" style={{ fontWeight: 300, color: '#ffffff' }}>
          Not just a prescription.
          <br />
          <em style={{ color: '#b8e070' }}>A complete program.</em>
        </h2>
        <p className="mt-5 text-sm leading-relaxed" style={{ color: '#e8f5e8' }}>
          Most weight loss clinics hand you a prescription and disappear. We stay with you — monthly check-ins, dose guidance, and a care team that actually responds.
        </p>

        <ul className="mt-8 space-y-4">
          {[
            'Nutrition and exercise guidance',
            'Access to GLP-1 medications (if prescribed)',
            'Dedicated care team',
            'Ongoing provider check-ins',
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircle filled={false} />
              <span className="text-sm" style={{ color: '#f0f8f0' }}>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/get-started"
            onClick={() => trackEvent("quiz_started")}
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: '#a8d44a', color: '#0f1f12' }}
          >
            Start Losing Weight →
          </Link>
        </div>
      </div>

      {/* Right — Pen fan */}
      <div className="relative hidden lg:flex items-center justify-center" style={{ minHeight: '450px' }}>
        <div className="relative" style={{ width: '280px', height: '320px' }}>
          <div className="animate-small-pill-1 absolute" style={{ top: '-30px', left: '-20px', zIndex: 5 }}>
            <SmallPill size={44} color="#c8b8e8" />
          </div>
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="relative" style={{ width: '200px', height: '260px' }}>
              <InjectionPen rotation={-30} color="#9060c0" label="7.2mg" delay={0} />
              <InjectionPen rotation={-16} color="#252838" label="2.4mg" delay={1} />
              <InjectionPen rotation={-2} color="#287888" label="1.7mg" delay={2} />
              <InjectionPen rotation={13} color="#a06020" label="1mg" delay={3} />
              <InjectionPen rotation={27} color="#a83868" label="0.5mg" delay={4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   MEDICATIONS — simplified single-card focus
   ═══════════════════════════════════════════════════════ */
const Medications = () => (
  <section id="medications" style={{ background: '#faf6ee' }} className="py-24">
    <div className="container">
      {/* Medications section — frame as one of several wellness tools, not the headline */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs font-medium uppercase tracking-[0.18em] mb-4" style={{ color: '#2d4a1e' }}>
          When medication is part of your plan
        </p>
        <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 300, color: '#0f1f12' }}>
          Prescription options,<br /><em style={{ color: '#1a3a1e' }}>if appropriate for you.</em>
        </h2>
        <p className="mt-5 text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>
          For some members, a licensed provider may prescribe a GLP-1 medication as part of a broader wellness plan. Eligibility, medication choice, and dosing are determined entirely by your provider.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <div
          className="rounded-2xl p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(45,74,50,0.15)]"
          style={{
            background: 'linear-gradient(145deg, #e0ecda, #cce0c0)',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 4px 20px rgba(45,74,50,0.08)',
          }}
        >
          <span
            className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
            style={{ background: '#a8d44a', color: '#0f1f12' }}
          >
            Most prescribed
          </span>
          <h3 className="font-serif text-2xl" style={{ fontWeight: 400, color: '#0f1f12' }}>
            Compounded Semaglutide
          </h3>
          <p className="mt-1 text-sm" style={{ color: '#2d4a2a' }}>
            Weekly injection · Starts at 0.25mg
          </p>
          <p className="mt-4 font-serif" style={{ fontSize: '2rem', fontWeight: 300, color: '#0f1f12' }}>
            From $297<span className="text-base font-sans" style={{ color: '#2d4a2a' }}>/month</span>
          </p>

          <ul className="mt-6 space-y-3">
            {[
              'Provider consultation included',
              'Dose adjustments as needed',
              'Ongoing care team support',
              'Free standard shipping',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle filled />
                <span className="text-sm" style={{ color: '#0f1f12' }}>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/get-started"
            onClick={() => trackEvent("quiz_started")}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: '#0f1f12', color: '#faf6ee' }}
          >
            Start Losing Weight →
          </Link>
        </div>

        <p className="mt-6 text-center text-sm leading-relaxed" style={{ color: '#4a6a50' }}>
          Other options including oral semaglutide and tirzepatide may be available depending on your health profile and provider recommendation.
        </p>
      </div>

      <p className="mt-10 text-center max-w-2xl mx-auto" style={{ fontSize: '0.68rem', color: '#4a6a50' }}>
        † Pricing shown is for medication only if prescribed by a licensed provider. Membership required. Ozempic® is a registered trademark of Novo Nordisk A/S. Solana Health is not affiliated with Novo Nordisk or Eli Lilly. All trademarks are property of their respective owners.
      </p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════════ */
const FinalCTA = () => (
  <section className="py-20" style={{ background: 'hsl(var(--primary))' }}>
    <div className="container max-w-lg text-center">
      <h2 className="font-serif text-4xl leading-tight" style={{ fontWeight: 300, color: '#ffffff' }}>
        Ready to try something that
        <br />
        <em style={{ color: '#b8e070' }}>actually works?</em>
      </h2>
      <p className="mt-5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
        Join thousands of patients who finally found a solution that works with their biology, not against it.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4">
        <Link
          to="/get-started"
          onClick={() => trackEvent("quiz_started")}
          className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: '#a8d44a', color: '#0f1f12' }}
        >
          Start Losing Weight →
        </Link>
        <Link
          to="/support"
          className="text-xs underline-offset-4 hover:underline transition-opacity hover:opacity-90"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          Have questions? Talk to support
        </Link>
      </div>

      <p className="mt-6" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
        No prescription guaranteed. Results vary by individual.
      </p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════ */
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    {
      q: "What side effects will I experience?",
      a: "Some patients experience mild side effects when starting GLP-1 medications, especially during the first few weeks as the body adjusts. Common side effects may include nausea, constipation, diarrhea, reduced appetite, bloating, fatigue, and mild stomach discomfort. These are often temporary and improve over time. Your provider may also adjust your dosage to help minimize discomfort.",
      cta: { label: "View Full Medication Safety Information", to: "/safety-info" },
    },
    {
      q: "Do I need insurance?",
      a: "No. Many patients choose self-pay options for faster access and simpler pricing. Insurance may be accepted for certain prescription options depending on your treatment plan, but insurance is not required to get started.",
    },
    {
      q: "How long does the intake take?",
      a: "Most members complete the intake in just a few minutes. After you submit, a licensed provider typically reviews your information and meets with you within 24 hours.",
    },
    {
      q: "Is a prescription guaranteed?",
      a: "No. All prescribing decisions are made solely by independent licensed healthcare providers based on your individual health profile. Approval is not guaranteed.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. There are no long-term contracts — you can cancel your membership anytime from your dashboard.",
    },
  ];

  return (
    <section id="faq" className="py-20" style={{ background: '#faf6ee' }}>
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] mb-3" style={{ color: '#2d4a1e' }}>
            Frequently asked
          </p>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 300, color: '#0f1f12' }}>
            Questions, <em style={{ color: '#1a3a1e' }}>answered.</em>
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={it.q}
                className="rounded-2xl border bg-white overflow-hidden"
                style={{ borderColor: 'rgba(45,74,30,0.12)' }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/30"
                >
                  <span className="font-medium text-sm sm:text-base" style={{ color: '#0f1f12' }}>
                    {it.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 shrink-0" style={{ color: '#2d4a1e' }} />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0" style={{ color: '#2d4a1e' }} />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>
                      {it.a}
                    </p>
                    {it.cta && (
                      <Link
                        to={it.cta.to}
                        className="mt-4 inline-flex items-center rounded-full px-5 py-2.5 text-xs font-medium transition-opacity hover:opacity-90"
                        style={{ background: '#0f1f12', color: '#faf6ee' }}
                      >
                        {it.cta.label} →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   IMPORTANT SAFETY INFORMATION (unchanged)
   ═══════════════════════════════════════════════════════ */
const SafetyInfo = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="safety" className="py-12" style={{ background: '#f5f0e8', borderTop: '1px solid #cddbc6' }}>
      <div className="container max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.14em] mb-4" style={{ color: '#5a7060' }}>
          Important Safety Information
        </p>
        <p style={{ fontSize: '0.73rem', lineHeight: '1.8', color: '#5a7060' }}>
          <strong>WARNING: RISK OF THYROID C-CELL TUMORS.</strong> In rodent studies, semaglutide caused thyroid C-cell tumors. It is unknown whether semaglutide causes thyroid C-cell tumors, including medullary thyroid carcinoma (MTC), in humans. Semaglutide is contraindicated in patients with a personal or family history of MTC or in patients with Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).
        </p>

        {expanded && (
          <div className="mt-4 space-y-3" style={{ fontSize: '0.73rem', lineHeight: '1.8', color: '#5a7060' }}>
            <p><strong>Pancreatitis:</strong> Acute pancreatitis, including fatal and non-fatal hemorrhagic or necrotizing pancreatitis, has been observed. Discontinue promptly if pancreatitis is suspected.</p>
            <p><strong>Gallbladder problems:</strong> Cholelithiasis and cholecystitis have been reported. If suspected, gallbladder studies are indicated.</p>
            <p><strong>Heart rate increase:</strong> Mean increases in resting heart rate of 1 to 4 beats per minute were observed. Monitor heart rate at regular intervals.</p>
            <p><strong>Suicidal behavior and ideation:</strong> Monitor for depression or suicidal thoughts. Discontinue if symptoms develop.</p>
            <p><strong>Kidney injury:</strong> Has been reported, usually in association with nausea, vomiting, and diarrhea. Use caution in patients with renal impairment.</p>
            <p><strong>Serious allergic reactions:</strong> Anaphylaxis and angioedema have been reported. Discontinue and seek medical attention if suspected.</p>
            <p><strong>Pregnancy:</strong> May cause fetal harm. Discontinue at least 2 months before a planned pregnancy.</p>
            <p><strong>Indication:</strong> Semaglutide 2.4 mg injection is indicated as an adjunct to a reduced-calorie diet and increased physical activity for chronic weight management in adults with an initial BMI of ≥30 kg/m² (obesity), or ≥27 kg/m² (overweight) in the presence of at least one weight-related comorbid condition.</p>
            <p>Please see full Prescribing Information, including Boxed Warning, at the prescriber's discretion.</p>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: '#4a6e52' }}
        >
          {expanded ? (
            <>See less <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>See more <ChevronDown className="h-4 w-4" /></>
          )}
        </button>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE — restructured order
   ═══════════════════════════════════════════════════════ */
const Index = () => (
  <div className="min-h-screen">
    <Header />
    <Hero />
    <Pillars />
    <HowItWorks />
    <Membership />
    <Medications />
    <FAQ />
    <FinalCTA />
    {/* Compounded drug disclaimer */}
    <div className="py-6" style={{ background: '#f5f0e8', borderTop: '1px solid #e0d8c8' }}>
      <div className="container max-w-3xl">
        <p style={{ fontSize: '0.7rem', lineHeight: '1.7', color: '#5a7060' }}>
          <strong>Important:</strong> Compounded drug products are not approved or evaluated for safety, effectiveness, or quality by the FDA. Prescription products require an online consultation with a healthcare provider who will determine if a prescription is appropriate. Results may vary.
        </p>
      </div>
    </div>
    <SafetyInfo />
    <Footer />
  </div>
);

export default Index;
