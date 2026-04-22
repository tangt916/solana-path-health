

## Visual polish pass — what will change

A site-wide design refresh focused on radius, depth, smoothness, and spacing. **No copy, routes, logic, or color tokens change.**

### 1. Design tokens (`src/index.css` + `tailwind.config.ts`)
- `--radius`: `2px` → `12px` (the single biggest visual upgrade — every card, input, button rounds at once).
- Tailwind `borderRadius` scale extended: `sm` 8 / `md` 10 / `lg` 12 / `xl` 16 / `2xl` 20 / `full`.
- Add a global smooth-transition rule on `*` (color/bg/border/shadow/transform, 150ms, ease-out cubic) and a 200ms variant for form inputs.
- Strip default focus outline in favor of the new ring style on `:focus-visible`.

### 2. Base UI primitives (`src/components/ui/`)
| File | Change |
|---|---|
| `input.tsx` | `h-12`, `rounded-xl`, white bg, `border-border/60`, soft `ring-primary/30` focus, 200ms transition |
| `select.tsx` | `SelectTrigger` matched to Input (h-12, rounded-xl, same focus ring) |
| `label.tsx` | `text-foreground/80`, `mb-1.5 block` for consistent label→field spacing |
| `button.tsx` | New variants: `default`/`outline`/`ghost` get `rounded-xl`, soft shadow, hover-shadow lift, `active:scale-[0.98]`. Sizes updated: `sm` h-8 / `default` h-10 / `lg` h-12 |
| `card.tsx` | `rounded-2xl`, softer `border-border/40`, layered green-tinted shadow that grows on hover; `CardContent` p-6, `CardHeader` p-6 pb-3 |

### 3. Step indicator (`src/components/ui/shared/StepIndicator.tsx`)
Replaced with a cleaner version: a thin progress bar above the dots with smooth width animation, then the numbered dots + labels row. Completed step shows a check, current step gets a primary ring.

### 4. Intake form polish
- **`GetStarted.tsx`** — outer wrapper gets a subtle gradient background (`from-cream via-background to-muted/20`); the inner form card upgraded to `rounded-2xl`, layered shadow, `border-border/40`, more breathing room.
- **`Step1Personal`, `Step2Health`, `Step3Goals`, `Step4Booking`** — outer container moves to `space-y-6`; field groups standardize to `space-y-1.5` (label/input pair). All Yes/No toggles in Step2 upgraded to `h-11 rounded-xl` pill toggles with shadow on selected state. Multi-select chips in Step2 (conditions) and Step3 (tried before) updated to `rounded-xl px-4 py-2.5` with shadow on selected state. `OptionCard` in Step4 already uses `rounded-xl` — bump to match new shadow language.

### 5. Homepage below-fold (`src/pages/Index.tsx`)
Per spec, polish only — no copy or section reorder:
- `HowItWorks` section gets `rounded-3xl overflow-hidden` wrapper around its gradient background, sits inside a container with vertical breathing room.
- `Medications` section bumps to `py-24` (already there) and the `MedCard` component picks up `rounded-2xl` (currently `rounded-[20px]`, near-equivalent — we'll align it to the new scale and add the hover shadow).
- **Skipped from spec:** the FAQ styling instruction — there is no FAQ accordion on the homepage, so nothing to apply it to. Will note this in the change summary.

### Risk / non-goals
- Radix `Select` content popover keeps default radius — fine, it picks up the new `--radius` automatically.
- Existing inline `style={{ borderRadius / background }}` on the homepage hero, membership, and stats sections is preserved (those are bespoke gradients we shouldn't touch).
- No functional code, no validation, no API calls, no routes touched. Intake flow keeps working identically.

### Files touched (12)
```
src/index.css
tailwind.config.ts
src/components/ui/input.tsx
src/components/ui/select.tsx
src/components/ui/label.tsx
src/components/ui/button.tsx
src/components/ui/card.tsx
src/components/ui/shared/StepIndicator.tsx
src/pages/GetStarted.tsx
src/components/intake/Step1Personal.tsx
src/components/intake/Step2Health.tsx
src/components/intake/Step3Goals.tsx
src/components/intake/Step4Booking.tsx
src/pages/Index.tsx
```
