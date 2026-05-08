import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PageShell } from "@/components/ui/shared/PageShell";
import { LeadIntake } from "@/components/intake/LeadIntake";
import { getTreatment } from "@/config/treatments";
import GetStarted from "./GetStarted";

const TreatmentIntake = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const t = getTreatment(slug);

  if (!t) return <Navigate to="/get-started" replace />;

  // Weight loss reuses the existing full 4-step health intake.
  if (t.useFullFlow) return <GetStarted />;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cream via-background to-muted/20">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4">
          <PageShell title={`${t.name} intake`}>
            <div className="bg-white border border-border/40 rounded-2xl p-6 sm:p-10 shadow-[0_2px_16px_rgba(45,74,50,0.06)]">
              <LeadIntake t={t} />
            </div>
          </PageShell>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TreatmentIntake;
