
-- patients
CREATE TABLE public.patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  phone text,
  dob date,
  gender text,
  address jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  converted_at timestamptz,
  referral_code text UNIQUE,
  referred_by text
);
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- cases
CREATE TABLE public.cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES public.patients(id),
  email text,
  vendor_case_id text,
  vendor_name text DEFAULT 'carevalidate',
  status text DEFAULT 'OPEN',
  plan_months integer,
  amount_paid numeric,
  original_amount numeric,
  discount_applied numeric,
  promo_code_used text,
  stripe_payment_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- marketing_leads
CREATE TABLE public.marketing_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  phone text,
  first_name text,
  last_name text,
  source text,
  email_opt_in boolean DEFAULT true,
  sms_opt_in boolean DEFAULT false,
  promo_code text,
  promo_expiry timestamptz,
  promo_used boolean DEFAULT false,
  converted_to_patient boolean DEFAULT false,
  patient_id uuid REFERENCES public.patients(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.marketing_leads ENABLE ROW LEVEL SECURITY;

-- referrals
CREATE TABLE public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_patient_id uuid REFERENCES public.patients(id),
  referrer_email text,
  referral_code text,
  referred_email text,
  referred_patient_id uuid REFERENCES public.patients(id),
  status text DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- referral_credits
CREATE TABLE public.referral_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES public.patients(id),
  email text,
  amount numeric DEFAULT 25,
  reason text,
  expires_at timestamptz,
  used boolean DEFAULT false,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.referral_credits ENABLE ROW LEVEL SECURITY;

-- promo_codes
CREATE TABLE public.promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE,
  discount_type text,
  discount_value numeric,
  expires_at timestamptz,
  max_uses integer,
  use_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- appointments
CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES public.patients(id),
  email text,
  case_id uuid REFERENCES public.cases(id),
  vendor_appointment_id text,
  vendor_name text DEFAULT 'carevalidate',
  provider_name text,
  provider_email text,
  start_time timestamptz,
  end_time timestamptz,
  timezone text,
  meeting_link text,
  status text DEFAULT 'scheduled',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- webhook_events
CREATE TABLE public.webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_name text,
  event_type text,
  vendor_case_id text,
  payload jsonb,
  processed boolean DEFAULT false,
  processed_at timestamptz,
  error text,
  received_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- error_logs
CREATE TABLE public.error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  context text,
  error text,
  payload jsonb,
  patient_email text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;

-- updated_at trigger for cases
CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON public.cases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
