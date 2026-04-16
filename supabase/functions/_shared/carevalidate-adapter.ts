import type {
  VendorAdapter,
  CheckUserResult,
  CreateCaseInput,
  CreateCaseResult,
  CaseDetail,
  UpdateProfileInput,
  PromoResult,
  ProviderSlot,
  ScheduleInput,
  PaymentConfirmInput,
  Bundle,
  BundleDetail,
} from "./vendor.ts";

const BASE_URL = "https://api.care360-next.carevalidate.com";

export class CareValidateAdapter implements VendorAdapter {
  private apiKey: string;

  constructor() {
    const key = Deno.env.get("CAREVALIDATE_API_KEY");
    if (!key) throw new Error("CAREVALIDATE_API_KEY is not set");
    this.apiKey = key;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${BASE_URL}${path}`;
    const opts: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "cv-api-key": this.apiKey,
      },
    };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(url, opts);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`CareValidate ${method} ${path} failed (${res.status}): ${text}`);
    }
    return res.json() as Promise<T>;
  }

  async checkUser(email: string): Promise<CheckUserResult> {
    const data = await this.request<Record<string, unknown>>(
      "GET",
      `/api/v1/check-user?email=${encodeURIComponent(email)}`
    );
    return {
      exists: !!data.exists || !!data.userId,
      userId: data.userId as string | undefined,
      email: data.email as string | undefined,
      profile: data,
    };
  }

  async createCase(input: CreateCaseInput): Promise<CreateCaseResult> {
    const data = await this.request<Record<string, unknown>>(
      "POST",
      "/api/v1/dynamic-case",
      input
    );
    return {
      caseId: data.caseId as string,
      status: (data.status as string) ?? "OPEN",
      ...data,
    };
  }

  async getCaseByEmail(email: string): Promise<CaseDetail> {
    const data = await this.request<Record<string, unknown>>(
      "GET",
      `/api/v1/customer-case-detail?email=${encodeURIComponent(email)}&includeCalendarEvents=true&includeOrders=true`
    );
    return {
      caseId: data.caseId as string,
      email: (data.email as string) ?? email,
      status: (data.status as string) ?? "UNKNOWN",
      planMonths: data.planMonths as number | undefined,
      calendarEvents: data.calendarEvents as unknown[] | undefined,
      orders: data.orders as unknown[] | undefined,
      ...data,
    };
  }

  async getLatestCaseId(email: string): Promise<string> {
    const data = await this.request<Record<string, unknown>>(
      "GET",
      `/api/v1/customer-latest-case-id?email=${encodeURIComponent(email)}`
    );
    return (data.caseId ?? data.id) as string;
  }

  async updateProfile(input: UpdateProfileInput): Promise<void> {
    await this.request("POST", "/api/v1/users", {
      action: "UPDATE_PROFILE",
      data: input,
    });
  }

  async validatePromoCode(code: string, bundleId?: string): Promise<PromoResult> {
    let path = `/api/v1/promo-codes?code=${encodeURIComponent(code)}`;
    if (bundleId) path += `&bundleId=${encodeURIComponent(bundleId)}`;

    const data = await this.request<Record<string, unknown>>("GET", path);
    return {
      valid: !!data.valid || !!data.code,
      code: (data.code as string) ?? code,
      discountType: data.discountType as "percent" | "flat" | undefined,
      discountValue: data.discountValue as number | undefined,
      expiresAt: data.expiresAt as string | undefined,
      ...data,
    };
  }

  async getProviderAvailability(state: string): Promise<ProviderSlot[]> {
    const data = await this.request<ProviderSlot[] | Record<string, unknown>>(
      "GET",
      `/api/v1/calendar/provider-availability?provider_states=${encodeURIComponent(state)}`
    );
    return Array.isArray(data) ? data : (data.slots as ProviderSlot[]) ?? [];
  }

  async scheduleAppointment(input: ScheduleInput): Promise<void> {
    await this.request("POST", "/api/v1/calendar/appointments", input);
  }

  async cancelAppointment(appointmentId: string, email: string): Promise<void> {
    await this.request("POST", "/api/v1/calendar/appointments/cancel", {
      appointmentId,
      email,
    });
  }

  async createPaymentIntent(amount: number, metadata: object): Promise<string> {
    const data = await this.request<Record<string, unknown>>(
      "POST",
      "/api/v1/payments/intent",
      { amount, metadata }
    );
    return (data.clientSecret ?? data.paymentIntentId) as string;
  }

  async createPaymentSetup(metadata: object): Promise<string> {
    const data = await this.request<Record<string, unknown>>(
      "POST",
      "/api/v1/payments/setup",
      { metadata }
    );
    return (data.clientSecret ?? data.setupIntentId) as string;
  }

  async confirmPayment(input: PaymentConfirmInput): Promise<void> {
    await this.request("POST", "/api/v1/customer-payment-confirmation", input);
  }

  async getBundles(): Promise<Bundle[]> {
    const data = await this.request<Bundle[] | Record<string, unknown>>(
      "GET",
      "/api/v1/organization/bundles?isVisible=true"
    );
    return Array.isArray(data) ? data : (data.bundles as Bundle[]) ?? [];
  }

  async getBundle(id: string): Promise<BundleDetail> {
    return this.request<BundleDetail>(
      "GET",
      `/api/v1/organization/bundles/${encodeURIComponent(id)}?includeIntakeForm=true`
    );
  }
}
