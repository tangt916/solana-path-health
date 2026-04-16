import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DURATIONS = ["< 1 year", "1–3 years", "3–5 years", "5+ years"];
const TRIED = ["Dieting", "Exercise", "Supplements", "Prescription meds", "Nothing yet"];
const SOURCES = ["Google", "Instagram", "Facebook", "TikTok", "Friend/Family", "Other"];

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export const Step4Goals = ({ onBack, onNext }: Props) => {
  const { state, updateGoals } = useIntakeForm();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refStatus, setRefStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");

  // Validate referral code (debounced)
  useEffect(() => {
    const code = state.goalsInfo.referralCode.trim();
    if (state.goalsInfo.hearAbout !== "Friend/Family" || !code) {
      setRefStatus("idle");
      return;
    }
    setRefStatus("checking");
    const t = setTimeout(async () => {
      const { data } = await supabase
        .from("referrals")
        .select("id")
        .eq("referral_code", code)
        .maybeSingle();
      setRefStatus(data ? "valid" : "invalid");
    }, 400);
    return () => clearTimeout(t);
  }, [state.goalsInfo.referralCode, state.goalsInfo.hearAbout]);

  const toggleTried = (t: string) => {
    const has = state.goalsInfo.triedBefore.includes(t);
    const next = has
      ? state.goalsInfo.triedBefore.filter((x) => x !== t)
      : [...state.goalsInfo.triedBefore, t];
    updateGoals({ triedBefore: next });
  };

  const handleNext = () => {
    const errs: Record<string, string> = {};
    if (!state.goalsInfo.goalWeight.trim()) errs.goalWeight = "Required";
    if (!state.goalsInfo.strugglingDuration) errs.strugglingDuration = "Required";
    if (!state.goalsInfo.hearAbout) errs.hearAbout = "Required";
    setErrors(errs);
    if (Object.keys(errs).length === 0) onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">Your goals</h2>
        <p className="text-muted-foreground text-sm">Help us understand what success looks like for you.</p>
      </div>

      <div>
        <Label htmlFor="goal">Goal weight (lbs)</Label>
        <Input
          id="goal"
          type="number"
          inputMode="decimal"
          value={state.goalsInfo.goalWeight}
          onChange={(e) => updateGoals({ goalWeight: e.target.value })}
          placeholder="e.g. 180"
        />
        {errors.goalWeight && <p className="text-xs text-destructive mt-1">{errors.goalWeight}</p>}
      </div>

      <div>
        <Label>How long have you been struggling with weight?</Label>
        <Select
          value={state.goalsInfo.strugglingDuration}
          onValueChange={(v) => updateGoals({ strugglingDuration: v })}
        >
          <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent>
            {DURATIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.strugglingDuration && (
          <p className="text-xs text-destructive mt-1">{errors.strugglingDuration}</p>
        )}
      </div>

      <div>
        <Label>What have you tried? (select all that apply)</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {TRIED.map((t) => {
            const selected = state.goalsInfo.triedBefore.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTried(t)}
                className={cn(
                  "px-3 py-1.5 rounded-full border text-sm transition-colors",
                  selected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground hover:border-primary/60"
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label>How did you hear about us?</Label>
        <Select
          value={state.goalsInfo.hearAbout}
          onValueChange={(v) => updateGoals({ hearAbout: v })}
        >
          <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent>
            {SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.hearAbout && <p className="text-xs text-destructive mt-1">{errors.hearAbout}</p>}
      </div>

      {state.goalsInfo.hearAbout === "Friend/Family" && (
        <div>
          <Label htmlFor="refcode">Referral code (optional)</Label>
          <div className="relative mt-1">
            <Input
              id="refcode"
              value={state.goalsInfo.referralCode}
              onChange={(e) => updateGoals({ referralCode: e.target.value.toUpperCase() })}
              placeholder="e.g. FRIEND25"
              className="pr-9"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {refStatus === "checking" && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
              {refStatus === "valid" && <Check className="w-4 h-4 text-success" />}
              {refStatus === "invalid" && <X className="w-4 h-4 text-destructive" />}
            </div>
          </div>
          {refStatus === "invalid" && (
            <p className="text-xs text-destructive mt-1">Code not found</p>
          )}
          {refStatus === "valid" && (
            <p className="text-xs text-success mt-1">Referral code applied</p>
          )}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} className="flex-1">Continue</Button>
      </div>
    </div>
  );
};
