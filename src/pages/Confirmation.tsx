import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SuccessMessage, AppointmentCard } from "@/components/ui/shared";

interface ConfirmationState {
  caseId?: string;
  appointmentDetails?: {
    providerName: string;
    startTime: string;
    timezone: string;
  } | null;
}

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state ?? {}) as ConfirmationState;

  useEffect(() => {
    if (!state.caseId) {
      // No case context — bounce home
      navigate("/", { replace: true });
    }
  }, [state.caseId, navigate]);

  if (!state.caseId) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 space-y-8">
          <SuccessMessage
            variant="page"
            title="You're all set!"
            message={`Your enrollment is complete. Case ID: ${state.caseId}`}
            ctaLabel="Go to dashboard"
            onCta={() => navigate("/dashboard")}
          />

          {state.appointmentDetails && (
            <div>
              <h2 className="font-serif text-xl mb-3 text-center">
                Your upcoming appointment
              </h2>
              <AppointmentCard
                providerName={state.appointmentDetails.providerName}
                dateTime={state.appointmentDetails.startTime}
                timezone={state.appointmentDetails.timezone}
                status="scheduled"
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;
