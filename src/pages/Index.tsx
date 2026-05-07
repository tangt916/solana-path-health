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

const Index = () => (
  <div className="min-h-screen">
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
