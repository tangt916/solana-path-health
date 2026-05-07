import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { MainPill, SmallPill } from "./svgs";

export const Hero = () => (
  <section className="relative min-h-screen">
    <div className="absolute inset-0" style={{
      background: `
        radial-gradient(ellipse 60% 80% at 75% 55%, #e8f5d8 0%, transparent 65%),
        radial-gradient(ellipse 50% 60% at 15% 80%, #c8e0b0 0%, transparent 55%),
        linear-gradient(148deg, #faf6ee 0%, #eef6e4 50%, #ddeec8 100%)
      `,
    }} />

    <div className="container relative z-10 grid min-h-screen items-center lg:grid-cols-2 gap-12 py-24">
      <div className="max-w-lg">
        <p className="text-xs font-medium uppercase tracking-[0.18em] mb-6" style={{ color: '#2d4a1e' }}>
          Holistic health & wellness, delivered
        </p>
        <h1 className="font-serif leading-[1.08]" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', fontWeight: 300, color: '#0f1f12' }}>
          Look, feel, and live
          <br />
          <em style={{ color: '#1a3a1e' }}>like your best self.</em>
        </h1>
        <p className="mt-6 text-base leading-relaxed" style={{ fontWeight: 300, color: '#1e3a22' }}>
          Personalized care for the things that actually move the needle on how you feel — weight, skin and longevity, hormones, and hair. Licensed providers, a dedicated care team, and treatments shipped to your door.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/get-started"
            onClick={() => trackEvent("quiz_started")}
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: '#0f1f12', color: '#faf6ee' }}
          >
            Find my treatment →
          </Link>
          <a
            href="#treatments"
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium border transition-opacity hover:opacity-70"
            style={{ borderColor: '#0f1f12', color: '#0f1f12' }}
          >
            Explore treatments
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            '🩺 Licensed US providers',
            '💬 1:1 coaching support',
            '📦 Delivered to your door',
          ].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full border border-border/40 bg-white/60 px-3 py-1.5 text-xs font-medium"
              style={{ color: '#1e3a22' }}
            >
              {badge}
            </span>
          ))}
        </div>
        <p className="mt-4" style={{ fontSize: '0.7rem', color: '#4a6040' }}>
          Membership required · Prescription not guaranteed
        </p>
      </div>

      <div className="relative hidden lg:flex items-center justify-center" style={{ minHeight: '450px' }}>
        <div className="animate-shadow-pulse absolute" style={{ bottom: '60px', left: '50%', transform: 'translateX(-50%)' }}>
          <svg width="160" height="30" viewBox="0 0 160 30">
            <ellipse cx="80" cy="15" rx="70" ry="12" fill="rgba(0,0,0,0.1)" />
          </svg>
        </div>
        <div className="animate-pill-bounce relative z-10">
          <MainPill />
        </div>
        <div className="animate-small-pill-1 absolute" style={{ top: '40px', left: '30px' }}>
          <SmallPill size={36} color="#d8c8f0" />
        </div>
        <div className="animate-small-pill-2 absolute" style={{ bottom: '80px', right: '20px' }}>
          <SmallPill size={28} color="#b8e098" />
        </div>
        <div className="animate-small-pill-3 absolute" style={{ top: '50%', left: '-10px' }}>
          <SmallPill size={32} color="#c8d8f0" />
        </div>
      </div>
    </div>
  </section>
);
