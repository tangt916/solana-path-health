import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, AlertTriangle, XCircle, Info } from "lucide-react";
import Header from "@/components/layout/Header";

const ELIGIBLE_STATES: Record<string, string> = {
  AZ: "Arizona", CA: "California", CO: "Colorado", CT: "Connecticut",
  FL: "Florida", GA: "Georgia", IL: "Illinois", IN: "Indiana",
  KS: "Kansas", KY: "Kentucky", MA: "Massachusetts", MD: "Maryland",
  MI: "Michigan", MN: "Minnesota", MO: "Missouri", NC: "North Carolina",
  NJ: "New Jersey", NV: "Nevada", NY: "New York", OH: "Ohio",
  OK: "Oklahoma", PA: "Pennsylvania", SC: "South Carolina", TN: "Tennessee",
  TX: "Texas", VA: "Virginia", WA: "Washington", WI: "Wisconsin",
};

const TOTAL_STEPS = 6;

const Quiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [data, setData] = useState({
    age: "", state: "", heightFeet: "", heightInches: "", weight: "", goal: "",
    triedDiet: "", medConditions: "", medConditionsDetail: "",
    medications: "", medicationsDetail: "", pregnant: "",
  });

  const update = (field: string, value: string) => setData(prev => ({ ...prev, [field]: value }));
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  // Derived validations
  const ageNum = data.age ? parseInt(data.age) : null;
  const isUnder18 = ageNum !== null && ageNum < 18;
  const isOver80 = ageNum !== null && ageNum > 80;
  const isStateIneligible = data.state !== "" && !(data.state in ELIGIBLE_STATES);

  const bmi = useMemo(() => {
    const ft = parseInt(data.heightFeet);
    const inches = parseInt(data.heightInches || "0");
    const w = parseFloat(data.weight);
    if (!ft || !w || ft <= 0 || w <= 0) return null;
    const totalInches = ft * 12 + (inches || 0);
    return (w / (totalInches * totalInches)) * 703;
  }, [data.heightFeet, data.heightInches, data.weight]);

  const isLowBmi = bmi !== null && bmi < 27;
  const isPregnant = data.pregnant === "yes";

  const canNext = () => {
    switch (step) {
      case 0: return data.age && !isUnder18 && data.state && !isStateIneligible;
      case 1: return data.heightFeet && data.weight;
      case 2: return !!data.goal;
      case 3: return !!data.triedDiet;
      case 4: return data.medConditions && data.pregnant;
      case 5: return !!data.medications;
      default: return false;
    }
  };

  const handleNext = () => {
    if (!canNext()) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else {
      // Navigate with quiz data for submission after auth
      const calcBmi = bmi ? parseFloat(bmi.toFixed(1)) : null;
      navigate("/intake-transition", { state: { quizData: { ...data, bmi: calcBmi } } });
    }
  };

  const handleBack = () => {
    setShowErrors(false);
    setStep(Math.max(0, step - 1));
  };

  const FieldError = ({ show, message }: { show: boolean; message: string }) =>
    show ? <p className="text-sm text-destructive flex items-center gap-1.5 mt-1"><XCircle className="h-3.5 w-3.5 shrink-0" />{message}</p> : null;

  const Warning = ({ message, variant = "amber" }: { message: string; variant?: "amber" | "red" }) => (
    <div className={`flex items-start gap-2.5 rounded-lg p-3 text-sm ${variant === "red" ? "bg-destructive/10 text-destructive border border-destructive/20" : "bg-amber-50 text-amber-800 border border-amber-200"}`}>
      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container max-w-lg py-10 md:py-16">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Step {step + 1} of {TOTAL_STEPS}</span>
            <span className="text-xs font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
          {/* Step 0: Age & State */}
          {step === 0 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground">Let's start with the basics</h2>
              <div className="space-y-2">
                <Label>Age</Label>
                <Input type="number" min={1} max={120} placeholder="Enter your age" value={data.age} onChange={e => update("age", e.target.value)} />
                <FieldError show={showErrors && !data.age} message="Please enter your age" />
                {isUnder18 && <Warning variant="red" message="Solana Health is only available to adults 18 years of age and older." />}
                {isOver80 && !isUnder18 && <Warning message="Please consult your primary care physician before starting a GLP-1 program." />}
              </div>
              <div className="space-y-2">
                <Label>State of residence</Label>
                <Select value={data.state} onValueChange={v => update("state", v)}>
                  <SelectTrigger><SelectValue placeholder="Select your state" /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(ELIGIBLE_STATES).sort((a, b) => a[1].localeCompare(b[1])).map(([code, name]) => (
                      <SelectItem key={code} value={code}>{name}</SelectItem>
                    ))}
                    <SelectItem value="OTHER">Other / Not listed</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError show={showErrors && !data.state} message="Please select your state" />
                {isStateIneligible && (
                  <div className="space-y-3">
                    <Warning variant="red" message="We're not yet available in your state. Leave your email and we'll notify you when we launch there." />
                    <Input type="email" placeholder="Enter your email" value={waitlistEmail} onChange={e => setWaitlistEmail(e.target.value)} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 1: Height & Weight + BMI */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground">Height & weight</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Height (feet)</Label>
                  <Input type="number" min={1} max={8} placeholder="5" value={data.heightFeet} onChange={e => update("heightFeet", e.target.value)} />
                  <FieldError show={showErrors && !data.heightFeet} message="Required" />
                </div>
                <div className="space-y-2">
                  <Label>Height (inches)</Label>
                  <Input type="number" min={0} max={11} placeholder="8" value={data.heightInches} onChange={e => update("heightInches", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Current weight (lbs)</Label>
                <Input type="number" min={1} placeholder="Enter your weight" value={data.weight} onChange={e => update("weight", e.target.value)} />
                <FieldError show={showErrors && !data.weight} message="Please enter your weight" />
                {bmi !== null && (
                  <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-primary" /> Your BMI: {bmi.toFixed(1)}
                  </p>
                )}
                {isLowBmi && (
                  <Warning message="GLP-1 medications are typically recommended for BMIs of 27 or above. A licensed provider will individually review your case and determine eligibility." />
                )}
              </div>
            </div>
          )}

          {/* Step 2: Goal */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground">What's your weight loss goal?</h2>
              <RadioGroup value={data.goal} onValueChange={v => update("goal", v)} className="space-y-3">
                {["Lose 10-20 lbs", "Lose 20-40 lbs", "Lose 40-60 lbs", "Lose 60+ lbs"].map(opt => (
                  <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary">
                    <RadioGroupItem value={opt} />
                    <span className="text-sm font-medium text-foreground">{opt}</span>
                  </label>
                ))}
              </RadioGroup>
              <FieldError show={showErrors && !data.goal} message="Please select a goal" />
            </div>
          )}

          {/* Step 3: Prior programs */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground">Have you tried dieting or exercise programs before?</h2>
              <RadioGroup value={data.triedDiet} onValueChange={v => update("triedDiet", v)} className="space-y-3">
                {["Yes, multiple times", "Yes, once or twice", "No, this is my first time"].map(opt => (
                  <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary">
                    <RadioGroupItem value={opt} />
                    <span className="text-sm font-medium text-foreground">{opt}</span>
                  </label>
                ))}
              </RadioGroup>
              <FieldError show={showErrors && !data.triedDiet} message="Please select an option" />
            </div>
          )}

          {/* Step 4: Health screening */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground">Health screening</h2>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Do you have any diagnosed medical conditions?</Label>
                  <RadioGroup value={data.medConditions} onValueChange={v => update("medConditions", v)} className="flex gap-4">
                    {["yes", "no"].map(v => (
                      <label key={v} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary">
                        <RadioGroupItem value={v} /><span className="text-sm capitalize">{v}</span>
                      </label>
                    ))}
                  </RadioGroup>
                  <FieldError show={showErrors && !data.medConditions} message="Please select an option" />
                  {data.medConditions === "yes" && (
                    <div className="mt-3">
                      <Label className="text-sm text-muted-foreground">Please describe your conditions</Label>
                      <Input placeholder="e.g., Type 2 diabetes, hypertension" value={data.medConditionsDetail} onChange={e => update("medConditionsDetail", e.target.value)} className="mt-1" />
                    </div>
                  )}
                </div>
                <div>
                  <Label className="mb-2 block">Are you currently pregnant or planning to become pregnant?</Label>
                  <RadioGroup value={data.pregnant} onValueChange={v => update("pregnant", v)} className="flex gap-4">
                    {["yes", "no"].map(v => (
                      <label key={v} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary">
                        <RadioGroupItem value={v} /><span className="text-sm capitalize">{v}</span>
                      </label>
                    ))}
                  </RadioGroup>
                  <FieldError show={showErrors && !data.pregnant} message="Please select an option" />
                  {isPregnant && (
                    <div className="mt-3">
                      <Warning message="GLP-1 medications are not recommended during pregnancy or while planning to become pregnant. A licensed provider will review your specific health situation." />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Medications */}
          {step === 5 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground">Are you currently taking any medications?</h2>
              <RadioGroup value={data.medications} onValueChange={v => update("medications", v)} className="space-y-3">
                {["Yes", "No"].map(opt => (
                  <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary">
                    <RadioGroupItem value={opt} />
                    <span className="text-sm font-medium text-foreground">{opt}</span>
                  </label>
                ))}
              </RadioGroup>
              <FieldError show={showErrors && !data.medications} message="Please select an option" />
              {data.medications === "Yes" && (
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Please list your current medications</Label>
                  <Input placeholder="e.g., Metformin, Lisinopril" value={data.medicationsDetail} onChange={e => update("medicationsDetail", e.target.value)} />
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleBack} disabled={step === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button size="sm" onClick={handleNext} disabled={step === 0 && (isUnder18 || isStateIneligible)}>
              {step === TOTAL_STEPS - 1 ? "Submit" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground max-w-md mx-auto">
          Your information is kept private and secure. All treatments are subject to licensed provider review and approval. This questionnaire does not constitute medical advice.
        </p>
      </div>
    </div>
  );
};

export default Quiz;
