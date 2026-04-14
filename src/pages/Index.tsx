import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackEvent } from "@/lib/analytics";
import { ChevronDown, ChevronUp } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   SVG COMPONENTS
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
      {/* Pen body */}
      <rect x="8" y="30" width="20" height="140" rx="4" fill={`url(#pen-${label})`} />
      {/* Needle cap */}
      <rect x="14" y="0" width="8" height="35" rx="2" fill="#c8c4bc" />
      {/* Label band */}
      <rect x="8" y="90" width="20" height="30" rx="2" fill={color} />
      <text x="18" y="109" textAnchor="middle" fontSize="7" fill="white" fontFamily="'DM Sans', sans-serif" fontWeight="500">{label}</text>
      {/* Button */}
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
   HERO 1
   ═══════════════════════════════════════════════════════ */
const Hero = () => (
  <section className="relative min-h-screen">
    {/* Layered background */}
    <div className="absolute inset-0" style={{
      background: `
        radial-gradient(ellipse 60% 80% at 75% 55%, #c8ddb0 0%, transparent 65%),
        radial-gradient(ellipse 50% 60% at 15% 80%, #2d4a32 0%, transparent 55%),
        radial-gradient(ellipse 70% 50% at 50% 0%, #eef6e2 0%, transparent 60%),
        linear-gradient(148deg, #f5f0e4 0%, #ddebc8 35%, #b8d498 60%, #3d5e40 100%)
      `,
    }} />
    <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 40% 40% at 70% 45%, rgba(168,212,74,0.18) 0%, transparent 70%)',
    }} />

    <div className="container relative z-10 grid min-h-screen items-center lg:grid-cols-2 gap-12 py-24">
      {/* Left text */}
      <div className="max-w-lg">
        <p className="text-xs font-medium uppercase tracking-[0.18em] mb-6" style={{ color: '#4a6e52' }}>
          Medically guided GLP-1 weight loss
        </p>
        <h1 className="font-serif leading-[1.08]" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', fontWeight: 300, color: '#16261a' }}>
          Clinician-prescribed
          <br />
          <em style={{ color: '#2d5030' }}>that works</em>
        </h1>
        <p className="mt-6 text-base leading-relaxed" style={{ fontWeight: 300, color: '#2d4a30' }}>
          Get evaluated by licensed providers online. If appropriate, receive GLP-1 medication delivered to your door — with ongoing medical support.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/quiz"
            onClick={() => trackEvent("quiz_started")}
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: '#16261a', color: '#faf6ee' }}
          >
            See if I'm eligible →
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium border transition-opacity hover:opacity-70"
            style={{ borderColor: '#16261a', color: '#16261a' }}
          >
            Learn more
          </a>
        </div>
        <p className="mt-5" style={{ fontSize: '0.7rem', color: '#5a7060' }}>
          No prescription guaranteed · Licensed providers · Membership required
        </p>
      </div>

      {/* Right visual */}
      <div className="relative hidden lg:flex items-center justify-center" style={{ minHeight: '450px' }}>
        {/* Shadow */}
        <div className="animate-shadow-pulse absolute" style={{ bottom: '60px', left: '50%', transform: 'translateX(-50%)' }}>
          <svg width="160" height="30" viewBox="0 0 160 30">
            <ellipse cx="80" cy="15" rx="70" ry="12" fill="rgba(0,0,0,0.1)" />
          </svg>
        </div>
        {/* Main pill */}
        <div className="animate-pill-bounce relative z-10">
          <MainPill />
        </div>
        {/* Small orbiting pills */}
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
        <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 300, color: '#16261a' }}>
          Do more for your health with <em style={{ color: '#2d5030' }}>semaglutide</em>
        </h2>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: '#5a7060' }}>
          FDA-approved GLP-1 medication for chronic weight management, prescribed by licensed providers.
        </p>
        <Link
          to="/quiz"
          onClick={() => trackEvent("quiz_started")}
          className="mt-8 inline-flex items-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: '#16261a', color: '#faf6ee' }}
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
              <span className="text-sm font-medium" style={{ color: '#16261a' }}>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 leading-relaxed" style={{ fontSize: '0.71rem', color: '#7a9e82' }}>
          ¹ For adults with heart disease and obesity or overweight, along with a reduced-calorie diet and increased physical activity. Lowers risk of major adverse cardiovascular events. Per FDA-approved prescribing information for semaglutide 2.4 mg. Individual results vary.
        </p>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   STATS BAR
   ═══════════════════════════════════════════════════════ */
const Stats = () => {
  const stats = [
    { number: '~15%', label: 'Average body weight lost over 68 weeks in clinical trial', cite: '† Wilding et al. N Engl J Med. 2021' },
    { number: '83%', label: 'Of participants achieved ≥5% body weight loss', cite: '† STEP 1 trial vs 31% placebo' },
    { number: 'FDA', label: 'Approved for chronic weight management in adults', cite: '† Semaglutide 2.4 mg, FDA June 2021' },
  ];

  return (
    <section style={{ background: '#ffffff' }}>
      <div className="grid md:grid-cols-3" style={{ borderTop: '1px solid #cddbc6', borderBottom: '1px solid #cddbc6' }}>
        {stats.map((s, i) => (
          <div
            key={i}
            className="text-center py-12 px-6"
            style={{ borderRight: i < 2 ? '1px solid #cddbc6' : undefined }}
          >
            <p className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 300, color: '#16261a' }}>{s.number}</p>
            <p className="mt-2 text-sm" style={{ color: '#5a7060' }}>{s.label}</p>
            <p className="mt-1" style={{ fontSize: '0.68rem', color: '#7a9e82' }}>{s.cite}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   MEMBERSHIP (HERO 2)
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
        <p className="text-xs font-medium uppercase tracking-[0.18em] mb-6" style={{ color: '#9ac850' }}>Membership</p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight" style={{ fontWeight: 300, color: '#ffffff' }}>
          Everything you need,
          <br />
          <em style={{ color: '#9ac850' }}>from day one</em>
        </h2>
        <p className="mt-5 text-sm leading-relaxed" style={{ color: 'rgba(220,240,220,0.8)' }}>
          Your membership includes provider consultations, medication (if prescribed), and ongoing support — all in one monthly plan.
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
              <span className="text-sm" style={{ color: 'rgba(250,246,238,0.9)' }}>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/quiz"
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: '#a8d44a', color: '#16261a' }}
          >
            Go to membership →
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium border transition-opacity hover:opacity-70"
            style={{ borderColor: 'rgba(250,246,238,0.3)', color: 'rgba(250,246,238,0.8)' }}
          >
            Learn more
          </a>
        </div>
      </div>

      {/* Right — Pen fan */}
      <div className="relative hidden lg:flex items-center justify-center" style={{ minHeight: '450px' }}>
        <div className="relative" style={{ width: '280px', height: '320px' }}>
          {/* Floating pill */}
          <div className="animate-small-pill-1 absolute" style={{ top: '-30px', left: '-20px', zIndex: 5 }}>
            <SmallPill size={44} color="#c8b8e8" />
          </div>
          {/* Pens */}
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
   MEDICATIONS
   ═══════════════════════════════════════════════════════ */
const MedCard = ({ name, price, gradient, badge, children }: {
  name: string; price: string; gradient: string; badge?: string; children: React.ReactNode;
}) => (
  <div
    className="rounded-[20px] p-6 flex flex-col justify-between transition-all hover:-translate-y-1"
    style={{
      background: gradient,
      minHeight: '320px',
      border: '1px solid rgba(0,0,0,0.06)',
    }}
  >
    <div>
      {badge && (
        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3" style={{ background: 'rgba(0,0,0,0.08)', color: '#16261a' }}>
          {badge}
        </span>
      )}
      <h4 className="font-serif text-lg" style={{ fontWeight: 400, color: '#16261a' }}>{name}</h4>
      <p className="mt-1 text-sm font-medium" style={{ color: '#16261a' }}>From {price}†</p>
      <p className="mt-1" style={{ fontSize: '0.7rem', color: '#5a7060' }}>Membership required</p>
    </div>
    <div className="mt-4 flex justify-center">{children}</div>
  </div>
);

const Medications = () => (
  <section id="medications" style={{ background: '#faf6ee' }} className="py-24">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <h2 className="font-serif text-3xl md:text-4xl" style={{ fontWeight: 300, color: '#16261a' }}>
          Lose weight<br /><em style={{ color: '#2d5030' }}>the way you want</em>
        </h2>
        <div className="flex items-center gap-4">
          <p className="text-sm" style={{ color: '#5a7060' }}>Explore treatment options</p>
          <Link
            to="/quiz"
            className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: '#16261a', color: '#faf6ee' }}
          >
            Get started
          </Link>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MedCard name="Semaglutide Oral Tablet" price="$149/mo" gradient="linear-gradient(145deg, #e0ecda, #cce0c0)" badge="Rx">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <ellipse cx="30" cy="30" rx="24" ry="24" fill="#b8d498" />
            <ellipse cx="24" cy="22" rx="10" ry="6" fill="rgba(255,255,255,0.4)" transform="rotate(-15 24 22)" />
          </svg>
        </MedCard>
        <MedCard name="Semaglutide Injection Pen" price="$199/mo" gradient="linear-gradient(145deg, #dfe8f8, #c8d8f0)" badge="Rx">
          <svg width="30" height="100" viewBox="0 0 30 100">
            <rect x="5" y="15" width="20" height="65" rx="3" fill="#c8d8f0" />
            <rect x="10" y="0" width="10" height="20" rx="2" fill="#a0b8d0" />
            <rect x="5" y="40" width="20" height="15" rx="2" fill="#287888" />
            <rect x="8" y="80" width="14" height="15" rx="7" fill="#d0dce8" />
          </svg>
        </MedCard>
        <MedCard name="Ozempic®" price="$199/mo" gradient="linear-gradient(145deg, #e8ddf8, #d4c8f0)" badge="Rx · Brand">
          <svg width="30" height="100" viewBox="0 0 30 100">
            <rect x="5" y="15" width="20" height="65" rx="3" fill="#d4c8f0" />
            <rect x="10" y="0" width="10" height="20" rx="2" fill="#b0a0d0" />
            <rect x="5" y="40" width="20" height="15" rx="2" fill="#6050a0" />
            <rect x="8" y="80" width="14" height="15" rx="7" fill="#dcd0f0" />
          </svg>
        </MedCard>
        <MedCard name="Tirzepatide (GIP + GLP-1)" price="$699/mo" gradient="linear-gradient(145deg, #f0e8d8, #e0d0b8)" badge="Rx">
          <svg width="30" height="100" viewBox="0 0 30 100">
            <rect x="5" y="15" width="20" height="65" rx="3" fill="#e0d0b8" />
            <rect x="10" y="0" width="10" height="20" rx="2" fill="#c8b8a0" />
            <rect x="5" y="40" width="20" height="15" rx="2" fill="#9060c0" />
            <rect x="8" y="80" width="14" height="15" rx="7" fill="#e8dcc8" />
          </svg>
        </MedCard>
      </div>

      <p className="mt-6 text-center" style={{ fontSize: '0.68rem', color: '#7a9e82' }}>
        † Pricing shown is for medication only if prescribed by a licensed provider. Membership required. Ozempic® is a registered trademark of Novo Nordisk A/S. Solana Health is not affiliated with Novo Nordisk or Eli Lilly. All trademarks are property of their respective owners.
      </p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════════════ */
const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Complete your health intake', desc: 'Answer a brief questionnaire about your health history and goals. Takes about 5 minutes.' },
    { num: '02', title: 'Provider review', desc: 'An independent licensed clinician reviews your responses and determines whether a GLP-1 prescription is appropriate. Most reviews complete within 24–48 hours. No prescription guaranteed.' },
    { num: '03', title: 'Delivered to your door', desc: 'If prescribed, your medication is dispensed by a licensed pharmacy and shipped directly to you with free standard shipping.' },
    { num: '04', title: 'Ongoing care', desc: 'Your care team supports you throughout treatment with check-ins, dosage adjustments, and guidance.' },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 70% 60% at 0% 100%, #c8dca8 0%, transparent 50%),
          radial-gradient(ellipse 50% 50% at 100% 0%, #e0ecce 0%, transparent 55%),
          linear-gradient(130deg, #e8f2da 0%, #f0f6e8 50%, #ddeac8 100%)
        `,
      }} />

      <div className="container relative z-10">
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-16" style={{ fontWeight: 300, color: '#16261a' }}>
          Simple steps to<br /><em style={{ color: '#2d5030' }}>real results</em>
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(168,212,74,0.3)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p className="font-serif text-3xl mb-3" style={{ fontWeight: 300, color: '#a8d44a' }}>{s.num}</p>
              <h4 className="text-sm font-medium mb-2" style={{ color: '#16261a', fontFamily: 'var(--font-sans)' }}>{s.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#5a7060' }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center italic font-serif text-sm" style={{ color: '#5a7060' }}>
          All prescribing decisions are made solely by independent licensed healthcare providers. Approval is not guaranteed.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   IMPORTANT SAFETY INFORMATION
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
   PAGE
   ═══════════════════════════════════════════════════════ */
const Index = () => (
  <div className="min-h-screen">
    <Header />
    <Hero />
    <Benefits />
    <Stats />
    <Membership />
    <Medications />
    <HowItWorks />
    <SafetyInfo />
    <Footer />
  </div>
);

export default Index;
