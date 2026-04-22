import { useEffect, useState } from "react";
import { useIntakeForm, type StrugglingDuration, type ActivityLevel } from "@/contexts/IntakeFormContext";
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
import { Loader2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const DURATIONS: StrugglingDuration[] = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5+ years",
];

const TRIED = [
  "Dieting",
  "Exercise",
  "Weight loss supplements",
  "Prescription medication",
  "Nothing yet",
];

const ACTIVITY: ActivityLevel[] = [
  "Not active",
  "Lightly active (1-2x/week)",
  "Moderately active (3-4x/week)",
  "Very active (5+/week)",
];

const SOURCES = [
  "Google",
  "Instagram",
  "Facebook",
  "TikTok",
  "Friend/Family referral",
  "Other",
];

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export const Step3Goals = ({ onBack, onNext }: Props) => {
  const { state, updateGoals } = useIntakeForm();
  const g = state.goalsInfo;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refStatus, setRefStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");

  // Pre-fill referral code from sessionStorage if URL had ?ref=
  useEffect(() => {
    if (g.hearAbout === "Friend/Family referral" && !g.referralCode) {
      const stored = sessionStorage.getItem("referralCode");
      if (stored) updateGoals({ referralCode: stored });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [g.hearAbout]);

  // Debounced referral validation
  useEffect(() => {
    if (g.hearAbout !== "Friend/Family referral" || !g.referralCode.trim()) {
      setRefStatus("idle");
      return;
    }
    setRefStatus("checking");
    const t = setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from("referrals")
          .select("id")
          .eq("referral_code", g.referralCode.trim())
          .maybeSingle();
        if (error) throw error;
        setRefStatus(data ? "valid" : "invalid");
      } catch {
        setRefStatus("invalid");
      }
    }, 400);
    return () => clearTimeout(t);
  }, [g.referralCode, g.hearAbout]);

  const toggleTried = (t: string) => {
    const exists = g.triedBefore.includes(t);
    if (t === "Nothing yet") {
      updateGoals({ triedBefore: exists ? [] : [t] });
      return;
    }
    const without = g.triedBefore.filter((x) => x !== "Nothing yet");
    updateGoals({
      triedBefore: without.includes(t)
        ? without.filter((x) => x !== t)
        : [...without, t],
    });
  };

  const handleNext = () => {
    const e: Record<string, string> = {};
    const gw = parseInt(g.goalWeight);
    if (!g.goalWeight || isNaN(gw) || gw < 50 || gw > 800) {
      e.goalWeight = "Please enter a valid goal weight (50–800 lbs)";
    }
    if (!g.strugglingDuration) e.strugglingDuration = "Please select an option";
    if (!g.activityLevel) e.activityLevel = "Please select an option";
    if (!g.hearAbout) e.hearAbout = "Please select an option";
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">Your goals & lifestyle</h2>
        <p className="text-muted-foreground text-sm">
          Last few questions before we book your visit.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="goalWeight">Goal weight (lbs)</Label>
        <Input
          id="goalWeight"
          type="number"
          inputMode="numeric"
          value={g.goalWeight}
          onChange={(e) => updateGoals({ goalWeight: e.target.value })}
          aria-invalid={!!errors.goalWeight}
          placeholder="e.g. 175"
        />
        {errors.goalWeight && (
          <p className="text-xs text-destructive mt-1">{errors.goalWeight}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="duration">How long have you been struggling with weight?</Label>
        <Select
          value={g.strugglingDuration || undefined}
          onValueChange={(v) => updateGoals({ strugglingDuration: v as StrugglingDuration })}
        >
          <SelectTrigger id="duration" aria-invalid={!!errors.strugglingDuration}>
            <SelectValue placeholder="Select an answer" />
          </SelectTrigger>
          <SelectContent>
            {DURATIONS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.strugglingDuration && (
          <p className="text-xs text-destructive mt-1">{errors.strugglingDuration}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>What have you tried before?</Label>
        <div className="flex flex-wrap gap-2">
          {TRIED.map((t) => {
            const sel = g.triedBefore.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTried(t)}
                aria-pressed={sel}
                className={cn(
                  "px-4 py-2.5 rounded-xl border text-sm transition-all duration-200",
                  sel
                    ? "bg-primary text-primary-foreground border-primary shadow-sm font-medium"
                    : "bg-white border-border/60 text-foreground/70 hover:border-primary/40 hover:text-foreground",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="activity">How active are you currently?</Label>
        <Select
          value={g.activityLevel || undefined}
          onValueChange={(v) => updateGoals({ activityLevel: v as ActivityLevel })}
        >
          <SelectTrigger id="activity" aria-invalid={!!errors.activityLevel}>
            <SelectValue placeholder="Select an answer" />
          </SelectTrigger>
          <SelectContent>
            {ACTIVITY.map((a) => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.activityLevel && (
          <p className="text-xs text-destructive mt-1">{errors.activityLevel}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="hearAbout">How did you hear about us?</Label>
        <Select
          value={g.hearAbout || undefined}
          onValueChange={(v) => updateGoals({ hearAbout: v })}
        >
          <SelectTrigger id="hearAbout" aria-invalid={!!errors.hearAbout}>
            <SelectValue placeholder="Select an answer" />
          </SelectTrigger>
          <SelectContent>
            {SOURCES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.hearAbout && (
          <p className="text-xs text-destructive mt-1">{errors.hearAbout}</p>
        )}
      </div>

      {g.hearAbout === "Friend/Family referral" && (
        <div className="space-y-1.5">
          <Label htmlFor="ref">Referral code (optional)</Label>
          <div className="relative">
            <Input
              id="ref"
              value={g.referralCode}
              onChange={(e) => updateGoals({ referralCode: e.target.value })}
              placeholder="Enter referral code"
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {refStatus === "checking" && (
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              )}
              {refStatus === "valid" && (
                <Check className="w-4 h-4 text-success" />
              )}
              {refStatus === "invalid" && (
                <X className="w-4 h-4 text-destructive" />
              )}
            </div>
          </div>
          {refStatus === "valid" && (
            <p className="text-xs text-success mt-1">Valid code applied!</p>
          )}
          {refStatus === "invalid" && (
            <p className="text-xs text-muted-foreground mt-1">
              Code not recognized — that's okay, you can continue.
            </p>
          )}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
};
