/**
 * Data service — single source of truth for all dashboard data.
 * Flip USE_MOCK to false when Supabase tables have real data.
 */
import {
  MOCK_PATIENT,
  MOCK_ORDERS,
  MOCK_APPOINTMENTS,
  MOCK_MESSAGES,
  MOCK_PAYMENTS,
} from "./mock-patient-data";

const USE_MOCK = true;
// ↑ Flip to false when:
//   1. Supabase tables are populated (after first real patient pays)
//   2. Vendor is configured (ACTIVE_VENDOR != "mock" in Supabase env)

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export const dataService = {
  async getPatient(_email: string) {
    if (USE_MOCK) { await delay(600); return MOCK_PATIENT; }
    // future: query patients table via edge function
  },

  async getOrders(_email: string) {
    if (USE_MOCK) { await delay(400); return MOCK_ORDERS; }
    // future: query orders table
  },

  async getAppointments(_email: string) {
    if (USE_MOCK) { await delay(400); return MOCK_APPOINTMENTS; }
    // future: query appointments table
  },

  async getMessages(_email: string) {
    if (USE_MOCK) { await delay(500); return MOCK_MESSAGES; }
    // future: call api-get-messages edge function
  },

  async getPayments(_email: string) {
    if (USE_MOCK) { await delay(300); return MOCK_PAYMENTS; }
    // future: query payments table
  },

  async updateProfile(_email: string, _data: Record<string, unknown>) {
    if (USE_MOCK) { await delay(800); return { success: true }; }
    // future: call api-update-profile edge function
  },

  async validatePromoCode(code: string) {
    if (USE_MOCK) {
      await delay(600);
      if (code.toUpperCase() === "WELCOME10") {
        return { valid: true, type: "percent" as const, value: 10 };
      }
      return { valid: false, error: "Invalid or expired promo code" };
    }
    // future: call api-validate-promo edge function
  },
};
