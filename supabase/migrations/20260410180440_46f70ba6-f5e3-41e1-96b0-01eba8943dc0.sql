
-- 1. Remove user INSERT on subscriptions (edge function uses service_role)
DROP POLICY IF EXISTS "Users can insert their own subscription" ON public.subscriptions;

-- 2. Remove user INSERT on orders (edge function uses service_role)
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;

-- 3. Remove user INSERT on payments (edge function uses service_role)
DROP POLICY IF EXISTS "Users can insert their own payments" ON public.payments;

-- 4. Tighten intake_submissions INSERT: force status='submitted', block admin fields
DROP POLICY IF EXISTS "Users can insert their own intakes" ON public.intake_submissions;
CREATE POLICY "Users can insert their own intakes"
  ON public.intake_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND status = 'submitted'
    AND reviewed_at IS NULL
    AND reviewer_notes IS NULL
  );

-- 5. Create a view for consents that excludes ip_address
CREATE OR REPLACE VIEW public.consents_safe AS
  SELECT id, user_id, consent_type, consent_text_version, agreed, agreed_at
  FROM public.consents;

-- Grant access to the view
GRANT SELECT ON public.consents_safe TO authenticated;
