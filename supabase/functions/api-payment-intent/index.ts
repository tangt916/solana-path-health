import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getVendorAdapter } from "../_shared/vendor-factory.ts";
import { corsHeaders, successResponse, errorResponse, logError } from "../_shared/edge-helpers.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    if (body.amount == null) return errorResponse("amount is required");

    const adapter = getVendorAdapter();
    const clientSecret = await adapter.createPaymentIntent(body.amount, body.metadata ?? {});
    return successResponse({ clientSecret });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await logError("api-payment-intent", msg);
    return errorResponse(msg, 500);
  }
});
