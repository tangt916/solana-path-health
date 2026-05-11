// Reusable, conversion-focused NAD+ segment landing page.
// IMPORTANT: NO site navigation header/footer — single-purpose funnel.
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import type { NadSegmentConfig } from "@/config/nad-segments";

const container = "container max-w-6xl px-4";
const eyebrow = "text-xs font-medium uppercase tracking-[0.18em] mb-4";
const h2 = "font-serif text-3xl md:text-4xl leading-tight";

const intakeHref = "/get-started/anti-aging";

const Check = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5" aria-hidden>
    <circle cx="12" cy="12" r="11" fill={color} fillOpacity="0.15" />
    <path d="M7 12.5l3.2 3.2L17 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MinimalHeader = ({ accent }: { accent: string }) => (
  <header className="w-full" style={{ background: "#faf6ee", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
    <div className={`${container} flex items-center justify-between py-4`}>
      <Link to="/" className="font-serif text-lg" style={{ color: "#0f1f12", fontWeight: 500 }}>
        Solana Health
      </Link>
      <span className="text-xs" style={{ color: accent, letterSpacing: "0.16em", textTransform: "uppercase" }}>
        Trusted telehealth · Licensed US providers
      </span>
    </div>
  </header>
);

const MinimalFooter = () => (
  <footer className="py-8" style={{ background: "#0f1f12" }}>
    <div className={`${container} text-center`}>
      <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
        © {new Date().getFullYear()} Solana Health. {" "}
        <Link to="/privacy" className="underline-offset-4 hover:underline">Privacy</Link> · {" "}
        <Link to="/terms" className="underline-offset-4 hover:underline">Terms</Link> · {" "}
        <Link to="/safety-info" className="underline-offset-4 hover:underline">Safety</Link>
      </p>
    </div>
  </footer>
);

const CTA = ({
  label,
  slug,
  style,
  className = "",
}: {
  label: string;
  slug: string;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <Link
    to={intakeHref}
    onClick={() => trackEvent("quiz_started", { treatment: "nad", segment: slug })}
    className={`inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90 ${className}`}
    style={style}
  >
    {label}
  </Link>
);

export const NadSegmentLanding = ({ s }: { s: NadSegmentConfig }) => {
  useEffect(() => {
    document.title = s.metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", s.metaDescription);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = s.metaDescription;
      document.head.appendChild(m);
    }
    trackEvent("landing_view", { page: s.slug });
  }, [s]);

  return (
    <div className="min-h-screen" style={{ background: "#faf6ee", color: "#0f1f12" }}>
      <MinimalHeader accent={s.accent} />

      {/* HERO */}
      <section className="relative">
        <div
          className="absolute inset-0"
          style={{ background: `${s.gradient}, linear-gradient(148deg, #faf6ee 0%, #faf6ee 100%)`, opacity: 0.85 }}
        />
        <div className={`${container} relative z-10 py-20 md:py-28`}>
          <div className="max-w-2xl">
            <p className={eyebrow} style={{ color: s.accent }}>{s.heroEyebrow}</p>
            <h1
              className="font-serif leading-[1.08]"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)", fontWeight: 300, color: "#0f1f12" }}
            >
              {s.heroHeadline}<br />
              <em style={{ color: s.accent }}>{s.heroEmphasis}</em>
            </h1>
            <p className="mt-6 text-base leading-relaxed max-w-xl" style={{ color: "#1e3a22" }}>
              {s.heroSubcopy}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTA label={s.ctaButton} slug={s.slug} style={{ background: "#0f1f12", color: "#faf6ee" }} />
              <a
                href="#how"
                className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium border transition-opacity hover:opacity-70"
                style={{ borderColor: "#0f1f12", color: "#0f1f12" }}
              >
                How it works
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.heroBadges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center rounded-full border border-border/40 bg-white/60 px-3 py-1.5 text-xs font-medium"
                  style={{ color: "#1e3a22" }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="how" className="py-20" style={{ background: "#ffffff" }}>
        <div className={`${container} grid gap-12 md:grid-cols-2`}>
          <div>
            <p className={eyebrow} style={{ color: s.accent }}>The problem</p>
            <h2 className={h2} style={{ fontWeight: 300 }}>{s.problemTitle}</h2>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: "#2d4a2a" }}>{s.problemBody}</p>
          </div>
          <ul className="rounded-2xl p-8 space-y-4" style={{ background: s.gradient, border: "1px solid rgba(0,0,0,0.06)" }}>
            {s.problemBullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm" style={{ color: "#0f1f12" }}>
                <span
                  className="mt-1 inline-block w-2 h-2 rounded-full shrink-0"
                  style={{ background: s.accent }}
                  aria-hidden
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-20" style={{ background: "#faf6ee" }}>
        <div className={container}>
          <div className="max-w-2xl mb-12">
            <p className={eyebrow} style={{ color: s.accent }}>The solution</p>
            <h2 className={h2} style={{ fontWeight: 300 }}>{s.solutionTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#2d4a2a" }}>{s.solutionBody}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {s.solutionBullets.map((b) => (
              <div key={b.title} className="rounded-2xl bg-white p-6 border border-border/30 shadow-sm">
                <h3 className="font-serif text-lg mb-2" style={{ fontWeight: 500 }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#2d4a2a" }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20" style={{ background: "#ffffff" }}>
        <div className={container}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className={eyebrow} style={{ color: s.accent }}>Stories</p>
            <h2 className={h2} style={{ fontWeight: 300 }}>{s.testimonialsTitle}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {s.testimonials.map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl p-6 flex flex-col justify-between"
                style={{ background: s.gradient, border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <blockquote className="font-serif text-lg leading-snug" style={{ color: "#0f1f12", fontWeight: 400 }}>
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm" style={{ color: "#2d4a2a" }}>
                  <strong style={{ color: s.accent }}>{t.name}</strong>
                  <span> · {t.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8 text-center" style={{ fontSize: "0.7rem", color: "rgba(15,31,18,0.5)" }}>
            Individual experiences. Results not typical or guaranteed.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20" style={{ background: "#faf6ee" }}>
        <div className={container}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className={eyebrow} style={{ color: s.accent }}>Pricing</p>
            <h2 className={h2} style={{ fontWeight: 300 }}>{s.pricingTitle}</h2>
            <p className="mt-3 text-sm" style={{ color: "#2d4a2a" }}>{s.pricingSubcopy}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            {s.pricing.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl p-8 relative"
                style={{
                  background: p.highlight ? "#0f1f12" : "#ffffff",
                  color: p.highlight ? "#faf6ee" : "#0f1f12",
                  border: p.highlight ? "none" : "1px solid rgba(0,0,0,0.08)",
                  boxShadow: p.highlight ? "0 10px 40px -10px rgba(0,0,0,0.3)" : "none",
                }}
              >
                {p.badge && (
                  <span
                    className="absolute top-4 right-4 rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-wider"
                    style={{ background: s.accentSoft, color: "#0f1f12" }}
                  >
                    {p.badge}
                  </span>
                )}
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: p.highlight ? s.accentSoft : s.accent }}>
                  {p.name}
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif" style={{ fontSize: "2.75rem", fontWeight: 300 }}>{p.price}</span>
                  <span className="text-sm" style={{ opacity: 0.7 }}>{p.cadence}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check color={p.highlight ? s.accentSoft : s.accent} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <CTA
                  label={s.ctaButton}
                  slug={s.slug}
                  className="mt-8 w-full justify-center"
                  style={
                    p.highlight
                      ? { background: s.accentSoft, color: "#0f1f12" }
                      : { background: "#0f1f12", color: "#faf6ee" }
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ background: "#ffffff" }}>
        <div className={`${container} max-w-3xl`}>
          <div className="text-center mb-12">
            <p className={eyebrow} style={{ color: s.accent }}>FAQ</p>
            <h2 className={h2} style={{ fontWeight: 300 }}>Common questions</h2>
          </div>
          <div className="space-y-4">
            {s.faqs.map((f) => (
              <details
                key={f.q}
                className="rounded-2xl border border-border/30 p-5 group"
                style={{ background: "#faf6ee" }}
              >
                <summary
                  className="cursor-pointer font-serif text-lg list-none flex items-start justify-between gap-4"
                  style={{ color: "#0f1f12" }}
                >
                  <span>{f.q}</span>
                  <span
                    className="text-xl leading-none transition-transform group-open:rotate-45"
                    style={{ color: s.accent }}
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#2d4a2a" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "hsl(var(--primary))" }}>
        <div className={`${container} max-w-lg text-center`}>
          <h2 className="font-serif text-4xl leading-tight" style={{ fontWeight: 300, color: "#ffffff" }}>
            {s.ctaHeadline}<br />
            <em style={{ color: s.accentSoft }}>{s.ctaEmphasis}</em>
          </h2>
          <div className="mt-10 flex flex-col items-center gap-4">
            <CTA label={s.ctaButton} slug={s.slug} style={{ background: s.accentSoft, color: "#0f1f12" }} />
          </div>
          <p className="mt-8" style={{ fontSize: "0.7rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}>
            {s.ctaFootnote}
          </p>
        </div>
      </section>

      <MinimalFooter />
    </div>
  );
};
