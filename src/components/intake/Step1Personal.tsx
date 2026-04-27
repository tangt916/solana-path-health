import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/shared/LoadingSpinner";
import { SuccessMessage } from "@/components/ui/shared/SuccessMessage";
import { ErrorMessage } from "@/components/ui/shared/ErrorMessage";
import { supabase } from "@/integrations/supabase/client";
import { checkUser } from "@/lib/api";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Mobile number is required")
    .max(40),
});

type Status = "idle" | "loading" | "exists_here" | "error";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export const Step1Personal = ({ onBack, onNext }: Props) => {
  const { state, updatePersonal } = useIntakeForm();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const savedRef = useRef(false);

  // Best-effort partial-lead save for remarketing — fires once we have a
  // valid email + first name, even if the user abandons before clicking next.
  useEffect(() => {
    if (savedRef.current) return;
    const { firstName, email, phone } = state.personalInfo;
    if (!firstName.trim() || !email.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    savedRef.current = true;
    void supabase
      .from("marketing_leads")
      .insert({
        email: email.trim(),
        first_name: firstName.trim(),
        phone: phone?.trim() || null,
        source: "intake_partial",
        email_opt_in: true,
      })
      .then(({ error }) => {
        if (error && !error.message.toLowerCase().includes("duplicate")) {
          // Allow re-save attempt on next change if it failed.
          savedRef.current = false;
          console.warn("partial lead save skipped:", error.message);
        }
      });
  }, [state.personalInfo]);

  const handleContinue = async () => {
    setFieldErrors({});
    setErrorMsg(null);
    const parsed = schema.safeParse(state.personalInfo);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setFieldErrors(errs);
      return;
    }

    setStatus("loading");
    try {
      try {
        const result = await checkUser(parsed.data.email);
        if (result?.exists) {
          setStatus("exists_here");
          return;
        }
      } catch (err) {
        console.warn("api-check-user skipped:", err);
      }

      const { error } = await supabase.from("marketing_leads").insert({
        email: parsed.data.email,
        first_name: parsed.data.firstName,
        phone: parsed.data.phone,
        source: "intake_form",
        email_opt_in: true,
      });
      if (error && !error.message.toLowerCase().includes("duplicate")) {
        console.warn("marketing_leads insert skipped:", error.message);
      }

      setStatus("idle");
      onNext();
    } catch (e) {
      console.error(e);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  if (status === "exists_here") {
    return (
      <SuccessMessage
        variant="inline"
        title="Welcome back!"
        message="You already have an account with us."
        ctaLabel="Go to my dashboard"
        onCta={() => navigate("/dashboard")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">
          Let's personalize your plan
        </h2>
        <p className="text-muted-foreground text-sm">
          Just the basics so your care team can reach you.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="firstName">First name</Label>
        <Input
          id="firstName"
          autoComplete="given-name"
          value={state.personalInfo.firstName}
          onChange={(e) => updatePersonal({ firstName: e.target.value })}
          aria-invalid={!!fieldErrors.firstName}
        />
        {fieldErrors.firstName && (
          <p className="text-xs text-destructive mt-1">{fieldErrors.firstName}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={state.personalInfo.email}
          onChange={(e) => updatePersonal({ email: e.target.value })}
          aria-invalid={!!fieldErrors.email}
        />
        {fieldErrors.email && (
          <p className="text-xs text-destructive mt-1">{fieldErrors.email}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Mobile number</Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+1 (555) 555-5555"
          value={state.personalInfo.phone}
          onChange={(e) => updatePersonal({ phone: e.target.value })}
          aria-invalid={!!fieldErrors.phone}
        />
        {fieldErrors.phone && (
          <p className="text-xs text-destructive mt-1">{fieldErrors.phone}</p>
        )}
      </div>

      {errorMsg && (
        <ErrorMessage variant="inline" title="Something went wrong" message={errorMsg} />
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1" disabled={status === "loading"}>
          Back
        </Button>
        <Button
          className="flex-1"
          onClick={handleContinue}
          disabled={status === "loading"}
        >
          {status === "loading" ? <LoadingSpinner size="sm" /> : "Continue"}
        </Button>
      </div>
    </div>
  );
};
