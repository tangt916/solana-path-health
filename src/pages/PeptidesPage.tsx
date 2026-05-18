import { useEffect } from "react";
import { PeptidesLanding } from "@/components/treatment/PeptidesLanding";
import { SEO } from "@/components/SEO";
import { trackEvent } from "@/lib/analytics";

const FAQS = [
  { q: "Are these peptides FDA-approved?", a: "Most compounded peptides are not individually FDA-approved drug products. Your provider will only recommend protocols where the evidence supports their use for your specific goals." },
  { q: "How do I know which peptide protocol is right for me?", a: "Your provider reviews your goals, health history, and current medications during the free consultation and builds a protocol specific to you." },
  { q: "Do all peptides require injections?", a: "No. NAD+ is available as an oral, nasal, or injectable protocol. GHK-Cu can be topical. Some peptides are typically administered as subcutaneous injections." },
];

const PeptidesPage = () => {
  useEffect(() => {
    trackEvent("treatment_page_viewed", { treatment: "peptides" });
  }, []);

  return (
    <>
      <SEO
        title="Peptide Therapy — Physician-Supervised Protocols | Solana Health"
        description="Physician-supervised peptide protocols for energy, recovery, skin, sleep, and sexual health. NAD+, GHK-Cu, Sermorelin, Ipamorelin/CJC-1295, and more."
        path="/peptides"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <PeptidesLanding />
    </>
  );
};

export default PeptidesPage;
