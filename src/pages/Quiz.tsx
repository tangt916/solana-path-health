import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia",
  "Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland",
  "Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
  "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

const TOTAL_STEPS = 6;

const Quiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    age: "", state: "", heightFeet: "", heightInches: "", weight: "", goal: "",
    triedDiet: "", medConditions: "", medications: "", pregnant: "",
  });

  const update = (field: string, value: string) => setData(prev => ({ ...prev, [field]: value }));
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const canNext = () => {
    switch (step) {
      case 0: return data.age && data.state;
      case 1: return data.heightFeet && data.weight;
      case 2: return data.goal;
      case 3: return data.triedDiet;
      case 4: return data.medConditions && data.pregnant;
      case 5: return data.medications;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else navigate("/intake-transition");
  };

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
          {step === 0 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground">Let's start with the basics</h2>
              <div className="space-y-2">
                <Label>Age</Label>
                <Input type="number" placeholder="Enter your age" value={data.age} onChange={e => update("age", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>State of residence</Label>
                <Select value={data.state} onValueChange={v => update("state", v)}>
                  <SelectTrigger><SelectValue placeholder="Select your state" /></SelectTrigger>
                  <SelectContent>
                    {US_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground">Height & weight</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Height (feet)</Label>
                  <Input type="number" placeholder="5" value={data.heightFeet} onChange={e => update("heightFeet", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Height (inches)</Label>
                  <Input type="number" placeholder="8" value={data.heightInches} onChange={e => update("heightInches", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Current weight (lbs)</Label>
                <Input type="number" placeholder="Enter your weight" value={data.weight} onChange={e => update("weight", e.target.value)} />
              </div>
            </div>
          )}

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
            </div>
          )}

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
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground">Health screening</h2>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Do you have any diagnosed medical conditions?</Label>
                  <RadioGroup value={data.medConditions} onValueChange={v => update("medConditions", v)} className="flex gap-4">
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary">
                      <RadioGroupItem value="yes" /><span className="text-sm">Yes</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary">
                      <RadioGroupItem value="no" /><span className="text-sm">No</span>
                    </label>
                  </RadioGroup>
                </div>
                <div>
                  <Label className="mb-2 block">Are you currently pregnant or planning to become pregnant?</Label>
                  <RadioGroup value={data.pregnant} onValueChange={v => update("pregnant", v)} className="flex gap-4">
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary">
                      <RadioGroupItem value="yes" /><span className="text-sm">Yes</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary">
                      <RadioGroupItem value="no" /><span className="text-sm">No</span>
                    </label>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

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
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button size="sm" onClick={handleNext} disabled={!canNext()}>
              {step === TOTAL_STEPS - 1 ? "Submit" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Your information is kept private and secure. It will only be reviewed by a licensed medical provider.
        </p>
      </div>
    </div>
  );
};

export default Quiz;
