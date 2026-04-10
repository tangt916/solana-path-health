import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard, Calendar, RefreshCw, Pause, XCircle, Play, AlertCircle, MapPin,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements, CardNumberElement, CardExpiryElement, CardCvcElement,
  useStripe, useElements,
} from "@stripe/react-stripe-js";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

import { STRIPE_PUBLISHABLE_KEY } from "@/lib/stripe";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const elementStyle = {
  style: {
    base: { fontSize: "16px", color: "#1a1a2e", fontFamily: "Inter, sans-serif", "::placeholder": { color: "#94a3b8" } },
    invalid: { color: "#ef4444" },
  },
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  paused: "bg-amber-100 text-amber-800",
  cancelled: "bg-red-100 text-red-800",
  past_due: "bg-red-100 text-red-800",
};

const UpdatePaymentForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    try {
      const card = elements.getElement(CardNumberElement);
      if (!card) throw new Error("Card not found");
      const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card });
      if (error) throw new Error(error.message);

      const { data, error: fnErr } = await supabase.functions.invoke("manage-subscription", {
        body: { action: "update_payment", paymentMethodId: paymentMethod.id },
      });
      if (fnErr || data?.error) throw new Error(data?.error || fnErr?.message);
      toast({ title: "Payment method updated" });
      onSuccess();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Card number</Label>
        <div className="rounded-lg border border-border bg-background p-3 mt-1"><CardNumberElement options={elementStyle} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Expiry</Label><div className="rounded-lg border border-border bg-background p-3 mt-1"><CardExpiryElement options={elementStyle} /></div></div>
        <div><Label>CVC</Label><div className="rounded-lg border border-border bg-background p-3 mt-1"><CardCvcElement options={elementStyle} /></div></div>
      </div>
      <Button onClick={handleUpdate} disabled={loading || !stripe} className="w-full">
        {loading ? "Updating…" : "Update payment method"}
      </Button>
    </div>
  );
};

const Subscription = () => {
  const { user } = useAuth();
  const [sub, setSub] = useState<Tables<"subscriptions"> | null>(null);
  const [customer, setCustomer] = useState<Tables<"customers"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [address, setAddress] = useState({ address_line1: "", address_line2: "", city: "", state: "", zip: "" });

  const fetchData = async () => {
    if (!user) return;
    const [{ data: subData }, { data: custData }] = await Promise.all([
      supabase.from("subscriptions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).single(),
      supabase.from("customers").select("*").eq("user_id", user.id).limit(1).single(),
    ]);
    setSub(subData);
    setCustomer(custData);
    if (custData) setAddress({
      address_line1: custData.address_line1 || "",
      address_line2: custData.address_line2 || "",
      city: custData.city || "",
      state: custData.state || "",
      zip: custData.zip || "",
    });
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [user]);

  const handleAction = async (action: string) => {
    setActionLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("manage-subscription", {
        body: { action },
      });
      if (error || data?.error) throw new Error(data?.error || error?.message);
      toast({ title: action === "pause" ? "Subscription paused" : action === "resume" ? "Subscription resumed" : "Subscription cancelled" });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setActionLoading(false);
      setShowPauseDialog(false);
      setShowCancelDialog(false);
    }
  };

  const handleAddressSave = async () => {
    if (!user) return;
    setActionLoading(true);
    try {
      const { error } = customer
        ? await supabase.from("customers").update(address).eq("user_id", user.id)
        : await supabase.from("customers").insert({ ...address, user_id: user.id, email: user.email });
      if (error) throw error;
      toast({ title: "Address updated", description: "Changes apply to your next shipment." });
      setShowAddressDialog(false);
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-muted/30"><Header /><div className="container max-w-3xl py-16 text-center text-muted-foreground">Loading…</div><Footer /></div>;

  if (!sub) return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container max-w-3xl py-16 text-center">
        <p className="text-muted-foreground">No active subscription found.</p>
      </div>
      <Footer />
    </div>
  );

  const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—";

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container max-w-3xl py-10 md:py-16">
        <h1 className="text-2xl font-bold text-foreground mb-8">Subscription & Billing</h1>

        <Card className="shadow-card mb-6">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">{sub.plan_name}</CardTitle>
            <Badge className={statusColors[sub.status] || ""}>{sub.status.replace("_", " ")}</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 mb-1"><CreditCard className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground">Monthly cost</span></div>
                <p className="text-lg font-bold text-foreground">${(sub.amount_cents / 100).toFixed(2)}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 mb-1"><Calendar className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground">Next billing date</span></div>
                <p className="text-lg font-bold text-foreground">{formatDate(sub.current_period_end)}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 mb-1"><RefreshCw className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground">Next refill</span></div>
                <p className="text-lg font-bold text-foreground">{formatDate(sub.next_refill_date)}</p>
              </div>
            </div>

            {sub.status === "cancelled" && sub.current_period_end && (
              <div className="mt-4 rounded-lg bg-destructive/10 p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">
                  Your subscription has been cancelled. You'll continue to receive your medication through {formatDate(sub.current_period_end)}.
                </p>
              </div>
            )}

            {sub.status === "paused" && (
              <div className="mt-4 rounded-lg bg-amber-50 p-3 flex items-start gap-2">
                <Pause className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">Your subscription is paused. Resume anytime.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Manage */}
        <Card className="shadow-card mb-6">
          <CardHeader><CardTitle className="text-base">Manage subscription</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {sub.status === "paused" && (
              <Button size="sm" onClick={() => handleAction("resume")} disabled={actionLoading}>
                <Play className="mr-2 h-4 w-4" /> Resume subscription
              </Button>
            )}
            {sub.status === "active" && (
              <>
                <Button variant="outline" size="sm" onClick={() => setShowPauseDialog(true)}>
                  <Pause className="mr-2 h-4 w-4" /> Pause subscription
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => setShowCancelDialog(true)}>
                  <XCircle className="mr-2 h-4 w-4" /> Cancel subscription
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" onClick={() => setShowPaymentDialog(true)}>
              <CreditCard className="mr-2 h-4 w-4" /> Update payment method
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowAddressDialog(true)}>
              <MapPin className="mr-2 h-4 w-4" /> Update shipping address
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />

      {/* Pause confirmation */}
      <AlertDialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Pause subscription?</AlertDialogTitle>
            <AlertDialogDescription>Pausing will stop your next shipment and billing. You can resume anytime.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Never mind</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAction("pause")} disabled={actionLoading}>
              {actionLoading ? "Pausing…" : "Pause subscription"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel retention */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Before you go…</AlertDialogTitle>
            <AlertDialogDescription>
              Are you experiencing side effects? We can adjust your dosage or pause instead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Adjust my plan</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleAction("cancel")}
              disabled={actionLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {actionLoading ? "Cancelling…" : "Cancel anyway"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Update payment */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Update payment method</DialogTitle><DialogDescription>Enter your new card details.</DialogDescription></DialogHeader>
          <Elements stripe={stripePromise}>
            <UpdatePaymentForm onSuccess={() => setShowPaymentDialog(false)} />
          </Elements>
        </DialogContent>
      </Dialog>

      {/* Update address */}
      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Update shipping address</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Address line 1</Label><Input value={address.address_line1} onChange={e => setAddress(p => ({ ...p, address_line1: e.target.value }))} /></div>
            <div><Label>Address line 2</Label><Input value={address.address_line2} onChange={e => setAddress(p => ({ ...p, address_line2: e.target.value }))} /></div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>City</Label><Input value={address.city} onChange={e => setAddress(p => ({ ...p, city: e.target.value }))} /></div>
              <div><Label>State</Label><Input value={address.state} onChange={e => setAddress(p => ({ ...p, state: e.target.value }))} maxLength={2} /></div>
              <div><Label>ZIP</Label><Input value={address.zip} onChange={e => setAddress(p => ({ ...p, zip: e.target.value }))} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddressSave} disabled={actionLoading}>
              {actionLoading ? "Saving…" : "Save address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Subscription;
