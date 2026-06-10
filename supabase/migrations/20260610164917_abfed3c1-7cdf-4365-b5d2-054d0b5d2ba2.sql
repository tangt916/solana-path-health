
-- Restrict patient_messages writes: only authenticated users may insert messages
-- for their own cases (matched via case email). Also block updates/deletes from users.
CREATE POLICY "Users can insert messages for their own cases"
ON public.patient_messages
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.cases c
    WHERE c.vendor_case_id = patient_messages.vendor_case_id
      AND c.email IS NOT NULL
      AND lower(c.email) = lower(auth.email())
  )
);

CREATE POLICY "Patient messages cannot be updated by users"
ON public.patient_messages
FOR UPDATE
TO authenticated, anon
USING (false)
WITH CHECK (false);

CREATE POLICY "Patient messages cannot be deleted by users"
ON public.patient_messages
FOR DELETE
TO authenticated, anon
USING (false);

-- Tighten anon support ticket inserts: require a valid-looking email and limit field sizes
DROP POLICY IF EXISTS "Anon users can insert tickets" ON public.support_tickets;

CREATE POLICY "Anon users can insert tickets"
ON public.support_tickets
FOR INSERT
TO anon
WITH CHECK (
  user_id IS NULL
  AND email IS NOT NULL
  AND length(email) BETWEEN 5 AND 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND subject IS NOT NULL AND length(subject) BETWEEN 1 AND 200
  AND message IS NOT NULL AND length(message) BETWEEN 1 AND 5000
);
