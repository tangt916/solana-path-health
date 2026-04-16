import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getVendorAdapter } from "../_shared/vendor-factory.ts";
import { corsHeaders, successResponse, errorResponse, logError } from "../_shared/edge-helpers.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const state = url.searchParams.get("state");
    if (!state) return errorResponse("state parameter is required");

    const adapter = getVendorAdapter();
    const result = await adapter.getProviderAvailability(state);
    return successResponse(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await logError("api-get-availability", msg);
    return errorResponse(msg, 500);
  }
});
