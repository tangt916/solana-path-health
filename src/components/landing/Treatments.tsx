import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle } from "./svgs";
import { TREATMENTS } from "@/config/treatments";

export const Treatments = () => (
  <section id="treatments" className="py-20" style={{ background: '#faf6ee' }}>
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs font-medium uppercase tracking-[0.18em] mb-4" style={{ color: '#2d4a1e' }}>
          What we treat
        </p>
        <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 300, color: '#0f1f12' }}>
          Care for what matters most — <em style={{ color: '#1a3a1e' }}>all in one place.</em>
        </h2>
        <p className="mt-5 text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>
          Find your concern below. A licensed provider will review your intake and build a plan tailored to you.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {TREATMENTS.map((t) => (
          <Link
            key={t.slug}
            to={`/treatments/${t.slug}`}
            onClick={() => trackEvent("treatment_card_clicked", { treatment: t.slug })}
            className="rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(45,74,50,0.15)] block"
            style={{
              background: t.gradient,
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 20px rgba(45,74,50,0.08)',
            }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.16em] mb-3" style={{ color: t.accent }}>{t.cardEyebrow}</p>
            <h3 className="font-serif text-2xl leading-snug" style={{ fontWeight: 400, color: '#0f1f12' }}>{t.heroProblem}</h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>{t.heroSubcopy}</p>
            <ul className="mt-5 space-y-2">
              {t.solutionBullets.slice(0, 3).map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle filled />
                  <span className="text-sm" style={{ color: '#0f1f12' }}>{b}</span>
                </li>
              ))}
            </ul>
            <span
              className="mt-6 inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium"
              style={{ background: '#0f1f12', color: '#faf6ee' }}
            >
              Learn more →
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-center max-w-2xl mx-auto" style={{ fontSize: '0.7rem', color: '#4a6a50' }}>
        All prescribing decisions are made solely by independent licensed healthcare providers. Approval and treatment options vary based on your individual health profile. Results may vary.
      </p>
    </div>
  </section>
);

