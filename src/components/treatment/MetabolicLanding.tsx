import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SafetyInfo } from "@/components/landing/SafetyInfo";
import { FOREST, GOLD, WARM_WHITE, SAGE, eyebrowCls, h2Cls } from "./shared";
import { PrimaryCta as SharedPrimaryCta } from "./PrimaryCta";

const PrimaryCta = ({ label }: { label?: string }) => (
  <SharedPrimaryCta to="/get-started/weight-loss" treatment="weight-loss" label={label} />
);

const Hero = () => (
  <section className="relative" style={{ background: WARM_WHITE }}>
    <div className={`container relative z-10 py-20 md:py-28`}>
      <div className="max-w-3xl">
        <p className={eyebrowCls} style={{ color: GOLD }}>Metabolic &amp; Weight Health</p>
        <h1 className="font-serif leading-[1.08]" style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.25rem)", fontWeight: 300, color: FOREST }}>
          Your weight isn&rsquo;t a willpower problem.<br />
          <em style={{ color: GOLD }}>It&rsquo;s a biology problem.</em>
        </h1>
        <p className="mt-6 text-base leading-relaxed max-w-2xl" style={{ color: "#2d4a3a" }}>
          After years of doing everything right &mdash; eating well, exercising, cutting back &mdash; and still not seeing results, most women blame themselves. They shouldn&rsquo;t. Metabolic shifts change how your body processes food, stores fat, and signals hunger. Solana addresses the biology, not just the behavior.
        </p>
        <div className="mt-8">
          <PrimaryCta />
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: FOREST }}>
          {[
            "Free provider consultation",
            "Shipped to your door",
            "Monthly check-ins included",
            "Cancel anytime",
          ].map((b) => (
            <li key={b} className="inline-flex items-center gap-2">
              <span style={{ color: GOLD }}>✓</span> {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const WhoItsFor = () => {
  const bullets = [
    "You&rsquo;re eating well and exercising but your weight won&rsquo;t budge",
    "Your appetite feels out of control &mdash; not because of cravings, but because you&rsquo;re always hungry",
    "You&rsquo;ve noticed weight shifting even though your habits haven&rsquo;t changed",
    "You&rsquo;ve tried other programs and hit a wall after the first few weeks",
    "You want clinical support &mdash; not a diet plan",
  ];
  return (
    <section className="py-20" style={{ background: SAGE }}>
      <div className="container max-w-3xl">
        <p className={eyebrowCls} style={{ color: GOLD }}>Who it&rsquo;s for</p>
        <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>This program is for you if:</h2>
        <ul className="mt-8 space-y-4">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-4 text-base leading-relaxed" style={{ color: "#1e3a22" }}>
              <span className="mt-1 font-serif text-lg" style={{ color: GOLD }}>→</span>
              <span dangerouslySetInnerHTML={{ __html: b }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      n: "01",
      title: "Free assessment + consultation",
      body: "Your licensed provider reviews your health history, goals, and current medications. They&rsquo;ll determine whether a GLP-1 program is appropriate for you &mdash; no guessing, no one-size-fits-all.",
    },
    {
      n: "02",
      title: "Your protocol, prescribed",
      body: "If appropriate, your provider prescribes compounded semaglutide or tirzepatide with a dosing schedule tailored to your starting point and goals.",
    },
    {
      n: "03",
      title: "Delivered to your door",
      body: "Your medication ships from a licensed compounding pharmacy. Discreet packaging. Free standard shipping.",
    },
    {
      n: "04",
      title: "Ongoing support",
      body: "Monthly provider check-ins to track progress and adjust dosing. Message your care coordinator anytime. Nutrition and habit coaching included.",
    },
  ];
  return (
    <section className="py-20" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="max-w-2xl mb-12">
          <p className={eyebrowCls} style={{ color: GOLD }}>How it works</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            A metabolic program built around <em style={{ color: GOLD }}>your biology.</em>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl p-7" style={{ background: SAGE }}>
              <p className="font-serif text-3xl mb-3" style={{ color: GOLD, fontWeight: 400 }}>{s.n}</p>
              <h3 className="font-serif text-xl mb-2" style={{ fontWeight: 500, color: FOREST }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#2d4a3a" }} dangerouslySetInnerHTML={{ __html: s.body }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Medications = () => {
  const meds = [
    {
      name: "Compounded semaglutide",
      tag: "Most prescribed",
      body: "Weekly self-injection · Starts at 0.25mg, titrated by your provider. Targets appetite regulation and metabolic rate.",
    },
    {
      name: "Compounded tirzepatide",
      tag: null,
      body: "Weekly self-injection · Dual GIP/GLP-1 action. For patients whose providers recommend a dual-agonist approach.",
    },
    {
      name: "Oral semaglutide",
      tag: null,
      body: "Daily oral tablet · No injections required. Available depending on health profile and provider recommendation.",
    },
  ];
  return (
    <section className="py-20" style={{ background: SAGE }}>
      <div className="container">
        <div className="max-w-2xl mb-4">
          <p className={eyebrowCls} style={{ color: GOLD }}>What you might be prescribed</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            Prescription options, <em style={{ color: GOLD }}>if appropriate for you.</em>
          </h2>
          <p className="mt-4 text-sm" style={{ color: "#2d4a3a" }}>
            All prescribing decisions are made solely by your licensed provider based on your individual health profile.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {meds.map((m) => (
            <div key={m.name} className="relative rounded-2xl bg-white p-6 border" style={{ borderColor: "rgba(28,58,46,0.1)" }}>
              {m.tag && (
                <span className="absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider" style={{ background: GOLD, color: FOREST }}>
                  {m.tag}
                </span>
              )}
              <h3 className="font-serif text-xl mb-3" style={{ fontWeight: 500, color: FOREST }}>{m.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#2d4a3a" }}>{m.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm" style={{ color: "#5a7060" }}>
          <em>Note: Medication choice, dosing, and eligibility are determined entirely by your provider. Approval is not guaranteed.</em>
        </p>
        <p className="mt-4 max-w-3xl" style={{ fontSize: "0.7rem", lineHeight: 1.7, color: "#5a7060" }}>
          Compounded drug products are not approved or evaluated for safety, effectiveness, or quality by the FDA. Prescription products require an online consultation with a healthcare provider who will determine if a prescription is appropriate. Results may vary.
        </p>
      </div>
    </section>
  );
};

const Pricing = () => {
  const includes = [
    "Free initial provider consultation",
    "Medication (if prescribed) included",
    "Monthly provider check-ins + dose adjustments",
    "Dedicated care coordinator — message anytime",
    "Nutrition and habit coaching",
    "Free standard shipping",
    "Cancel anytime",
  ];
  return (
    <section className="py-20" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <p className={eyebrowCls} style={{ color: GOLD }}>Pricing</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            Straightforward pricing. <em style={{ color: GOLD }}>No hidden fees.</em>
          </h2>
        </div>


        <div className="mt-10 rounded-2xl p-7" style={{ background: SAGE }}>
          <p className="text-xs uppercase tracking-wider mb-4" style={{ color: GOLD }}>All plans include</p>
          <ul className="grid gap-2 md:grid-cols-2">
            {includes.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: FOREST }}>
                <span style={{ color: GOLD }}>✓</span> {i}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 text-center">
          <PrimaryCta label="Start with the free assessment →" />
        </div>

        <p className="mt-6 max-w-3xl mx-auto text-center" style={{ fontSize: "0.7rem", lineHeight: 1.7, color: "#5a7060" }}>
          Pricing shown is for the full program including medication if prescribed. Membership required. Prescription not guaranteed. If a prescription is not appropriate for you, you will not be charged for medication.
        </p>
        <p className="mt-4 max-w-3xl mx-auto text-center" style={{ fontSize: "0.7rem", lineHeight: 1.7, color: "#5a7060" }}>
          Subscription automatically renews. Cancel anytime before your next billing date. By selecting a plan you authorize Solana Health to charge your payment method on a recurring basis. See full <Link to="/terms" className="underline">Terms of Service</Link>.
        </p>
      </div>
    </section>
  );
};

const SafetyBlock = () => (
  <section className="py-16" style={{ background: "#f5f0e8", borderTop: "1px solid #e0d8c8" }}>
    <div className="container max-w-3xl">
      <p className="text-xs uppercase tracking-wider mb-3" style={{ color: "#8a6a2a" }}>⚠ Important Safety Information</p>
      <h2 className="font-serif text-2xl mb-4" style={{ color: FOREST, fontWeight: 400 }}>
        Warning: Risk of thyroid C-cell tumors
      </h2>
      <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#3a3a2a" }}>
        <p>
          In rodent studies, semaglutide caused thyroid C-cell tumors. It is unknown whether semaglutide causes thyroid C-cell tumors, including medullary thyroid carcinoma (MTC), in humans. GLP-1 medications are contraindicated in patients with a personal or family history of MTC or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).
        </p>
        <p>
          Additional risks include: pancreatitis, gallbladder problems, low blood sugar (especially with other diabetes medications), kidney problems, increased heart rate, and suicidal behavior or thinking. Common side effects include nausea, vomiting, diarrhea, constipation, and stomach pain.
        </p>
        <p>
          GLP-1 medications are <strong>not appropriate for</strong>: patients with a history of MTC or MEN 2, pregnant or breastfeeding women, or patients with Type 1 diabetes.
        </p>
      </div>
      <div className="mt-6">
        <Link to="/safety-info" className="text-sm underline" style={{ color: FOREST }}>
          View full safety information →
        </Link>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const faqs = [
    {
      q: "Is a GLP-1 prescription guaranteed?",
      a: "No. Whether a GLP-1 medication is appropriate for you is determined entirely by your licensed provider based on your health history, current medications, and clinical profile. If a prescription isn't right for you, your provider will discuss other options. You will not be charged for medication that isn't prescribed.",
    },
    {
      q: "What's the difference between semaglutide and tirzepatide?",
      a: "Both are GLP-1 receptor agonists that reduce appetite and support weight loss. Tirzepatide also activates GIP receptors (a dual-agonist), which some research suggests produces stronger results. Your provider will recommend one based on your health profile, not on cost or convenience.",
    },
    {
      q: "Do I need to inject myself?",
      a: "Compounded semaglutide and tirzepatide are typically administered as weekly self-injections using a small pen needle — most patients describe it as nearly painless. Oral semaglutide is also available for patients whose providers determine it's appropriate.",
    },
    {
      q: "What side effects should I expect?",
      a: "The most common side effects are nausea, constipation, reduced appetite, and mild stomach discomfort — especially in the first few weeks as your body adjusts. These typically improve as your dose stabilizes. Your provider will titrate your dose to minimize discomfort.",
    },
    {
      q: "How long until I see results?",
      a: "Most patients notice reduced appetite within the first 2–4 weeks. Meaningful weight changes typically appear by month 2–3. Clinical trials show an average of 15–20% body weight reduction over 12–18 months with consistent use.",
    },
    {
      q: "Can I take this if I'm already on other medications?",
      a: "Disclose all current medications and supplements during your intake — your provider will review for interactions. GLP-1 medications are not appropriate for everyone, particularly those on certain diabetes medications or with specific medical histories.",
    },
  ];
  return (
    <section className="py-20" style={{ background: SAGE }}>
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <p className={eyebrowCls} style={{ color: GOLD }}>FAQ</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>Common questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-2xl border bg-white p-5 shadow-sm group" style={{ borderColor: "rgba(28,58,46,0.1)" }}>
              <summary className="cursor-pointer font-serif text-lg list-none flex items-start justify-between gap-4" style={{ color: FOREST }}>
                <span>{f.q}</span>
                <span className="text-xl leading-none transition-transform group-open:rotate-45" style={{ color: GOLD }}>+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#2d4a3a" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCta = () => (
  <section className="py-20" style={{ background: FOREST }}>
    <div className="container max-w-xl text-center">
      <h2 className="font-serif text-4xl leading-tight" style={{ fontWeight: 300, color: WARM_WHITE }}>
        Ready to work <em style={{ color: GOLD }}>with your biology?</em>
      </h2>
      <div className="mt-10 flex flex-col items-center gap-4">
        <Link
          to="/get-started/weight-loss"
          onClick={() => trackEvent("quiz_started", { treatment: "weight-loss" })}
          className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: GOLD, color: FOREST }}
        >
          Take the free assessment →
        </Link>
        <Link to="/support" className="text-xs underline-offset-4 hover:underline" style={{ color: "rgba(255,255,255,0.65)" }}>
          Have questions? Message our care team
        </Link>
      </div>
    </div>
  </section>
);

export const MetabolicLanding = () => (
  <div className="min-h-screen" style={{ background: WARM_WHITE }}>
    <Header />
    <Hero />
    <WhoItsFor />
    <HowItWorks />
    <Medications />
    <Pricing />
    <SafetyBlock />
    <FAQ />
    <FinalCta />
    <SafetyInfo />
    <Footer />
  </div>
);

export default MetabolicLanding;
