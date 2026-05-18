import { Link } from "react-router-dom";
import { useState } from "react";
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

const PrimaryCta = ({ label = "Build Your Protocol →" }: { label?: string }) => (
  <Link
    to="/get-started/anti-aging"
    onClick={() => trackEvent("quiz_started", { treatment: "peptides" })}
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
        <p className={eyebrowCls} style={{ color: GOLD }}>Peptide Therapy</p>
        <h1 className="font-serif leading-[1.08]" style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.25rem)", fontWeight: 300, color: FOREST }}>
          Your body already knows how to heal.<br />
          <em style={{ color: GOLD }}>Peptides tell it where to start.</em>
        </h1>
        <p className="mt-6 text-base leading-relaxed max-w-2xl" style={{ color: "#2d4a3a" }}>
          Peptides are short-chain amino acids your body uses as biological signals &mdash; directing repair, recovery, energy production, and cellular regeneration. As these signals decline with age, so does everything they control. Solana&rsquo;s physician-supervised peptide protocols restore what&rsquo;s been lost &mdash; precisely and intentionally.
        </p>
        <div className="mt-8">
          <PrimaryCta />
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: FOREST }}>
          {[
            "Free provider consultation",
            "Physician-supervised",
            "Compounded at licensed pharmacies",
            "Delivered to your door",
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
  const items = [
    "You feel older than you know you should",
    "Recovery from workouts takes longer than it used to",
    "Your energy never fully recharges, even with good sleep",
    "You want to optimize cellular health — not just treat symptoms",
    "You're interested in longevity tools backed by science",
    "You've tried supplements and want something with real potency",
  ];
  return (
    <section className="py-20" style={{ background: SAGE }}>
      <div className="container max-w-3xl">
        <p className={eyebrowCls} style={{ color: GOLD }}>Who it&rsquo;s for</p>
        <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
          For those who want to <em style={{ color: GOLD }}>get ahead of how they&rsquo;re aging.</em>
        </h2>
        <ul className="mt-8 space-y-4">
          {items.map((b, i) => (
            <li key={i} className="flex items-start gap-4 text-base leading-relaxed" style={{ color: "#1e3a22" }}>
              <span className="mt-1 font-serif text-lg" style={{ color: GOLD }}>→</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

type Peptide = {
  name: string;
  tag?: string;
  what: string;
  delivery?: string[];
  priceWas?: string;
  priceNow: string;
};

const PROTOCOLS: Record<string, { label: string; eyebrow: string; items: Peptide[] }> = {
  energy: {
    label: "Energy",
    eyebrow: "Energy & Cellular Health",
    items: [
      {
        name: "NAD+",
        tag: "Most Requested",
        what:
          "NAD+ (nicotinamide adenine dinucleotide) is the cellular energy molecule that declines by up to 50% between 40 and 60. Used in protocols that support mitochondrial function, DNA repair, cognitive clarity, and metabolism — the foundation of every other protocol.",
        delivery: [
          "Nasal spray — gentle daily dosing, highest convenience",
          "Oral capsule/sublingual — daily, easy integration",
          "Injection — highest bioavailability, weekly or as directed",
        ],
        priceWas: "$249",
        priceNow: "from $89/month",
      },
      {
        name: "Glutathione",
        what:
          "Master antioxidant. Used in protocols associated with reducing oxidative stress and supporting liver detox, skin clarity, immune function, and cellular repair. Often paired with NAD+ protocols.",
        priceWas: "$149",
        priceNow: "$99/month",
      },
    ],
  },
  skin: {
    label: "Skin",
    eyebrow: "Skin & Anti-Aging",
    items: [
      {
        name: "GHK-Cu — Copper Peptide",
        what:
          "One of the most researched anti-aging peptides. Used in protocols that support collagen and elastin production, the appearance of fine lines, wound healing, and skin repair gene expression.",
        priceWas: "$129",
        priceNow: "$89/month",
      },
    ],
  },
  recovery: {
    label: "Recovery",
    eyebrow: "Growth & Recovery Peptides",
    items: [
      {
        name: "Sermorelin",
        what:
          "May support the body's natural growth hormone signaling pathways. Used in protocols associated with lean muscle, fat metabolism, sleep quality, and cellular repair — a more gradual, physiologically natural approach than direct GH.",
        priceWas: "$199",
        priceNow: "$139/month",
      },
      {
        name: "Ipamorelin + CJC-1295",
        what:
          "A synergistic peptide combination — CJC-1295 extends growth hormone release; Ipamorelin amplifies the pulse. Used in protocols associated with lean body composition, recovery, energy, and sleep depth.",
        priceWas: "$229",
        priceNow: "$159/month",
      },
    ],
  },
  sleep: {
    label: "Sleep",
    eyebrow: "Sleep",
    items: [
      {
        name: "DSIP — Delta Sleep-Inducing Peptide",
        what:
          "A naturally occurring neuropeptide used in protocols that support deep, restorative sleep without sedation, and growth hormone release during sleep cycles.",
        priceWas: "$149",
        priceNow: "$99/month",
      },
    ],
  },
  sexual: {
    label: "Sexual Health",
    eyebrow: "Sexual Health & Vitality",
    items: [
      {
        name: "Kisspeptin-10",
        what:
          "A neuropeptide used in sexual wellness protocols that engage the body's natural GnRH/LH hormone axis — a more foundational approach associated with libido, hormonal balance, and mood regulation.",
        priceWas: "$199",
        priceNow: "$139/month",
      },
      {
        name: "PT-141 — Bremelanotide",
        what:
          "Acts on the central nervous system. Used in sexual wellness protocols that engage arousal pathways directly — not just blood flow. Used as-needed or in low-dose protocols.",
        priceWas: "$129",
        priceNow: "$89/month",
      },
    ],
  },
};

const TabbedProtocols = () => {
  const keys = Object.keys(PROTOCOLS);
  const [active, setActive] = useState(keys[0]);
  const cat = PROTOCOLS[active];
  return (
    <section className="py-20" style={{ background: WARM_WHITE }}>
      <div className="container">
        <div className="max-w-2xl mb-10">
          <p className={eyebrowCls} style={{ color: GOLD }}>The protocols</p>
          <h2 className={h2Cls} style={{ fontWeight: 300, color: FOREST }}>
            Targeted protocols, <em style={{ color: GOLD }}>matched to your goals.</em>
          </h2>
          <p className="mt-4 text-sm" style={{ color: "#2d4a3a" }}>
            Browse by category. Your provider determines which protocols &mdash; if any &mdash; are appropriate for you.
          </p>
        </div>

        <div role="tablist" aria-label="Peptide categories" className="flex flex-wrap gap-2 mb-8">
          {keys.map((k) => {
            const isActive = k === active;
            return (
              <button
                key={k}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(k)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all border"
                style={{
                  background: isActive ? FOREST : "transparent",
                  color: isActive ? WARM_WHITE : FOREST,
                  borderColor: isActive ? FOREST : "rgba(28,58,46,0.2)",
                }}
              >
                {PROTOCOLS[k].label}
              </button>
            );
          })}
        </div>

        <p className="text-xs uppercase tracking-wider mb-6" style={{ color: GOLD }}>
          {cat.eyebrow}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {cat.items.map((p) => (
            <div key={p.name} className="relative rounded-2xl bg-white p-7 border" style={{ borderColor: "rgba(28,58,46,0.1)" }}>
              {p.tag && (
                <span className="absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider" style={{ background: GOLD, color: FOREST }}>
                  {p.tag}
                </span>
              )}
              <h3 className="font-serif text-2xl mb-3" style={{ fontWeight: 500, color: FOREST }}>{p.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#2d4a3a" }}>{p.what}</p>
              {p.delivery && (
                <ul className="mt-4 space-y-2">
                  {p.delivery.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm" style={{ color: "#2d4a3a" }}>
                      <span style={{ color: GOLD }}>•</span> {d}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-5 text-sm" style={{ color: FOREST }}>
                {p.priceWas && (
                  <>From <span style={{ textDecoration: "line-through", opacity: 0.55 }}>{p.priceWas}</span>{" "}</>
                )}
                <strong>{p.priceNow}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Includes = () => {
  const items = [
    "Free initial provider consultation",
    "Compounded medication (if prescribed) delivered monthly",
    "Provider check-ins and protocol adjustments",
    "Dedicated care coordinator",
    "Free standard shipping",
    "Cancel anytime",
  ];
  return (
    <section className="py-16" style={{ background: SAGE }}>
      <div className="container">
        <div className="rounded-2xl p-7" style={{ background: WARM_WHITE }}>
          <p className="text-xs uppercase tracking-wider mb-4" style={{ color: GOLD }}>All protocols include</p>
          <ul className="grid gap-2 md:grid-cols-2">
            {items.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: FOREST }}>
                <span style={{ color: GOLD }}>✓</span> {i}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 max-w-3xl text-center mx-auto" style={{ fontSize: "0.7rem", lineHeight: 1.7, color: "#5a7060" }}>
          Subscription automatically renews. Cancel anytime before your next billing date. By selecting a plan you authorize Solana Health to charge your payment method on a recurring basis. See full <Link to="/terms" className="underline">Terms of Service</Link>.
        </p>
      </div>
    </section>
  );
};

const SafetyBlock = () => {
  const rows = [
    { name: "NAD+", body: "Generally well-tolerated. Higher-dose injections may cause temporary flushing, nausea, or injection site reactions. Drug interactions are possible — disclose all current medications to your provider." },
    { name: "Growth hormone peptides (Sermorelin, Ipamorelin/CJC-1295)", body: "May affect insulin sensitivity and glucose metabolism. Not appropriate for patients with active malignancies or history of certain cancers. Requires provider evaluation." },
    { name: "TB-500 / Healing peptides", body: "Limited long-term human data available. Generally well-tolerated in short-term research. Not appropriate during pregnancy or breastfeeding." },
    { name: "PT-141 (Bremelanotide)", body: "May cause nausea, flushing, headache, or temporary blood pressure changes. Not appropriate for patients with cardiovascular disease or uncontrolled hypertension." },
    { name: "GHK-Cu", body: "Topical use is well-studied; injectable use has limited formal clinical data." },
    { name: "DSIP", body: "Limited long-term human safety data. Disclose all sleep medications to your provider." },
    { name: "Kisspeptin-10", body: "Research stage in humans. Provider evaluation required before use. Not FDA-approved." },
    { name: "Glutathione", body: "Generally well-tolerated. IV or injectable forms may cause reactions in sensitive individuals." },
  ];
  return (
    <section className="py-16" style={{ background: "#f5f0e8", borderTop: "1px solid #e0d8c8" }}>
      <div className="container max-w-3xl">
        <p className="text-xs uppercase tracking-wider mb-3" style={{ color: "#8a6a2a" }}>⚠ Important Safety Information — Peptides &amp; NAD+</p>
        <h2 className="font-serif text-2xl mb-4" style={{ color: FOREST, fontWeight: 400 }}>
          What to know before starting a peptide protocol.
        </h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#3a3a2a" }}>
          <p>
            Compounded peptide and NAD+ products are not approved or evaluated for safety, effectiveness, or quality by the FDA. Many peptides available through Solana are compounded versions of research compounds with limited large-scale human clinical trial data. Their use is considered investigational in many contexts.
          </p>
          <p>
            Prescription products require an online consultation with a licensed healthcare provider who will determine if a prescription is appropriate for you based on your individual health profile. Results may vary.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {rows.map((r) => (
            <details key={r.name} className="rounded-xl border bg-white p-4 group" style={{ borderColor: "rgba(28,58,46,0.1)" }}>
              <summary className="cursor-pointer font-serif text-base list-none flex items-start justify-between gap-4" style={{ color: FOREST }}>
                <span>{r.name}</span>
                <span className="text-lg leading-none transition-transform group-open:rotate-45" style={{ color: GOLD }}>+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#3a3a2a" }}>{r.body}</p>
            </details>
          ))}
        </div>

        <p className="mt-6 text-sm leading-relaxed" style={{ color: "#3a3a2a" }}>
          None of these products have been approved by the FDA to treat, cure, or prevent any disease or condition. All prescribing decisions are made solely by independent licensed healthcare providers. Approval is not guaranteed.
        </p>

        <div className="mt-6">
          <Link to="/safety-info" className="text-sm underline" style={{ color: FOREST }}>
            View full safety information →
          </Link>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "Are these peptides FDA-approved?",
      a: "Most compounded peptides are not individually FDA-approved drug products. Many are compounded versions of research compounds that have been studied for safety and efficacy but have not gone through the full FDA drug approval process. NAD+ and some peptide precursors have established safety data. Your provider will only recommend protocols where the evidence supports their use for your specific goals. See our full safety information above.",
    },
    {
      q: "How do I know which peptide protocol is right for me?",
      a: "Your provider reviews your goals, health history, and current medications during the free consultation and builds a protocol specific to you. Most patients start with 1-2 targeted peptides before adding complexity. We don't recommend stacking everything at once.",
    },
    {
      q: "Do all peptides require injections?",
      a: "No. NAD+ is available as an oral, nasal, or injectable protocol. GHK-Cu can be topical. Some peptides (Sermorelin, Ipamorelin/CJC-1295) are typically administered as subcutaneous injections — small-gauge, once daily or as directed. Your provider will recommend the delivery method that fits your goals and comfort level.",
    },
    {
      q: "Can I combine multiple peptides?",
      a: "Yes — many protocols are designed as combinations (e.g. Ipamorelin + CJC-1295 for growth hormone support). Your provider will determine which combinations are safe and appropriate based on your health profile and goals. We don't recommend self-stacking without provider guidance.",
    },
    {
      q: "How long until I notice results?",
      a: "It depends on the protocol. NAD+ energy effects are typically felt within 1-3 weeks. Growth hormone peptides (Sermorelin, Ipamorelin/CJC-1295) usually show meaningful results at 3-6 months as they work through natural hormone cycles. Your provider will set accurate expectations at consultation. Results vary by individual.",
    },
    {
      q: "Are there drug interactions I should know about?",
      a: "Yes — some peptides interact with medications, particularly those affecting hormones, blood sugar, or immune function. Disclose all current medications, supplements, and health conditions during your intake. Your provider screens for interactions before prescribing.",
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
      <p className="text-xs uppercase tracking-[0.18em] mb-4" style={{ color: GOLD }}>Not sure which protocol is right for you?</p>
      <h2 className="font-serif text-4xl leading-tight" style={{ fontWeight: 300, color: WARM_WHITE }}>
        Take the <em style={{ color: GOLD }}>free assessment.</em>
      </h2>
      <p className="mt-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
        Your provider will review your health history, symptoms, and goals &mdash; and recommend only what makes sense for you.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4">
        <Link
          to="/get-started/anti-aging"
          onClick={() => trackEvent("quiz_started", { treatment: "peptides" })}
          className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: GOLD, color: FOREST }}
        >
          Take the Free Assessment →
        </Link>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
          <li>✓ Free consultation</li>
          <li>✓ No commitment</li>
          <li>✓ Response within 24 hours</li>
        </ul>
      </div>
      <p className="mt-8 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
        Compounded drug products are not approved or evaluated for safety, effectiveness, or quality by the FDA. Prescription products require an online consultation with a healthcare provider who will determine if a prescription is appropriate. Results may vary.
      </p>
    </div>
  </section>
);

export const PeptidesLanding = () => (
  <div className="min-h-screen" style={{ background: WARM_WHITE }}>
    <Header />
    <Hero />
    <WhoItsFor />
    <TabbedProtocols />
    <Includes />
    <SafetyBlock />
    <FAQ />
    <FinalCta />
    <SafetyInfo />
    <Footer />
  </div>
);

export default PeptidesLanding;
