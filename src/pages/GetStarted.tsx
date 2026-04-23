import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { PageShell } from "@/components/ui/shared/PageShell";
import { StepIndicator } from "@/components/ui/shared/StepIndicator";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Step1Personal } from "@/components/intake/Step1Personal";
import { Step2Health } from "@/components/intake/Step2Health";
import { Step3Goals } from "@/components/intake/Step3Goals";
import { Step4Booking } from "@/components/intake/Step4Booking";

const STEP_LABELS = ["Goals", "Health", "You", "Book"];

const GetStarted = () => {
  const { state, setStep, hasSavedProgress, resetForm } = useIntakeForm();
  const navigate = useNavigate();
  const [resumePromptVisible, setResumePromptVisible] = useState(hasSavedProgress);

  useEffect(() => {
    sessionStorage.setItem("intakeStarted", "true");
  }, []);

  useEffect(() => {
    setResumePromptVisible(hasSavedProgress);
  }, [hasSavedProgress]);

  const handleStartOver = () => {
    resetForm();
    setResumePromptVisible(false);
  };

  const handleContinueResume = () => setResumePromptVisible(false);

  const goNext = () => setStep(Math.min(state.step + 1, 4));
  const goBack = () => setStep(Math.max(state.step - 1, 1));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cream via-background to-muted/20">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4">
          <PageShell
            title="Get started"
            subtitle="Takes about 3 minutes."
            showBack={state.step > 1 && !resumePromptVisible}
            onBack={() => navigate("/")}
          >
            {resumePromptVisible ? (
              <div className="bg-white border border-border/40 rounded-2xl p-8 text-center space-y-4 shadow-[0_2px_16px_rgba(45,74,50,0.06)]">
                <h3 className="font-serif text-xl">Welcome back!</h3>
                <p className="text-muted-foreground text-sm">
                  Continue where you left off?
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleContinueResume}>Continue</Button>
                  <Button variant="outline" onClick={handleStartOver}>
                    Start over
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <StepIndicator
                  currentStep={state.step}
                  totalSteps={4}
                  labels={STEP_LABELS}
                />
                <div className="bg-white border border-border/40 rounded-2xl p-6 sm:p-10 shadow-[0_2px_16px_rgba(45,74,50,0.06)]">
                  {state.step === 1 && <Step3Goals onBack={() => navigate("/")} onNext={goNext} />}
                  {state.step === 2 && <Step2Health onBack={goBack} onNext={goNext} />}
                  {state.step === 3 && <Step1Personal onBack={goBack} onNext={goNext} />}
                  {state.step === 4 && <Step4Booking onBack={goBack} />}
                </div>
              </div>
            )}
          </PageShell>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
