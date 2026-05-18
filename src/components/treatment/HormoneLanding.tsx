import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SafetyInfo } from "@/components/landing/SafetyInfo";
import { trackEvent } from "@/lib/analytics";

const FOREST = "#1C3A2E";
const GOLD = "#C9A96E";
const WARM_WHITE = "#FAFAF8";
const SAGE = "#E8EDE6";

const eyebrowCls = "text-xs font-medium uppercase tracking-[0.18em] mb-4";
const h2Cls = "font-serif text-3xl md:text-4xl leading-tight";

const PrimaryCta = ({ label = "Take the Free Assessment →" }: { label?: string }) => (
  <Link
    to="/get-started/hormone-therapy"
    onClick={() => trackEvent("quiz_started", { treatment: "hormone-therapy" })}
    className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
    style={{ background: FOREST, color: WARM_WHITE }}
  >
    {label}
  </Link>
);

const Hero = () => (
  <section className="relative" style={{ background: WARM_WHITE }}>
    <div className="container relative z-10 py-20 md:py-28">
      <div className="max-w-3xl">
        <p className={eyebrowCls} style={{ color: GOLD }}>Hormone Health</p>
        <h1 className="font-serif leading-[1.08]" style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.25rem)", fontWeight: 300, color: FOREST }}>
          This isn&rsquo;t just stress.<br />
          <em style={{ color: GOLD }}>Your hormones changed.</em>
        </h1>
        <p className="mt-6 text-base leading-relaxed max-w-2xl" style={{ color: "#2d4a3a" }}>
          Fatigue that won&rsquo;t lift. Weight that moves to your midsection. Sleep that leaves you exhausted. Mood that doesn&rsquo;t feel like yours. These aren&rsquo;t personality traits or aging inevitabilities &mdash; they&rsquo;re symptoms. And they&rsquo;re treatable.
        </p>
        <div className="mt-8">
          <PrimaryCta />
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: FOREST }}>
          {[
            "Free provider consultation",
            "Bioidentical hormones",
            "Symptom-tracked dosing",
            "Adjusted as you progress",
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
  const symptoms = [
    "Persistent fatigue that doesn&rsquo;t improve with sleep",
    "Weight gain &mdash; especially around the midsection &mdash; without lifestyle changes",
    "Sleep disruption, night sweats, or temperature changes",
    "Mood shifts, anxiety, or irritability that feel out of character",
    "Brain fog or difficulty concentrating",
    "Low libido or changes in sexual health",
    "Irregular cycles or changes in cycle length",
  ];
  return (
    <section className="py-20" style={{ background: SAGE }}>
      <div className="container max-w-3xl">
        <p className={eyebrowCls} style={{ color: GOLD }}>Who it&rsquo;s for</p>
        <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
          Your body is sending signals. <em style={{ color: GOLD }}>We help you read them.</em>
        </h2>
        <p className="mt-6 text-base" style={{ color: "#2d4a3a" }}>
          This program is for women experiencing:
        </p>
        <ul className="mt-6 space-y-4">
          {symptoms.map((b, i) => (
            <li key={i} className="flex items-start gap-4 text-base leading-relaxed" style={{ color: "#1e3a22" }}>
              <span className="mt-1 font-serif text-lg" style={{ color: GOLD }}>→</span>
              <span dangerouslySetInnerHTML={{ __html: b }} />
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm" style={{ color: "#5a7060" }}>
          You don&rsquo;t need to check every box. If any of these feel familiar, a provider review is the right first step.
        </p>
      </div>
    </section>
  );
};

const SymptomMap = () => {
  const rows = [
    { symptom: "Fatigue", eval: "Thyroid signaling, cortisol patterns, estrogen and progesterone levels, sleep quality, iron status" },
    { symptom: "Sleep disruption", eval: "Progesterone levels, night sweats and temperature regulation, cortisol rhythm, perimenopausal cycle changes" },
    { symptom: "Mood shifts", eval: "Estrogen and progesterone balance, thyroid function, life stage, stress load, history of mood changes" },
    { symptom: "Weight (midsection)", eval: "Insulin sensitivity, cortisol, estrogen shifts, thyroid, muscle mass and recovery" },
    { symptom: "Low libido", eval: "Testosterone levels, estrogen status, vaginal and tissue health, mood, relationship and stress factors" },
  ];
  return (
    <section className="py-20" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="max-w-2xl mb-12">
          <p className={eyebrowCls} style={{ color: GOLD }}>The approach</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            Hormone therapy that adjusts to you &mdash; <em style={{ color: GOLD }}>not the other way around.</em>
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#2d4a3a" }}>
            Most hormone programs start with a standard protocol and leave it there. Solana tracks your symptoms over time and adjusts your dosing as your needs change. The goal isn&rsquo;t a number on a lab panel &mdash; it&rsquo;s how you actually feel.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(28,58,46,0.1)" }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
            <div className="px-6 py-4 text-xs uppercase tracking-wider hidden md:block" style={{ background: SAGE, color: GOLD }}>Symptom</div>
            <div className="px-6 py-4 text-xs uppercase tracking-wider hidden md:block" style={{ background: SAGE, color: GOLD }}>What your provider evaluates</div>
            {rows.map((r, i) => (
              <div key={r.symptom} className="contents">
                <div className="px-6 py-5 font-serif text-lg md:border-t" style={{ background: i % 2 === 0 ? "#fff" : "#fbfaf6", color: FOREST, borderColor: "rgba(28,58,46,0.08)" }}>
                  {r.symptom}
                </div>
                <div className="px-6 py-5 text-sm leading-relaxed md:border-t" style={{ background: i % 2 === 0 ? "#fff" : "#fbfaf6", color: "#2d4a3a", borderColor: "rgba(28,58,46,0.08)" }}>
                  {r.eval}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Medications = () => {
  const meds = [
    { name: "Estrogen", tag: null, body: "Topical cream, patch, or gel · Addresses hot flashes, sleep, mood, skin, and vaginal changes." },
    { name: "Progesterone", tag: null, body: "Oral or topical · Balances estrogen, supports sleep, and protects uterine lining." },
    { name: "Testosterone", tag: null, body: "Low-dose topical · For libido, energy, and body composition (when clinically appropriate)." },
    { name: "Combination protocols", tag: "Provider-guided", body: "Combinations of the above, adjusted based on symptom response over time." },
  ];
  return (
    <section className="py-20" style={{ background: SAGE }}>
      <div className="container">
        <div className="max-w-2xl mb-4">
          <p className={eyebrowCls} style={{ color: GOLD }}>What may be prescribed</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            Bioidentical options, <em style={{ color: GOLD }}>if appropriate for you.</em>
          </h2>
          <p className="mt-4 text-sm" style={{ color: "#2d4a3a" }}>
            All options below are bioidentical hormones prescribed by your licensed provider based on your individual health profile. Approval and options vary.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
          <em>Delivery method (cream, gel, oral, patch) determined by your provider based on your profile and preference. Approval is not guaranteed.</em>
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
    "Bioidentical hormone prescription (if appropriate)",
    "Medication delivered monthly",
    "Symptom-tracked dosing — adjusted over time",
    "Quarterly provider check-ins",
    "Dedicated care coordinator",
    "Free standard shipping",
  ];
  return (
    <section className="py-20" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <p className={eyebrowCls} style={{ color: GOLD }}>Pricing</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            Invest in <em style={{ color: GOLD }}>feeling like yourself again.</em>
          </h2>
          <p className="mt-4 text-base" style={{ color: "#2d4a3a" }}>
            As low as <span style={{ textDecoration: "line-through", opacity: 0.55 }}>$179</span>{" "}
            <strong style={{ color: FOREST }}>$119</strong>/month
          </p>
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
        Hormone therapy carries risks that vary by individual.
      </h2>
      <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#3a3a2a" }}>
        <p>
          Risks vary based on the type of hormones used, the delivery method, your dose, and your individual health history. Risks may include:
        </p>
        <p>
          <strong>Estrogen-containing therapies:</strong> increased risk of blood clots, stroke, and in some cases breast cancer &mdash; particularly with long-term use. Risk varies significantly based on age, delivery method, and whether progesterone is also used.
        </p>
        <p>
          <strong>Testosterone therapy:</strong> possible side effects include acne, hair changes, clitoral sensitivity changes, and voice changes at higher doses.
        </p>
        <p>
          Hormone therapy is <strong>not appropriate for</strong> women with: a history of breast, ovarian, or uterine cancer; unexplained vaginal bleeding; active blood clots or stroke; or certain liver conditions.
        </p>
        <p>
          Your provider will review your complete health history before prescribing. Regular monitoring is recommended for all hormone therapy patients.
        </p>
        <p style={{ color: "#5a7060", fontSize: "0.78rem" }}>
          Compounded drug products are not approved or evaluated for safety, effectiveness, or quality by the FDA. Prescription products require an online consultation with a healthcare provider who will determine if a prescription is appropriate. Results may vary.
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
      q: "Is this only for women going through menopause?",
      a: "No. Hormonal shifts begin years before menopause — often in your late 30s or early 40s — and affect energy, weight, sleep, mood, and focus long before periods stop. If your symptoms match, a provider evaluation makes sense regardless of where you are in your cycle.",
    },
    {
      q: "What's the difference between bioidentical and synthetic hormones?",
      a: "Bioidentical hormones have a molecular structure identical to the hormones your body produces naturally. Many women and providers prefer them because they interact with hormone receptors the same way endogenous hormones do. Your provider will determine the right type, dose, and delivery method based on your profile.",
    },
    {
      q: "How do I know which hormones I actually need?",
      a: "Your provider evaluates your symptoms, health history, and cycle status — not just lab numbers. Hormone therapy is about how you feel, not hitting an arbitrary range on a panel. Labs may be ordered to inform prescribing decisions when clinically appropriate.",
    },
    {
      q: "How long does it take to feel a difference?",
      a: "Some women notice changes in sleep and mood within 2-4 weeks. Energy and weight changes typically take 6-12 weeks as hormone levels stabilize. Your provider will adjust your protocol over time based on how you're responding.",
    },
    {
      q: "Is hormone therapy safe?",
      a: "Hormone therapy has an established safety profile when prescribed appropriately. Risks vary based on the type of hormones used, delivery method, dose, and your individual health history. Your provider will review your risk profile before prescribing and monitor you over time. Hormone therapy is not appropriate for women with certain cancer histories or cardiovascular conditions — your provider will screen for these.",
    },
    {
      q: "Do I need blood tests before starting?",
      a: "Labs are not always required to begin. Your provider will determine whether testing is needed based on your intake and symptom profile. If labs are ordered, your provider will walk you through what to get and how to interpret results.",
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
        Ready to feel like <em style={{ color: GOLD }}>yourself again?</em>
      </h2>
      <div className="mt-10 flex flex-col items-center gap-4">
        <Link
          to="/get-started/hormone-therapy"
          onClick={() => trackEvent("quiz_started", { treatment: "hormone-therapy" })}
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

export const HormoneLanding = () => (
  <div className="min-h-screen" style={{ background: WARM_WHITE }}>
    <Header />
    <Hero />
    <WhoItsFor />
    <SymptomMap />
    <Medications />
    <Pricing />
    <SafetyBlock />
    <FAQ />
    <FinalCta />
    <SafetyInfo />
    <Footer />
  </div>
);

export default HormoneLanding;
