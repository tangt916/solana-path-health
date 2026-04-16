import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-cv-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } }
);

// ---------- HMAC verification ----------
async function verifySignature(
  rawBody: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sigBuf = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(rawBody)
    );
    const expectedHex = Array.from(new Uint8Array(sigBuf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Constant-time compare against either raw hex or "sha256=<hex>" format
    const provided = signature.startsWith("sha256=")
      ? signature.slice(7)
      : signature;

    if (provided.length !== expectedHex.length) return false;
    let mismatch = 0;
    for (let i = 0; i < provided.length; i++) {
      mismatch |= provided.charCodeAt(i) ^ expectedHex.charCodeAt(i);
    }
    return mismatch === 0;
  } catch (err) {
    console.error("Signature verification error:", err);
    return false;
  }
}

// ---------- Helpers ----------
function ok(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function markProcessed(eventId: string, error?: string) {
  await supabase
    .from("webhook_events")
    .update({
      processed: !error,
      processed_at: new Date().toISOString(),
      error: error ?? null,
    })
    .eq("id", eventId);
}

// ---------- Event handlers ----------
async function handleCaseStatusChanged(payload: any) {
  const vendorCaseId = payload.caseId ?? payload.vendorCaseId ?? payload.id;
  const status = payload.status ?? payload.newStatus;
  if (!vendorCaseId || !status) return;

  const { data: caseRow } = await supabase
    .from("cases")
    .select("id, email")
    .eq("vendor_case_id", String(vendorCaseId))
    .maybeSingle();

  if (!caseRow) return;

  await supabase
    .from("cases")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", caseRow.id);

  const upper = String(status).toUpperCase();
  if (upper === "APPROVED" || upper === "REJECTED") {
    await supabase.from("notification_queue").insert({
      type: upper === "APPROVED" ? "CASE_APPROVED" : "CASE_REJECTED",
      email: caseRow.email,
      payload: { caseId: caseRow.id, vendorCaseId, status },
    });
  }
}

async function handleOrderCreated(payload: any) {
  const vendorCaseId = payload.caseId ?? payload.vendorCaseId;
  if (!vendorCaseId) return;
  // Cache point — currently a no-op since `cases` doesn't have an order column.
  // Webhook is already logged in webhook_events for traceability.
}

async function handleOrderStatusChanged(payload: any) {
  const status = String(payload.status ?? payload.newStatus ?? "").toLowerCase();
  const trackingId =
    payload.trackingNumber ?? payload.trackingId ?? payload.tracking ?? null;
  const email = payload.email ?? payload.patientEmail;

  if (status.includes("ship") || trackingId) {
    await supabase.from("notification_queue").insert({
      type: "ORDER_SHIPPED",
      email,
      payload: { trackingId, raw: payload },
    });
  }
}

async function handleAddCaseComment(payload: any) {
  if (payload.isRestricted === true) return; // ignore restricted comments

  const vendorCaseId = payload.caseId ?? payload.vendorCaseId;
  const text = payload.comment ?? payload.text ?? payload.message;
  const authorName =
    payload.authorName ?? payload.author?.name ?? payload.createdBy ?? null;
  if (!vendorCaseId || !text) return;

  await supabase.from("patient_messages").insert({
    vendor_case_id: String(vendorCaseId),
    text: String(text),
    author_name: authorName,
  });
}

async function handleCalendarEvent(eventType: string, payload: any) {
  const vendorAppointmentId =
    payload.appointmentId ??
    payload.vendorAppointmentId ??
    payload.eventId ??
    payload.id;
  if (!vendorAppointmentId) return;

  const upper = eventType.toUpperCase();
  const update: Record<string, unknown> = {};

  if (upper.includes("CANCEL")) {
    update.status = "cancelled";
  } else if (upper.includes("RESCHEDUL")) {
    if (payload.startTime) update.start_time = payload.startTime;
    if (payload.endTime) update.end_time = payload.endTime;
    if (payload.meetingLink) update.meeting_link = payload.meetingLink;
    if (payload.timezone) update.timezone = payload.timezone;
    update.status = "scheduled";
  } else {
    // CREATED
    if (payload.startTime) update.start_time = payload.startTime;
    if (payload.endTime) update.end_time = payload.endTime;
    if (payload.meetingLink) update.meeting_link = payload.meetingLink;
    if (payload.timezone) update.timezone = payload.timezone;
    if (payload.providerName) update.provider_name = payload.providerName;
    update.status = "scheduled";
  }

  if (Object.keys(update).length === 0) return;

  await supabase
    .from("appointments")
    .update(update)
    .eq("vendor_appointment_id", String(vendorAppointmentId));
}

// ---------- Main handler ----------
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return ok({ error: "Method not allowed" }, 405);
  }

  // Read RAW body BEFORE any parsing
  const rawBody = await req.text();

  // Signature verification (only if both header and secret present)
  const signature = req.headers.get("x-cv-signature");
  const webhookSecret = Deno.env.get("WEBHOOK_SECRET");
  if (signature && webhookSecret) {
    const valid = await verifySignature(rawBody, signature, webhookSecret);
    if (!valid) {
      console.warn("Webhook signature verification failed");
      return ok({ error: "Invalid signature" }, 401);
    }
  }

  // Parse payload
  let payload: any = {};
  try {
    payload = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return ok({ error: "Invalid JSON" }, 400);
  }

  const eventType = String(
    payload.eventType ?? payload.type ?? payload.event ?? "UNKNOWN"
  );
  const vendorCaseId =
    payload.caseId ?? payload.vendorCaseId ?? payload.case?.id ?? null;

  // Always log first
  const { data: eventRow, error: insertErr } = await supabase
    .from("webhook_events")
    .insert({
      vendor_name: "carevalidate",
      event_type: eventType,
      vendor_case_id: vendorCaseId ? String(vendorCaseId) : null,
      payload,
      processed: false,
    })
    .select("id")
    .single();

  if (insertErr || !eventRow) {
    console.error("Failed to log webhook_event:", insertErr);
    return ok({ error: "Failed to log event" }, 500);
  }

  // Dispatch
  try {
    const upperType = eventType.toUpperCase();
    const eventData = payload.data ?? payload;

    switch (upperType) {
      case "CASE_STATUS_CHANGED":
      case "CHANGECASESTATUS":
        await handleCaseStatusChanged(eventData);
        break;

      case "PAYMENT_COMPLETED":
      case "PAYMENT_ADDED":
        // Stripe is source of truth — log only
        break;

      case "ORDER_CREATED":
        await handleOrderCreated(eventData);
        break;

      case "ORDERSTATUSCHANGED":
      case "ORDERTRACKINGADDED":
        await handleOrderStatusChanged(eventData);
        break;

      case "ADDCASECOMMENT":
        await handleAddCaseComment(eventData);
        break;

      case "CALENDAREVENTCREATED":
      case "CALENDAREVENTRESCHEDULED":
      case "CALENDAREVENTCANCELED":
        await handleCalendarEvent(upperType, eventData);
        break;

      default:
        // Unknown / no-op event types
        break;
    }

    await markProcessed(eventRow.id);
    return ok({ received: true, eventId: eventRow.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Error processing ${eventType}:`, message);
    await markProcessed(eventRow.id, message);
    // Return 200 so vendor doesn't retry on app-level errors we've already logged
    return ok({ received: true, eventId: eventRow.id, error: message });
  }
});
