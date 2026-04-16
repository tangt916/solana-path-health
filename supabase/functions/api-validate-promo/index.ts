import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getVendorAdapter } from "../_shared/vendor-factory.ts";
import { corsHeaders, successResponse, errorResponse, logError } from "../_shared/edge-helpers.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    if (!code) return errorResponse("code parameter is required");
    const bundleId = url.searchParams.get("bundleId") ?? undefined;

    const adapter = getVendorAdapter();
    const result = await adapter.validatePromoCode(code, bundleId);
    return successResponse(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await logError("api-validate-promo", msg);
    return errorResponse(msg, 500);
  }
});
