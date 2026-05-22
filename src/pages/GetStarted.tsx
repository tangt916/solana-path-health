import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { PageShell } from "@/components/ui/shared/PageShell";
import { StepIndicator } from "@/components/ui/shared/StepIndicator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Step0Problems } from "@/components/intake/Step0Problems";
import { Step1Segmentation } from "@/components/intake/Step1Segmentation";
import { Step2Contact } from "@/components/intake/Step2Contact";
import { Step2Health } from "@/components/intake/Step2Health";
import { Step4Booking } from "@/components/intake/Step4Booking";
import { SEO } from "@/components/SEO";

// Map legacy /get-started/:slug routes onto the unified intake by preselecting a problem.
const SLUG_TO_PROBLEM: Record<string, string> = {
  "weight-loss": "weight",
  "hormone-therapy": "hormones",
  "anti-aging": "longevity",
  "hair-loss": "hair",
  "energy": "energy",
  "skin": "skin",
  "recovery": "recovery",
  "sleep": "sleep",
  "sexual-health": "libido",
};

const STEP_LABELS = ["Problems", "About you", "Contact", "Health", "Book"];

const GetStarted = () => {
  const { state, setStep, setProblems } = useIntakeForm();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    sessionStorage.setItem("intakeStarted", "true");
  }, []);

  // Preseed problem from legacy treatment routes once.
  useEffect(() => {
    if (!slug) return;
    const seeded = sessionStorage.getItem("intakeSeededSlug");
    if (seeded === slug) return;
    const problemSlug = SLUG_TO_PROBLEM[slug];
    if (problemSlug && !state.problems.includes(problemSlug)) {
      setProblems([...state.problems, problemSlug]);
    }
    sessionStorage.setItem("intakeSeededSlug", slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [state.step]);

  const goNext = () => setStep(Math.min(state.step + 1, 5));
  const goBack = () => setStep(Math.max(state.step - 1, 1));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cream via-background to-muted/20">
      <SEO
        title="Start your free assessment — Solana Health"
        description="A few quick questions and a licensed provider reviews your case within 24 hours."
        path="/get-started"
        noindex
      />
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4">
          <PageShell
            title="Get started"
            showBack={state.step > 1}
            onBack={() => navigate("/")}
          >
            <div className="space-y-8">
              <StepIndicator
                currentStep={state.step}
                totalSteps={5}
                labels={STEP_LABELS}
              />
              <div className="bg-white border border-border/40 rounded-2xl p-6 sm:p-10 shadow-[0_2px_16px_rgba(45,74,50,0.06)]">
                {state.step === 1 && <Step0Problems onBack={() => navigate("/")} onNext={goNext} />}
                {state.step === 2 && <Step1Segmentation onBack={goBack} onNext={goNext} />}
                {state.step === 3 && <Step2Contact onBack={goBack} onNext={goNext} />}
                {state.step === 4 && <Step2Health onBack={goBack} onNext={goNext} />}
                {state.step === 5 && <Step4Booking onBack={goBack} />}
              </div>
            </div>
          </PageShell>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
