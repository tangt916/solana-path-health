import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle, SmallPill, InjectionPen } from "./svgs";

export const Membership = () => (
  <section id="membership" className="relative overflow-hidden">
    <div className="absolute inset-0" style={{
      background: `
        radial-gradient(ellipse 55% 70% at 80% 45%, #3a6040 0%, transparent 60%),
        radial-gradient(ellipse 40% 50% at 10% 90%, #a8c870 0%, transparent 50%),
        radial-gradient(ellipse 60% 40% at 50% 5%, #2a4030 0%, transparent 55%),
        linear-gradient(150deg, #1a2f1e 0%, #243828 40%, #1e3522 70%, #162418 100%)
      `,
    }} />
    <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 50% 50% at 55% 50%, rgba(168,212,74,0.1) 0%, transparent 65%)',
    }} />

    <div className="container relative z-10 grid lg:grid-cols-2 gap-12 py-24 lg:py-32 items-center">
      <div className="max-w-lg">
        <p className="text-xs font-medium uppercase tracking-[0.18em] mb-6" style={{ color: '#b8e070' }}>Membership</p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight" style={{ fontWeight: 300, color: '#ffffff' }}>
          Not just a prescription.
          <br />
          <em style={{ color: '#b8e070' }}>A complete program.</em>
        </h2>
        <p className="mt-5 text-sm leading-relaxed" style={{ color: '#e8f5e8' }}>
          Most weight loss clinics hand you a prescription and disappear. We stay with you — monthly check-ins, dose guidance, and a care team that actually responds.
        </p>

        <ul className="mt-8 space-y-4">
          {[
            'Nutrition and exercise guidance',
            'Access to GLP-1 medications (if prescribed)',
            'Dedicated care team',
            'Ongoing provider check-ins',
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircle filled={false} />
              <span className="text-sm" style={{ color: '#f0f8f0' }}>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/get-started"
            onClick={() => trackEvent("quiz_started")}
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: '#a8d44a', color: '#0f1f12' }}
          >
            Start Losing Weight →
          </Link>
        </div>
      </div>

      <div className="relative hidden lg:flex items-center justify-center" style={{ minHeight: '450px' }}>
        <div className="relative" style={{ width: '280px', height: '320px' }}>
          <div className="animate-small-pill-1 absolute" style={{ top: '-30px', left: '-20px', zIndex: 5 }}>
            <SmallPill size={44} color="#c8b8e8" />
          </div>
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="relative" style={{ width: '200px', height: '260px' }}>
              <InjectionPen rotation={-30} color="#9060c0" label="7.2mg" delay={0} />
              <InjectionPen rotation={-16} color="#252838" label="2.4mg" delay={1} />
              <InjectionPen rotation={-2} color="#287888" label="1.7mg" delay={2} />
              <InjectionPen rotation={13} color="#a06020" label="1mg" delay={3} />
              <InjectionPen rotation={27} color="#a83868" label="0.5mg" delay={4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
