import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HeroV2 } from "@/components/landing/HeroV2";
import { ResearchStatBar } from "@/components/landing/ResearchStatBar";
import { WhatWeTreatV2 } from "@/components/landing/WhatWeTreatV2";
import { HowItWorksV2 } from "@/components/landing/HowItWorksV2";
import { MembershipV2 } from "@/components/landing/MembershipV2";
import { LeadMagnet } from "@/components/landing/LeadMagnet";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTAV2 } from "@/components/landing/FinalCTAV2";
import { SEO } from "@/components/SEO";

const FAQ_ITEMS = [
  { q: "What side effects will I experience?", a: "Some patients experience mild side effects when starting GLP-1 medications, especially in the first few weeks. Common side effects may include nausea, constipation, diarrhea, reduced appetite, bloating, fatigue, and mild stomach discomfort. These are often temporary and improve over time." },
  { q: "Do I need insurance?", a: "No. Many patients choose self-pay options for faster access and simpler pricing. Insurance may be accepted for certain prescriptions, but is not required to get started." },
  { q: "How long does the intake take?", a: "Most members complete the intake in just a few minutes. After you submit, a licensed provider typically reviews your information and meets with you within 24 hours." },
  { q: "Is a prescription guaranteed?", a: "No. All prescribing decisions are made solely by independent licensed healthcare providers based on your individual health profile. Approval is not guaranteed." },
  { q: "Can I cancel anytime?", a: "Yes. There are no long-term contracts — you can cancel your membership anytime from your dashboard." },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Solana Health — Personalized wellness for women"
      description="Licensed US providers for metabolic & weight health, hormones, NAD+ and peptides. Free assessment, provider-built protocols delivered to your door."
      path="/"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Solana Health",
          url: "https://solanahealth.co",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ]}
    />
    <Header />
    <main>
      <HeroV2 />
      <ResearchStatBar />
      <WhatWeTreatV2 />
      <HowItWorksV2 />
      <MembershipV2 />
      <LeadMagnet />
      <FAQ />
      <FinalCTAV2 />
    </main>
    <Footer />
  </div>
);

export default Index;
