import { useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Mail, Calendar as CalendarIcon, Video, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import type { AppointmentSelection } from "@/contexts/IntakeFormContext";

interface RouteState {
  email: string;
  firstName: string;
  appointment: AppointmentSelection;
}

const CheckEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state as RouteState | null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  if (!stateData?.email) {
    return <Navigate to="/get-started" replace />;
  }

  const { email, firstName, appointment } = stateData;
  const isImmediate = appointment.type === "immediate";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
            aria-hidden="true"
          >
            <Mail className="h-7 w-7 text-primary" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-foreground">
            {firstName ? `Thanks, ${firstName}!` : "Thanks!"}
          </h1>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            We sent a verification link to{" "}
            <span className="font-medium text-foreground break-all">{email}</span>.
            Click it to activate your account and access your dashboard.
          </p>

          {/* Appointment summary */}
          <div className="mt-8 bg-card border border-border rounded-xl p-5 text-left">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              Your consultation
            </p>
            <div className="flex items-start gap-3">
              {isImmediate ? (
                <Video className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              ) : (
                <CalendarIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">
                  {appointment.providerName}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {isImmediate
                    ? "Connecting within 15 minutes of email verification"
                    : appointment.displayWhen}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-2 text-xs text-muted-foreground">
            <p>Didn't get the email? Check your spam folder.</p>
            <p>
              Already verified?{" "}
              <button
                type="button"
                onClick={() => navigate("/auth")}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </div>

          <Button
            variant="outline"
            className="mt-8"
            onClick={() => navigate("/")}
          >
            Back to home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckEmail;
