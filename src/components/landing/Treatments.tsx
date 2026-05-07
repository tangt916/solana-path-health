import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle } from "./svgs";

export const Treatments = () => {
  const areas = [
    {
      eyebrow: 'Weight loss',
      problem: 'Struggling to lose weight despite diet and exercise?',
      solution: 'Physician-guided GLP-1 programs (semaglutide, tirzepatide) paired with nutrition and lifestyle coaching for sustainable results.',
      bullets: ['Compounded GLP-1 options if appropriate', 'Monthly provider check-ins', 'Nutrition & habit coaching'],
      gradient: 'linear-gradient(145deg, #e0ecda, #cce0c0)',
    },
    {
      eyebrow: 'Anti-aging, skin & longevity',
      problem: 'Want sharper energy, better skin, and to age on your terms?',
      solution: 'Longevity-focused protocols including NAD+ and methylene blue, alongside skincare designed to support cellular health and a healthy glow.',
      bullets: ['NAD+ support for energy & cellular health', 'Methylene blue protocols', 'Provider-guided skin & longevity plan'],
      gradient: 'linear-gradient(145deg, #ede5f5, #d8c8ec)',
    },
    {
      eyebrow: 'Hormone therapy',
      problem: 'Perimenopause or menopause changing how you feel?',
      solution: 'Personalized hormone therapy for women navigating perimenopause and menopause — hot flashes, sleep, mood, libido, and more.',
      bullets: ['Bioidentical hormone options', 'Symptom-based personalized plans', 'Ongoing provider support'],
      gradient: 'linear-gradient(145deg, #f5e0ea, #ecc8d8)',
    },
    {
      eyebrow: 'Hair loss',
      problem: 'Noticing thinning hair or a receding hairline?',
      solution: 'Clinically proven hair loss treatments prescribed by licensed providers — topical and oral options tailored to your pattern of loss.',
      bullets: ['Finasteride, minoxidil & combinations', 'Personalized to your hair type', 'Discreetly shipped monthly'],
      gradient: 'linear-gradient(145deg, #e0e8f5, #c8d4ec)',
    },
  ];

  return (
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
          {areas.map((a) => (
            <div
              key={a.eyebrow}
              className="rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(45,74,50,0.15)]"
              style={{
                background: a.gradient,
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(45,74,50,0.08)',
              }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] mb-3" style={{ color: '#2d4a1e' }}>{a.eyebrow}</p>
              <h3 className="font-serif text-2xl leading-snug" style={{ fontWeight: 400, color: '#0f1f12' }}>{a.problem}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>{a.solution}</p>
              <ul className="mt-5 space-y-2">
                {a.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <CheckCircle filled />
                    <span className="text-sm" style={{ color: '#0f1f12' }}>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/get-started"
                onClick={() => trackEvent("quiz_started")}
                className="mt-6 inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: '#0f1f12', color: '#faf6ee' }}
              >
                Get started →
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center max-w-2xl mx-auto" style={{ fontSize: '0.7rem', color: '#4a6a50' }}>
          All prescribing decisions are made solely by independent licensed healthcare providers. Approval and treatment options vary based on your individual health profile. Results may vary.
        </p>
      </div>
    </section>
  );
};
