import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function ok(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return ok({ success: false, error: "Unauthorized" }, 401);
  }

  // Verify caller via anon client + user JWT
  const userClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const token = authHeader.replace("Bearer ", "");
  const { data: claims, error: claimsErr } = await userClient.auth.getClaims(token);
  if (claimsErr || !claims?.claims) {
    return ok({ success: false, error: "Unauthorized" }, 401);
  }

  const userEmail = claims.claims.email as string | undefined;
  if (!userEmail) {
    return ok({ success: false, error: "No email on token" }, 400);
  }

  // Use service role to look up scoped data (RLS-bypassing but explicitly scoped to caller's email)
  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } }
  );

  let body: { vendorCaseId?: string; markRead?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  // Resolve vendorCaseId: either trust client value AFTER verifying it belongs to this email,
  // or look up the most recent case for the caller.
  let vendorCaseId = body.vendorCaseId ?? null;

  if (vendorCaseId) {
    const { data: caseRow } = await admin
      .from("cases")
      .select("vendor_case_id")
      .eq("vendor_case_id", vendorCaseId)
      .eq("email", userEmail)
      .maybeSingle();
    if (!caseRow) {
      return ok({ success: false, error: "Case not found for user" }, 403);
    }
  } else {
    const { data: latestCase } = await admin
      .from("cases")
      .select("vendor_case_id")
      .eq("email", userEmail)
      .not("vendor_case_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    vendorCaseId = latestCase?.vendor_case_id ?? null;
  }

  if (!vendorCaseId) {
    return ok({ success: true, data: { messages: [], vendorCaseId: null } });
  }

  const { data: messages, error: msgErr } = await admin
    .from("patient_messages")
    .select("id, vendor_case_id, text, author_name, read, created_at")
    .eq("vendor_case_id", vendorCaseId)
    .order("created_at", { ascending: false });

  if (msgErr) {
    return ok({ success: false, error: msgErr.message }, 500);
  }

  // Optionally mark unread messages as read
  if (body.markRead && messages && messages.length > 0) {
    const unreadIds = messages.filter((m) => !m.read).map((m) => m.id);
    if (unreadIds.length > 0) {
      await admin
        .from("patient_messages")
        .update({ read: true })
        .in("id", unreadIds);
    }
  }

  return ok({ success: true, data: { messages: messages ?? [], vendorCaseId } });
});
