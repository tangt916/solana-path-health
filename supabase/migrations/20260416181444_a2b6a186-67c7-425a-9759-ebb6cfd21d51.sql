-- notification_queue table
CREATE TABLE public.notification_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  email TEXT,
  payload JSONB,
  sent BOOLEAN NOT NULL DEFAULT false,
  sent_at TIMESTAMP WITH TIME ZONE,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_notification_queue_sent ON public.notification_queue(sent, created_at);
CREATE INDEX idx_notification_queue_email ON public.notification_queue(email);

ALTER TABLE public.notification_queue ENABLE ROW LEVEL SECURITY;
-- No policies: only service role (backend functions) can access.

-- patient_messages table
CREATE TABLE public.patient_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_case_id TEXT NOT NULL,
  text TEXT NOT NULL,
  author_name TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_patient_messages_vendor_case_id ON public.patient_messages(vendor_case_id, created_at DESC);

ALTER TABLE public.patient_messages ENABLE ROW LEVEL SECURITY;
-- No policies: accessed via backend function that scopes to authenticated patient's case.