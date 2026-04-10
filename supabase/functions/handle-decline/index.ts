import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } }
  );

  try {
    // This function is called server-side (e.g. by admin or webhook)
    const { userId, intakeId } = await req.json();
    if (!userId) throw new Error("userId required");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2025-08-27.basil",
    });

    // Get subscription
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (sub?.stripe_subscription_id && sub?.stripe_customer_id) {
      // Refund latest payment
      const invoices = await stripe.invoices.list({
        customer: sub.stripe_customer_id,
        subscription: sub.stripe_subscription_id,
        limit: 1,
      });

      if (invoices.data.length > 0 && invoices.data[0].payment_intent) {
        const piId =
          typeof invoices.data[0].payment_intent === "string"
            ? invoices.data[0].payment_intent
            : invoices.data[0].payment_intent.id;
        await stripe.refunds.create({ payment_intent: piId });
      }

      // Cancel subscription
      await stripe.subscriptions.cancel(sub.stripe_subscription_id);

      // Update DB
      await supabase
        .from("subscriptions")
        .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
        .eq("id", sub.id);
    }

    // Update orders
    await supabase
      .from("orders")
      .update({ status: "declined" })
      .eq("user_id", userId)
      .eq("status", "pending");

    // Update intake
    if (intakeId) {
      await supabase
        .from("intake_submissions")
        .update({ status: "declined", reviewed_at: new Date().toISOString() })
        .eq("id", intakeId);
    }

    // Log audit
    await supabase.from("audit_log").insert({
      user_id: userId,
      action: "intake_declined_auto_refund",
      resource_type: "intake_submission",
      resource_id: intakeId || null,
    });

    console.log("[handle-decline] Processed decline for user:", userId);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[handle-decline] Error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  }
});
