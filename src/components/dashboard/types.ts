export type CaseStatus =
  | "OPEN"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "APPROVED"
  | "REJECTED"
  | string;

export interface DashboardData {
  caseRow: {
    id: string;
    status: CaseStatus | null;
    vendor_case_id: string | null;
    plan_months: number | null;
    amount_paid: number | null;
    created_at: string;
  } | null;
  appointments: Array<{
    id: string;
    provider_name: string | null;
    start_time: string | null;
    end_time: string | null;
    timezone: string | null;
    meeting_link: string | null;
    status: string | null;
    vendor_appointment_id: string | null;
  }>;
  prescriptions: Array<{
    id: string;
    medication_name: string;
    dosage: string | null;
    status: string;
    prescribed_at: string;
    prescribing_provider: string | null;
  }>;
  orders: Array<{
    id: string;
    order_number: string;
    status: string;
    month_number: number;
    created_at: string;
  }>;
  shipments: Array<{
    order_id: string;
    event_type: string;
    tracking_number: string | null;
    carrier: string | null;
    estimated_delivery: string | null;
    occurred_at: string;
  }>;
  messages: Array<{
    id: string;
    text: string;
    author_name: string | null;
    read: boolean;
    created_at: string;
  }>;
  credits: Array<{
    id: string;
    amount: number | null;
    expires_at: string | null;
    used: boolean | null;
  }>;
}

export const STATUS_BANNER: Record<
  string,
  { label: string; tone: string; description: string }
> = {
  OPEN: {
    label: "Under Review",
    tone: "bg-primary/10 text-primary border-primary/30",
    description: "A provider will review your intake soon.",
  },
  ASSIGNED: {
    label: "Under Review",
    tone: "bg-primary/10 text-primary border-primary/30",
    description: "A provider will review your intake soon.",
  },
  IN_PROGRESS: {
    label: "In Progress",
    tone: "bg-amber-100 text-amber-800 border-amber-300",
    description: "Your provider is working on your case.",
  },
  APPROVED: {
    label: "Approved",
    tone: "bg-success/10 text-success border-success/30",
    description: "Your prescription has been sent.",
  },
  REJECTED: {
    label: "Not Approved",
    tone: "bg-destructive/10 text-destructive border-destructive/30",
    description: "Please contact our support team.",
  },
};
