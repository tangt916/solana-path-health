// NAD+ segment landing pages — conversion-focused, NO site navigation.
// Each page targets a single audience segment.

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

export interface NadFAQ {
  q: string;
  a: string;
}

export interface PricingTier {
  name: string;
  price: string;
  cadence: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
}

export interface NadSegmentConfig {
  slug: "nad-weight-loss" | "nad-energy" | "nad-anti-aging";
  metaTitle: string;
  metaDescription: string;
  // Hero
  heroEyebrow: string;
  heroHeadline: string;
  heroEmphasis: string;
  heroSubcopy: string;
  heroBadges: string[];
  // Problem
  problemTitle: string;
  problemBody: string;
  problemBullets: string[];
  // Solution
  solutionTitle: string;
  solutionBody: string;
  solutionBullets: { title: string; body: string }[];
  // Testimonials
  testimonialsTitle: string;
  testimonials: Testimonial[];
  // FAQ
  faqs: NadFAQ[];
  // Pricing
  pricingTitle: string;
  pricingSubcopy: string;
  pricing: PricingTier[];
  // CTA
  ctaHeadline: string;
  ctaEmphasis: string;
  ctaButton: string;
  ctaFootnote: string;
  // Visual
  gradient: string;
  accent: string;          // strong text accent
  accentSoft: string;      // softer accent for CTA emphasis on dark bg
}

const COMMON_DISCLAIMER =
  "NAD+ is not FDA-approved for weight loss, energy, or anti-aging indications and is prescribed off-label when a licensed provider determines it's appropriate. Results vary. Not a substitute for diet, sleep, or medical care.";

export const NAD_SEGMENTS: NadSegmentConfig[] = [
  {
    slug: "nad-weight-loss",
    metaTitle: "NAD+ for Stubborn Weight Loss in Women | Solana Health",
    metaDescription:
      "Stuck on the scale despite doing everything right? NAD+ targets the cellular metabolism behind stalled weight loss in women. Provider-guided protocols from $179/mo.",
    heroEyebrow: "NAD+ for women stuck on weight loss",
    heroHeadline: "Doing everything right and the scale still won't move?",
    heroEmphasis: "Your cells may be the missing piece.",
    heroSubcopy:
      "If you're eating clean, walking daily, sleeping enough — and the weight still won't budge — your metabolism may be running on empty at the cellular level. NAD+ supports the mitochondrial energy your body needs to burn fat efficiently.",
    heroBadges: ["⚡ Cellular metabolism support", "🩺 Licensed US providers", "📦 Shipped to your door"],
    problemTitle: "You've tried everything. Your body still resists.",
    problemBody:
      "After 35, NAD+ levels drop sharply — sometimes by more than half. NAD+ is what your mitochondria use to convert food into energy and burn stored fat. When it falls, your metabolism quietly slows, fat oxidation drops, and the same habits stop working.",
    problemBullets: [
      "You're 1,500 calories in and still gaining",
      "Workouts leave you exhausted instead of energized",
      "Cravings and afternoon crashes feel impossible to override",
      "GLP-1s alone didn't fully work — or stalled out",
    ],
    solutionTitle: "Restore the cellular engine behind weight loss.",
    solutionBody:
      "A provider reviews your history and — if appropriate — designs an NAD+ protocol that targets the metabolic slowdown driving your stall. Used alongside lifestyle (or a GLP-1, when prescribed), it's the missing layer most weight-loss plans skip.",
    solutionBullets: [
      { title: "Cellular energy", body: "NAD+ fuels the mitochondria that burn fat for energy." },
      { title: "Metabolic support", body: "Helps your body actually use the calories you eat instead of storing them." },
      { title: "Fewer crashes", body: "Many women report steadier energy and fewer cravings within weeks." },
      { title: "Stacks with GLP-1", body: "Works alongside semaglutide / tirzepatide when clinically appropriate." },
    ],
    testimonialsTitle: "Real women, real plateaus broken.",
    testimonials: [
      {
        quote:
          "I'd been stuck at the same weight for 14 months. Two months on NAD+ and I'm down 9 pounds without changing my food.",
        name: "Sarah M.",
        detail: "42, perimenopausal",
      },
      {
        quote:
          "My GLP-1 stopped working after month 4. Adding NAD+ got me out of the plateau — and I have energy to actually work out again.",
        name: "Lauren T.",
        detail: "38, busy mom of 3",
      },
      {
        quote:
          "I expected another supplement that did nothing. Instead I feel like my metabolism finally turned back on.",
        name: "Priya R.",
        detail: "45, hit a 2-year plateau",
      },
      {
        quote:
          "The 3pm crash is gone. So is the night-time snacking. The scale just started moving on its own.",
        name: "Megan K.",
        detail: "40, lifelong dieter",
      },
    ],
    faqs: [
      {
        q: "How is NAD+ different from a GLP-1?",
        a: "GLP-1s primarily suppress appetite and slow digestion. NAD+ works upstream — supporting the mitochondria that burn fat for energy. Many women use them together; some use NAD+ alone if a GLP-1 isn't right for them.",
      },
      {
        q: "How fast will I see results?",
        a: "Most women notice better energy and fewer cravings within 2–4 weeks. Scale changes typically follow over 6–12 weeks. Results vary by person, baseline, and consistency.",
      },
      {
        q: "Is NAD+ safe?",
        a: "NAD+ has a strong safety profile in the published literature. It is not FDA-approved for weight loss and is prescribed off-label when a provider determines it's appropriate. Your provider screens for contraindications first.",
      },
      {
        q: "Do I have to inject it?",
        a: "Both injection and oral protocols exist. Your provider will recommend the form that fits your goals and tolerance.",
      },
      {
        q: "What if it doesn't work for me?",
        a: "Cancel anytime. You're never locked in. If your provider determines NAD+ isn't right for you, you won't be charged for that prescription.",
      },
      {
        q: "Can I take this with my GLP-1?",
        a: "In most cases, yes — and many patients see better results from the combination. Your provider will confirm it's safe given your current medications.",
      },
    ],
    pricingTitle: "One simple membership.",
    pricingSubcopy: "Provider visits, your protocol, and ongoing support — all in.",
    pricing: [
      {
        name: "Monthly",
        price: "$179",
        cadence: "/month",
        features: [
          "Provider consult + monthly follow-ups",
          "Personalized NAD+ protocol",
          "Medication shipped discreetly",
          "Message your care team anytime",
          "Cancel anytime",
        ],
        highlight: true,
        badge: "Most popular",
      },
      {
        name: "Quarterly",
        price: "$149",
        cadence: "/month, billed quarterly",
        features: [
          "Everything in Monthly",
          "Save $90/year",
          "Priority shipping",
          "Cancel anytime",
        ],
      },
    ],
    ctaHeadline: "Ready to stop fighting the scale",
    ctaEmphasis: "and start feeling like yourself?",
    ctaButton: "Start my intake →",
    ctaFootnote: COMMON_DISCLAIMER,
    gradient: "linear-gradient(145deg, #e0ecda, #cce0c0)",
    accent: "#2d4a1e",
    accentSoft: "#b8e070",
  },
  {
    slug: "nad-energy",
    metaTitle: "NAD+ for Exhausted Women | Solana Health",
    metaDescription:
      "If you wake up tired and crash by 2pm, your cells may be running low on NAD+. Provider-guided protocols to restore real, steady energy. From $179/mo.",
    heroEyebrow: "NAD+ for women who are exhausted",
    heroHeadline: "Tired of being tired —",
    heroEmphasis: "even after a full night's sleep?",
    heroSubcopy:
      "It's not laziness, it's not depression, and it's not just stress. NAD+ levels can drop more than 50% by your 40s — and when they do, no amount of coffee, sleep, or supplements brings the energy back. Provider-guided NAD+ protocols can.",
    heroBadges: ["☕ Beyond caffeine", "🩺 Licensed US providers", "🔋 Cellular-level energy"],
    problemTitle: "You don't have a willpower problem. You have a mitochondria problem.",
    problemBody:
      "Your mitochondria make every unit of energy your body runs on — and they need NAD+ to do it. When NAD+ falls, mitochondria sputter. The result is the exhaustion you've been told to just push through.",
    problemBullets: [
      "Waking up tired no matter how long you sleep",
      "Crashing by 2pm — caffeine barely touches it",
      "Brain fog that makes simple decisions feel hard",
      "Workouts that wreck you for two days after",
    ],
    solutionTitle: "Refill the battery your body actually runs on.",
    solutionBody:
      "A licensed provider reviews your history and designs an NAD+ protocol that targets the underlying cellular exhaustion — not the symptoms on top of it. Most women feel the difference within weeks.",
    solutionBullets: [
      { title: "Steady, clean energy", body: "No spikes, no crashes — just a higher baseline." },
      { title: "Sharper focus", body: "Mitochondria fuel your brain too. Many women report lifting brain fog." },
      { title: "Faster recovery", body: "Workouts and stress don't wipe you out the way they used to." },
      { title: "Better sleep", body: "Restorative sleep returns when your cells aren't running a deficit." },
    ],
    testimonialsTitle: "Real women, real energy back.",
    testimonials: [
      {
        quote:
          "I cried the first week. Not because anything was wrong — because I finally felt like myself again for the first time in 5 years.",
        name: "Andrea L.",
        detail: "44, mother of 2",
      },
      {
        quote:
          "I used to schedule a nap into every weekend. Three weeks in, I genuinely don't need it.",
        name: "Jenna P.",
        detail: "39, project manager",
      },
      {
        quote:
          "I thought it was burnout. Turns out my cells were running on fumes. The brain fog cleared first — it was wild.",
        name: "Rachel D.",
        detail: "41, attorney",
      },
      {
        quote:
          "I cut my coffee in half and have more energy than I did on 4 cups a day.",
        name: "Olivia S.",
        detail: "37, founder",
      },
      {
        quote:
          "First afternoon in years where I didn't hit a wall. By week 6, that's just my normal.",
        name: "Daniela R.",
        detail: "46, peri-menopausal",
      },
    ],
    faqs: [
      {
        q: "How is this different from caffeine or B-vitamins?",
        a: "Caffeine masks fatigue by blocking adenosine; B-vitamins are cofactors. NAD+ is the actual molecule your mitochondria use to produce cellular energy. You can't replace it with stimulants.",
      },
      {
        q: "When will I feel a difference?",
        a: "Many women feel a noticeable shift in 2–3 weeks. Brain fog often lifts first. Full effects build over 8–12 weeks of consistent use.",
      },
      {
        q: "Is NAD+ safe?",
        a: "NAD+ has a strong safety profile in published research. It is not FDA-approved for fatigue and is prescribed off-label when a provider determines it's appropriate. Your provider screens you first.",
      },
      {
        q: "Will it keep me up at night?",
        a: "No. NAD+ supports your body's own energy production — it's not a stimulant. Many women actually report better sleep.",
      },
      {
        q: "Can I take it with my other medications?",
        a: "In most cases, yes. Your provider will review your medications and confirm it's safe for you.",
      },
      {
        q: "What if it doesn't work?",
        a: "Cancel anytime. You're never locked in. If your provider determines NAD+ isn't right for you, you won't be charged for that prescription.",
      },
    ],
    pricingTitle: "One simple membership.",
    pricingSubcopy: "Provider care, your NAD+ protocol, and ongoing support — all in.",
    pricing: [
      {
        name: "Monthly",
        price: "$179",
        cadence: "/month",
        features: [
          "Provider consult + monthly follow-ups",
          "Personalized NAD+ protocol",
          "Medication shipped discreetly",
          "Message your care team anytime",
          "Cancel anytime",
        ],
        highlight: true,
        badge: "Most popular",
      },
      {
        name: "Quarterly",
        price: "$149",
        cadence: "/month, billed quarterly",
        features: [
          "Everything in Monthly",
          "Save $90/year",
          "Priority shipping",
          "Cancel anytime",
        ],
      },
    ],
    ctaHeadline: "Ready to get",
    ctaEmphasis: "your energy back?",
    ctaButton: "Start my intake →",
    ctaFootnote: COMMON_DISCLAIMER,
    gradient: "linear-gradient(145deg, #ede5f5, #d8c8ec)",
    accent: "#5a3d8a",
    accentSoft: "#d4b8ff",
  },
  {
    slug: "nad-anti-aging",
    metaTitle: "NAD+ for Anti-Aging in Women | Solana Health",
    metaDescription:
      "NAD+ targets cellular aging at the source — supporting skin, energy, and DNA repair. Provider-guided anti-aging protocols for women. From $179/mo.",
    heroEyebrow: "NAD+ for women aging on their terms",
    heroHeadline: "Want to age",
    heroEmphasis: "more slowly — not gracefully?",
    heroSubcopy:
      "Aging happens at the cellular level. NAD+ is one of the most-studied molecules in modern longevity science — supporting DNA repair, mitochondrial health, and the very systems that show their wear on your face, your sleep, and your energy.",
    heroBadges: ["🧬 DNA repair support", "✨ Cellular longevity", "🩺 Provider-guided"],
    problemTitle: "You're doing all the surface work. The slowdown is underneath.",
    problemBody:
      "Retinols and red light are wonderful — but they treat the outside of a process happening on the inside. NAD+ powers the cellular machinery that repairs DNA, recycles damaged proteins, and maintains the systems that make you look and feel younger.",
    problemBullets: [
      "Skin doesn't bounce back the way it used to",
      "Recovery from a night out or a workout takes longer",
      "Hair, nails, and energy feel like they're 'thinning'",
      "Sleep is shorter — and less restorative",
    ],
    solutionTitle: "Target aging where it actually starts.",
    solutionBody:
      "A provider designs a longevity-focused NAD+ protocol around your goals and (optional) labs. Used consistently, it supports the cellular processes that determine how your body — and skin — ages over time.",
    solutionBullets: [
      { title: "Cellular repair", body: "NAD+ fuels the enzymes (sirtuins, PARPs) that repair DNA damage." },
      { title: "Skin from within", body: "Supports the collagen-producing cells topical products can't reach." },
      { title: "Resilience", body: "Cells handle stress better — recovery from late nights and tough workouts improves." },
      { title: "Long-game", body: "Built for steady, compounding effects over 6–12 months and beyond." },
    ],
    testimonialsTitle: "Real women, real results.",
    testimonials: [
      {
        quote:
          "Three months in, my esthetician asked what I'd changed. My skin literally looks different in photos.",
        name: "Christina W.",
        detail: "47, marketing exec",
      },
      {
        quote:
          "I'm sleeping deeper, recovering from workouts faster, and the under-eye hollows that crept in during my 40s are filling back in.",
        name: "Vanessa A.",
        detail: "49, fitness coach",
      },
      {
        quote:
          "I track everything — sleep, HRV, glucose. NAD+ moved every marker in the right direction within 6 weeks.",
        name: "Hannah Q.",
        detail: "43, biohacker",
      },
      {
        quote:
          "I don't look 'frozen,' I look rested. My friends think I changed my skincare. It's not the skincare.",
        name: "Brooke L.",
        detail: "45, founder",
      },
    ],
    faqs: [
      {
        q: "What does NAD+ actually do for aging?",
        a: "NAD+ powers sirtuins and PARP enzymes — the proteins that repair DNA damage and regulate cellular aging. Levels decline sharply with age; supporting them is one of the most studied levers in longevity research.",
      },
      {
        q: "Is this a replacement for skincare?",
        a: "No — it's the layer underneath. NAD+ supports the cells that make collagen and repair sun and oxidative damage. It works best paired with strong topical and lifestyle basics.",
      },
      {
        q: "How soon will I see skin results?",
        a: "Skin turnover takes 6–12 weeks, so most women notice meaningful changes around the 3-month mark and continued improvement over a year.",
      },
      {
        q: "Is it safe long-term?",
        a: "NAD+ has a strong safety record in published research. It is not FDA-approved as an anti-aging therapy and is prescribed off-label when appropriate. Your provider screens for contraindications and monitors you over time.",
      },
      {
        q: "Do I need labs?",
        a: "Optional but helpful. Labs let your provider personalize your protocol and track progress on the markers that matter for you.",
      },
      {
        q: "What if I want to stop?",
        a: "Cancel anytime. There's no detox or rebound — your body simply returns to its baseline.",
      },
    ],
    pricingTitle: "One simple membership.",
    pricingSubcopy: "Provider care, your NAD+ longevity protocol, and ongoing support — all in.",
    pricing: [
      {
        name: "Monthly",
        price: "$179",
        cadence: "/month",
        features: [
          "Provider consult + monthly follow-ups",
          "Personalized NAD+ longevity protocol",
          "Medication shipped discreetly",
          "Message your care team anytime",
          "Cancel anytime",
        ],
        highlight: true,
        badge: "Most popular",
      },
      {
        name: "Quarterly",
        price: "$149",
        cadence: "/month, billed quarterly",
        features: [
          "Everything in Monthly",
          "Save $90/year",
          "Priority shipping",
          "Cancel anytime",
        ],
      },
    ],
    ctaHeadline: "Ready to age",
    ctaEmphasis: "on your terms?",
    ctaButton: "Start my intake →",
    ctaFootnote: COMMON_DISCLAIMER,
    gradient: "linear-gradient(145deg, #f5e0ea, #ecc8d8)",
    accent: "#8a3d5a",
    accentSoft: "#ffc8dd",
  },
];

export const getNadSegment = (slug: string) =>
  NAD_SEGMENTS.find((s) => s.slug === slug);
