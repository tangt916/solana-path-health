import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/shared/ErrorMessage";
import { supabase } from "@/integrations/supabase/client";
import { useMarketingPopup } from "@/hooks/useMarketingPopup";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email" })
  .max(255);

const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+[1-9]\d{1,14}$/, { message: "Use E.164 format e.g. +14155551234" });

const PROMO_CODE = "WELCOME10";

export const MarketingPopup = () => {
  const { shouldShow, markShown, markConverted } = useMarketingPopup();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleClose = (open: boolean) => {
    if (!open) markShown();
  };

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const { data: lead, error: leadErr } = await supabase
        .from("marketing_leads")
        .insert({
          email: parsed.data,
          source: "popup",
          email_opt_in: true,
          promo_code: PROMO_CODE,
          promo_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .select("id")
        .single();

      if (leadErr) throw leadErr;

      const { data: existingCode } = await supabase
        .from("promo_codes")
        .select("id")
        .eq("code", PROMO_CODE)
        .maybeSingle();

      if (!existingCode) {
        await supabase.from("promo_codes").insert({
          code: PROMO_CODE,
          discount_type: "percent",
          discount_value: 10,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          source: "popup",
          max_uses: 1,
          is_active: true,
        });
      }

      setLeadId(lead?.id ?? null);
      setStep(2);
    } catch (err) {
      console.error("Marketing popup error:", err);
      setError("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  const finishWithSms = async (smsOptIn: boolean) => {
    setPhoneError(null);
    let phoneValue: string | null = null;

    if (smsOptIn && phone.trim()) {
      const parsed = phoneSchema.safeParse(phone);
      if (!parsed.success) {
        setPhoneError(parsed.error.issues[0].message);
        return;
      }
      phoneValue = parsed.data;
    }

    setLoading(true);
    try {
      if (leadId) {
        await supabase
          .from("marketing_leads")
          .update({
            phone: phoneValue,
            sms_opt_in: smsOptIn && !!phoneValue,
          })
          .eq("id", leadId);
      }

      toast.success(`Your code ${PROMO_CODE} is ready — 10% off, valid 30 days! ✓`);
      markConverted();
    } catch (err) {
      console.error("SMS opt-in update error:", err);
      toast.success(`Your code ${PROMO_CODE} is ready — 10% off, valid 30 days! ✓`);
      markConverted();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={shouldShow} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl sm:text-3xl">
                Get 10% Off Your First Month
              </DialogTitle>
              <DialogDescription>
                Join thousands of patients on their GLP-1 journey
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleStep1} className="space-y-4 mt-2">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoFocus
                aria-label="Email address"
              />
              {error && (
                <ErrorMessage
                  variant="inline"
                  title="Couldn't claim your discount"
                  message={error}
                />
              )}
              <Button type="submit" className="w-full" disabled={loading} size="lg">
                {loading ? <LoadingSpinner size="sm" /> : "Claim My Discount"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By continuing you agree to receive marketing emails. Unsubscribe anytime.
              </p>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl sm:text-3xl">
                Get text updates too?
              </DialogTitle>
              <DialogDescription>
                Refill reminders, order updates, and exclusive offers
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Input
                  type="tel"
                  placeholder="+14155551234"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                  aria-label="Phone number"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Format: +[country code][number] (optional)
                </p>
                {phoneError && (
                  <p className="text-xs text-destructive mt-1">{phoneError}</p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  className="flex-1"
                  onClick={() => finishWithSms(true)}
                  disabled={loading}
                  size="lg"
                >
                  Yes, text me!
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => finishWithSms(false)}
                  disabled={loading}
                  size="lg"
                >
                  Email only
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
