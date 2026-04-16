import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getVendorAdapter } from "../_shared/vendor-factory.ts";
import { corsHeaders, successResponse, errorResponse, logError } from "../_shared/edge-helpers.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    if (!body.appointmentId || !body.email) return errorResponse("appointmentId and email are required");

    const adapter = getVendorAdapter();
    await adapter.cancelAppointment(body.appointmentId, body.email);
    return successResponse({ cancelled: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await logError("api-cancel-appointment", msg);
    return errorResponse(msg, 500);
  }
});
