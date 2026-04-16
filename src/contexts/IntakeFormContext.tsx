import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface AboutInfo {
  dob: string; // ISO date
  gender: "MALE" | "FEMALE" | "";
  state: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zip: string;
}

export interface HealthInfo {
  weightLbs: string;
  heightFeet: string;
  heightInches: string;
  hasAllergies: boolean;
  allergiesDetail: string;
  hasMedications: boolean;
  medicationsDetail: string;
  conditions: string[];
}

export interface GoalsInfo {
  goalWeight: string;
  strugglingDuration: string;
  triedBefore: string[];
  hearAbout: string;
  referralCode: string;
}

export interface SelectedPlan {
  months: number;
  monthlyPrice: number;
  totalPrice: number;
  discountPercent: number;
}

export interface IntakeFormState {
  step: number;
  personalInfo: PersonalInfo;
  aboutInfo: AboutInfo;
  healthInfo: HealthInfo;
  goalsInfo: GoalsInfo;
  selectedPlan: SelectedPlan | null;
  promoCode: { code: string; type: "percent" | "amount"; value: number } | null;
  referralCode: string;
}

const STORAGE_KEY = "intakeFormState";

const initialState: IntakeFormState = {
  step: 1,
  personalInfo: { firstName: "", lastName: "", email: "", phone: "" },
  aboutInfo: { dob: "", gender: "", state: "", addressLine1: "", addressLine2: "", city: "", zip: "" },
  healthInfo: {
    weightLbs: "",
    heightFeet: "",
    heightInches: "0",
    hasAllergies: false,
    allergiesDetail: "",
    hasMedications: false,
    medicationsDetail: "",
    conditions: [],
  },
  goalsInfo: { goalWeight: "", strugglingDuration: "", triedBefore: [], hearAbout: "", referralCode: "" },
  selectedPlan: null,
  promoCode: null,
  referralCode: "",
};

interface ContextValue {
  state: IntakeFormState;
  setStep: (step: number) => void;
  updatePersonal: (data: Partial<PersonalInfo>) => void;
  updateAbout: (data: Partial<AboutInfo>) => void;
  updateHealth: (data: Partial<HealthInfo>) => void;
  updateGoals: (data: Partial<GoalsInfo>) => void;
  setPlan: (plan: SelectedPlan | null) => void;
  setPromo: (promo: IntakeFormState["promoCode"]) => void;
  setReferralCode: (code: string) => void;
  resetForm: () => void;
  hasSavedProgress: boolean;
}

const IntakeFormContext = createContext<ContextValue | undefined>(undefined);

export const IntakeFormProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<IntakeFormState>(initialState);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as IntakeFormState;
        setState(parsed);
        if (parsed.step > 1 || parsed.personalInfo.email) {
          setHasSavedProgress(true);
        }
      }
      // Check ?ref= URL param on first mount
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (ref) {
        setState((s) => ({ ...s, referralCode: ref, goalsInfo: { ...s.goalsInfo, referralCode: ref } }));
      }
    } catch (e) {
      console.error("Failed to restore intake form:", e);
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save intake form:", e);
    }
  }, [state, hydrated]);

  const setStep = useCallback((step: number) => setState((s) => ({ ...s, step })), []);
  const updatePersonal = useCallback(
    (data: Partial<PersonalInfo>) => setState((s) => ({ ...s, personalInfo: { ...s.personalInfo, ...data } })),
    []
  );
  const updateAbout = useCallback(
    (data: Partial<AboutInfo>) => setState((s) => ({ ...s, aboutInfo: { ...s.aboutInfo, ...data } })),
    []
  );
  const updateHealth = useCallback(
    (data: Partial<HealthInfo>) => setState((s) => ({ ...s, healthInfo: { ...s.healthInfo, ...data } })),
    []
  );
  const updateGoals = useCallback(
    (data: Partial<GoalsInfo>) => setState((s) => ({ ...s, goalsInfo: { ...s.goalsInfo, ...data } })),
    []
  );
  const setPlan = useCallback((plan: SelectedPlan | null) => setState((s) => ({ ...s, selectedPlan: plan })), []);
  const setPromo = useCallback(
    (promo: IntakeFormState["promoCode"]) => setState((s) => ({ ...s, promoCode: promo })),
    []
  );
  const setReferralCode = useCallback((code: string) => setState((s) => ({ ...s, referralCode: code })), []);

  const resetForm = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setState(initialState);
    setHasSavedProgress(false);
  }, []);

  return (
    <IntakeFormContext.Provider
      value={{
        state,
        setStep,
        updatePersonal,
        updateAbout,
        updateHealth,
        updateGoals,
        setPlan,
        setPromo,
        setReferralCode,
        resetForm,
        hasSavedProgress,
      }}
    >
      {children}
    </IntakeFormContext.Provider>
  );
};

export const useIntakeForm = () => {
  const ctx = useContext(IntakeFormContext);
  if (!ctx) throw new Error("useIntakeForm must be used within IntakeFormProvider");
  return ctx;
};
