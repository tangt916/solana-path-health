
-- =====================================================================
-- USER-SCOPED READ POLICIES (match on auth.email())
-- =====================================================================

-- appointments
CREATE POLICY "Users can view their own appointments"
  ON public.appointments FOR SELECT TO authenticated
  USING (email IS NOT NULL AND lower(email) = lower(auth.email()));

-- cases
CREATE POLICY "Users can view their own cases"
  ON public.cases FOR SELECT TO authenticated
  USING (email IS NOT NULL AND lower(email) = lower(auth.email()));

-- marketing_leads
CREATE POLICY "Users can view their own marketing lead"
  ON public.marketing_leads FOR SELECT TO authenticated
  USING (email IS NOT NULL AND lower(email) = lower(auth.email()));

-- patients
CREATE POLICY "Users can view their own patient record"
  ON public.patients FOR SELECT TO authenticated
  USING (email IS NOT NULL AND lower(email) = lower(auth.email()));

-- referral_credits
CREATE POLICY "Users can view their own referral credits"
  ON public.referral_credits FOR SELECT TO authenticated
  USING (email IS NOT NULL AND lower(email) = lower(auth.email()));

-- referrals (referrer or referred party)
CREATE POLICY "Users can view their own referrals"
  ON public.referrals FOR SELECT TO authenticated
  USING (
    (referrer_email IS NOT NULL AND lower(referrer_email) = lower(auth.email()))
    OR (referred_email IS NOT NULL AND lower(referred_email) = lower(auth.email()))
  );

-- patient_messages: tie to user's own case via email
CREATE POLICY "Users can view messages for their own cases"
  ON public.patient_messages FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.cases c
      WHERE c.vendor_case_id = patient_messages.vendor_case_id
        AND c.email IS NOT NULL
        AND lower(c.email) = lower(auth.email())
    )
  );

-- =====================================================================
-- ADMIN / BACKEND-ONLY TABLES — revoke client access entirely
-- =====================================================================

REVOKE ALL ON public.audit_log          FROM anon, authenticated;
REVOKE ALL ON public.error_logs         FROM anon, authenticated;
REVOKE ALL ON public.notification_queue FROM anon, authenticated;
REVOKE ALL ON public.webhook_events     FROM anon, authenticated;
REVOKE ALL ON public.promo_codes        FROM anon, authenticated;

GRANT ALL ON public.audit_log          TO service_role;
GRANT ALL ON public.error_logs         TO service_role;
GRANT ALL ON public.notification_queue TO service_role;
GRANT ALL ON public.webhook_events     TO service_role;
GRANT ALL ON public.promo_codes        TO service_role;

-- Explicit deny policies so the scanner sees policies on each table.
-- (service_role bypasses RLS, so backend code is unaffected.)
CREATE POLICY "Backend only - no client access"
  ON public.audit_log FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "Backend only - no client access"
  ON public.error_logs FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "Backend only - no client access"
  ON public.notification_queue FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "Backend only - no client access"
  ON public.webhook_events FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "Backend only - no client access"
  ON public.promo_codes FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- =====================================================================
-- leads: keep INSERT (already present); explicitly deny client reads/edits
-- =====================================================================
CREATE POLICY "Leads cannot be read by clients"
  ON public.leads FOR SELECT TO anon, authenticated USING (false);

CREATE POLICY "Leads cannot be updated by clients"
  ON public.leads FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "Leads cannot be deleted by clients"
  ON public.leads FOR DELETE TO anon, authenticated USING (false);

-- =====================================================================
-- support_tickets: explicitly block user-side updates/deletes
-- =====================================================================
CREATE POLICY "Tickets cannot be edited by users"
  ON public.support_tickets FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "Tickets cannot be deleted by users"
  ON public.support_tickets FOR DELETE TO anon, authenticated USING (false);
