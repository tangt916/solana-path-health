import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SafetyInfo } from "@/components/landing/SafetyInfo";
import { trackEvent } from "@/lib/analytics";
import { FOREST, GOLD, WARM_WHITE, SAGE, eyebrowCls, h2Cls } from "./shared";
import { PrimaryCta as SharedPrimaryCta } from "./PrimaryCta";

const QUIZ = "/get-started/anti-aging";

const PrimaryCta = ({ label = "Find My Stack →" }: { label?: string }) => (
  <SharedPrimaryCta to={QUIZ} treatment="peptides" label={label} />
);

const SecondaryCta = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-medium border transition-colors hover:bg-white"
    style={{ borderColor: FOREST, color: FOREST }}
  >
    {label}
  </Link>
);

const Hero = () => (
  <section className="relative" style={{ background: WARM_WHITE }}>
    <div className="container relative z-10 py-20 md:py-28">
      <div className="max-w-3xl">
        <p className={eyebrowCls} style={{ color: GOLD }}>Peptides &amp; Longevity</p>
        <h1 className="font-serif leading-[1.08]" style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.25rem)", fontWeight: 300, color: FOREST }}>
          The <em style={{ color: GOLD }}>Glow + Energy</em> Stack.
        </h1>
        <p className="mt-6 text-base leading-relaxed max-w-2xl" style={{ color: "#2d4a3a" }}>
          Clinician-guided peptide and wellness therapies designed to support energy, recovery, skin health, libido, and healthy aging.
        </p>
        <p className="mt-4 text-base leading-relaxed max-w-2xl" style={{ color: "#2d4a3a" }}>
          Whether your goal is to feel more energized, support your skin from within, improve recovery, or build a more optimized wellness routine, Solana Health helps match you with a personalized plan.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryCta />
          <SecondaryCta to="#treatments" label="Explore Treatments" />
        </div>
        <p className="mt-6 text-sm" style={{ color: FOREST }}>
          Personalized care. Licensed clinician review. Prescription treatments when appropriate.
        </p>
      </div>
    </div>
  </section>
);

const GOALS = [
  { title: "Glow & Skin Quality", body: "Support smoother-looking, healthier-feeling skin from within." },
  { title: "Energy & Cellular Wellness", body: "Support energy metabolism and whole-body vitality." },
  { title: "Recovery & Body Composition", body: "Support better recovery, resilience, and performance routines." },
  { title: "Libido & Intimacy", body: "Explore clinician-guided options for desire and sexual wellness." },
  { title: "Healthy Aging", body: "Build a proactive wellness plan designed around how you want to feel long-term." },
];

const Goals = () => (
  <section className="py-20" style={{ background: SAGE }}>
    <div className="container">
      <div className="max-w-2xl mb-10">
        <p className={eyebrowCls} style={{ color: GOLD }}>Choose your wellness goal</p>
        <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
          What do you want to <em style={{ color: GOLD }}>improve?</em>
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GOALS.map((g) => (
          <Link
            key={g.title}
            to={QUIZ}
            onClick={() => trackEvent("quiz_started", { treatment: "peptides", goal: g.title })}
            className="group rounded-2xl bg-white p-7 border transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ borderColor: "rgba(28,58,46,0.1)" }}
          >
            <h3 className="font-serif text-xl mb-2" style={{ color: FOREST, fontWeight: 500 }}>{g.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#2d4a3a" }}>{g.body}</p>
            <span className="mt-4 inline-block text-xs font-medium" style={{ color: GOLD }}>
              Explore →
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <PrimaryCta label="Build My Personalized Plan →" />
      </div>
    </div>
  </section>
);

type Treatment = { name: string; tagline: string; what: string; best: string[]; cta: string };

const TREATMENTS: Treatment[] = [
  {
    name: "NAD+",
    tagline: "For cellular energy and healthy aging support.",
    what: "NAD+ helps support the body's natural energy metabolism and wellness processes.",
    best: ["Energy support", "Healthy aging routines", "Recovery-focused wellness", "People who want to feel more optimized"],
    cta: "Learn About NAD+",
  },
  {
    name: "Sermorelin",
    tagline: "For recovery, sleep, and body composition support.",
    what: "Sermorelin supports the body's natural growth-hormone signaling pathways and may be considered as part of a clinician-guided wellness plan.",
    best: ["Recovery support", "Sleep quality support", "Body composition goals", "Wellness optimization"],
    cta: "Learn About Sermorelin",
  },
  {
    name: "GHK-Cu",
    tagline: "For skin, hair, and visible aging support.",
    what: "GHK-Cu is commonly used in aesthetic wellness protocols focused on skin quality, hair health, and overall appearance.",
    best: ["Skin quality", "Glow-focused routines", "Hair wellness support", "Appearance-focused aging support"],
    cta: "Learn About GHK-Cu",
  },
  {
    name: "PT-141",
    tagline: "For libido and intimacy support.",
    what: "PT-141 may be considered for people looking for clinician-guided support around desire and sexual wellness.",
    best: ["Low desire", "Intimacy support", "Sexual wellness", "Confidence in your body"],
    cta: "Learn About PT-141",
  },
  {
    name: "Glutathione",
    tagline: "For antioxidant and glow support.",
    what: "Glutathione is a naturally occurring antioxidant that supports the body's defense against oxidative stress.",
    best: ["Antioxidant support", "Glow-focused wellness", "Healthy aging routines", "Overall cellular wellness"],
    cta: "Learn About Glutathione",
  },
];

const FeaturedTreatments = () => (
  <section id="treatments" className="py-20" style={{ background: WARM_WHITE }}>
    <div className="container">
      <div className="max-w-2xl mb-10">
        <p className={eyebrowCls} style={{ color: GOLD }}>Featured treatments</p>
        <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
          Your stack, <em style={{ color: GOLD }}>personalized.</em>
        </h2>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "#2d4a3a" }}>
          Solana Health offers clinician-guided peptide and wellness therapies that can be used individually or as part of a personalized protocol.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TREATMENTS.map((t) => (
          <div key={t.name} className="rounded-2xl bg-white p-7 border flex flex-col" style={{ borderColor: "rgba(28,58,46,0.1)" }}>
            <h3 className="font-serif text-2xl mb-1" style={{ color: FOREST, fontWeight: 500 }}>{t.name}</h3>
            <p className="text-sm italic mb-3" style={{ color: GOLD }}>{t.tagline}</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#2d4a3a" }}>{t.what}</p>
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: FOREST }}>Best for</p>
            <ul className="space-y-1.5 mb-6 flex-1">
              {t.best.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "#2d4a3a" }}>
                  <span style={{ color: GOLD }}>•</span> {b}
                </li>
              ))}
            </ul>
            <Link
              to={QUIZ}
              onClick={() => trackEvent("quiz_started", { treatment: "peptides", item: t.name })}
              className="inline-flex items-center text-sm font-medium"
              style={{ color: FOREST }}
            >
              {t.cta} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const NotSure = () => (
  <section className="py-20" style={{ background: SAGE }}>
    <div className="container max-w-2xl text-center">
      <p className={eyebrowCls} style={{ color: GOLD }}>Not sure what you need?</p>
      <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
        You don&rsquo;t need to know your <em style={{ color: GOLD }}>stack yet.</em>
      </h2>
      <p className="mt-5 text-base leading-relaxed" style={{ color: "#2d4a3a" }}>
        Most people come to Solana Health with a goal, not a treatment name.
      </p>
      <p className="mt-3 text-base leading-relaxed" style={{ color: "#2d4a3a" }}>
        You tell us what you want to improve. A licensed clinician reviews your health history and helps determine whether treatment is appropriate.
      </p>
      <div className="mt-8">
        <PrimaryCta label="Start Assessment →" />
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
  const steps = [
    { n: "1", title: "Tell Us Your Goals", body: "Complete a short online assessment about your health, lifestyle, and wellness priorities." },
    { n: "2", title: "Get Clinician Guidance", body: "A licensed clinician reviews your information and recommends options when appropriate." },
    { n: "3", title: "Start Your Plan", body: "If prescribed, your treatment is shipped to your door with ongoing support." },
  ];
  return (
    <section className="py-20" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="max-w-2xl mb-12 text-center mx-auto">
          <p className={eyebrowCls} style={{ color: GOLD }}>How it works</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            Personalized wellness <em style={{ color: GOLD }}>in 3 steps.</em>
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full font-serif text-xl" style={{ background: SAGE, color: FOREST }}>
                {s.n}
              </div>
              <h3 className="font-serif text-xl mb-2" style={{ color: FOREST }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#2d4a3a" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhoFor = () => {
  const fit = [
    "Feel more energized",
    "Support your skin and glow",
    "Improve recovery",
    "Support healthy aging",
    "Feel more confident in your body",
    "Explore libido or intimacy support",
    "Build a proactive wellness routine",
  ];
  return (
    <section className="py-20" style={{ background: SAGE }}>
      <div className="container max-w-3xl">
        <p className={eyebrowCls} style={{ color: GOLD }}>Who this is for</p>
        <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
          This may be a fit if you <em style={{ color: GOLD }}>want to:</em>
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {fit.map((b) => (
            <li key={b} className="flex items-start gap-3 text-base" style={{ color: "#1e3a22" }}>
              <span style={{ color: GOLD }}>✓</span> {b}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm leading-relaxed" style={{ color: "#3a4a3a" }}>
          This may not be a fit if you are looking for a quick fix, guaranteed results, or treatment without clinician review.
        </p>
      </div>
    </section>
  );
};

const FinalCta = () => (
  <section className="py-20" style={{ background: FOREST }}>
    <div className="container max-w-xl text-center">
      <h2 className="font-serif text-4xl leading-tight" style={{ fontWeight: 300, color: WARM_WHITE }}>
        Build your personalized <em style={{ color: GOLD }}>Glow + Energy</em> stack.
      </h2>
      <p className="mt-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
        Take the assessment and see which treatment options may fit your goals.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4">
        <Link
          to={QUIZ}
          onClick={() => trackEvent("quiz_started", { treatment: "peptides" })}
          className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: GOLD, color: FOREST }}
        >
          Find My Stack →
        </Link>
      </div>
      <p className="mt-8 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
        Treatment requires clinician review. Prescription treatments are only provided when medically appropriate. Results vary.
      </p>
    </div>
  </section>
);

export const PeptidesLanding = () => (
  <div className="min-h-screen" style={{ background: WARM_WHITE }}>
    <Header />
    <Hero />
    <Goals />
    <FeaturedTreatments />
    <NotSure />
    <HowItWorks />
    <WhoFor />
    <FinalCta />
    <SafetyInfo />
    <Footer />
  </div>
);

export default PeptidesLanding;
