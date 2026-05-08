import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SafetyInfo } from "@/components/landing/SafetyInfo";
import {
  TreatmentHero,
  ProblemSolution,
  Segments,
  Benefits,
  TreatmentFAQSection,
  TreatmentCTASection,
} from "./Sections";
import type { TreatmentConfig } from "@/config/treatments";

export const TreatmentLanding = ({ t }: { t: TreatmentConfig }) => (
  <div className="min-h-screen">
    <Header />
    <TreatmentHero t={t} />
    <ProblemSolution t={t} />
    <Segments t={t} />
    <Benefits t={t} />
    <TreatmentFAQSection t={t} />
    <TreatmentCTASection t={t} />
    <div className="py-6" style={{ background: "#f5f0e8", borderTop: "1px solid #e0d8c8" }}>
      <div className="container max-w-3xl">
        <p style={{ fontSize: "0.7rem", lineHeight: 1.7, color: "#5a7060" }}>
          <strong>Important:</strong> Compounded drug products are not approved or evaluated for safety, effectiveness, or quality by the FDA. Prescription products require an online consultation with a healthcare provider who will determine if a prescription is appropriate. Results may vary.
        </p>
      </div>
    </div>
    <SafetyInfo />
    <Footer />
  </div>
);
