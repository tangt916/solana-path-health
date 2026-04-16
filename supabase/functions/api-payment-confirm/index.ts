import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getVendorAdapter } from "../_shared/vendor-factory.ts";
import { corsHeaders, successResponse, errorResponse, logError } from "../_shared/edge-helpers.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    if (!body.email || !body.caseId || !body.paymentIntentId) {
      return errorResponse("email, caseId, and paymentIntentId are required");
    }

    const adapter = getVendorAdapter();
    await adapter.confirmPayment(body);
    return successResponse({ confirmed: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await logError("api-payment-confirm", msg);
    return errorResponse(msg, 500);
  }
});
