import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  const items: Array<{ q: string; a: string; cta?: { label: string; to: string } }> = [
    {
      q: "Do you accept insurance?",
      a: "Solana is a cash-pay platform. We do not accept insurance or process insurance claims. All program costs are transparent and listed on our pricing pages. Some patients use HSA or FSA funds for eligible expenses — check with your plan administrator.",
    },
    {
      q: "How does the consultation work?",
      a: "After you complete the intake assessment, a licensed provider reviews your health history and meets with you via video (typically 15–20 minutes). They'll ask questions, review your goals, and determine what — if anything — is clinically appropriate for you. The consultation is free. No prescription is guaranteed.",
    },
    {
      q: "How long does the intake take?",
      a: "The online assessment takes approximately 5–10 minutes. Your video consultation is typically scheduled within 24 hours of completing intake.",
    },
    {
      q: "What states do you serve?",
      a: "Solana is actively expanding state availability. Enter your state during intake to confirm we currently serve your area.",
    },
    {
      q: "Where does my medication come from?",
      a: "All prescriptions are filled by licensed compounding pharmacies in the United States. Compounded drug products are not approved or evaluated for safety, effectiveness, or quality by the FDA.",
    },
    {
      q: "How is my medication shipped?",
      a: "Standard shipping is free. Medications are shipped in discreet packaging with no identifying information on the outside. Most orders arrive within 5–7 business days of prescription approval.",
    },
    {
      q: "Is a prescription guaranteed?",
      a: "No. Whether any prescription is appropriate for you is determined entirely by your licensed provider. If a prescription is not issued, you will not be charged for medication. The consultation remains free.",
      cta: { label: "View Full Medication Safety Information", to: "/safety-info" },
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Monthly plans can be cancelled before the next billing date with no penalty. Multi-month plans (3, 6, 9, 12 months) are billed in advance — cancellation stops future renewals but does not include refunds for the current period.",
    },
    {
      q: "What if my medication isn't working?",
      a: "Message your care coordinator. Your provider can adjust your dose, change your protocol, or discuss alternative options. Monthly check-ins are included in all plans specifically for this.",
    },
    {
      q: "How is my health information protected?",
      a: "Solana is fully HIPAA-compliant. Your health information is encrypted, never sold, and only shared with your licensed provider and the dispensing pharmacy as required for your care. See our Privacy Policy for full details.",
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
