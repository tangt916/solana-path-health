import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { DashboardData } from "@/components/dashboard/types";

export function useDashboardData(userId: string | undefined, email: string | null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  const load = useCallback(async () => {
    if (!userId || !email) return;
    setLoading(true);
    setError(null);
    try {
      const { data: caseRow } = await supabase
        .from("cases")
        .select("id, status, vendor_case_id, plan_months, amount_paid, created_at")
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const caseId = caseRow?.id ?? null;
      const vendorCaseId = caseRow?.vendor_case_id ?? null;

      const apptQuery = caseId
        ? supabase
            .from("appointments")
            .select("id, provider_name, start_time, end_time, timezone, meeting_link, status, vendor_appointment_id")
            .eq("case_id", caseId)
            .order("start_time", { ascending: true })
        : supabase
            .from("appointments")
            .select("id, provider_name, start_time, end_time, timezone, meeting_link, status, vendor_appointment_id")
            .eq("email", email)
            .order("start_time", { ascending: true });

      const [
        { data: appointments },
        { data: prescriptions },
        { data: orders },
        { data: credits },
      ] = await Promise.all([
        apptQuery,
        supabase
          .from("prescriptions")
          .select("id, medication_name, dosage, status, prescribed_at, prescribing_provider")
          .eq("user_id", userId)
          .order("prescribed_at", { ascending: false }),
        supabase
          .from("orders")
          .select("id, order_number, status, month_number, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false }),
        supabase
          .from("referral_credits")
          .select("id, amount, expires_at, used")
          .eq("email", email)
          .eq("used", false)
          .order("created_at", { ascending: false }),
      ]);

      let shipments: DashboardData["shipments"] = [];
      const orderIds = (orders ?? []).map((o) => o.id);
      if (orderIds.length > 0) {
        const { data: ships } = await supabase
          .from("shipment_events")
          .select("order_id, event_type, tracking_number, carrier, estimated_delivery, occurred_at")
          .in("order_id", orderIds)
          .order("occurred_at", { ascending: false });
        shipments = ships ?? [];
      }

      let messages: DashboardData["messages"] = [];
      if (vendorCaseId) {
        try {
          const { data: msgRes } = await supabase.functions.invoke("api-get-messages", {
            body: { vendorCaseId, markRead: true },
          });
          const r = msgRes as { success: boolean; data?: { messages: any[] } } | undefined;
          if (r?.success && r.data?.messages) {
            messages = r.data.messages.map((m) => ({
              id: m.id,
              text: m.text,
              author_name: m.author_name,
              read: m.read,
              created_at: m.created_at,
            }));
          }
        } catch (err) {
          console.error("Messages fetch failed:", err);
        }
      }

      setData({
        caseRow: caseRow ?? null,
        appointments: appointments ?? [],
        prescriptions: prescriptions ?? [],
        orders: orders ?? [],
        shipments,
        messages,
        credits: credits ?? [],
      });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [userId, email]);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, error, data, reload: load };
}
