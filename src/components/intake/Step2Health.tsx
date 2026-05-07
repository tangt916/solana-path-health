import { useState } from "react";
import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { Button } from "@/components/ui/button";
import { BasicsFields } from "./BasicsFields";
import { MedicalHistoryFields } from "./MedicalHistoryFields";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export const Step2Health = ({ onBack, onNext }: Props) => {
  const { state, updateHealth } = useIntakeForm();
  const h = state.healthInfo;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const e: Record<string, string> = {};
    const w = parseInt(h.weightLbs);
    if (!h.weightLbs || isNaN(w) || w < 50 || w > 800) {
      e.weightLbs = "Please enter a valid weight (50–800 lbs)";
    }
    const gw = parseInt(h.goalWeight);
    if (!h.goalWeight || isNaN(gw) || gw < 50 || gw > 800) {
      e.goalWeight = "Please enter a valid goal weight (50–800 lbs)";
    }
    if (!h.heightFeet) e.heightFeet = "Please select your height";
    if (!h.state) e.state = "Please select your state";
    if (h.hasAllergies && !h.allergiesDetail.trim()) {
      e.allergiesDetail = "Please list your allergies";
    }
    if (h.hasMedications && !h.medicationsDetail.trim()) {
      e.medicationsDetail = "Please list your medications";
    }
    if (h.triedGLP1 && !h.triedGLP1Detail.trim()) {
      e.triedGLP1Detail = "Please tell us which ones";
    }
    if (h.hasInsurance && !h.insuranceProvider.trim()) {
      e.insuranceProvider = "Please enter your insurance provider";
    }
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">Your health</h2>
        <p className="text-muted-foreground text-sm">
          Helps your provider build the right plan for you.
        </p>
      </div>

      <BasicsFields
        state={h.state}
        heightFeet={h.heightFeet}
        heightInches={h.heightInches}
        weightLbs={h.weightLbs}
        goalWeight={h.goalWeight}
        errors={errors}
        update={(patch) => updateHealth(patch)}
      />

      <MedicalHistoryFields h={h} errors={errors} update={updateHealth} />

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} className="flex-1">Continue</Button>
      </div>
    </div>
  );
};
