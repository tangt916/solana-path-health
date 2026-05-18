# Solana Health Homepage Rebrand

Refresh the brand system and rebuild the homepage to match the new premium, warm-confident direction (Hims/Hers × Goop × boutique clinic). Keep all existing routes, treatments, intake flows, and backend untouched — this is a frontend/presentation refresh focused on the homepage, global header/footer, and shared design tokens.

## 1. Design system updates

**`src/index.css` + `tailwind.config.ts`** — replace current palette tokens with the new warm-neutral system (all HSL):
- `--background` warm white `#FAFAF8`
- `--foreground` / `--primary` deep forest `#1C3A2E`
- `--accent` soft gold `#C9A96E`
- `--muted` / sage section bg `#E8EDE6`
- `--border` subtle warm gray
- Map `--primary-foreground` to warm white, keep semantic shadcn tokens consistent in light + dark.

**Typography**
- Add Playfair Display (serif headlines) + Inter (body) via Google Fonts in `index.html`.
- Add `font-serif` → Playfair, `font-sans` → Inter in tailwind config.
- Apply generous tracking, large headline sizes, body line-height ~1.65.

**Reusable primitives**
- `PrimaryCTA` (forest fill, white text, "Find My Protocol →" default, links to `/quiz`).
- `SecondaryCTA` (ghost/outline forest).
- `TrustBar` (inline ✓ items).
- `SafetyDisclaimer` (small gray legal text, reused under hero + in footer).
- `FadeInOnScroll` wrapper (IntersectionObserver) for subtle scroll-in.

## 2. Routing
- Ensure `/quiz` resolves. Current intake entry is `/get-started` / `IntakeSelector`. Add a `/quiz` route that renders `IntakeSelector` (or redirects) so every CTA in the new copy works without breaking existing links.

## 3. Global chrome

**`src/components/layout/Header.tsx`** — sticky, warm-white bg, subtle bottom border on scroll:
- Left: Solana logo (serif wordmark).
- Center: How It Works · Treatments ▾ (Metabolic & Weight Health, Hormone Health, Peptides) · Pricing · FAQ · Safety Info.
- Right: `Log In` (text) + `Find My Protocol →` (primary CTA).
- Mobile: hamburger drawer.

**`src/components/layout/Footer.tsx`** — tagline, link columns, full legal block from copy, safety disclaimer.

## 4. Homepage sections (rebuild `src/pages/Index.tsx` + section components)

Replace the current landing sections with new ones in `src/components/landing/`:

1. **`HeroV2.tsx`** — Serif H1 "You Shouldn't Have to Feel This Way.", subhead, primary + secondary CTA, inline 3-item trust bar, small FDA/compounding disclaimer below. Abstract warm-light background (gradient + soft sage shape, no faces).
2. **`ResearchStatBar.tsx`** — auto-rotating ticker of the 3 medical-journal stats (NEJM, Cell Metabolism, Menopause Society) on sage band.
3. **`WhatWeTreat.tsx`** — 3 cards (Metabolic & Weight Health, Hormone Health, NAD+ & Peptides) with new headlines/body/features and `Learn more →` linking to existing `/treatments/*` routes.
4. **`HowItWorksV2.tsx`** — 4 numbered horizontal steps with icons, CTA + disclaimer.
5. **`MembershipV2.tsx`** — 2-col: features list left, pricing callout right ("From $297/month · Cancel anytime", "See full pricing →").
6. **`LeadMagnet.tsx`** — full-width sage section, email-only capture + button, sub-text about no spam. Wire submit to existing analytics `trackEvent('lead_magnet_submit')`; persist email via existing Supabase pattern if a `leads` table exists, otherwise just track + toast (call out in clarifying note).
7. **`FinalCTAV2.tsx`** — centered headline, primary CTA, 3 trust signals, FDA disclaimer.
8. **Footer** (already in chrome) — closes the page.

All sections wrapped in `FadeInOnScroll`. Mobile-first responsive. Imagery limited to: abstract gradients, sage shapes, simple SVG icons, iPhone mockup placeholders, progress-ring/line-graph micro-animations (CSS/SVG, no face photography).

## 5. SEO
- Update `SEO` on Index: new title ("Solana Health — Personalized wellness for women"), description, FAQPage JSON-LD already present (keep but refresh Qs if changed). No copy in the user's brief redefines the FAQ — leave existing 5 questions or confirm via clarifying question.

## 6. Out of scope (untouched)
- Treatment landing pages, NAD segment pages, dashboard, intake forms, auth, edge functions, Stripe, Klaviyo script.
- Existing route paths stay; only `/quiz` alias is added.

## Technical notes
- All colors via HSL tokens, no hardcoded hex in components.
- New components colocated under `src/components/landing/` with `V2` suffix to avoid clobbering current files until swap is verified, then old `Hero.tsx` / `HowItWorks.tsx` / `Membership.tsx` / `FinalCTA.tsx` / `Pillars.tsx` are deleted.
- Lead-magnet form: if no `leads` table exists in Supabase, add a migration for `public.leads (id, email, source, created_at)` with RLS allowing anon insert only.

## Clarifying questions before implementation
1. Lead-magnet email — should it create a `leads` table + store submissions, or just fire a Klaviyo identify event and show success?
2. FAQ section copy — your brief lists 5 questions in the section list but doesn't provide them. Reuse the existing 5 FAQs, or do you want to send new copy?
3. `/quiz` — alias to existing `/get-started` intake selector, OR build a new streamlined quiz?
