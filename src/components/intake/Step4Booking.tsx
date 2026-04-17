import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useIntakeForm, type AppointmentSelection } from "@/contexts/IntakeFormContext";
import { Button } from "@/components/ui/button";
import { MockCalendar } from "@/components/MockCalendar";
import { ErrorMessage } from "@/components/ui/shared/ErrorMessage";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import type { TimeSlot } from "@/lib/mock-calendar";

interface Props {
  onBack: () => void;
}

type FlowOption = "now" | "later" | null;

export const Step4Booking = ({ onBack }: Props) => {
  const { state, setAppointment, resetForm } = useIntakeForm();
  const navigate = useNavigate();
  const [option, setOption] = useState<FlowOption>(
    state.appointment?.type === "immediate"
      ? "now"
      : state.appointment?.type === "scheduled"
      ? "later"
      : null
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(
    state.appointment?.slot ?? null
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // "See doctor now" availability — 8 AM – 6 PM local
  const isImmediateAvailable = useMemo(() => {
    const h = new Date().getHours();
    return h >= 8 && h < 18;
  }, []);

  const submitAppointment = async (appt: AppointmentSelection) => {
    setSubmitting(true);
    setError(null);
    try {
      // Save to context + sessionStorage (context auto-persists)
      setAppointment(appt);

      // Best-effort: insert pending appointment row. RLS may block anonymous inserts;
      // that's fine — the data also lives in sessionStorage and will be reconciled
      // after auth signup. Surface no error to the user for this.
      try {
        await supabase.from("appointments").insert({
          email: state.personalInfo.email,
          provider_name: appt.providerName,
          start_time:
            appt.type === "scheduled" && appt.slot
              ? new Date(`${appt.slot.date}T${convertTo24h(appt.slot.time)}`).toISOString()
              : new Date().toISOString(),
          status: "pending",
          vendor_name: "mock",
        });
      } catch (e) {
        console.warn("appointments insert skipped:", e);
      }

      // Silently create a Supabase auth account so the dashboard knows them.
      // We use a generated password; the user will be asked to set their own
      // in Phase 2 of onboarding. Email confirm is ON, so we redirect to
      // a "check your email" screen instead of dashboard.
      const tempPassword = `Sh-${crypto.randomUUID()}!Ax9`;
      sessionStorage.setItem("intakeTempPassword", "true");

      const { error: signupErr } = await supabase.auth.signUp({
        email: state.personalInfo.email,
        password: tempPassword,
        options: {
          data: {
            full_name: `${state.personalInfo.firstName} ${state.personalInfo.lastName}`,
          },
          emailRedirectTo: `${window.location.origin}/dashboard?newUser=true`,
        },
      });

      if (signupErr) {
        // If the user already exists we just send them to login.
        const msg = signupErr.message.toLowerCase();
        if (msg.includes("already") || msg.includes("registered")) {
          navigate("/auth");
          return;
        }
        throw signupErr;
      }

      // Don't reset form yet — Dashboard will use it on first visit.
      // Navigate to "check your email" screen.
      navigate("/check-email", {
        state: {
          email: state.personalInfo.email,
          firstName: state.personalInfo.firstName,
          appointment: appt,
        },
      });
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error
          ? e.message
          : "Could not submit your booking. Please try again."
      );
      setSubmitting(false);
    }
  };

  const handleConfirmNow = () => {
    submitAppointment({
      type: "immediate",
      providerName: "Dr. Amanda Torres",
      displayWhen: "Within 15 minutes",
    });
  };

  const handleConfirmScheduled = (slot: TimeSlot) => {
    submitAppointment({
      type: "scheduled",
      slot,
      providerName: slot.providerName,
      displayWhen: `${slot.displayDate} at ${slot.time}`,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">
          Almost there — book your free consultation
        </h2>
        <p className="text-muted-foreground text-sm">
          A licensed provider will review your health info and determine if
          you're a good candidate for GLP-1 therapy.
        </p>
      </div>

      {/* Two options */}
      <div className="grid sm:grid-cols-2 gap-3">
        <OptionCard
          icon={<Video className="w-5 h-5" />}
          title="See a doctor now"
          subtitle={
            isImmediateAvailable
              ? "Connect with an available provider right now"
              : "Available 8 AM – 6 PM"
          }
          selected={option === "now"}
          disabled={!isImmediateAvailable}
          onClick={() => setOption("now")}
        />
        <OptionCard
          icon={<CalendarIcon className="w-5 h-5" />}
          title="Schedule for later"
          subtitle="Pick a date and time that works for you"
          selected={option === "later"}
          onClick={() => setOption("later")}
        />
      </div>

      {/* Now option details */}
      {option === "now" && (
        <div className="bg-muted/40 border border-border rounded-lg p-4 space-y-3">
          <p className="text-sm text-foreground">
            You'll be connected with <strong>Dr. Amanda Torres</strong> within
            15 minutes of completing your intake.
          </p>
          <Button
            onClick={handleConfirmNow}
            disabled={submitting}
            className="w-full"
            size="lg"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Confirm — see a doctor now"
            )}
          </Button>
        </div>
      )}

      {/* Calendar option */}
      {option === "later" && (
        <MockCalendar
          initialSlot={selectedSlot}
          onSlotSelected={setSelectedSlot}
          onConfirm={handleConfirmScheduled}
        />
      )}

      {error && (
        <ErrorMessage
          variant="inline"
          title="Couldn't book your appointment"
          message={error}
        />
      )}

      <div className="flex pt-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
          disabled={submitting}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

const OptionCard = ({
  icon,
  title,
  subtitle,
  selected,
  disabled,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-pressed={selected}
    className={cn(
      "text-left p-4 rounded-xl border transition-all",
      selected
        ? "border-primary bg-primary/5 ring-2 ring-primary/30"
        : "border-border bg-card hover:border-primary/50",
      disabled && "opacity-50 cursor-not-allowed hover:border-border"
    )}
  >
    <div className="flex items-center gap-2 text-primary mb-2">{icon}</div>
    <p className="font-medium text-sm text-foreground">{title}</p>
    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
  </button>
);

function convertTo24h(time: string): string {
  // "10:30 AM" -> "10:30:00"
  const m = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return "00:00:00";
  let h = parseInt(m[1]);
  const min = m[2];
  const period = m[3].toUpperCase();
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${min}:00`;
}
