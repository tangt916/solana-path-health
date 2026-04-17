import { CheckCircle2, Circle, CircleDot } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
  firstName?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  isImmediate?: boolean;
}

export const WelcomeModal = ({
  open,
  onClose,
  firstName,
  appointmentDate,
  appointmentTime,
  isImmediate,
}: WelcomeModalProps) => {
  const consultLine = isImmediate
    ? "Dr. Torres will reach out within 15 minutes"
    : appointmentDate && appointmentTime
    ? `Consultation on ${appointmentDate} at ${appointmentTime}`
    : "Consultation scheduled";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="font-serif text-2xl">
          Welcome to Solana Health{firstName ? `, ${firstName}` : ""}! 🎉
        </DialogTitle>
        <DialogDescription>
          Here's what happens next on your weight-loss journey.
        </DialogDescription>

        <div className="mt-2 space-y-3">
          <Step
            icon={<CheckCircle2 className="w-5 h-5 text-success" />}
            title="Step 1: Intake submitted"
            done
          />
          <Step
            icon={<CircleDot className="w-5 h-5 text-primary" />}
            title={`Step 2: ${consultLine}`}
            subtitle="Dr. Torres will review your intake beforehand"
            active
          />
          <Step
            icon={<Circle className="w-5 h-5 text-muted-foreground" />}
            title="Step 3: Prescription decision"
            subtitle="1–2 business days after consult"
          />
          <Step
            icon={<Circle className="w-5 h-5 text-muted-foreground" />}
            title="Step 4: Checkout & payment"
            subtitle="Only if approved by your provider"
          />
          <Step
            icon={<Circle className="w-5 h-5 text-muted-foreground" />}
            title="Step 5: Medication shipped to your door"
          />
        </div>

        <Button onClick={onClose} className="w-full mt-4">
          Got it, take me to my dashboard →
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const Step = ({
  icon,
  title,
  subtitle,
  done,
  active,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  done?: boolean;
  active?: boolean;
}) => (
  <div
    className={`flex items-start gap-3 p-3 rounded-lg border ${
      active
        ? "border-primary/40 bg-primary/5"
        : done
        ? "border-success/30 bg-success/5"
        : "border-border"
    }`}
  >
    <div className="shrink-0 mt-0.5">{icon}</div>
    <div className="flex-1">
      <p className="text-sm font-medium text-foreground">{title}</p>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      )}
    </div>
  </div>
);
