import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/shared/LoadingSpinner";
import { SuccessMessage } from "@/components/ui/shared/SuccessMessage";
import { ErrorMessage } from "@/components/ui/shared/ErrorMessage";
import { supabase } from "@/integrations/supabase/client";

const US_STATES: Array<{ code: string; name: string }> = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" }, { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
];

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  state: z.string().min(2, "Please select your state"),
});

type Status = "idle" | "loading" | "exists_here" | "error";

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
    try {
      // Best-effort vendor check (mock vendor returns USER_NOT_FOUND).
      try {
        const { data: checkData } = await supabase.functions.invoke(
          "api-check-user",
          { body: undefined, method: "GET" as never } as never
        );
        if (checkData?.data?.exists) {
          setStatus("exists_here");
          return;
        }
      } catch (err) {
        // Non-fatal — continue onboarding.
        console.warn("api-check-user skipped:", err);
      }

      // Save lead (best-effort; ignore RLS / duplicate errors).
      const { error } = await supabase.from("marketing_leads").insert({
        email: parsed.data.email,
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
        phone: parsed.data.phone || null,
        source: "intake_form",
        email_opt_in: true,
      });
      if (error && !error.message.toLowerCase().includes("duplicate")) {
        console.warn("marketing_leads insert skipped:", error.message);
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

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">Let's get started</h2>
        <p className="text-muted-foreground text-sm">
          A few details so we can build your plan.
        </p>
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
          placeholder="+1 (555) 555-5555"
          value={state.personalInfo.phone}
          onChange={(e) => updatePersonal({ phone: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="state">What state do you live in?</Label>
        <Select
          value={state.personalInfo.state}
          onValueChange={(v) => updatePersonal({ state: v })}
        >
          <SelectTrigger id="state" aria-invalid={!!fieldErrors.state}>
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent>
            {US_STATES.map((s) => (
              <SelectItem key={s.code} value={s.code}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldErrors.state && (
          <p className="text-xs text-destructive mt-1">{fieldErrors.state}</p>
        )}
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
