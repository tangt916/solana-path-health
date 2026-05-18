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
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent mb-4">
            Frequently asked
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-foreground font-normal">
            Questions, <em className="not-italic text-primary">answered.</em>
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={it.q}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-secondary/50"
                >
                  <span className="font-medium text-base text-foreground">
                    {it.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-primary" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {it.a}
                    </p>
                    {it.cta && (
                      <Link
                        to={it.cta.to}
                        className="mt-4 inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-xs font-medium hover:opacity-95 transition-opacity"
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
