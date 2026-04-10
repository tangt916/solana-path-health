
-- 1. customers
CREATE TABLE public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text,
  email text,
  phone text,
  date_of_birth date,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  zip text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE UNIQUE INDEX idx_customers_user_id ON public.customers(user_id);
CREATE POLICY "Users can view their own customer record" ON public.customers FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own customer record" ON public.customers FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own customer record" ON public.customers FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. intake_submissions
CREATE TABLE public.intake_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  age integer NOT NULL,
  state text NOT NULL,
  height_feet integer NOT NULL,
  height_inches integer NOT NULL DEFAULT 0,
  weight_lbs numeric NOT NULL,
  bmi numeric,
  weight_loss_goal text,
  tried_programs_before text,
  has_medical_conditions boolean NOT NULL DEFAULT false,
  medical_conditions_detail text,
  is_pregnant_or_planning boolean NOT NULL DEFAULT false,
  current_medications boolean NOT NULL DEFAULT false,
  medications_detail text,
  status text NOT NULL DEFAULT 'submitted',
  submitted_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  reviewer_notes text
);
ALTER TABLE public.intake_submissions ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_intake_user ON public.intake_submissions(user_id);
CREATE POLICY "Users can view their own intakes" ON public.intake_submissions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own intakes" ON public.intake_submissions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 3. prescriptions
CREATE TABLE public.prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  intake_id uuid REFERENCES public.intake_submissions(id),
  medication_name text NOT NULL,
  dosage text,
  prescribed_at timestamptz NOT NULL DEFAULT now(),
  prescribing_provider text,
  status text NOT NULL DEFAULT 'active'
);
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_prescriptions_user ON public.prescriptions(user_id);
CREATE POLICY "Users can view their own prescriptions" ON public.prescriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- 4. orders
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  order_number text NOT NULL UNIQUE,
  prescription_id uuid REFERENCES public.prescriptions(id),
  status text NOT NULL DEFAULT 'pending',
  month_number integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := 'SH-' || LPAD(nextval('order_number_seq')::text, 5, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE SEQUENCE IF NOT EXISTS order_number_seq START 10001;
CREATE TRIGGER set_order_number BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.generate_order_number();

-- 5. subscriptions
CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text NOT NULL DEFAULT 'active',
  plan_name text NOT NULL DEFAULT 'GLP-1 Weight Loss Program',
  amount_cents integer NOT NULL DEFAULT 17900,
  current_period_start timestamptz,
  current_period_end timestamptz,
  next_refill_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  cancelled_at timestamptz,
  pause_start timestamptz,
  pause_end timestamptz
);
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE POLICY "Users can view their own subscription" ON public.subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- 6. payments
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subscription_id uuid REFERENCES public.subscriptions(id),
  stripe_payment_intent_id text,
  amount_cents integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  failure_reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_payments_user ON public.payments(user_id);
CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- 7. shipment_events
CREATE TABLE public.shipment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id),
  event_type text NOT NULL,
  tracking_number text,
  carrier text,
  estimated_delivery date,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  notes text
);
ALTER TABLE public.shipment_events ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_shipment_events_order ON public.shipment_events(order_id);
CREATE POLICY "Users can view shipment events for their orders" ON public.shipment_events FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = shipment_events.order_id AND orders.user_id = auth.uid())
);

-- 8. consents
CREATE TABLE public.consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  consent_type text NOT NULL,
  consent_text_version text NOT NULL DEFAULT 'v1.0',
  agreed boolean NOT NULL DEFAULT false,
  agreed_at timestamptz NOT NULL DEFAULT now(),
  ip_address text
);
ALTER TABLE public.consents ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_consents_user ON public.consents(user_id);
CREATE POLICY "Users can view their own consents" ON public.consents FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own consents" ON public.consents FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 9. support_tickets
CREATE TABLE public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  admin_reply text,
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_support_tickets_user ON public.support_tickets(user_id);
CREATE POLICY "Users can view their own tickets" ON public.support_tickets FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own tickets" ON public.support_tickets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anon users can insert tickets" ON public.support_tickets FOR INSERT TO anon WITH CHECK (user_id IS NULL);

-- 10. audit_log (HIPAA — no user access)
CREATE TABLE public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  resource_type text,
  resource_id uuid,
  ip_address text,
  occurred_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
-- No policies = no user access, service role only
