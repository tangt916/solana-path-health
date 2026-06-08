import { useState } from "react";
import {
  Sparkles, Scissors, TrendingUp, ShieldCheck, Droplets, Activity,
  Stethoscope, ClipboardCheck, Package, MessageCircle, Check, Minus,
  Sun, Brain, Dna, Leaf, FlaskConical, HeartPulse,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SafetyInfo } from "@/components/landing/SafetyInfo";
import { trackEvent } from "@/lib/analytics";
import { FOREST, GOLD, WARM_WHITE, SAGE, eyebrowCls, h2Cls } from "./shared";
import { PrimaryCta as SharedPrimaryCta } from "./PrimaryCta";

const PrimaryCta = ({ label }: { label?: string }) => (
  <SharedPrimaryCta to="/get-started/hair-loss" treatment="hair-loss" label={label} />
);

const SecondaryCta = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border transition hover:opacity-80"
    style={{ borderColor: FOREST, color: FOREST }}
  >
    {label}
  </button>
);

/* ---------- HERO ---------- */
const Hero = () => {
  const floaters = [
    { label: "More Density", icon: TrendingUp, top: "12%", left: "6%", delay: 0 },
    { label: "Less Shedding", icon: Droplets, top: "22%", right: "8%", delay: 800 },
    { label: "Hairline Support", icon: ShieldCheck, bottom: "26%", left: "4%", delay: 1600 },
    { label: "Long-Term Growth", icon: Sparkles, bottom: "14%", right: "6%", delay: 2400 },
  ];
  return (
    <section className="relative overflow-hidden" style={{ background: WARM_WHITE }}>
      <style>{`
        @keyframes floatY { 0%,100% { transform: translateY(0)} 50% { transform: translateY(-10px)} }
        @keyframes strandGrow { 0% { transform: scaleY(0.3); opacity: .4 } 100% { transform: scaleY(1); opacity: 1 } }
        @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
        @keyframes drawPath { from { stroke-dashoffset: 800 } to { stroke-dashoffset: 0 } }
      `}</style>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 40% at 60% 30%, rgba(201,169,110,0.18), transparent 70%), radial-gradient(40% 40% at 20% 70%, rgba(28,58,46,0.08), transparent 70%)",
        }}
      />
      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className={eyebrowCls} style={{ color: GOLD }}>Solana Health · Hair Wellness</p>
            <h1 className="font-serif leading-[1.05]" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, color: FOREST }}>
              Stronger, Fuller, <em style={{ color: GOLD }}>Healthier Hair</em> Starts Here
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed max-w-xl" style={{ color: "#2d4a3a" }}>
              Personalized treatment options designed to support hair growth, reduce shedding, and help you feel more confident in your hair.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryCta label="Start Assessment →" />
              <SecondaryCta
                label="Explore Options"
                onClick={() => document.getElementById("approach")?.scrollIntoView({ behavior: "smooth" })}
              />
            </div>
            <p className="mt-4 text-xs" style={{ color: "#5a7060" }}>
              Free assessment · Clinician reviewed · Delivered to your door
            </p>
          </div>

          {/* Animated hair strand density graphic */}
          <div className="relative h-[460px] md:h-[540px]">
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                background: `linear-gradient(160deg, ${SAGE} 0%, ${WARM_WHITE} 70%)`,
                border: "1px solid rgba(28,58,46,0.08)",
                boxShadow: `0 30px 80px -30px ${FOREST}44`,
              }}
            >
              {/* density strands */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-[3px] px-6 pb-10" style={{ height: "70%" }}>
                {Array.from({ length: 60 }).map((_, i) => {
                  const h = 30 + Math.sin(i * 0.5) * 20 + Math.random() * 40;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 2,
                        height: `${h}%`,
                        background: `linear-gradient(to top, ${FOREST}, ${GOLD})`,
                        borderRadius: 2,
                        transformOrigin: "bottom",
                        animation: `strandGrow 1.6s ease-out ${i * 30}ms both`,
                        opacity: 0.85,
                      }}
                    />
                  );
                })}
              </div>
              {/* shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 5s linear infinite",
                  mixBlendMode: "soft-light",
                }}
              />
            </div>

            {floaters.map((f, i) => (
              <div
                key={i}
                className="absolute backdrop-blur-xl rounded-2xl px-4 py-3 flex items-center gap-2 text-sm"
                style={{
                  ...f,
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(28,58,46,0.1)",
                  boxShadow: `0 10px 30px -10px ${FOREST}33`,
                  color: FOREST,
                  animation: `floatY 4s ease-in-out ${f.delay}ms infinite`,
                }}
              >
                <f.icon size={16} style={{ color: GOLD }} />
                <span className="font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- WHAT ARE YOU NOTICING ---------- */
const Noticing = () => {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { title: "More Hair In The Shower", body: "Increased shedding can be triggered by stress, hormones, postpartum changes, or nutritional gaps. A clinician can help identify the root cause." },
    { title: "Wider Part Line", body: "A widening part is often one of the earliest visible signs of diffuse thinning — and one of the most responsive to early treatment." },
    { title: "Thinning Around Temples", body: "Temple recession often relates to hormonal patterns. Targeted treatment can support regrowth and slow progression." },
    { title: "Overall Thinning", body: "Diffuse thinning may indicate hormonal shifts, deficiencies, or genetic patterns. A personalized plan addresses multiple factors." },
    { title: "Postpartum Changes", body: "Postpartum shedding is common and usually temporary — but the right support can help your hair recover faster and fuller." },
    { title: "Early Prevention", body: "The most effective strategy is starting before significant loss occurs. Maintenance protocols protect what you have." },
  ];
  return (
    <section className="py-20 md:py-28" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="text-center mb-12">
          <p className={eyebrowCls} style={{ color: GOLD }}>Your Experience</p>
          <h2 className={h2Cls} style={{ color: FOREST }}>What Are You Noticing?</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => {
                  setOpen(isOpen ? null : i);
                  trackEvent("hair_symptom_clicked", { symptom: it.title });
                }}
                className="text-left rounded-2xl p-6 transition-all backdrop-blur-xl"
                style={{
                  background: isOpen ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)",
                  border: `1px solid ${isOpen ? GOLD : "rgba(28,58,46,0.1)"}`,
                  boxShadow: isOpen ? `0 20px 50px -20px ${FOREST}33` : "0 4px 14px -6px rgba(28,58,46,0.1)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg" style={{ color: FOREST }}>{it.title}</h3>
                  <span className="text-xl leading-none" style={{ color: GOLD }}>{isOpen ? "−" : "+"}</span>
                </div>
                {isOpen && (
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#2d4a3a" }}>{it.body}</p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- GROWTH TIMELINE ---------- */
const Timeline = () => {
  const steps = [
    { label: "Month 1", title: "Foundation", body: "Treatment begins. Scalp environment starts to optimize." },
    { label: "Month 2–3", title: "Stabilization", body: "Shedding may temporarily increase before slowing." },
    { label: "Month 3–6", title: "New Growth", body: "Finer regrowth becomes visible at the hairline and part." },
    { label: "Month 6–12", title: "Density", body: "Fuller, thicker, more confident hair with consistent use." },
  ];
  return (
    <section className="py-20 md:py-28" style={{ background: SAGE }}>
      <div className="container">
        <div className="text-center mb-14">
          <p className={eyebrowCls} style={{ color: GOLD }}>Realistic Expectations</p>
          <h2 className={h2Cls} style={{ color: FOREST }}>Your Hair Growth Journey</h2>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <svg viewBox="0 0 800 120" className="w-full" preserveAspectRatio="none" style={{ height: 100 }}>
            <path
              d="M 20 90 Q 200 90 300 60 T 580 30 T 780 15"
              fill="none"
              stroke={GOLD}
              strokeWidth="2"
              strokeDasharray="800"
              style={{ animation: "drawPath 3s ease-out forwards" }}
            />
          </svg>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 backdrop-blur-xl"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(28,58,46,0.1)",
                  boxShadow: `0 10px 30px -15px ${FOREST}33`,
                }}
              >
                <div className="text-xs font-medium tracking-widest uppercase" style={{ color: GOLD }}>{s.label}</div>
                <div className="font-serif text-lg mt-1" style={{ color: FOREST }}>{s.title}</div>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "#2d4a3a" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- APPROACH (treatment cards) ---------- */
const Approach = () => {
  const cards = [
    {
      name: "Daily Support",
      tag: "Foundational",
      ideal: "Early thinning, prevention-minded, want a simple daily routine.",
      goals: ["Maintain density", "Strengthen strands", "Support scalp health"],
    },
    {
      name: "Comprehensive Treatment",
      tag: "Most Personalized",
      ideal: "Visible thinning or shedding looking for a multi-pathway plan.",
      goals: ["Regrow density", "Reduce shedding", "Address hormonal factors"],
    },
    {
      name: "Prevention & Maintenance",
      tag: "Long-Term",
      ideal: "Family history or wants to protect long-term hair health.",
      goals: ["Slow progression", "Preserve hairline", "Sustained results"],
    },
  ];
  return (
    <section id="approach" className="py-20 md:py-28" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="text-center mb-12">
          <p className={eyebrowCls} style={{ color: GOLD }}>Treatment Pathways</p>
          <h2 className={h2Cls} style={{ color: FOREST }}>Find The Right Approach</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cards.map((c, i) => (
            <div
              key={i}
              className="rounded-3xl p-7 backdrop-blur-xl flex flex-col"
              style={{
                background: i === 1
                  ? `linear-gradient(160deg, ${FOREST} 0%, #2a4a3a 100%)`
                  : "rgba(255,255,255,0.8)",
                border: `1px solid ${i === 1 ? GOLD : "rgba(28,58,46,0.1)"}`,
                boxShadow: `0 20px 60px -25px ${FOREST}44`,
                color: i === 1 ? "#fff" : FOREST,
              }}
            >
              <div className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: GOLD }}>{c.tag}</div>
              <h3 className="font-serif text-2xl mb-3">{c.name}</h3>
              <p className="text-sm opacity-90 mb-5" style={{ color: i === 1 ? "rgba(255,255,255,0.85)" : "#2d4a3a" }}>
                <span className="font-medium">Ideal for: </span>{c.ideal}
              </p>
              <ul className="space-y-2 mb-6">
                {c.goals.map((g, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check size={16} style={{ color: GOLD }} />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <PrimaryCta label="Explore →" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- GOAL SELECTOR ---------- */
const GoalSelector = () => {
  const goals = [
    { label: "More Density", rec: "Comprehensive Treatment" },
    { label: "Less Shedding", rec: "Daily Support" },
    { label: "Hairline Support", rec: "Comprehensive Treatment" },
    { label: "Stronger Hair", rec: "Daily Support" },
    { label: "Maintenance", rec: "Prevention & Maintenance" },
  ];
  const [active, setActive] = useState(0);
  return (
    <section className="py-20 md:py-28" style={{ background: SAGE }}>
      <div className="container">
        <div className="text-center mb-12">
          <p className={eyebrowCls} style={{ color: GOLD }}>Personalize</p>
          <h2 className={h2Cls} style={{ color: FOREST }}>What Matters Most To You?</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {goals.map((g, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); trackEvent("hair_goal_selected", { goal: g.label }); }}
              className="px-5 py-3 rounded-full text-sm font-medium transition-all"
              style={{
                background: active === i ? FOREST : "rgba(255,255,255,0.7)",
                color: active === i ? "#fff" : FOREST,
                border: `1px solid ${active === i ? FOREST : "rgba(28,58,46,0.15)"}`,
              }}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div
          className="max-w-2xl mx-auto rounded-3xl p-8 text-center backdrop-blur-xl"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: `1px solid ${GOLD}`,
            boxShadow: `0 20px 60px -20px ${FOREST}33`,
          }}
        >
          <div className="text-xs uppercase tracking-widest mb-2" style={{ color: GOLD }}>Recommended For You</div>
          <div className="font-serif text-2xl md:text-3xl mb-4" style={{ color: FOREST }}>{goals[active].rec}</div>
          <PrimaryCta label="Start Assessment →" />
        </div>
      </div>
    </section>
  );
};

/* ---------- INFLUENCE WHEEL ---------- */
const Wheel = () => {
  const nodes = [
    { label: "Hormones", icon: Activity },
    { label: "Stress", icon: Brain },
    { label: "Nutrition", icon: Leaf },
    { label: "Genetics", icon: Dna },
    { label: "Scalp Health", icon: Droplets },
    { label: "Treatment", icon: FlaskConical },
  ];
  const cx = 280, cy = 280, r = 200;
  return (
    <section className="py-20 md:py-28" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="text-center mb-12">
          <p className={eyebrowCls} style={{ color: GOLD }}>The Full Picture</p>
          <h2 className={h2Cls} style={{ color: FOREST }}>Hair Health Is Influenced By More Than One Thing</h2>
        </div>
        <div className="relative mx-auto" style={{ width: 560, height: 560, maxWidth: "100%" }}>
          <svg viewBox="0 0 560 560" className="absolute inset-0 w-full h-full">
            {nodes.map((_, i) => {
              const a = (i * 360) / nodes.length - 90;
              const x = cx + Math.cos((a * Math.PI) / 180) * r;
              const y = cy + Math.sin((a * Math.PI) / 180) * r;
              return (
                <line
                  key={i}
                  x1={cx} y1={cy} x2={x} y2={y}
                  stroke={GOLD}
                  strokeWidth="1.5"
                  strokeDasharray="300"
                  style={{ animation: `drawPath 2s ease-out ${i * 200}ms forwards`, opacity: 0.4 }}
                />
              );
            })}
          </svg>
          <div
            className="absolute rounded-full flex items-center justify-center text-center"
            style={{
              width: 160, height: 160, left: cx - 80, top: cy - 80,
              background: `radial-gradient(circle at 30% 30%, ${GOLD}, ${FOREST} 80%)`,
              color: "#fff",
              boxShadow: `0 20px 60px -20px ${FOREST}88`,
            }}
          >
            <div>
              <Sparkles size={20} className="mx-auto mb-1" />
              <div className="font-serif text-lg leading-tight">Healthy<br/>Hair</div>
            </div>
          </div>
          {nodes.map((n, i) => {
            const a = (i * 360) / nodes.length - 90;
            const x = cx + Math.cos((a * Math.PI) / 180) * r;
            const y = cy + Math.sin((a * Math.PI) / 180) * r;
            return (
              <div
                key={i}
                className="absolute backdrop-blur-xl rounded-2xl px-4 py-3 flex items-center gap-2"
                style={{
                  left: x - 70, top: y - 24, width: 140,
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(28,58,46,0.12)",
                  boxShadow: `0 8px 24px -10px ${FOREST}33`,
                  color: FOREST,
                  animation: `floatY 4s ease-in-out ${i * 300}ms infinite`,
                }}
              >
                <n.icon size={16} style={{ color: GOLD }} />
                <span className="text-sm font-medium">{n.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- WHY SOLANA HEALTH ---------- */
const WhySolana = () => {
  const items = [
    { icon: HeartPulse, label: "Personalized Care" },
    { icon: Stethoscope, label: "Licensed Clinicians" },
    { icon: MessageCircle, label: "Ongoing Support" },
    { icon: Package, label: "Home Delivery" },
    { icon: FlaskConical, label: "Multiple Treatment Options" },
    { icon: TrendingUp, label: "Long-Term Planning" },
  ];
  return (
    <section className="py-20 md:py-28" style={{ background: SAGE }}>
      <div className="container">
        <div className="text-center mb-12">
          <p className={eyebrowCls} style={{ color: GOLD }}>The Solana Health Difference</p>
          <h2 className={h2Cls} style={{ color: FOREST }}>Why Solana Health</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {items.map((it, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex items-center gap-4 backdrop-blur-xl transition hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(28,58,46,0.1)",
                boxShadow: `0 10px 30px -15px ${FOREST}33`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${GOLD}22`, color: GOLD }}
              >
                <it.icon size={22} />
              </div>
              <div className="font-serif text-lg" style={{ color: FOREST }}>{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- COMPARE ---------- */
const Compare = () => {
  const rows = [
    { f: "Personalized formulation", d: true, c: true, p: false },
    { f: "Addresses hormonal factors", d: false, c: true, p: false },
    { f: "Daily-use routine", d: true, c: true, p: true },
    { f: "Best for active regrowth", d: false, c: true, p: false },
    { f: "Best for long-term protection", d: true, c: true, p: true },
    { f: "Clinician check-ins", d: true, c: true, p: true },
  ];
  const Cell = ({ v }: { v: boolean }) => (
    <div className="flex justify-center">
      {v ? <Check size={18} style={{ color: GOLD }} /> : <Minus size={18} style={{ color: "#a0aea4" }} />}
    </div>
  );
  return (
    <section className="py-20 md:py-28" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="text-center mb-12">
          <p className={eyebrowCls} style={{ color: GOLD }}>Side by Side</p>
          <h2 className={h2Cls} style={{ color: FOREST }}>Compare Your Options</h2>
        </div>
        <div
          className="max-w-5xl mx-auto rounded-3xl overflow-hidden backdrop-blur-xl"
          style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(28,58,46,0.1)" }}
        >
          <div className="grid grid-cols-4 px-6 py-5 text-sm font-medium" style={{ background: SAGE, color: FOREST }}>
            <div>Feature</div>
            <div className="text-center">Daily Support</div>
            <div className="text-center">Comprehensive</div>
            <div className="text-center">Prevention</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-4 px-6 py-4 text-sm items-center"
              style={{ borderTop: "1px solid rgba(28,58,46,0.08)", color: FOREST }}
            >
              <div>{r.f}</div>
              <Cell v={r.d} />
              <Cell v={r.c} />
              <Cell v={r.p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- HOW IT WORKS ---------- */
const HowItWorks = () => {
  const steps = [
    { icon: ClipboardCheck, label: "Assessment" },
    { icon: Stethoscope, label: "Clinician Review" },
    { icon: FlaskConical, label: "Treatment Plan" },
    { icon: MessageCircle, label: "Ongoing Support" },
  ];
  return (
    <section className="py-20 md:py-28" style={{ background: SAGE }}>
      <div className="container">
        <div className="text-center mb-14">
          <p className={eyebrowCls} style={{ color: GOLD }}>How It Works</p>
          <h2 className={h2Cls} style={{ color: FOREST }}>Simple, Supported, Personalized</h2>
        </div>
        <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
          />
          {steps.map((s, i) => (
            <div key={i} className="relative text-center" style={{ animation: `floatY 4s ease-in-out ${i * 400}ms infinite` }}>
              <div
                className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: "#fff",
                  border: `1px solid ${GOLD}`,
                  boxShadow: `0 10px 25px -10px ${FOREST}44`,
                  color: FOREST,
                }}
              >
                <s.icon size={24} />
              </div>
              <div className="text-xs tracking-widest uppercase mb-1" style={{ color: GOLD }}>Step {i + 1}</div>
              <div className="font-serif text-lg" style={{ color: FOREST }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- FINAL CTA ---------- */
const FinalCta = () => (
  <section className="py-24" style={{ background: `linear-gradient(160deg, ${FOREST} 0%, #142a22 100%)`, color: "#fff" }}>
    <div className="container text-center max-w-3xl">
      <p className={eyebrowCls} style={{ color: GOLD }}>Take The Next Step</p>
      <h2 className="font-serif leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 300 }}>
        Take The First Step Toward <em style={{ color: GOLD }}>Healthier Hair</em>
      </h2>
      <p className="text-base md:text-lg mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
        Free assessment. Reviewed by a licensed clinician. Delivered to your door.
      </p>
      <PrimaryCta label="Start Assessment →" />
      <p className="mt-8 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
        Treatment requires clinician review and approval. Results vary.
      </p>
    </div>
  </section>
);

export const HairLanding = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Noticing />
        <Timeline />
        <Approach />
        <GoalSelector />
        <Wheel />
        <WhySolana />
        <Compare />
        <HowItWorks />
        <FinalCta />
        <SafetyInfo />
      </main>
      <Footer />
    </div>
  );
};

export default HairLanding;
