

## Plan: Add Stripe Publishable Key to Checkout

The Stripe card fields are unresponsive because the publishable key is empty. I'll hardcode your test-mode key into `src/lib/stripe.ts`.

### Change
**File: `src/lib/stripe.ts`**
- Set `STRIPE_PUBLISHABLE_KEY` to `pk_test_51TKiDeL2dA7LLhLKjpMPU8hCk6rDjTVNowqSJnvZfD9ThfpCRdobEx9yd9twOfbwbHpniECX6jdJ1DTBW101aF7G00ojSTcD7g`
- This is a publishable (public) key, safe to include in source code

This will allow `loadStripe()` to initialize properly, making the card number, expiry, and CVC fields interactive.

