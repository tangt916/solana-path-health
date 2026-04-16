import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getVendorAdapter } from "../_shared/vendor-factory.ts";
import { corsHeaders, successResponse, errorResponse, logError } from "../_shared/edge-helpers.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    if (!email) return errorResponse("email parameter is required");

    const adapter = getVendorAdapter();
    const result = await adapter.getCaseByEmail(email);
    return successResponse(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await logError("api-get-case", msg);
    return errorResponse(msg, 500);
  }
});
