import { useIntakeForm, SelectedPlan } from "@/contexts/IntakeFormContext";
import { PricingCard } from "@/components/ui/shared/PricingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface PlanDef {
  id: number; // months
  title: string;
  monthlyPrice: number;
  totalPrice: number;
  discountPercent: number;
  savings: number;
  badge?: string;
}

const BASE_MONTHLY = 179;
const PLANS: PlanDef[] = [1, 3, 6, 9, 12].map((m) => {
  const discount = m === 1 ? 0 : m === 3 ? 10 : m === 6 ? 20 : m === 9 ? 25 : 30;
  const monthly = Math.round(BASE_MONTHLY * (1 - discount / 100));
  const total = monthly * m;
  const savings = BASE_MONTHLY * m - total;
  return {
    id: m,
    title: m === 1 ? "Monthly" : `${m} months`,
    monthlyPrice: monthly,
    totalPrice: total,
    discountPercent: discount,
    savings,
    badge: m === 6 ? "Most Popular" : undefined,
  };
});

interface Props {
  onBack: () => void;
}

const formatPrice = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export const Step5Plan = ({ onBack }: Props) => {
  const { state, setPlan, setPromo } = useIntakeForm();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Pre-apply WELCOME10 from sessionStorage if present and no promo set
  useEffect(() => {
    const popupCode = sessionStorage.getItem("popupPromoCode");
    if (!state.promoCode && popupCode === "WELCOME10") {
      validateAndApply("WELCOME10", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateAndApply = async (code: string, silent = false) => {
    if (!silent) {
      setPromoLoading(true);
      setPromoError(null);
    }
    try {
      const { data, error } = await supabase
        .from("promo_codes")
        .select("code, discount_type, discount_value, is_active, expires_at")
        .eq("code", code.toUpperCase())
        .eq("is_active", true)
        .maybeSingle();
      if (error || !data || !data.code || !data.discount_type || data.discount_value == null) {
        if (!silent) setPromoError("Invalid or expired code");
        return;
      }
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        if (!silent) setPromoError("Code expired");
        return;
      }
      setPromo({
        code: data.code,
        type: data.discount_type === "percent" ? "percent" : "amount",
        value: Number(data.discount_value),
      });
      setPromoInput("");
    } catch {
      if (!silent) setPromoError("Could not validate code");
    } finally {
      if (!silent) setPromoLoading(false);
    }
  };

  const computeFinalTotal = (plan: PlanDef) => {
    if (!state.promoCode) return { total: plan.totalPrice, discount: 0 };
    const discount =
      state.promoCode.type === "percent"
        ? Math.round((plan.totalPrice * state.promoCode.value) / 100)
        : Math.min(state.promoCode.value, plan.totalPrice);
    return { total: plan.totalPrice - discount, discount };
  };

  const selectedPlanDef = PLANS.find((p) => p.id === state.selectedPlan?.months);

  const handleContinue = () => {
    if (!selectedPlanDef) return;
    const finalPlan: SelectedPlan = {
      months: selectedPlanDef.id,
      monthlyPrice: selectedPlanDef.monthlyPrice,
      totalPrice: computeFinalTotal(selectedPlanDef).total,
      discountPercent: selectedPlanDef.discountPercent,
    };
    setPlan(finalPlan);
    navigate("/checkout");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">Choose your plan</h2>
        <p className="text-muted-foreground text-sm">
          Save more when you commit to a longer plan. Cancel anytime.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLANS.map((p) => {
          const { total, discount } = computeFinalTotal(p);
          const showDiscount = discount > 0;
          return (
            <PricingCard
              key={p.id}
              title={p.title}
              monthlyPrice={p.monthlyPrice}
              months={p.id}
              discountPercent={p.discountPercent || undefined}
              totalPrice={total}
              originalTotal={showDiscount ? p.totalPrice : undefined}
              savings={p.savings + discount}
              isSelected={state.selectedPlan?.months === p.id}
              onSelect={() =>
                setPlan({
                  months: p.id,
                  monthlyPrice: p.monthlyPrice,
                  totalPrice: total,
                  discountPercent: p.discountPercent,
                })
              }
              badge={p.badge}
            />
          );
        })}
      </div>

      <div className="bg-muted/40 border border-border rounded-lg p-4 space-y-3">
        <p className="text-sm font-medium">Have a promo code?</p>
        {state.promoCode ? (
          <div className="flex items-center justify-between gap-3 bg-success/10 border border-success/30 rounded-md px-3 py-2">
            <div className="flex items-center gap-2 text-success text-sm font-medium">
              <Check className="w-4 h-4" />
              <span>
                {state.promoCode.code} —{" "}
                {state.promoCode.type === "percent"
                  ? `${state.promoCode.value}% OFF`
                  : `${formatPrice(state.promoCode.value)} OFF`}{" "}
                applied!
              </span>
            </div>
            <button
              type="button"
              onClick={() => setPromo(null)}
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
        ) : (
          <div>
            <div className="flex gap-2">
              <Input
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  setPromoError(null);
                }}
                placeholder="Promo code"
                className="flex-1"
                disabled={promoLoading}
              />
              <Button
                variant="outline"
                onClick={() => promoInput.trim() && validateAndApply(promoInput.trim())}
                disabled={promoLoading || !promoInput.trim()}
              >
                {promoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
              </Button>
            </div>
            {promoError && <p className="text-sm text-destructive mt-1">{promoError}</p>}
          </div>
        )}
      </div>

      <div className={cn("flex gap-3 pt-2")}>
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleContinue} className="flex-1" disabled={!state.selectedPlan}>
          Continue to payment →
        </Button>
      </div>
    </div>
  );
};
