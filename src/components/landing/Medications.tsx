import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle } from "./svgs";

export const Medications = () => (
  <section id="medications" style={{ background: '#faf6ee' }} className="py-24">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs font-medium uppercase tracking-[0.18em] mb-4" style={{ color: '#2d4a1e' }}>
          When medication is part of your plan
        </p>
        <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 300, color: '#0f1f12' }}>
          Prescription options,<br /><em style={{ color: '#1a3a1e' }}>if appropriate for you.</em>
        </h2>
        <p className="mt-5 text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>
          For some members, a licensed provider may prescribe a GLP-1 medication as part of a broader wellness plan. Eligibility, medication choice, and dosing are determined entirely by your provider.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <div
          className="rounded-2xl p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(45,74,50,0.15)]"
          style={{
            background: 'linear-gradient(145deg, #e0ecda, #cce0c0)',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 4px 20px rgba(45,74,50,0.08)',
          }}
        >
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4" style={{ background: '#a8d44a', color: '#0f1f12' }}>
            Most prescribed
          </span>
          <h3 className="font-serif text-2xl" style={{ fontWeight: 400, color: '#0f1f12' }}>Compounded Semaglutide</h3>
          <p className="mt-1 text-sm" style={{ color: '#2d4a2a' }}>Weekly injection · Starts at 0.25mg</p>
          <p className="mt-4 font-serif" style={{ fontSize: '2rem', fontWeight: 300, color: '#0f1f12' }}>
            From $297<span className="text-base font-sans" style={{ color: '#2d4a2a' }}>/month</span>
          </p>

          <ul className="mt-6 space-y-3">
            {['Provider consultation included', 'Dose adjustments as needed', 'Ongoing care team support', 'Free standard shipping'].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle filled />
                <span className="text-sm" style={{ color: '#0f1f12' }}>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/get-started"
            onClick={() => trackEvent("quiz_started")}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: '#0f1f12', color: '#faf6ee' }}
          >
            Start Losing Weight →
          </Link>
        </div>

        <p className="mt-6 text-center text-sm leading-relaxed" style={{ color: '#4a6a50' }}>
          Other options including oral semaglutide and tirzepatide may be available depending on your health profile and provider recommendation.
        </p>
      </div>

      <p className="mt-10 text-center max-w-2xl mx-auto" style={{ fontSize: '0.68rem', color: '#4a6a50' }}>
        † Pricing shown is for medication only if prescribed by a licensed provider. Membership required. Ozempic® is a registered trademark of Novo Nordisk A/S. Solana Health is not affiliated with Novo Nordisk or Eli Lilly. All trademarks are property of their respective owners.
      </p>
    </div>
  </section>
);
