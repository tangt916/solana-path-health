import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IntakeFormProvider, useIntakeForm } from "@/contexts/IntakeFormContext";
import { PageShell } from "@/components/ui/shared/PageShell";
import { StepIndicator } from "@/components/ui/shared/StepIndicator";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Step1Personal } from "@/components/intake/Step1Personal";
import { Step2About } from "@/components/intake/Step2About";
import { Step3Health } from "@/components/intake/Step3Health";
import { Step4Goals } from "@/components/intake/Step4Goals";
import { Step5Plan } from "@/components/intake/Step5Plan";

const STEP_LABELS = ["You", "About", "Health", "Goals", "Plan"];

const GetStartedInner = () => {
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

  const goNext = () => setStep(Math.min(state.step + 1, 5));
  const goBack = () => setStep(Math.max(state.step - 1, 1));

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
              <div className="bg-card border border-border rounded-lg p-6 text-center space-y-4">
                <h3 className="font-serif text-xl">Welcome back!</h3>
                <p className="text-muted-foreground text-sm">
                  Continue where you left off?
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleContinueResume}>Continue</Button>
                  <Button variant="outline" onClick={handleStartOver}>Start over</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <StepIndicator
                  currentStep={state.step}
                  totalSteps={5}
                  labels={STEP_LABELS}
                />
                <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
                  {state.step === 1 && <Step1Personal />}
                  {state.step === 2 && <Step2About onBack={goBack} onNext={goNext} />}
                  {state.step === 3 && <Step3Health onBack={goBack} onNext={goNext} />}
                  {state.step === 4 && <Step4Goals onBack={goBack} onNext={goNext} />}
                  {state.step === 5 && <Step5Plan onBack={goBack} />}
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

const GetStarted = () => (
  <IntakeFormProvider>
    <GetStartedInner />
  </IntakeFormProvider>
);

export default GetStarted;
