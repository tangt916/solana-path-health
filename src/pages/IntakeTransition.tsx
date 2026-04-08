import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Shield, Stethoscope } from "lucide-react";
import Header from "@/components/layout/Header";

const IntakeTransition = () => {
  const navigate = useNavigate();
  const [consents, setConsents] = useState({ telehealth: false, privacy: false, terms: false });
  const allConsented = consents.telehealth && consents.privacy && consents.terms;

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container max-w-lg py-10 md:py-16">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
            <CheckCircle className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">You may be eligible</h1>
          <p className="mt-2 text-sm text-muted-foreground">Here's what happens next.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground text-sm">A licensed provider will review your information</h3>
                <p className="text-sm text-muted-foreground mt-1">Your responses will be reviewed by a licensed medical provider to determine if GLP-1 medication is appropriate for you.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground text-sm">Your information is secure</h3>
                <p className="text-sm text-muted-foreground mt-1">All health information is encrypted and handled in compliance with healthcare privacy standards.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4 border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground">Before continuing, please review and agree:</h3>
            {[
              { key: "telehealth" as const, label: "I consent to receiving care through telehealth services" },
              { key: "privacy" as const, label: "I have read and agree to the Privacy Policy" },
              { key: "terms" as const, label: "I agree to the Terms of Service" },
            ].map(item => (
              <label key={item.key} className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={consents[item.key]}
                  onCheckedChange={(checked) => setConsents(prev => ({ ...prev, [item.key]: !!checked }))}
                  className="mt-0.5"
                />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </label>
            ))}
          </div>

          <Button className="mt-6 w-full" size="lg" disabled={!allConsented} onClick={() => navigate("/checkout")}>
            Continue to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntakeTransition;
