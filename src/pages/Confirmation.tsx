import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Clock,
  ClipboardCheck,
  Stethoscope,
  Pill,
  Truck,
  Copy,
  Check,
  Mail,
  MessageCircle,
  Share2,
  Calendar,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  SuccessMessage,
  AppointmentCard,
} from "@/components/ui/shared";

interface ConfirmationState {
  caseId?: string;
  appointmentDetails?: {
    providerName: string;
    startTime: string;
    endTime?: string;
    timezone: string;
    meetingLink?: string;
  } | null;
  referralCode?: string;
  seeDoctorNow?: boolean;
}

const TIMELINE = [
  {
    icon: ClipboardCheck,
    title: "Intake submitted",
    desc: "We've received your information.",
  },
  {
    icon: Stethoscope,
    title: "Provider review",
    desc: "A licensed provider reviews your intake within 24 hours.",
  },
  {
    icon: Pill,
    title: "Prescription sent",
    desc: "If approved, your prescription is sent to our pharmacy.",
  },
  {
    icon: Truck,
    title: "Medication shipped",
    desc: "Your medication ships discreetly to your door.",
  },
];

function buildIcs(appt: NonNullable<ConfirmationState["appointmentDetails"]>) {
  const start = new Date(appt.startTime);
  const end = appt.endTime
    ? new Date(appt.endTime)
    : new Date(start.getTime() + 30 * 60 * 1000);

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Solana Health//Appointment//EN",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@solanahealth.co`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Telehealth visit with ${appt.providerName}`,
    appt.meetingLink ? `URL:${appt.meetingLink}` : "",
    appt.meetingLink
      ? `DESCRIPTION:Join your telehealth visit: ${appt.meetingLink}`
      : "DESCRIPTION:Solana Health telehealth visit",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return lines.join("\r\n");
}

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const state = (location.state ?? {}) as ConfirmationState;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!state.caseId) {
      navigate("/dashboard", { replace: true });
    }
  }, [state.caseId, navigate]);

  const referralUrl = useMemo(() => {
    if (!state.referralCode) return "";
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/get-started?ref=${state.referralCode}`;
  }, [state.referralCode]);

  if (!state.caseId) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      toast({ title: "Link copied!" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Could not copy", variant: "destructive" });
    }
  };

  const handleAddToCalendar = () => {
    if (!state.appointmentDetails) return;
    const ics = buildIcs(state.appointmentDetails);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "solana-health-appointment.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareMessage = `I just joined Solana Health for medical weight loss — use my link to get $25 off: ${referralUrl}`;
  const smsHref = `sms:?body=${encodeURIComponent(shareMessage)}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
  const emailHref = `mailto:?subject=${encodeURIComponent(
    "Get $25 off Solana Health"
  )}&body=${encodeURIComponent(shareMessage)}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 space-y-8">
          <SuccessMessage
            variant="page"
            title="You're all set!"
            message="Your intake has been submitted and a provider will review it shortly."
          />

          {/* Appointment */}
          {state.appointmentDetails && (
            <section>
              <h2 className="font-serif text-xl mb-3">Your appointment</h2>
              <AppointmentCard
                providerName={state.appointmentDetails.providerName}
                dateTime={state.appointmentDetails.startTime}
                timezone={state.appointmentDetails.timezone}
                meetingLink={state.appointmentDetails.meetingLink}
                status="scheduled"
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={handleAddToCalendar}
              >
                <Calendar className="w-4 h-4 mr-1.5" />
                Add to calendar (.ics)
              </Button>
            </section>
          )}

          {/* See doctor now info */}
          {state.seeDoctorNow && !state.appointmentDetails && (
            <Card className="p-5 border-primary/30 bg-primary/5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    A provider will reach out within 15 minutes
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Keep an eye on your email and phone — a licensed provider
                    is being matched to your case right now.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Timeline */}
          <section>
            <h2 className="font-serif text-xl mb-4">What happens next</h2>
            <div className="space-y-4">
              {TIMELINE.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-2" />
                      )}
                    </div>
                    <div className="pb-2">
                      <h3 className="font-medium text-foreground text-sm">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Referral */}
          {referralUrl && (
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/40 border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Share2 className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-xl">Give $25, Get $25</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Share your link and you both save on your next month.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <input
                  readOnly
                  value={referralUrl}
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground"
                />
                <Button onClick={handleCopy} size="sm" variant="outline">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1.5" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" variant="secondary">
                  <a href={smsHref}>
                    <MessageCircle className="w-4 h-4 mr-1.5" />
                    SMS
                  </a>
                </Button>
                <Button asChild size="sm" variant="secondary">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild size="sm" variant="secondary">
                  <a href={emailHref}>
                    <Mail className="w-4 h-4 mr-1.5" />
                    Email
                  </a>
                </Button>
              </div>
            </Card>
          )}

          <div className="flex justify-center pt-2">
            <Button size="lg" onClick={() => navigate("/dashboard")}>
              Go to my dashboard →
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;
