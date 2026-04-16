import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/shared/LoadingSpinner";
import { SuccessMessage } from "@/components/ui/shared/SuccessMessage";
import { ErrorMessage } from "@/components/ui/shared/ErrorMessage";
import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
});

type Status = "idle" | "loading" | "exists_here" | "exists_other" | "error";

export const Step1Personal = () => {
  const { state, updatePersonal, setStep } = useIntakeForm();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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
    // Mocked vendor check — always treat as USER_NOT_FOUND for now
    try {
      const lead = {
        email: parsed.data.email,
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
        phone: parsed.data.phone || null,
        source: "intake_form",
        email_opt_in: true,
      };
      // Upsert by email (insert; if dup, ignore)
      const { error } = await supabase.from("marketing_leads").insert(lead);
      if (error && !error.message.toLowerCase().includes("duplicate")) {
        console.error("marketing_leads insert error:", error);
      }
      setStatus("idle");
      setStep(2);
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
  if (status === "exists_other") {
    return (
      <ErrorMessage
        variant="inline"
        title="Account exists"
        message="An account exists with this email. Please contact support."
      />
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">Let's get started</h2>
        <p className="text-muted-foreground text-sm">A few details so we can build your plan.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            value={state.personalInfo.firstName}
            onChange={(e) => updatePersonal({ firstName: e.target.value })}
            aria-invalid={!!fieldErrors.firstName}
          />
          {fieldErrors.firstName && (
            <p className="text-xs text-destructive mt-1">{fieldErrors.firstName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            value={state.personalInfo.lastName}
            onChange={(e) => updatePersonal({ lastName: e.target.value })}
            aria-invalid={!!fieldErrors.lastName}
          />
          {fieldErrors.lastName && (
            <p className="text-xs text-destructive mt-1">{fieldErrors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={state.personalInfo.email}
          onChange={(e) => updatePersonal({ email: e.target.value })}
          aria-invalid={!!fieldErrors.email}
        />
        {fieldErrors.email && (
          <p className="text-xs text-destructive mt-1">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          type="tel"
          value={state.personalInfo.phone}
          onChange={(e) => updatePersonal({ phone: e.target.value })}
        />
      </div>

      {errorMsg && (
        <ErrorMessage variant="inline" title="Something went wrong" message={errorMsg} />
      )}

      <Button
        size="lg"
        className="w-full"
        onClick={handleContinue}
        disabled={status === "loading"}
      >
        {status === "loading" ? <LoadingSpinner size="sm" /> : "Continue"}
      </Button>
    </div>
  );
};
