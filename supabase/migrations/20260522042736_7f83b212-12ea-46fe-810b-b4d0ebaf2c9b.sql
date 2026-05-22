ALTER TABLE public.marketing_leads
  ADD COLUMN IF NOT EXISTS problems text[],
  ADD COLUMN IF NOT EXISTS segmentation jsonb;