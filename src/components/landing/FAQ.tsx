import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    {
      q: "What side effects will I experience?",
      a: "Some patients experience mild side effects when starting GLP-1 medications, especially during the first few weeks as the body adjusts. Common side effects may include nausea, constipation, diarrhea, reduced appetite, bloating, fatigue, and mild stomach discomfort. These are often temporary and improve over time. Your provider may also adjust your dosage to help minimize discomfort.",
      cta: { label: "View Full Medication Safety Information", to: "/safety-info" },
    },
    {
      q: "Do I need insurance?",
      a: "No. Many patients choose self-pay options for faster access and simpler pricing. Insurance may be accepted for certain prescription options depending on your treatment plan, but insurance is not required to get started.",
    },
    {
      q: "How long does the intake take?",
      a: "Most members complete the intake in just a few minutes. After you submit, a licensed provider typically reviews your information and meets with you within 24 hours.",
    },
    {
      q: "Is a prescription guaranteed?",
      a: "No. All prescribing decisions are made solely by independent licensed healthcare providers based on your individual health profile. Approval is not guaranteed.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. There are no long-term contracts — you can cancel your membership anytime from your dashboard.",
    },
  ];

  return (
    <section id="faq" className="py-20" style={{ background: '#faf6ee' }}>
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] mb-3" style={{ color: '#2d4a1e' }}>
            Frequently asked
          </p>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 300, color: '#0f1f12' }}>
            Questions, <em style={{ color: '#1a3a1e' }}>answered.</em>
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: 'rgba(45,74,30,0.12)' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/30"
                >
                  <span className="font-medium text-sm sm:text-base" style={{ color: '#0f1f12' }}>{it.q}</span>
                  {isOpen ? <ChevronUp className="h-5 w-5 shrink-0" style={{ color: '#2d4a1e' }} /> : <ChevronDown className="h-5 w-5 shrink-0" style={{ color: '#2d4a1e' }} />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>{it.a}</p>
                    {it.cta && (
                      <Link
                        to={it.cta.to}
                        className="mt-4 inline-flex items-center rounded-full px-5 py-2.5 text-xs font-medium transition-opacity hover:opacity-90"
                        style={{ background: '#0f1f12', color: '#faf6ee' }}
                      >
                        {it.cta.label} →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
