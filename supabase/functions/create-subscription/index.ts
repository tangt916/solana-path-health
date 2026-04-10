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
    if (userError || !userData.user?.email) throw new Error("Not authenticated");

    const user = userData.user;
    const { paymentMethodId } = await req.json();
    if (!paymentMethodId) throw new Error("Payment method required");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2025-08-27.basil",
    });

    // Find or create customer
    const customers = await stripe.customers.list({ email: user.email!, limit: 1 });
    let customer: Stripe.Customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: user.email!,
        metadata: { supabase_user_id: user.id },
      });
    }

    // Attach payment method
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    // Find or create price for $179/mo
    let priceId: string;
    const prices = await stripe.prices.list({
      lookup_keys: ["glp1_monthly"],
      limit: 1,
    });
    if (prices.data.length > 0) {
      priceId = prices.data[0].id;
    } else {
      // Search for existing product
      const products = await stripe.products.search({
        query: "name:'GLP-1 Weight Loss Program'",
        limit: 1,
      });
      let productId: string;
      if (products.data.length > 0) {
        productId = products.data[0].id;
      } else {
        const product = await stripe.products.create({
          name: "GLP-1 Weight Loss Program",
          description: "Monthly GLP-1 weight loss subscription",
        });
        productId = product.id;
      }
      const price = await stripe.prices.create({
        product: productId,
        unit_amount: 17900,
        currency: "usd",
        recurring: { interval: "month" },
        lookup_key: "glp1_monthly",
      });
      priceId = price.id;
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
      payment_behavior: "error_if_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    if (paymentIntent.status !== "succeeded") {
      throw new Error(
        paymentIntent.last_payment_error?.message || "Payment failed. Please try a different card."
      );
    }

    // Calculate dates
    const periodEnd = new Date(subscription.current_period_end * 1000);
    const refillDate = new Date(periodEnd);
    refillDate.setDate(refillDate.getDate() - 2);

    // Store subscription in DB
    await supabase.from("subscriptions").insert({
      user_id: user.id,
      stripe_customer_id: customer.id,
      stripe_subscription_id: subscription.id,
      status: "active",
      plan_name: "GLP-1 Weight Loss Program",
      amount_cents: 17900,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: periodEnd.toISOString(),
      next_refill_date: refillDate.toISOString().split("T")[0],
    });

    // Store payment
    await supabase.from("payments").insert({
      user_id: user.id,
      subscription_id: undefined,
      stripe_payment_intent_id: paymentIntent.id,
      amount_cents: 17900,
      status: "succeeded",
    });

    // Create initial order
    await supabase.from("orders").insert({
      user_id: user.id,
      order_number: "",
      status: "pending",
      month_number: 1,
    });

    return new Response(
      JSON.stringify({ success: true, subscriptionId: subscription.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[create-subscription] Error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  }
});
