import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Stethoscope, CalendarClock, ArrowRight, Loader2 } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PricingCard,
  TrustBadges,
  LoadingSpinner,
  ErrorMessage,
  AppointmentCard,
  PageShell,
} from "@/components/ui/shared";
import { cn } from "@/lib/utils";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/stripe";
import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { supabase } from "@/integrations/supabase/client";
import {
  createPaymentIntent,
  createCase,
  getAvailability,
  scheduleAppointment,
  type ProviderSlot,
  type CreateCaseInput,
} from "@/lib/api";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const formatPrice = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

type CheckoutStep = "preference" | "schedule" | "payment";
type AppointmentMode = "now" | "schedule" | null;

// ───────── Inner Stripe form ─────────

interface PaymentFormProps {
  amountDue: number;
  onSuccess: (paymentIntentId: string) => Promise<void>;
}

const PaymentForm = ({ amountDue, onSuccess }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [postProcessing, setPostProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed");
      setSubmitting(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setPostProcessing(true);
      try {
        await onSuccess(paymentIntent.id);
      } catch (err) {
        // Bubble UI up via parent state — keep button re-enabled disabled (case failed but paid)
        setSubmitting(false);
        setPostProcessing(false);
      }
    } else {
      setError("Payment did not complete. Please try again.");
      setSubmitting(false);
    }
  };

  const busy = submitting || postProcessing;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && (
        <ErrorMessage variant="inline" title="Payment failed" message={error} />
      )}
      <Button type="submit" size="lg" className="w-full" disabled={!stripe || busy}>
        {busy ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {postProcessing ? "Finalizing your enrollment..." : "Processing..."}
          </>
        ) : (
          <>
            Complete purchase — {formatPrice(amountDue)}
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
      <TrustBadges />
    </form>
  );
};

// ───────── Main page ─────────

const Checkout = () => {
  const navigate = useNavigate();
  const { state, resetForm } = useIntakeForm();

  // Guard: redirect if intake context is empty
  useEffect(() => {
    if (!state.selectedPlan || !state.personalInfo.email) {
      navigate("/get-started", { replace: true });
    }
  }, [state.selectedPlan, state.personalInfo.email, navigate]);

  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("preference");
  const [appointmentMode, setAppointmentMode] = useState<AppointmentMode>(null);
  const [selectedSlot, setSelectedSlot] = useState<ProviderSlot | null>(null);

  const plan = state.selectedPlan;
  const promo = state.promoCode;

  const { originalAmount, discountAmount, finalAmount } = useMemo(() => {
    if (!plan) return { originalAmount: 0, discountAmount: 0, finalAmount: 0 };
    const original = plan.monthlyPrice * plan.months;
    let discount = 0;
    if (promo) {
      discount =
        promo.type === "percent"
          ? Math.round((original * promo.value) / 100)
          : Math.min(promo.value, original);
    }
    return {
      originalAmount: original,
      discountAmount: discount,
      finalAmount: Math.max(original - discount, 0),
    };
  }, [plan, promo]);

  if (!plan || !state.personalInfo.email) return null;

  const handleSelectNow = () => {
    setAppointmentMode("now");
    setSelectedSlot(null);
    setCheckoutStep("payment");
  };

  const handleSelectSchedule = () => {
    setAppointmentMode("schedule");
    setCheckoutStep("schedule");
  };

  // ───────── Post-payment success handler ─────────
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    const fullName = `${state.personalInfo.firstName} ${state.personalInfo.lastName}`.trim();

    // Build case payload for vendor
    const casePayload: CreateCaseInput = {
      email: state.personalInfo.email,
      firstName: state.personalInfo.firstName,
      lastName: state.personalInfo.lastName,
      phone: state.personalInfo.phone || undefined,
      dob: state.aboutInfo.dob || undefined,
      gender: state.aboutInfo.gender || undefined,
      state: state.aboutInfo.state,
      planMonths: plan.months,
      promoCode: promo?.code,
      address: {
        line1: state.aboutInfo.addressLine1,
        line2: state.aboutInfo.addressLine2 || undefined,
        city: state.aboutInfo.city,
        state: state.aboutInfo.state,
        postalCode: state.aboutInfo.zip,
        country: "US",
      },
      formTitle: "GLP-1 Weight Loss Intake",
      stripePaymentId: paymentIntentId,
      paymentAmount: originalAmount,
      intake: {
        weightLbs: state.healthInfo.weightLbs,
        heightInches:
          Number(state.healthInfo.heightFeet || 0) * 12 +
          Number(state.healthInfo.heightInches || 0),
        allergies: state.healthInfo.hasAllergies
          ? state.healthInfo.allergiesDetail
          : "None",
        medications: state.healthInfo.hasMedications
          ? state.healthInfo.medicationsDetail
          : "None",
        conditions: state.healthInfo.conditions,
        goalWeight: state.goalsInfo.goalWeight,
        strugglingDuration: state.goalsInfo.strugglingDuration,
        triedBefore: state.goalsInfo.triedBefore,
        hearAbout: state.goalsInfo.hearAbout,
      },
    };

    let caseResult;
    try {
      caseResult = await createCase(casePayload);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Unknown error";
      // Log to error_logs but do NOT navigate
      await supabase.from("error_logs").insert({
        context: "checkout.createCase",
        error: errMsg,
        patient_email: state.personalInfo.email,
        payload: { paymentIntentId, casePayload } as never,
      });
      throw new Error(
        `Payment received but setup failed. Please contact support. Payment ID: ${paymentIntentId}`
      );
    }

    // Insert into patients
    const referralCode = `SLN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const { data: patientRow } = await supabase
      .from("patients")
      .insert({
        email: state.personalInfo.email,
        first_name: state.personalInfo.firstName,
        last_name: state.personalInfo.lastName,
        phone: state.personalInfo.phone || null,
        dob: state.aboutInfo.dob || null,
        gender: state.aboutInfo.gender || null,
        address: {
          line1: state.aboutInfo.addressLine1,
          line2: state.aboutInfo.addressLine2,
          city: state.aboutInfo.city,
          state: state.aboutInfo.state,
          zip: state.aboutInfo.zip,
        } as never,
        referral_code: referralCode,
        referred_by: state.referralCode || null,
        converted_at: new Date().toISOString(),
      })
      .select()
      .maybeSingle();

    // Insert into cases
    await supabase.from("cases").insert({
      vendor_case_id: caseResult.caseId,
      vendor_name: "carevalidate",
      email: state.personalInfo.email,
      patient_id: patientRow?.id ?? null,
      plan_months: plan.months,
      status: caseResult.status ?? "OPEN",
      stripe_payment_id: paymentIntentId,
      promo_code_used: promo?.code ?? null,
      discount_applied: discountAmount,
      original_amount: originalAmount,
      amount_paid: finalAmount,
    });

    // Schedule appointment if applicable
    let appointmentDetails: ConfirmationAppt | null = null;
    if (appointmentMode === "schedule" && selectedSlot) {
      try {
        await scheduleAppointment({
          email: state.personalInfo.email,
          caseId: caseResult.caseId,
          providerId: selectedSlot.providerId,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          timezone: selectedSlot.timezone,
        });
        await supabase.from("appointments").insert({
          vendor_name: "carevalidate",
          case_id: null, // local cases.id unknown without round-trip; vendor id stored separately
          email: state.personalInfo.email,
          patient_id: patientRow?.id ?? null,
          provider_name: selectedSlot.providerName,
          start_time: selectedSlot.startTime,
          end_time: selectedSlot.endTime,
          timezone: selectedSlot.timezone,
          status: "scheduled",
        });
        appointmentDetails = {
          providerName: selectedSlot.providerName,
          startTime: selectedSlot.startTime,
          timezone: selectedSlot.timezone,
        };
      } catch {
        /* non-fatal */
      }
    }

    // Referrals
    if (state.referralCode && patientRow?.id) {
      await supabase
        .from("referrals")
        .update({
          referred_patient_id: patientRow.id,
          referred_email: state.personalInfo.email,
          status: "completed",
          completed_at: new Date().toISOString(),
        })
        .eq("referral_code", state.referralCode);

      await supabase.from("referral_credits").insert([
        {
          patient_id: patientRow.id,
          email: state.personalInfo.email,
          amount: 25,
          reason: "referee_signup",
        },
      ]);
    }

    // Mark marketing lead converted
    await supabase
      .from("marketing_leads")
      .update({
        converted_to_patient: true,
        patient_id: patientRow?.id ?? null,
      })
      .eq("email", state.personalInfo.email);

    // Clear intake state
    resetForm();

    navigate("/confirmation", {
      state: { caseId: caseResult.caseId, appointmentDetails },
      replace: true,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <PageShell title="Checkout" subtitle="You're almost done.">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* LEFT — Order summary */}
            <aside className="lg:col-span-2 space-y-5">
              <div>
                <h2 className="font-serif text-xl mb-3">Patient</h2>
                <div className="bg-card border border-border rounded-lg p-4 text-sm">
                  <p className="font-medium text-foreground">
                    {state.personalInfo.firstName} {state.personalInfo.lastName}
                  </p>
                  <p className="text-muted-foreground">{state.personalInfo.email}</p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl mb-3">Your plan</h2>
                <PricingCard
                  title={plan.months === 1 ? "Monthly" : `${plan.months} months`}
                  monthlyPrice={plan.monthlyPrice}
                  months={plan.months}
                  discountPercent={plan.discountPercent || undefined}
                  totalPrice={finalAmount}
                  originalTotal={
                    discountAmount > 0 || plan.discountPercent > 0
                      ? originalAmount
                      : undefined
                  }
                  isSelected
                />
              </div>

              <div className="bg-card border border-border rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Medical consultation</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GLP-1 medication ({plan.months} mo)</span>
                  <span>{formatPrice(originalAmount)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                {promo && discountAmount > 0 && (
                  <div className="flex justify-between text-success font-medium">
                    <span>Promo {promo.code}</span>
                    <span>−{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold text-foreground text-base">
                  <span>Total today</span>
                  <span>{formatPrice(finalAmount)}</span>
                </div>
              </div>

              <TrustBadges />
            </aside>

            {/* RIGHT — Steps */}
            <section className="lg:col-span-3">
              <Card>
                <CardContent className="p-6 sm:p-8">
                  {checkoutStep === "preference" && (
                    <PreferenceStep
                      onNow={handleSelectNow}
                      onSchedule={handleSelectSchedule}
                    />
                  )}
                  {checkoutStep === "schedule" && (
                    <ScheduleStep
                      patientState={state.aboutInfo.state}
                      selectedSlot={selectedSlot}
                      onSlotSelected={setSelectedSlot}
                      onConfirm={() => setCheckoutStep("payment")}
                      onBack={() => {
                        setSelectedSlot(null);
                        setAppointmentMode(null);
                        setCheckoutStep("preference");
                      }}
                    />
                  )}
                  {checkoutStep === "payment" && (
                    <PaymentStep
                      amount={finalAmount}
                      email={state.personalInfo.email}
                      phone={state.personalInfo.phone}
                      onBack={() =>
                        setCheckoutStep(
                          appointmentMode === "schedule" ? "schedule" : "preference"
                        )
                      }
                      onSuccess={handlePaymentSuccess}
                    />
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </PageShell>
      </main>
      <Footer />
    </div>
  );
};

interface ConfirmationAppt {
  providerName: string;
  startTime: string;
  timezone: string;
}

// ───────── Step A ─────────

const PreferenceStep = ({
  onNow,
  onSchedule,
}: {
  onNow: () => void;
  onSchedule: () => void;
}) => (
  <div className="space-y-5">
    <div>
      <h2 className="font-serif text-2xl mb-1">How would you like to meet?</h2>
      <p className="text-sm text-muted-foreground">
        Choose how you'd like to connect with a licensed provider.
      </p>
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      <button
        type="button"
        onClick={onNow}
        className="text-left bg-card border border-border rounded-lg p-5 hover:border-primary/60 hover:shadow-sm transition-all"
      >
        <Stethoscope className="w-7 h-7 text-primary mb-3" />
        <h3 className="font-serif text-lg mb-1">See a Doctor Now</h3>
        <p className="text-sm text-muted-foreground">
          Available providers ready to see you.
        </p>
      </button>
      <button
        type="button"
        onClick={onSchedule}
        className="text-left bg-card border border-border rounded-lg p-5 hover:border-primary/60 hover:shadow-sm transition-all"
      >
        <CalendarClock className="w-7 h-7 text-primary mb-3" />
        <h3 className="font-serif text-lg mb-1">Schedule an Appointment</h3>
        <p className="text-sm text-muted-foreground">
          Pick a time that works for you.
        </p>
      </button>
    </div>
  </div>
);

// ───────── Step B ─────────

const ScheduleStep = ({
  patientState,
  selectedSlot,
  onSlotSelected,
  onConfirm,
  onBack,
}: {
  patientState: string;
  selectedSlot: ProviderSlot | null;
  onSlotSelected: (s: ProviderSlot) => void;
  onConfirm: () => void;
  onBack: () => void;
}) => {
  const [slots, setSlots] = useState<ProviderSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAvailability(patientState);
      setSlots(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load availability");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientState]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl mb-1">Pick a time</h2>
        <p className="text-sm text-muted-foreground">
          Available providers in {patientState || "your state"}.
        </p>
      </div>

      {loading && <LoadingSpinner label="Loading available times..." />}
      {error && !loading && (
        <ErrorMessage
          title="Could not load availability"
          message={error}
          onRetry={load}
        />
      )}

      {!loading && !error && slots.length === 0 && (
        <p className="text-sm text-muted-foreground py-6 text-center">
          No openings available right now. Please try again later.
        </p>
      )}

      {!loading && !error && slots.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
          {slots.map((slot, i) => {
            const isSelected =
              selectedSlot?.providerId === slot.providerId &&
              selectedSlot?.startTime === slot.startTime;
            const start = new Date(slot.startTime);
            return (
              <button
                key={`${slot.providerId}-${slot.startTime}-${i}`}
                type="button"
                onClick={() => onSlotSelected(slot)}
                className={cn(
                  "text-left border rounded-lg p-3 transition-all hover:border-primary/60",
                  isSelected
                    ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                    : "border-border bg-card"
                )}
              >
                <p className="font-medium text-sm text-foreground">
                  {slot.providerName}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {start.toLocaleString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}{" "}
                  ({slot.timezone})
                </p>
              </button>
            );
          })}
        </div>
      )}

      {selectedSlot && (
        <AppointmentCard
          providerName={selectedSlot.providerName}
          dateTime={selectedSlot.startTime}
          timezone={selectedSlot.timezone}
          status="scheduled"
        />
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onConfirm}
          disabled={!selectedSlot}
          className="flex-1"
        >
          Confirm time and pay
        </Button>
      </div>
    </div>
  );
};

// ───────── Step C ─────────

const PaymentStep = ({
  amount,
  email,
  phone,
  onBack,
  onSuccess,
}: {
  amount: number;
  email: string;
  phone: string;
  onBack: () => void;
  onSuccess: (paymentIntentId: string) => Promise<void>;
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const init = async () => {
    setLoading(true);
    setError(null);
    try {
      const secret = await createPaymentIntent(amount, { email, phone });
      setClientSecret(secret);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not initialize payment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl mb-1">Payment</h2>
        <p className="text-sm text-muted-foreground">
          Secure checkout powered by Stripe.
        </p>
      </div>

      {loading && <LoadingSpinner label="Preparing secure checkout..." />}
      {error && !loading && (
        <ErrorMessage
          title="Could not initialize payment"
          message={error}
          onRetry={init}
        />
      )}

      {clientSecret && !loading && !error && (
        <Elements
          key={clientSecret}
          stripe={stripePromise}
          options={{ clientSecret, appearance: { theme: "stripe" } }}
        >
          <PaymentForm amountDue={amount} onSuccess={onSuccess} />
        </Elements>
      )}

      <Button variant="ghost" onClick={onBack} className="w-full">
        Back
      </Button>
    </div>
  );
};

export default Checkout;
