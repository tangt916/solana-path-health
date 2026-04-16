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

/**
 * Mock vendor adapter — used when no real vendor (e.g. CareValidate) is configured.
 * Returns realistic-looking stub data so the patient flow can be tested end-to-end
 * without external API keys. Stripe is still used for real payments.
 */
export class MockAdapter implements VendorAdapter {
  async checkUser(email: string): Promise<CheckUserResult> {
    return { exists: false, email };
  }

  async createCase(input: CreateCaseInput): Promise<CreateCaseResult> {
    return {
      caseId: `mock_case_${crypto.randomUUID()}`,
      status: "OPEN",
      email: input.email,
    };
  }

  async getCaseByEmail(email: string): Promise<CaseDetail> {
    return {
      caseId: `mock_case_${email}`,
      email,
      status: "OPEN",
      calendarEvents: [],
      orders: [],
    };
  }

  async getLatestCaseId(email: string): Promise<string> {
    return `mock_case_${email}`;
  }

  async updateProfile(_input: UpdateProfileInput): Promise<void> {
    // no-op
  }

  async validatePromoCode(code: string): Promise<PromoResult> {
    return { valid: false, code };
  }

  async getProviderAvailability(_state: string): Promise<ProviderSlot[]> {
    // Return a few mock slots over the next 3 days
    const slots: ProviderSlot[] = [];
    const now = new Date();
    for (let day = 1; day <= 3; day++) {
      for (const hour of [9, 11, 14, 16]) {
        const start = new Date(now);
        start.setDate(start.getDate() + day);
        start.setHours(hour, 0, 0, 0);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + 30);
        slots.push({
          providerId: "mock_provider_1",
          providerName: "Dr. Sarah Chen, MD",
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          timezone: "America/New_York",
        });
      }
    }
    return slots;
  }

  async scheduleAppointment(_input: ScheduleInput): Promise<void> {
    // no-op
  }

  async cancelAppointment(_appointmentId: string, _email: string): Promise<void> {
    // no-op
  }

  async createPaymentIntent(amount: number, metadata: object): Promise<string> {
    // Use real Stripe if configured, otherwise return a mock client secret
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (stripeKey) {
      const body = new URLSearchParams();
      body.append("amount", String(Math.round(amount * 100)));
      body.append("currency", "usd");
      body.append("automatic_payment_methods[enabled]", "true");
      for (const [k, v] of Object.entries(metadata ?? {})) {
        if (v != null) body.append(`metadata[${k}]`, String(v));
      }
      const res = await fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Stripe payment_intents failed (${res.status}): ${text}`);
      }
      const data = await res.json();
      return data.client_secret as string;
    }
    return `mock_pi_${crypto.randomUUID()}_secret_mock`;
  }

  async createPaymentSetup(_metadata: object): Promise<string> {
    return `mock_seti_${crypto.randomUUID()}_secret_mock`;
  }

  async confirmPayment(_input: PaymentConfirmInput): Promise<void> {
    // no-op
  }

  async getBundles(): Promise<Bundle[]> {
    return [];
  }

  async getBundle(id: string): Promise<BundleDetail> {
    return {
      id,
      name: "Mock Bundle",
      price: 179,
      months: 1,
      isVisible: true,
    };
  }
}
