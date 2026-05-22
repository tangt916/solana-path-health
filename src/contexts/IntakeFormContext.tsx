import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import type { TimeSlot } from "@/lib/mock-calendar";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
}

export interface HealthInfo {
  weightLbs: string;
  heightFeet: string;
  heightInches: string;
  goalWeight: string;
  hasAllergies: boolean;
  allergiesDetail: string;
  hasMedications: boolean;
  medicationsDetail: string;
  conditions: string[];
  triedGLP1: boolean;
  triedGLP1Detail: string;
  isPregnantOrPlanning: boolean;
  hasInsurance: boolean;
  insuranceProvider: string;
  state: string;
}

export type StrugglingDuration =
  | "Less than 1 year"
  | "1–3 years"
  | "3–5 years"
  | "5+ years"
  | "";

export type ActivityLevel =
  | "Not active"
  | "Lightly active (1-2x/week)"
  | "Moderately active (3-4x/week)"
  | "Very active (5+/week)"
  | "";

export interface GoalsInfo {
  goalWeight: string;
  strugglingDuration: StrugglingDuration;
  triedBefore: string[];
  activityLevel: ActivityLevel;
  hearAbout: string;
  referralCode: string;
}

/**
 * Segmentation captured to power retargeting + messaging tests.
 * None of this is medically required — it's marketing/UX data.
 */
export interface SegmentationInfo {
  ageRange: string;     // "18-29" | "30-39" | "40-49" | "50-59" | "60+"
  gender: string;       // "Female" | "Male" | "Non-binary" | "Prefer not to say"
  primaryMotivation: string; // "Confidence" | "Energy" | "Longevity" | "Medical concern" | "How I look" | "How I feel"
  urgency: string;      // "ASAP" | "Within a month" | "Just exploring"
  budgetComfort: string; // "Under $100/mo" | "$100-200/mo" | "$200+/mo" | "Not sure yet"
}

export type AppointmentType = "immediate" | "scheduled";

export interface AppointmentSelection {
  type: AppointmentType;
  slot?: TimeSlot;
  providerName: string;
  displayWhen: string;
}

export interface IntakeFormState {
  step: number; // 1..5
  problems: string[]; // slugs from PROBLEM_OPTIONS
  segmentation: SegmentationInfo;
  personalInfo: PersonalInfo;
  healthInfo: HealthInfo;
  goalsInfo: GoalsInfo;
  appointment: AppointmentSelection | null;
  referralCode: string;
}

const STORAGE_KEY = "intakeFormState";

const initialState: IntakeFormState = {
  step: 1,
  problems: [],
  segmentation: {
    ageRange: "",
    gender: "",
    primaryMotivation: "",
    urgency: "",
    budgetComfort: "",
  },
  personalInfo: { firstName: "", lastName: "", email: "", phone: "", state: "" },
  healthInfo: {
    weightLbs: "",
    heightFeet: "",
    heightInches: "0",
    goalWeight: "",
    hasAllergies: false,
    allergiesDetail: "",
    hasMedications: false,
    medicationsDetail: "",
    conditions: [],
    triedGLP1: false,
    triedGLP1Detail: "",
    isPregnantOrPlanning: false,
    hasInsurance: false,
    insuranceProvider: "",
    state: "",
  },
  goalsInfo: {
    goalWeight: "",
    strugglingDuration: "",
    triedBefore: [],
    activityLevel: "",
    hearAbout: "",
    referralCode: "",
  },
  appointment: null,
  referralCode: "",
};

interface ContextValue {
  state: IntakeFormState;
  setStep: (step: number) => void;
  setProblems: (problems: string[]) => void;
  updateSegmentation: (data: Partial<SegmentationInfo>) => void;
  updatePersonal: (data: Partial<PersonalInfo>) => void;
  updateHealth: (data: Partial<HealthInfo>) => void;
  updateGoals: (data: Partial<GoalsInfo>) => void;
  setAppointment: (appt: AppointmentSelection | null) => void;
  setReferralCode: (code: string) => void;
  resetForm: () => void;
  hasSavedProgress: boolean;
}

const IntakeFormContext = createContext<ContextValue | undefined>(undefined);

export const IntakeFormProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<IntakeFormState>(initialState);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as IntakeFormState;
        setState({ ...initialState, ...parsed,
          segmentation: { ...initialState.segmentation, ...(parsed.segmentation ?? {}) },
          problems: parsed.problems ?? [],
        });
        if (parsed.step > 1 || parsed.personalInfo?.email) {
          setHasSavedProgress(true);
        }
      }
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (ref) {
        setState((s) => ({
          ...s,
          referralCode: ref,
          goalsInfo: { ...s.goalsInfo, referralCode: ref },
        }));
        sessionStorage.setItem("referralCode", ref);
      }
    } catch (e) {
      console.error("Failed to restore intake form:", e);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save intake form:", e);
    }
  }, [state, hydrated]);

  const setStep = useCallback((step: number) => setState((s) => ({ ...s, step })), []);
  const setProblems = useCallback((problems: string[]) => setState((s) => ({ ...s, problems })), []);
  const updateSegmentation = useCallback(
    (data: Partial<SegmentationInfo>) =>
      setState((s) => ({ ...s, segmentation: { ...s.segmentation, ...data } })),
    []
  );
  const updatePersonal = useCallback(
    (data: Partial<PersonalInfo>) =>
      setState((s) => ({ ...s, personalInfo: { ...s.personalInfo, ...data } })),
    []
  );
  const updateHealth = useCallback(
    (data: Partial<HealthInfo>) =>
      setState((s) => ({ ...s, healthInfo: { ...s.healthInfo, ...data } })),
    []
  );
  const updateGoals = useCallback(
    (data: Partial<GoalsInfo>) =>
      setState((s) => ({ ...s, goalsInfo: { ...s.goalsInfo, ...data } })),
    []
  );
  const setAppointment = useCallback(
    (appt: AppointmentSelection | null) => setState((s) => ({ ...s, appointment: appt })),
    []
  );
  const setReferralCode = useCallback(
    (code: string) => setState((s) => ({ ...s, referralCode: code })),
    []
  );

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
        setProblems,
        updateSegmentation,
        updatePersonal,
        updateHealth,
        updateGoals,
        setAppointment,
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
