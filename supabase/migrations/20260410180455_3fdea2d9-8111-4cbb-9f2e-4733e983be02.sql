
-- Fix: make view use invoker security so RLS is respected
DROP VIEW IF EXISTS public.consents_safe;
CREATE VIEW public.consents_safe
  WITH (security_invoker = on)
  AS SELECT id, user_id, consent_type, consent_text_version, agreed, agreed_at
  FROM public.consents;

GRANT SELECT ON public.consents_safe TO authenticated;
