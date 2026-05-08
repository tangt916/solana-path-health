// Reusable lead-capture intake driven by a TreatmentConfig.
// Renders the treatment's qualifying questions, then collects name/email/phone.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/shared/ErrorMessage";
import { SuccessMessage } from "@/components/ui/shared/SuccessMessage";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import type { TreatmentConfig, IntakeQuestion } from "@/config/treatments";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(7, "Phone required").max(40),
});

type Answers = Record<string, string | string[]>;

const QuestionField = ({
  q,
  value,
  onChange,
  accent,
}: {
  q: IntakeQuestion;
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
  accent: string;
}) => {
  if (q.type === "text") {
    return (
      <Input
        value={(value as string) || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer..."
      />
    );
  }
  const selected = q.type === "multi" ? ((value as string[]) || []) : value;

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {q.options?.map((opt) => {
        const isSelected = q.type === "multi"
          ? (selected as string[]).includes(opt)
          : selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => {
              if (q.type === "multi") {
                const arr = (selected as string[]) || [];
                onChange(arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt]);
              } else {
                onChange(opt);
              }
            }}
            className="rounded-xl border px-4 py-3 text-left text-sm transition-all"
            style={{
              borderColor: isSelected ? accent : "rgba(0,0,0,0.12)",
              background: isSelected ? `${accent}14` : "#ffffff",
              color: "#0f1f12",
              fontWeight: isSelected ? 500 : 400,
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};

interface Props { t: TreatmentConfig }

export const LeadIntake = ({ t }: Props) => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({ firstName: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    for (const q of t.intakeQuestions) {
      if (!q.required) continue;
      const v = answers[q.id];
      if (q.type === "multi" ? !v || (v as string[]).length === 0 : !v) {
        errs[q.id] = "Required";
      }
    }
    const parsed = contactSchema.safeParse(contact);
    if (!parsed.success) {
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitErr(null);
    try {
      const { error } = await supabase.from("marketing_leads").insert({
        email: contact.email.trim(),
        first_name: contact.firstName.trim(),
        phone: contact.phone.trim(),
        source: `intake_${t.slug}`,
        email_opt_in: true,
      });
      if (error && !error.message.toLowerCase().includes("duplicate")) {
        console.warn("lead save warning:", error.message);
      }
      trackEvent("intake_submitted", { treatment: t.slug, answers: JSON.stringify(answers) });
      setDone(true);
    } catch (e) {
      console.error(e);
      setSubmitErr("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <SuccessMessage
        variant="inline"
        title="You're on the list."
        message={`A ${t.name.toLowerCase()} provider will be in touch shortly. Check your email for next steps.`}
        ctaLabel="Back to home"
        onCta={() => navigate("/")}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] mb-3" style={{ color: t.accent }}>
          {t.name} intake
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl mb-2" style={{ fontWeight: 300, color: "#0f1f12" }}>
          {t.intakeIntro}
        </h1>
      </div>

      {t.intakeQuestions.map((q) => (
        <div key={q.id} className="space-y-2">
          <Label className="text-base font-medium" style={{ color: "#0f1f12" }}>
            {q.label}
            {q.required && <span style={{ color: t.accent }}> *</span>}
          </Label>
          {q.helper && <p className="text-xs text-muted-foreground -mt-1">{q.helper}</p>}
          <QuestionField
            q={q}
            value={answers[q.id]}
            onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
            accent={t.accent}
          />
          {errors[q.id] && <p className="text-xs text-destructive">{errors[q.id]}</p>}
        </div>
      ))}

      <div className="pt-4 border-t border-border/30 space-y-4">
        <p className="text-sm font-medium" style={{ color: "#0f1f12" }}>
          How can we reach you?
        </p>
        <div className="space-y-1.5">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            value={contact.firstName}
            onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
            autoComplete="given-name"
          />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            autoComplete="email"
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Mobile number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 555-5555"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            autoComplete="tel"
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>

      {submitErr && <ErrorMessage variant="inline" title="Try again" message={submitErr} />}

      <Button
        onClick={submit}
        disabled={submitting}
        className="w-full rounded-full py-6 text-sm font-medium border-0"
        style={{ background: "#0f1f12", color: "#faf6ee" }}
      >
        {submitting ? <LoadingSpinner size="sm" /> : t.ctaButton}
      </Button>
      <p className="text-center" style={{ fontSize: "0.7rem", color: "#5a7060" }}>
        By continuing you agree to receive treatment-related communications. Cancel anytime.
      </p>
    </div>
  );
};
