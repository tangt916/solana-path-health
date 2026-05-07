import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

export const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Tell us about yourself', desc: 'Answer a few questions about your health history and weight loss journey. No blood tests, no office visits.' },
    { num: '02', title: 'Meet your provider', desc: "A licensed clinician reviews your intake and meets with you via video. They'll determine if GLP-1 therapy is right for you — usually within 24 hours." },
    { num: '03', title: 'Medication at your door', desc: 'If prescribed, your medication ships from a licensed compounding pharmacy directly to your home. Discreet packaging, free shipping.' },
    { num: '04', title: 'Supported every step', desc: 'Monthly check-ins with your care team, dose adjustments as you progress, and a provider you can message anytime.' },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl py-20 lg:py-24 px-6 lg:px-12">
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 70% 60% at 0% 100%, #c8dca8 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at 100% 0%, #e0ecce 0%, transparent 55%),
              linear-gradient(130deg, #e8f2da 0%, #f0f6e8 50%, #ddeac8 100%)
            `,
          }} />
          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-16" style={{ fontWeight: 300, color: '#0f1f12' }}>
              Simple steps to<br /><em style={{ color: '#1a3a1e' }}>real results</em>
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className="rounded-2xl p-6 transition-shadow hover:shadow-[0_4px_20px_rgba(45,74,50,0.08)]"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(168,212,74,0.3)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <p className="font-serif text-3xl mb-3" style={{ fontWeight: 300, color: '#a8d44a' }}>{s.num}</p>
                  <h4 className="text-sm font-medium mb-2" style={{ color: '#0f1f12', fontFamily: 'var(--font-sans)' }}>{s.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/get-started"
                onClick={() => trackEvent("quiz_started")}
                className="inline-flex items-center rounded-full px-8 py-3 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: '#0f1f12', color: '#faf6ee' }}
              >
                Start Losing Weight →
              </Link>
            </div>
            <p className="mt-8 text-center italic font-serif text-sm" style={{ color: '#2d4a2a' }}>
              All prescribing decisions are made solely by independent licensed healthcare providers. Approval is not guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
