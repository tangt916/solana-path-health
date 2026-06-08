import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap, Moon, Heart, Brain, Scale, Sparkles,
  Activity, Sun, Droplets, Stethoscope, ClipboardCheck, Package, MessageCircle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SafetyInfo } from "@/components/landing/SafetyInfo";
import { trackEvent } from "@/lib/analytics";
import { FOREST, GOLD, WARM_WHITE, SAGE, eyebrowCls, h2Cls } from "./shared";
import { PrimaryCta as SharedPrimaryCta } from "./PrimaryCta";

const PrimaryCta = ({ label }: { label?: string }) => (
  <SharedPrimaryCta to="/get-started/hormone-therapy" treatment="hormone-therapy" label={label} />
);

/* ---------- HERO ---------- */
const Hero = () => {
  const floaters = [
    { icon: Zap, label: "Energy", angle: -90, delay: 0 },
    { icon: Moon, label: "Sleep", angle: -30, delay: 600 },
    { icon: Heart, label: "Libido", angle: 30, delay: 1200 },
    { icon: Brain, label: "Mood", angle: 90, delay: 1800 },
    { icon: Scale, label: "Weight", angle: 150, delay: 2400 },
    { icon: Sparkles, label: "Confidence", angle: 210, delay: 3000 },
  ];
  return (
    <section className="relative overflow-hidden" style={{ background: WARM_WHITE }}>
      <style>{`
        @keyframes floatY { 0%,100% { transform: translateY(0)} 50% { transform: translateY(-10px)} }
        @keyframes orbPulse { 0%,100% { transform: scale(1); opacity: .9 } 50% { transform: scale(1.05); opacity: 1 } }
        @keyframes drawLine { from { stroke-dashoffset: 200 } to { stroke-dashoffset: 0 } }
      `}</style>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(201,169,110,0.18), transparent 70%), radial-gradient(40% 40% at 80% 70%, rgba(28,58,46,0.08), transparent 70%)",
        }}
      />
      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className={eyebrowCls} style={{ color: GOLD }}>Solana Health · Hormone Therapy</p>
            <h1 className="font-serif leading-[1.05]" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, color: FOREST }}>
              Feel More Like <em style={{ color: GOLD }}>Yourself Again</em>
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed max-w-xl" style={{ color: "#2d4a3a" }}>
              Personalized hormone therapy designed to support energy, sleep, mood, metabolism, libido, and overall wellbeing.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryCta label="Get Started →" />
              <span className="text-xs" style={{ color: "#5a7060" }}>Free assessment · Clinician reviewed</span>
            </div>
          </div>

          {/* Orb visual */}
          <div className="relative h-[420px] md:h-[500px] flex items-center justify-center">
            <div
              className="absolute rounded-full"
              style={{
                width: 280, height: 280,
                background: `radial-gradient(circle at 30% 30%, ${GOLD}, ${FOREST} 70%)`,
                boxShadow: `0 30px 80px -20px ${FOREST}66, 0 0 0 1px rgba(255,255,255,0.4) inset`,
                animation: "orbPulse 6s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full backdrop-blur-2xl"
              style={{
                width: 360, height: 360,
                border: "1px solid rgba(28,58,46,0.08)",
                background: "rgba(255,255,255,0.15)",
              }}
            />
            {floaters.map((f, i) => {
              const rad = (f.angle * Math.PI) / 180;
              const r = 200;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    animation: `floatY 5s ease-in-out ${f.delay}ms infinite`,
                  }}
                >
                  <div
                    className="flex items-center gap-2 rounded-2xl px-4 py-2.5 backdrop-blur-xl border shadow-lg"
                    style={{ background: "rgba(255,255,255,0.75)", borderColor: "rgba(28,58,46,0.08)" }}
                  >
                    <Icon className="h-4 w-4" style={{ color: GOLD }} />
                    <span className="text-sm font-medium" style={{ color: FOREST }}>{f.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- WHAT'S CHANGED (clickable expand cards) ---------- */
const WhatsChanged = () => {
  const items = [
    { icon: Zap, title: "I'm Exhausted", body: "Persistent fatigue that doesn't lift with sleep can reflect shifts in thyroid, cortisol, estrogen, or progesterone — not just stress." },
    { icon: Moon, title: "I Can't Sleep", body: "Falling asleep, staying asleep, night sweats, and temperature changes are often tied to progesterone and perimenopausal shifts." },
    { icon: Scale, title: "My Weight Keeps Increasing", body: "Midsection weight that resists diet and exercise can be linked to insulin sensitivity, cortisol, and estrogen changes." },
    { icon: Brain, title: "My Mood Feels Different", body: "Anxiety, irritability, or low mood that feels new may reflect estrogen and progesterone balance through perimenopause." },
    { icon: Heart, title: "My Libido Is Lower", body: "Changes in desire, arousal, or comfort are common — and often connected to testosterone, estrogen, and tissue health." },
    { icon: Sparkles, title: "I Don't Feel Like Myself", body: "Brain fog, motivation, and that hard-to-name shift in how you show up — these are real, and often treatable." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="max-w-2xl mb-12">
          <p className={eyebrowCls} style={{ color: GOLD }}>Sound familiar?</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            What's <em style={{ color: GOLD }}>changed?</em>
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = it.icon;
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className="text-left rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{
                  borderColor: isOpen ? GOLD : "rgba(28,58,46,0.1)",
                  background: isOpen ? `linear-gradient(135deg, #fff, ${SAGE})` : "#fff",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ background: `${GOLD}22` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: GOLD }} />
                  </div>
                  <span className="text-2xl leading-none transition-transform" style={{ color: GOLD, transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
                </div>
                <h3 className="mt-4 font-serif text-xl" style={{ color: FOREST, fontWeight: 500 }}>{it.title}</h3>
                <div className="grid transition-all" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <p className="overflow-hidden text-sm leading-relaxed" style={{ color: "#2d4a3a", marginTop: isOpen ? 12 : 0 }}>
                    {it.body}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- ECOSYSTEM ---------- */
const Ecosystem = () => {
  const nodes = [
    { icon: Zap, label: "Energy" },
    { icon: Moon, label: "Sleep" },
    { icon: Brain, label: "Mood" },
    { icon: Scale, label: "Weight" },
    { icon: Heart, label: "Libido" },
    { icon: Droplets, label: "Skin" },
  ];
  return (
    <section className="py-20" style={{ background: SAGE }}>
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className={eyebrowCls} style={{ color: GOLD }}>Connected systems</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            Your hormones affect <em style={{ color: GOLD }}>more than one thing.</em>
          </h2>
        </div>

        <div className="relative mx-auto" style={{ width: "min(560px,92vw)", height: "min(560px,92vw)" }}>
          {/* Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 560 560" fill="none">
            {nodes.map((_, i) => {
              const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
              const x = 280 + Math.cos(a) * 220;
              const y = 280 + Math.sin(a) * 220;
              return (
                <line
                  key={i}
                  x1={280} y1={280} x2={x} y2={y}
                  stroke={GOLD}
                  strokeWidth={1}
                  strokeDasharray="200"
                  style={{ animation: `drawLine 2s ease-out ${i * 0.2}s forwards`, opacity: 0.35 }}
                />
              );
            })}
          </svg>

          {/* Center */}
          <div
            className="absolute rounded-full flex items-center justify-center text-center"
            style={{
              top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              width: 140, height: 140,
              background: `radial-gradient(circle at 30% 30%, ${GOLD}, ${FOREST})`,
              color: WARM_WHITE,
              boxShadow: `0 20px 50px -10px ${FOREST}55`,
              animation: "orbPulse 5s ease-in-out infinite",
            }}
          >
            <span className="font-serif text-lg">Hormones</span>
          </div>

          {/* Nodes */}
          {nodes.map((n, i) => {
            const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(a) * 40;
            const y = 50 + Math.sin(a) * 40;
            const Icon = n.icon;
            return (
              <div
                key={n.label}
                className="absolute flex flex-col items-center"
                style={{
                  top: `${y}%`, left: `${x}%`, transform: "translate(-50%,-50%)",
                  animation: `floatY 4s ease-in-out ${i * 400}ms infinite`,
                }}
              >
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center backdrop-blur-xl border shadow-md"
                  style={{ background: "rgba(255,255,255,0.85)", borderColor: "rgba(28,58,46,0.1)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: GOLD }} />
                </div>
                <span className="mt-2 text-xs font-medium" style={{ color: FOREST }}>{n.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- TREATMENT OPTIONS ---------- */
const TreatmentOptions = () => {
  const meds = [
    { name: "BiEst", supports: "Hot flashes, sleep, mood, skin and vaginal comfort", who: "Women navigating perimenopause or menopause symptoms" },
    { name: "Estradiol", supports: "Sleep quality, temperature regulation, mood, skin", who: "Women with low estrogen-related symptoms" },
    { name: "Progesterone", supports: "Sleep, calm, cycle balance, uterine support", who: "Women with sleep disruption or paired with estrogen" },
    { name: "DHEA", supports: "Energy, libido, vitality, body composition support", who: "Women with low DHEA and related symptoms" },
  ];
  return (
    <section className="py-20" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="max-w-2xl mb-12">
          <p className={eyebrowCls} style={{ color: GOLD }}>What may be prescribed</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            Treatment <em style={{ color: GOLD }}>options.</em>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {meds.map((m, i) => (
            <div
              key={m.name}
              className="relative rounded-2xl p-6 border backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(232,237,230,0.55))",
                borderColor: "rgba(28,58,46,0.1)",
              }}
            >
              <div
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-40"
                style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)` }}
              />
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: GOLD }}>0{i + 1}</span>
              <h3 className="mt-2 font-serif text-2xl" style={{ color: FOREST, fontWeight: 500 }}>{m.name}</h3>
              <div className="mt-5 space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: GOLD }}>May support</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "#2d4a3a" }}>{m.supports}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: GOLD }}>May be appropriate for</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "#2d4a3a" }}>{m.who}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed" style={{ color: "#5a7060" }}>
          Prescription products require an online consultation with a healthcare provider who will determine if a prescription is appropriate. Compounded drug products are not approved or evaluated for safety, effectiveness, or quality by the FDA. Results may vary.
        </p>
      </div>
    </section>
  );
};

/* ---------- STACKS ---------- */
const Stacks = () => {
  const stacks = [
    { name: "Better Sleep Stack", icon: Moon, focus: ["Deeper sleep", "Calm evenings", "Fewer night wakings"], grad: "linear-gradient(160deg, #1e3a5f, #1c3a2e)" },
    { name: "Energy & Vitality Stack", icon: Sun, focus: ["Steady energy", "Motivation", "Mental clarity"], grad: "linear-gradient(160deg, #c9a96e, #8a6a2a)" },
    { name: "Whole Body Support Stack", icon: Activity, focus: ["Mood balance", "Body composition", "Overall wellbeing"], grad: "linear-gradient(160deg, #2d6a4f, #1c3a2e)" },
    { name: "Confidence & Libido Stack", icon: Heart, focus: ["Desire", "Confidence", "Intimacy support"], grad: "linear-gradient(160deg, #b5651d, #6e3a1a)" },
  ];
  return (
    <section className="py-20" style={{ background: SAGE }}>
      <div className="container">
        <div className="max-w-2xl mb-12">
          <p className={eyebrowCls} style={{ color: GOLD }}>Build your plan</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            Build your <em style={{ color: GOLD }}>personalized plan.</em>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stacks.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                className="group relative rounded-3xl p-6 overflow-hidden text-white transition-all hover:-translate-y-2 hover:shadow-2xl"
                style={{ background: s.grad, minHeight: 280 }}
              >
                <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3), transparent 60%)" }} />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-11 w-11 rounded-full flex items-center justify-center backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.18)" }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl" style={{ fontWeight: 500 }}>{s.name}</h3>
                  <ul className="mt-4 space-y-1.5 text-sm opacity-90">
                    {s.focus.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span style={{ color: GOLD }}>•</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Link
                      to="/get-started/hormone-therapy"
                      onClick={() => trackEvent("quiz_started", { treatment: "hormone-therapy", stack: s.name })}
                      className="text-xs underline-offset-4 hover:underline opacity-90"
                    >
                      Explore this stack →
                    </Link>
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

/* ---------- COMPARISON ---------- */
const Comparison = () => {
  const goals = ["Energy", "Sleep", "Mood", "Weight", "Libido", "Skin"];
  const treatments = ["BiEst", "Estradiol", "Progesterone", "DHEA"];
  // 3 = strong fit, 2 = supportive, 1 = limited
  const matrix: Record<string, number[]> = {
    Energy:    [2, 2, 1, 3],
    Sleep:     [3, 2, 3, 1],
    Mood:      [3, 3, 3, 2],
    Weight:    [2, 2, 1, 2],
    Libido:    [2, 2, 1, 3],
    Skin:      [3, 3, 1, 2],
  };
  const dotFor = (v: number) => {
    if (v === 3) return <span className="inline-block h-3 w-3 rounded-full" style={{ background: GOLD }} />;
    if (v === 2) return <span className="inline-block h-3 w-3 rounded-full" style={{ background: `${GOLD}80` }} />;
    return <span className="inline-block h-3 w-3 rounded-full border" style={{ borderColor: `${GOLD}60` }} />;
  };
  return (
    <section className="py-20" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="max-w-2xl mb-10">
          <p className={eyebrowCls} style={{ color: GOLD }}>Compare</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            Compare <em style={{ color: GOLD }}>treatment options.</em>
          </h2>
        </div>
        <div className="rounded-2xl border overflow-hidden backdrop-blur-xl" style={{ borderColor: "rgba(28,58,46,0.1)", background: "rgba(255,255,255,0.7)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: SAGE }}>
                  <th className="text-left px-5 py-4 font-medium text-xs uppercase tracking-wider" style={{ color: GOLD }}>Goal</th>
                  {treatments.map((t) => (
                    <th key={t} className="px-5 py-4 font-serif text-base" style={{ color: FOREST }}>{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {goals.map((g, i) => (
                  <tr key={g} className="border-t" style={{ borderColor: "rgba(28,58,46,0.06)", background: i % 2 ? "rgba(232,237,230,0.25)" : "transparent" }}>
                    <td className="px-5 py-4 font-medium" style={{ color: FOREST }}>{g}</td>
                    {matrix[g].map((v, j) => (
                      <td key={j} className="px-5 py-4 text-center">{dotFor(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 flex flex-wrap items-center gap-4 text-xs border-t" style={{ borderColor: "rgba(28,58,46,0.06)", background: "rgba(255,255,255,0.6)", color: "#5a7060" }}>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ background: GOLD }} /> Strong fit</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ background: `${GOLD}80` }} /> Supportive</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full border" style={{ borderColor: `${GOLD}60` }} /> Limited</span>
          </div>
        </div>
        <p className="mt-4 text-xs" style={{ color: "#5a7060" }}>For illustrative comparison only. Your clinician determines what may be appropriate for you.</p>
      </div>
    </section>
  );
};

/* ---------- HOW IT WORKS ---------- */
const HowItWorks = () => {
  const steps = [
    { icon: ClipboardCheck, t: "Assessment", d: "Share your symptoms and goals." },
    { icon: Stethoscope, t: "Clinician Review", d: "A licensed provider reviews your case." },
    { icon: Package, t: "Personalized Plan", d: "Treatment shipped if appropriate." },
    { icon: MessageCircle, t: "Ongoing Support", d: "Adjusted as you progress." },
  ];
  return (
    <section className="py-20" style={{ background: SAGE }}>
      <div className="container">
        <div className="max-w-2xl mb-14">
          <p className={eyebrowCls} style={{ color: GOLD }}>How it works</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            Simple, <em style={{ color: GOLD }}>guided care.</em>
          </h2>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-7 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.t} className="relative animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                  <div
                    className="relative z-10 h-14 w-14 rounded-full flex items-center justify-center mb-4 border shadow-md"
                    style={{ background: "#fff", borderColor: GOLD, color: GOLD }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-[10px] font-medium flex items-center justify-center" style={{ background: GOLD, color: FOREST }}>{i + 1}</span>
                  </div>
                  <h3 className="font-serif text-lg" style={{ color: FOREST, fontWeight: 500 }}>{s.t}</h3>
                  <p className="mt-1 text-sm" style={{ color: "#2d4a3a" }}>{s.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- FINAL CTA ---------- */
const FinalCta = () => (
  <section className="py-24 relative overflow-hidden" style={{ background: FOREST }}>
    <div
      className="absolute inset-0 opacity-30 pointer-events-none"
      style={{ background: `radial-gradient(50% 50% at 50% 50%, ${GOLD}55, transparent 70%)` }}
    />
    <div className="container relative z-10 max-w-2xl text-center">
      <h2 className="font-serif text-3xl md:text-5xl leading-tight" style={{ fontWeight: 300, color: WARM_WHITE }}>
        Take the first step toward <em style={{ color: GOLD }}>feeling better.</em>
      </h2>
      <div className="mt-10 flex flex-col items-center gap-4">
        <Link
          to="/get-started/hormone-therapy"
          onClick={() => trackEvent("quiz_started", { treatment: "hormone-therapy" })}
          className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: GOLD, color: FOREST }}
        >
          Start Assessment →
        </Link>
        <p className="text-xs max-w-md" style={{ color: "rgba(255,255,255,0.65)" }}>
          Treatment requires clinician review and approval. Individual results vary.
        </p>
      </div>
    </div>
  </section>
);

/* ---------- STICKY MOBILE CTA ---------- */
const StickyCta = () => (
  <div className="md:hidden fixed bottom-3 left-3 right-3 z-40">
    <Link
      to="/get-started/hormone-therapy"
      onClick={() => trackEvent("quiz_started", { treatment: "hormone-therapy", source: "sticky" })}
      className="flex items-center justify-center rounded-full py-3.5 text-sm font-medium shadow-2xl"
      style={{ background: FOREST, color: WARM_WHITE }}
    >
      Get Started →
    </Link>
  </div>
);

export const HormoneLanding = () => (
  <div className="min-h-screen" style={{ background: WARM_WHITE }}>
    <Header />
    <Hero />
    <WhatsChanged />
    <Ecosystem />
    <TreatmentOptions />
    <Stacks />
    <Comparison />
    <HowItWorks />
    <FinalCta />
    <SafetyInfo />
    <Footer />
    <StickyCta />
  </div>
);

export default HormoneLanding;
