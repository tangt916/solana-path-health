import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Pillars } from "@/components/landing/Pillars";
import { Treatments } from "@/components/landing/Treatments";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Membership } from "@/components/landing/Membership";
import { Medications } from "@/components/landing/Medications";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { SafetyInfo } from "@/components/landing/SafetyInfo";
import { SEO } from "@/components/SEO";

const FAQ_ITEMS = [
  { q: "What side effects will I experience?", a: "Some patients experience mild side effects when starting GLP-1 medications, especially in the first few weeks. Common side effects may include nausea, constipation, diarrhea, reduced appetite, bloating, fatigue, and mild stomach discomfort. These are often temporary and improve over time." },
  { q: "Do I need insurance?", a: "No. Many patients choose self-pay options for faster access and simpler pricing. Insurance may be accepted for certain prescriptions, but is not required to get started." },
  { q: "How long does the intake take?", a: "Most members complete the intake in just a few minutes. After you submit, a licensed provider typically reviews your information and meets with you within 24 hours." },
  { q: "Is a prescription guaranteed?", a: "No. All prescribing decisions are made solely by independent licensed healthcare providers based on your individual health profile. Approval is not guaranteed." },
  { q: "Can I cancel anytime?", a: "Yes. There are no long-term contracts — you can cancel your membership anytime from your dashboard." },
];

const Index = () => (
  <div className="min-h-screen">
    <SEO
      title="Solana Health — Holistic Telehealth for Weight, Skin, Hormones & Hair"
      description="Licensed US providers for weight loss (GLP-1), anti-aging, hormone therapy, and hair loss. Online evaluation, home delivery, and ongoing care from $179/month."
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
    <Hero />
    <Treatments />
    <Pillars />
    <HowItWorks />
    <Membership />
    <Medications />
    <FAQ />
    <FinalCTA />
    <div className="py-6" style={{ background: '#f5f0e8', borderTop: '1px solid #e0d8c8' }}>
      <div className="container max-w-3xl">
        <p style={{ fontSize: '0.7rem', lineHeight: '1.7', color: '#5a7060' }}>
          <strong>Important:</strong> Compounded drug products are not approved or evaluated for safety, effectiveness, or quality by the FDA. Prescription products require an online consultation with a healthcare provider who will determine if a prescription is appropriate. Results may vary.
        </p>
      </div>
    </div>
    <SafetyInfo />
    <Footer />
  </div>
);

export default Index;
