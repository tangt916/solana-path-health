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
          Your comprehensive health & wellness coach
        </p>
        <h1 className="font-serif leading-[1.08]" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', fontWeight: 300, color: '#0f1f12' }}>
          A smarter way
          <br />
          <em style={{ color: '#1a3a1e' }}>to feel your best.</em>
        </h1>
        <p className="mt-6 text-base leading-relaxed" style={{ fontWeight: 300, color: '#1e3a22' }}>
          Personalized coaching, expert clinical care, and ongoing support — all in one place. We pair you with licensed providers and a dedicated care team who help you build sustainable habits around nutrition, movement, sleep, and (when appropriate) medication.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/get-started"
            onClick={() => trackEvent("quiz_started")}
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: '#0f1f12', color: '#faf6ee' }}
          >
            Start my wellness plan →
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium border transition-opacity hover:opacity-70"
            style={{ borderColor: '#0f1f12', color: '#0f1f12' }}
          >
            How it works
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
   SOCIAL PROOF (testimonials + stats)
   ═══════════════════════════════════════════════════════ */
const SocialProof = () => {
  const testimonials = [
    {
      initials: 'JM',
      quote: "I lost 34 lbs in 5 months. I've never been able to lose weight on my own — this actually worked.",
      name: 'Jennifer M.',
      location: 'Denver, CO',
      lost: '-34 lbs',
    },
    {
      initials: 'RM',
      quote: 'My doctor finally had an answer. The process was easy and the support team checked in every month.',
      name: 'Robert M.',
      location: 'Austin, TX',
      lost: '-28 lbs',
    },
    {
      initials: 'AL',
      quote: 'I was skeptical at first. But the blood sugar improvement was real. My A1C went from 7.1 to 5.8.',
      name: 'Amanda L.',
      location: 'Chicago, IL',
      lost: '-41 lbs',
    },
  ];

  const stats = [
    { number: '~15%', label: 'Average body weight lost over 68 weeks in clinical trial', cite: '† Wilding et al. N Engl J Med. 2021' },
    { number: '83%', label: 'Of participants achieved ≥5% body weight loss', cite: '† STEP 1 trial vs 31% placebo' },
    { number: 'FDA', label: 'Approved for chronic weight management in adults', cite: '† Semaglutide 2.4 mg, FDA June 2021' },
  ];

  return (
    <section className="py-16" style={{ background: '#ffffff' }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] mb-4" style={{ color: '#2d4a1e' }}>
            Real patients · Real results
          </p>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 300, color: '#0f1f12' }}>
            Thousands have finally found <em style={{ color: '#1a3a1e' }}>what works.</em>
          </h2>
        </div>

        {/* Row 1 — Testimonials */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border/30 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-medium"
                  style={{ background: '#1a3020', color: '#faf6ee' }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-medium text-sm" style={{ color: '#0f1f12' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: '#4a6a50' }}>{t.location}</p>
                </div>
                <span
                  className="ml-auto inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-xs font-medium"
                  style={{ color: '#0f1f12' }}
                >
                  {t.lost}
                </span>
              </div>
              <p className="font-serif italic text-base leading-relaxed" style={{ color: '#1e3a22' }}>
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* Row 2 — Stats */}
        <div className="mt-16 grid md:grid-cols-3" style={{ borderTop: '1px solid #cddbc6', borderBottom: '1px solid #cddbc6' }}>
          {stats.map((s, i) => (
            <div
              key={s.number}
              className="text-center py-12 px-6"
              style={{ borderRight: i < 2 ? '1px solid #cddbc6' : undefined }}
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
   HOW IT WORKS
   ═══════════════════════════════════════════════════════ */
const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Tell us about yourself', desc: 'Answer questions about your health history and weight loss journey. Takes 3 minutes. No blood tests, no office visits.' },
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
                Start your intake — it's free →
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

/* ═══════════════════════════════════════════════════════
   BENEFITS
   ═══════════════════════════════════════════════════════ */
const Benefits = () => (
  <section className="grid lg:grid-cols-2">
    {/* Left */}
    <div className="flex items-center px-8 py-20 lg:px-16" style={{
      background: `
        radial-gradient(ellipse 80% 60% at 20% 100%, #c0d898 0%, transparent 55%),
        radial-gradient(ellipse 60% 50% at 90% 10%, #e8f2d8 0%, transparent 50%),
        linear-gradient(135deg, #e8f0d8 0%, #d0e4b8 100%)
      `,
    }}>
      <div className="max-w-md">
        <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 300, color: '#1a3020' }}>
          Do more for your health with <em style={{ color: '#1a3a1e' }}>semaglutide</em>
        </h2>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>
          FDA-approved GLP-1 medication for chronic weight management, prescribed by licensed providers.
        </p>
        <Link
          to="/get-started"
          onClick={() => trackEvent("quiz_started")}
          className="mt-8 inline-flex items-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: '#0f1f12', color: '#faf6ee' }}
        >
          Start losing weight →
        </Link>
      </div>
    </div>

    {/* Right */}
    <div className="flex items-center px-8 py-20 lg:px-16" style={{ background: '#ffffff' }}>
      <div className="max-w-sm">
        <ul className="space-y-5">
          {['Decreases cholesterol', 'Improves blood sugar', 'Reduces blood pressure', 'Lowers cardiovascular risk¹'].map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircle filled />
              <span className="text-sm font-medium" style={{ color: '#0f1f12' }}>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 leading-relaxed" style={{ fontSize: '0.71rem', color: '#4a6a50' }}>
          ¹ For adults with heart disease and obesity or overweight, along with a reduced-calorie diet and increased physical activity. Lowers risk of major adverse cardiovascular events. Per FDA-approved prescribing information for semaglutide 2.4 mg. Individual results vary.
        </p>
      </div>
    </div>
  </section>
);

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
            View full program →
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium border transition-opacity hover:opacity-70"
            style={{ borderColor: 'rgba(250,246,238,0.3)', color: '#f0f8f0' }}
          >
            Learn more
          </a>
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
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 300, color: '#0f1f12' }}>
          One proven medication.<br /><em style={{ color: '#1a3a1e' }}>One simple plan.</em>
        </h2>
        <p className="mt-5 text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>
          We prescribe compounded Semaglutide — the same active ingredient as Ozempic® and Wegovy®, at a fraction of the cost.
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
            See if I qualify →
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

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          to="/get-started"
          onClick={() => trackEvent("quiz_started")}
          className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: '#a8d44a', color: '#0f1f12' }}
        >
          Start my free intake →
        </Link>
        <Link
          to="/support"
          className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium border transition-opacity hover:opacity-70"
          style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff' }}
        >
          Talk to someone first
        </Link>
      </div>

      <p className="mt-6" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
        No prescription guaranteed. Results vary by individual.
      </p>
    </div>
  </section>
);

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
    <SocialProof />
    <HowItWorks />
    <Benefits />
    <Membership />
    <Medications />
    <FinalCTA />
    <SafetyInfo />
    <Footer />
  </div>
);

export default Index;
