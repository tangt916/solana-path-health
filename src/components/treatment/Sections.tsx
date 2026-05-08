// Reusable section components used across all treatment landing pages.
// Each takes only what it needs from a TreatmentConfig.
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle } from "@/components/landing/svgs";
import type { TreatmentConfig } from "@/config/treatments";

const containerCls = "container";
const eyebrowCls = "text-xs font-medium uppercase tracking-[0.18em] mb-4";
const h2Cls = "font-serif text-3xl md:text-4xl leading-tight";

export const TreatmentHero = ({ t }: { t: TreatmentConfig }) => (
  <section className="relative">
    <div
      className="absolute inset-0"
      style={{
        background: `${t.gradient}, linear-gradient(148deg, #faf6ee 0%, #faf6ee 100%)`,
        opacity: 0.85,
      }}
    />
    <div className={`${containerCls} relative z-10 py-20 md:py-28`}>
      <div className="max-w-2xl">
        <p className={eyebrowCls} style={{ color: t.accent }}>{t.heroEyebrow}</p>
        <h1 className="font-serif leading-[1.08]" style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)", fontWeight: 300, color: "#0f1f12" }}>
          {t.heroProblem}<br />
          <em style={{ color: t.accent }}>{t.heroEmphasis}</em>
        </h1>
        <p className="mt-6 text-base leading-relaxed max-w-xl" style={{ color: "#1e3a22" }}>
          {t.heroSubcopy}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={`/get-started/${t.slug}`}
            onClick={() => trackEvent("quiz_started", { treatment: t.slug })}
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "#0f1f12", color: "#faf6ee" }}
          >
            {t.ctaButton}
          </Link>
          <a
            href="#how"
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium border transition-opacity hover:opacity-70"
            style={{ borderColor: "#0f1f12", color: "#0f1f12" }}
          >
            How it works
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {t.heroBadges.map((b) => (
            <span key={b} className="inline-flex items-center rounded-full border border-border/40 bg-white/60 px-3 py-1.5 text-xs font-medium" style={{ color: "#1e3a22" }}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const ProblemSolution = ({ t }: { t: TreatmentConfig }) => (
  <section id="how" className="py-20" style={{ background: "#ffffff" }}>
    <div className={`${containerCls} grid gap-12 md:grid-cols-2`}>
      <div>
        <p className={eyebrowCls} style={{ color: t.accent }}>The problem</p>
        <h2 className={h2Cls} style={{ fontWeight: 300, color: "#0f1f12" }}>{t.problemTitle}</h2>
        <p className="mt-5 text-sm leading-relaxed" style={{ color: "#2d4a2a" }}>{t.problemBody}</p>
      </div>
      <div className="rounded-2xl p-8" style={{ background: t.gradient, border: "1px solid rgba(0,0,0,0.06)" }}>
        <p className={eyebrowCls} style={{ color: t.accent }}>The solution</p>
        <h3 className="font-serif text-2xl leading-snug" style={{ fontWeight: 400, color: "#0f1f12" }}>{t.solutionTitle}</h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "#2d4a2a" }}>{t.solutionBody}</p>
        <ul className="mt-5 space-y-2">
          {t.solutionBullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-0.5"><CheckCircle filled /></span>
              <span className="text-sm" style={{ color: "#0f1f12" }}>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export const Segments = ({ t }: { t: TreatmentConfig }) => (
  <section className="py-20" style={{ background: "#faf6ee" }}>
    <div className={containerCls}>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className={eyebrowCls} style={{ color: t.accent }}>Who it's for</p>
        <h2 className={h2Cls} style={{ fontWeight: 300, color: "#0f1f12" }}>{t.segmentsTitle}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {t.segments.map((s) => (
          <div key={s.title} className="rounded-2xl border border-border/30 bg-white p-6 shadow-sm">
            <h3 className="font-serif text-xl mb-2" style={{ fontWeight: 400, color: "#0f1f12" }}>{s.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#2d4a2a" }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Benefits = ({ t }: { t: TreatmentConfig }) => (
  <section className="py-20" style={{ background: "#ffffff" }}>
    <div className={containerCls}>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className={eyebrowCls} style={{ color: t.accent }}>What's included</p>
        <h2 className={h2Cls} style={{ fontWeight: 300, color: "#0f1f12" }}>{t.benefitsTitle}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {t.benefits.map((b) => (
          <div key={b.title} className="rounded-2xl p-6" style={{ background: t.gradient, border: "1px solid rgba(0,0,0,0.06)" }}>
            <h3 className="font-serif text-lg mb-2" style={{ fontWeight: 500, color: "#0f1f12" }}>{b.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#2d4a2a" }}>{b.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const TreatmentFAQSection = ({ t }: { t: TreatmentConfig }) => (
  <section className="py-20" style={{ background: "#faf6ee" }}>
    <div className={`${containerCls} max-w-3xl`}>
      <div className="text-center mb-12">
        <p className={eyebrowCls} style={{ color: t.accent }}>FAQ</p>
        <h2 className={h2Cls} style={{ fontWeight: 300, color: "#0f1f12" }}>Common questions</h2>
      </div>
      <div className="space-y-4">
        {t.faqs.map((f) => (
          <details key={f.q} className="rounded-2xl border border-border/30 bg-white p-5 shadow-sm group">
            <summary className="cursor-pointer font-serif text-lg list-none flex items-start justify-between gap-4" style={{ color: "#0f1f12" }}>
              <span>{f.q}</span>
              <span className="text-xl leading-none transition-transform group-open:rotate-45" style={{ color: t.accent }}>+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#2d4a2a" }}>{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export const TreatmentCTASection = ({ t }: { t: TreatmentConfig }) => (
  <section className="py-20" style={{ background: "hsl(var(--primary))" }}>
    <div className={`${containerCls} max-w-lg text-center`}>
      <h2 className="font-serif text-4xl leading-tight" style={{ fontWeight: 300, color: "#ffffff" }}>
        {t.ctaHeadline}<br />
        <em style={{ color: "#b8e070" }}>{t.ctaEmphasis}</em>
      </h2>
      <div className="mt-10 flex flex-col items-center gap-4">
        <Link
          to={`/get-started/${t.slug}`}
          onClick={() => trackEvent("quiz_started", { treatment: t.slug })}
          className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: "#a8d44a", color: "#0f1f12" }}
        >
          {t.ctaButton}
        </Link>
        <Link to="/support" className="text-xs underline-offset-4 hover:underline" style={{ color: "rgba(255,255,255,0.65)" }}>
          Have questions? Talk to support
        </Link>
      </div>
      <p className="mt-6" style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>
        Prescription not guaranteed. Results vary. Membership required.
      </p>
    </div>
  </section>
);
