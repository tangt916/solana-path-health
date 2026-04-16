import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export function successResponse(data: unknown) {
  return jsonResponse({ success: true, data });
}

export function errorResponse(error: string, status = 400) {
  return jsonResponse({ success: false, error }, status);
}

export async function logError(context: string, error: string, payload?: unknown, patientEmail?: string) {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );
    await supabase.from("error_logs").insert({
      context,
      error,
      payload: payload ?? null,
      patient_email: patientEmail ?? null,
    });
  } catch (e) {
    console.error("Failed to log error:", e);
  }
}
