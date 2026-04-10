// Stripe publishable key — safe to include in frontend code (not a secret)
// Replace with your actual Stripe publishable key (pk_test_... or pk_live_...)
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
