import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Lock, Shield, CreditCard } from "lucide-react";
import Header from "@/components/layout/Header";

const Checkout = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container max-w-4xl py-10 md:py-16">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Complete your enrollment</h1>
          <p className="mt-2 text-sm text-muted-foreground">Start your medically guided weight loss program today.</p>
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
                    <p className="text-xs text-muted-foreground mt-1">Billed monthly · Cancel anytime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment */}
          <div className="md:col-span-2">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Payment</h2>
                <div className="rounded-lg border border-dashed border-border bg-muted/50 p-8 text-center">
                  <CreditCard className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">Stripe checkout will be integrated here</p>
                </div>

                <Button className="mt-4 w-full" size="lg" onClick={() => window.location.href = "/dashboard"}>
                  Start my program
                </Button>

                <div className="mt-4 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" /> Secure checkout
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" /> HIPAA compliant
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
