import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getVendorAdapter } from "../_shared/vendor-factory.ts";
import { corsHeaders, successResponse, errorResponse, logError } from "../_shared/edge-helpers.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const bundleId = url.searchParams.get("bundleId");
    if (!bundleId) return errorResponse("bundleId parameter is required");

    const adapter = getVendorAdapter();
    const bundle = await adapter.getBundle(bundleId);
    return successResponse(bundle);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await logError("api-get-bundle", msg);
    return errorResponse(msg, 500);
  }
});
