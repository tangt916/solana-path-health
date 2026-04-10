import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Lock, Shield, CreditCard, AlertCircle } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Header from "@/components/layout/Header";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

import { STRIPE_PUBLISHABLE_KEY } from "@/lib/stripe";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const elementStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1a1a2e",
      fontFamily: "Inter, system-ui, sans-serif",
      "::placeholder": { color: "#94a3b8" },
    },
    invalid: { color: "#ef4444" },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !user) return;

    setLoading(true);
    setError(null);

    try {
      const cardNumber = elements.getElement(CardNumberElement);
      if (!cardNumber) throw new Error("Card element not found");

      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumber,
        billing_details: { email: user.email },
      });

      if (pmError) throw new Error(pmError.message);

      const { data, error: fnError } = await supabase.functions.invoke("create-subscription", {
        body: { paymentMethodId: paymentMethod.id },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-foreground mb-4">Payment details</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Card number</label>
          <div className="rounded-lg border border-border bg-background p-3 min-h-[44px] [&>div]:min-h-[24px] [&_iframe]:min-h-[24px] [&_iframe]:!pointer-events-auto">
            <CardNumberElement options={elementStyle} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Expiry</label>
            <div className="rounded-lg border border-border bg-background p-3 min-h-[44px] [&>div]:min-h-[24px] [&_iframe]:min-h-[24px] [&_iframe]:!pointer-events-auto">
              <CardExpiryElement options={elementStyle} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">CVC</label>
            <div className="rounded-lg border border-border bg-background p-3 min-h-[44px] [&>div]:min-h-[24px] [&_iframe]:min-h-[24px] [&_iframe]:!pointer-events-auto">
              <CardCvcElement options={elementStyle} />
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="mt-6 w-full"
        size="lg"
        disabled={!stripe || loading}
      >
        {loading ? "Processing…" : "Start my program — $179.00/mo"}
      </Button>

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-destructive/10 p-3">
          <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" /> SSL secured
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Shield className="h-3 w-3" /> HIPAA compliant
        </div>
        <span className="text-xs text-muted-foreground">Licensed providers</span>
        <span className="text-xs text-muted-foreground">Cancel anytime</span>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Prescription required. Results vary. Subject to provider approval.
      </p>
    </form>
  );
};

const Checkout = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container max-w-4xl py-10 md:py-16">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Complete your enrollment</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start your medically guided weight loss program today.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          {/* Order summary */}
          <div className="md:col-span-3">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Order summary</h2>
                <div className="space-y-4">
                  <div className="rounded-lg border border-primary/20 bg-secondary/50 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">GLP-1 Weight Loss Program</h3>
                        <p className="text-sm text-muted-foreground mt-1">Monthly subscription</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-foreground">$179</span>
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {[
                      "Medical evaluation by licensed provider",
                      "GLP-1 prescription (if clinically appropriate)",
                      "Free home delivery",
                      "Ongoing care & dosage adjustments",
                      "Direct messaging with care team",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Total today</span>
                      <span className="text-xl font-bold text-foreground">$179.00</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Billed monthly · Cancel anytime · Free shipping
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment */}
          <div className="md:col-span-2">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
