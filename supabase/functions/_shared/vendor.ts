// Vendor Abstraction Layer — Types & Interface
// Any vendor adapter must implement this interface.

export interface CheckUserResult {
  exists: boolean;
  userId?: string;
  email?: string;
  profile?: Record<string, unknown>;
}

export interface CreateCaseInput {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dob?: string;
  gender?: string;
  state: string;
  planMonths: number;
  bundleId?: string;
  promoCode?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  [key: string]: unknown;
}

export interface CreateCaseResult {
  caseId: string;
  status: string;
  [key: string]: unknown;
}

export interface CaseDetail {
  caseId: string;
  email: string;
  status: string;
  planMonths?: number;
  calendarEvents?: unknown[];
  orders?: unknown[];
  [key: string]: unknown;
}

export interface UpdateProfileInput {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  [key: string]: unknown;
}

export interface PromoResult {
  valid: boolean;
  code: string;
  discountType?: "percent" | "flat";
  discountValue?: number;
  expiresAt?: string;
  [key: string]: unknown;
}

export interface ProviderSlot {
  providerId: string;
  providerName: string;
  startTime: string;
  endTime: string;
  timezone: string;
  [key: string]: unknown;
}

export interface ScheduleInput {
  email: string;
  caseId: string;
  providerId: string;
  startTime: string;
  endTime: string;
  timezone: string;
  [key: string]: unknown;
}

export interface PaymentConfirmInput {
  email: string;
  caseId: string;
  paymentIntentId: string;
  amount: number;
  promoCode?: string;
  [key: string]: unknown;
}

export interface Bundle {
  id: string;
  name: string;
  description?: string;
  price: number;
  months: number;
  isVisible: boolean;
  [key: string]: unknown;
}

export interface BundleDetail extends Bundle {
  intakeForm?: unknown;
  [key: string]: unknown;
}

export interface VendorAdapter {
  checkUser(email: string): Promise<CheckUserResult>;
  createCase(data: CreateCaseInput): Promise<CreateCaseResult>;
  getCaseByEmail(email: string): Promise<CaseDetail>;
  getLatestCaseId(email: string): Promise<string>;
  updateProfile(data: UpdateProfileInput): Promise<void>;
  validatePromoCode(code: string, bundleId?: string): Promise<PromoResult>;
  getProviderAvailability(state: string): Promise<ProviderSlot[]>;
  scheduleAppointment(data: ScheduleInput): Promise<void>;
  cancelAppointment(appointmentId: string, email: string): Promise<void>;
  createPaymentIntent(amount: number, metadata: object): Promise<string>;
  createPaymentSetup(metadata: object): Promise<string>;
  confirmPayment(data: PaymentConfirmInput): Promise<void>;
  getBundles(): Promise<Bundle[]>;
  getBundle(id: string): Promise<BundleDetail>;
}
