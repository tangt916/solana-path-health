/**
 * Vendor-agnostic API client.
 * All frontend code calls these functions — never any vendor API directly.
 */
import { supabase } from "@/integrations/supabase/client";

// ── Error type ──────────────────────────────────────────────
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public context?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ── Types (mirror vendor.ts for frontend use) ───────────────
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
}

// ── Helpers ─────────────────────────────────────────────────
async function invoke<T>(functionName: string, body?: unknown): Promise<T> {
  const { data, error } = await supabase.functions.invoke(functionName, {
    body: body ?? undefined,
  });

  if (error) {
    throw new ApiError(error.message ?? "Edge function error", undefined, functionName);
  }

  const response = data as { success: boolean; data?: T; error?: string };
  if (!response.success) {
    throw new ApiError(response.error ?? "Unknown error", undefined, functionName);
  }

  return response.data as T;
}

async function invokeGet<T>(functionName: string, params: Record<string, string>): Promise<T> {
  const query = new URLSearchParams(params).toString();
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${functionName}?${query}`;

  const { data: { session } } = await supabase.auth.getSession();
  const headers: Record<string, string> = {
    "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    "Content-Type": "application/json",
  };
  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new ApiError(`Request failed: ${text}`, res.status, functionName);
  }

  const json = await res.json();
  if (!json.success) {
    throw new ApiError(json.error ?? "Unknown error", undefined, functionName);
  }

  return json.data as T;
}

// ── Public API ──────────────────────────────────────────────

export async function checkUser(email: string): Promise<CheckUserResult> {
  return invokeGet<CheckUserResult>("api-check-user", { email });
}

export async function createCase(data: CreateCaseInput): Promise<CreateCaseResult> {
  return invoke<CreateCaseResult>("api-create-case", data);
}

export async function getCase(email: string): Promise<CaseDetail> {
  return invokeGet<CaseDetail>("api-get-case", { email });
}

export async function validatePromo(code: string, bundleId?: string): Promise<PromoResult> {
  const params: Record<string, string> = { code };
  if (bundleId) params.bundleId = bundleId;
  return invokeGet<PromoResult>("api-validate-promo", params);
}

export async function getAvailability(state: string): Promise<ProviderSlot[]> {
  return invokeGet<ProviderSlot[]>("api-get-availability", { state });
}

export async function scheduleAppointment(data: ScheduleInput): Promise<void> {
  await invoke<{ scheduled: boolean }>("api-schedule-appointment", data);
}

export async function cancelAppointment(appointmentId: string, email: string): Promise<void> {
  await invoke<{ cancelled: boolean }>("api-cancel-appointment", { appointmentId, email });
}

export async function createPaymentIntent(amount: number, metadata: object = {}): Promise<string> {
  const result = await invoke<{ clientSecret: string }>("api-payment-intent", { amount, metadata });
  return result.clientSecret;
}

export async function createPaymentSetup(metadata: object = {}): Promise<string> {
  const result = await invoke<{ clientSecret: string }>("api-payment-setup", { metadata });
  return result.clientSecret;
}

export async function confirmPayment(data: PaymentConfirmInput): Promise<void> {
  await invoke<{ confirmed: boolean }>("api-payment-confirm", data);
}

export async function getBundles(): Promise<Bundle[]> {
  return invokeGet<Bundle[]>("api-get-bundles", {});
}

export async function getBundle(bundleId: string): Promise<BundleDetail> {
  return invokeGet<BundleDetail>("api-get-bundle", { bundleId });
}

export async function updateProfile(data: UpdateProfileInput): Promise<void> {
  await invoke<{ updated: boolean }>("api-update-profile", data);
}
