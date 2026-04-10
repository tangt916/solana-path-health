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
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData.user) throw new Error("Not authenticated");

    const user = userData.user;
    const { action, paymentMethodId } = await req.json();

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2025-08-27.basil",
    });

    // Get user's subscription
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!sub?.stripe_subscription_id) throw new Error("No subscription found");

    switch (action) {
      case "pause": {
        await stripe.subscriptions.update(sub.stripe_subscription_id, {
          pause_collection: { behavior: "void" },
        });
        await supabase
          .from("subscriptions")
          .update({ status: "paused", pause_start: new Date().toISOString() })
          .eq("id", sub.id);
        return respond({ success: true, status: "paused" });
      }

      case "resume": {
        await stripe.subscriptions.update(sub.stripe_subscription_id, {
          pause_collection: "",
        } as any);
        await supabase
          .from("subscriptions")
          .update({ status: "active", pause_start: null, pause_end: null })
          .eq("id", sub.id);
        return respond({ success: true, status: "active" });
      }

      case "cancel": {
        await stripe.subscriptions.update(sub.stripe_subscription_id, {
          cancel_at_period_end: true,
        });
        await supabase
          .from("subscriptions")
          .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
          .eq("id", sub.id);
        return respond({
          success: true,
          status: "cancelled",
          endDate: sub.current_period_end,
        });
      }

      case "update_payment": {
        if (!paymentMethodId) throw new Error("Payment method required");
        if (!sub.stripe_customer_id) throw new Error("No Stripe customer");

        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: sub.stripe_customer_id,
        });
        await stripe.customers.update(sub.stripe_customer_id, {
          invoice_settings: { default_payment_method: paymentMethodId },
        });
        await stripe.subscriptions.update(sub.stripe_subscription_id, {
          default_payment_method: paymentMethodId,
        });
        return respond({ success: true });
      }

      default:
        throw new Error("Invalid action");
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[manage-subscription] Error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  }

  function respond(data: any) {
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }
});
