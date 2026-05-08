// Single source of truth for all treatment landing pages + intakes.
// Add a new treatment by appending to this array.

export type IntakeQuestionType = "single" | "multi" | "text";

export interface IntakeQuestion {
  id: string;
  label: string;
  helper?: string;
  type: IntakeQuestionType;
  options?: string[];
  required?: boolean;
}

export interface TreatmentFAQ {
  q: string;
  a: string;
}

export interface TreatmentConfig {
  slug: "weight-loss" | "anti-aging" | "hormone-therapy" | "hair-loss";
  name: string;                       // short label, e.g. "Weight loss"
  cardEyebrow: string;                // category label for cards
  // Hero
  heroEyebrow: string;
  heroProblem: string;                // big problem-led headline
  heroEmphasis: string;               // italic emphasized phrase
  heroSubcopy: string;
  heroBadges: string[];
  // Problem / Solution narrative
  problemTitle: string;
  problemBody: string;
  solutionTitle: string;
  solutionBody: string;
  solutionBullets: string[];
  // Who it's for (segments)
  segmentsTitle: string;
  segments: { title: string; body: string }[];
  // Benefits / What's included
  benefitsTitle: string;
  benefits: { title: string; body: string }[];
  // FAQ
  faqs: TreatmentFAQ[];
  // CTA
  ctaHeadline: string;
  ctaEmphasis: string;
  ctaButton: string;
  // Visual
  gradient: string;
  accent: string;                     // accent color for headings/emphasis
  // Intake
  intakeIntro: string;
  intakeQuestions: IntakeQuestion[];  // qualifying questions BEFORE contact info
  // If true, intake reuses the full 4-step weight-loss flow at /get-started/weight-loss
  useFullFlow?: boolean;
}

export const TREATMENTS: TreatmentConfig[] = [
  {
    slug: "weight-loss",
    name: "Weight loss",
    cardEyebrow: "Weight loss",
    heroEyebrow: "Sustainable weight loss",
    heroProblem: "Tired of diets that don't stick?",
    heroEmphasis: "Lose weight with the science.",
    heroSubcopy:
      "Physician-guided GLP-1 programs (semaglutide, tirzepatide) paired with nutrition and habit coaching. Built for people who've tried everything else.",
    heroBadges: ["🩺 Licensed US providers", "💊 GLP-1 if appropriate", "📦 Shipped to your door"],
    problemTitle: "You're doing the work — and the scale won't budge.",
    problemBody:
      "If you've cut calories, walked more, tried keto, intermittent fasting, and your body still resists weight loss — it isn't willpower. Hormones, age, genetics, and metabolism stack the deck against you. Modern medicine has tools that level the playing field.",
    solutionTitle: "A medical program built around your biology.",
    solutionBody:
      "A licensed provider reviews your health, decides if a GLP-1 medication is right for you, and pairs it with a coach who keeps you on track between visits.",
    solutionBullets: [
      "Compounded semaglutide or tirzepatide if appropriate",
      "Monthly provider check-ins included",
      "Nutrition + habit coaching, not just a prescription",
      "Cancel anytime — $179/month",
    ],
    segmentsTitle: "Built for the way you actually live.",
    segments: [
      { title: "The lifelong dieter", body: "You've tried Weight Watchers, keto, Whole30. The weight comes off — and comes right back. We break the cycle." },
      { title: "Postpartum or perimenopausal", body: "Hormone shifts changed how your body responds. We adjust the plan to your stage of life." },
      { title: "Busy professional", body: "No time for hours of meal prep or gym sessions. Telehealth visits and shipped meds fit your calendar." },
      { title: "Pre-diabetic or metabolic risk", body: "Weight is impacting bloodwork. A provider monitors your metabolic markers as you progress." },
    ],
    benefitsTitle: "What's included in your $179/month membership",
    benefits: [
      { title: "Provider visits", body: "Initial consult plus monthly follow-ups with a licensed clinician." },
      { title: "Medication (if prescribed)", body: "Compounded GLP-1 shipped discreetly. No pharmacy runs." },
      { title: "1:1 coaching", body: "A real human checks in on habits, side effects, and motivation." },
      { title: "Lab review", body: "Optional labs to track your metabolic health over time." },
    ],
    faqs: [
      { q: "Is GLP-1 medication safe?", a: "GLP-1 medications have been used for over a decade in diabetes care and are FDA-approved for chronic weight management. Compounded versions are not FDA-approved but are prescribed when clinically appropriate. Your provider will review your full health history before prescribing." },
      { q: "How fast will I lose weight?", a: "Most patients see 1–2 lbs per week after the dose is titrated. Total loss varies by person, starting weight, dose tolerance, and lifestyle. Results are not guaranteed." },
      { q: "What if it doesn't work for me?", a: "Cancel anytime. If a provider determines the medication isn't right for you, you're not charged for the prescription portion." },
      { q: "Are there side effects?", a: "The most common are mild nausea, constipation, or fatigue, typically in the first weeks. Your provider will work with you to manage them." },
    ],
    ctaHeadline: "Ready to stop fighting your body",
    ctaEmphasis: "and start working with it?",
    ctaButton: "Start my weight loss intake →",
    gradient: "linear-gradient(145deg, #e0ecda, #cce0c0)",
    accent: "#2d4a1e",
    useFullFlow: true,
    intakeIntro: "A few quick questions so a provider can see if you're a fit.",
    intakeQuestions: [], // weight loss uses the full 4-step flow
  },
  {
    slug: "anti-aging",
    name: "Anti-aging & longevity",
    cardEyebrow: "Anti-aging, skin & longevity",
    heroEyebrow: "NAD+, methylene blue & skincare",
    heroProblem: "Want sharper energy and skin that glows?",
    heroEmphasis: "Age on your terms.",
    heroSubcopy:
      "Longevity-focused protocols including NAD+ and methylene blue, alongside provider-guided skincare designed to support cellular health from the inside out.",
    heroBadges: ["⚡ NAD+ for cellular energy", "🧠 Methylene blue protocols", "✨ Provider-guided skincare"],
    problemTitle: "You don't feel as sharp — or look as fresh — as you used to.",
    problemBody:
      "Energy dips by mid-afternoon. Skin loses its bounce. Sleep doesn't restore the way it once did. These aren't just 'getting older' — they're signals that your cellular machinery needs support. The latest longevity science targets it directly.",
    solutionTitle: "A longevity stack, personalized to you.",
    solutionBody:
      "A provider reviews your goals and labs (optional) and designs a protocol that may include NAD+ for cellular energy, methylene blue for cognitive support, and a skincare regimen that complements internal protocols.",
    solutionBullets: [
      "NAD+ injections or oral protocols",
      "Methylene blue (low-dose, provider-guided)",
      "Targeted skincare for collagen + glow",
      "Optional longevity labs to track progress",
    ],
    segmentsTitle: "For people who want to feel as good as they look.",
    segments: [
      { title: "The high performer", body: "You need clean focus and stamina without stimulants. NAD+ and methylene blue support mitochondrial output." },
      { title: "Skincare obsessive", body: "You've tried every serum. We pair internal protocols with provider-grade skincare for results creams alone can't deliver." },
      { title: "Biohacker", body: "You track your sleep, HRV, and bloodwork. We layer in evidence-based longevity protocols to optimize what you measure." },
      { title: "40s and forward", body: "Energy and recovery aren't what they were. We target the cellular root, not just the symptoms." },
    ],
    benefitsTitle: "What a longevity membership includes",
    benefits: [
      { title: "Provider consult", body: "A clinician reviews your goals, history, and (optional) labs." },
      { title: "Personalized protocol", body: "Your stack — NAD+, methylene blue, skincare — built around what you actually want to change." },
      { title: "Care team support", body: "Questions answered between visits. Adjustments as your body responds." },
      { title: "Discreet shipping", body: "Everything delivered to your door on a schedule that works." },
    ],
    faqs: [
      { q: "Is methylene blue safe?", a: "Low-dose methylene blue has been studied for cognitive and mitochondrial support. It is not FDA-approved for longevity use and is prescribed off-label when a provider determines it's appropriate. Not for everyone — your provider will screen for contraindications." },
      { q: "What does NAD+ actually do?", a: "NAD+ is a coenzyme involved in cellular energy production. Levels decline with age. Supplementation aims to support mitochondrial function, but individual results vary." },
      { q: "Will I see skin results?", a: "Skin response is gradual — typically 6–12 weeks for visible changes. Results depend on starting condition, consistency, and lifestyle factors." },
      { q: "Do I need labs?", a: "Labs are optional but recommended for tracking. Your provider will tell you which markers matter for your goals." },
    ],
    ctaHeadline: "Ready to invest in",
    ctaEmphasis: "how you age?",
    ctaButton: "Start my longevity intake →",
    gradient: "linear-gradient(145deg, #ede5f5, #d8c8ec)",
    accent: "#5a3d8a",
    intakeIntro: "Tell us what you're optimizing for so a provider can tailor your protocol.",
    intakeQuestions: [
      {
        id: "primary_goal",
        label: "What's your top goal?",
        type: "single",
        required: true,
        options: [
          "More energy & focus",
          "Better skin & visible aging",
          "Cognitive performance",
          "General longevity / prevention",
        ],
      },
      {
        id: "interests",
        label: "Which protocols are you most interested in?",
        helper: "Select all that apply — your provider will recommend what fits.",
        type: "multi",
        options: ["NAD+", "Methylene blue", "Skincare regimen", "Not sure — guide me"],
      },
      {
        id: "experience",
        label: "Have you tried longevity protocols before?",
        type: "single",
        required: true,
        options: ["First time", "Some supplements", "Active biohacker"],
      },
    ],
  },
  {
    slug: "hormone-therapy",
    name: "Hormone therapy",
    cardEyebrow: "Perimenopause & menopause",
    heroEyebrow: "Hormone therapy for women",
    heroProblem: "Hot flashes, mood swings, can't sleep?",
    heroEmphasis: "You don't have to white-knuckle it.",
    heroSubcopy:
      "Personalized hormone therapy for women navigating perimenopause and menopause — designed around your symptoms, your stage, and your goals.",
    heroBadges: ["👩‍⚕️ Women's health providers", "🌙 Sleep, mood, libido", "🔬 Bioidentical options"],
    problemTitle: "Your body is changing — and 'just deal with it' isn't an answer.",
    problemBody:
      "Perimenopause can start in your late 30s. Sleep tanks. Periods get unpredictable. Mood, libido, and joint pain follow. Most women are told it's normal and sent home. Hormone therapy, when appropriate, can be life-changing.",
    solutionTitle: "Care that actually addresses what you're feeling.",
    solutionBody:
      "A licensed provider with women's health expertise reviews your symptoms and history and — if appropriate — prescribes a personalized hormone protocol. Bioidentical options available.",
    solutionBullets: [
      "Bioidentical estrogen, progesterone, testosterone (when indicated)",
      "Symptom-tracked dosing — adjusted as you go",
      "Provider check-ins for safety and fine-tuning",
      "Discreet, scheduled delivery",
    ],
    segmentsTitle: "Wherever you are in the transition, we meet you there.",
    segments: [
      { title: "Perimenopausal (late 30s–40s)", body: "Cycles changing, sleep slipping, mood shifting. Often the most under-treated stage." },
      { title: "Menopausal", body: "Hot flashes, night sweats, vaginal dryness, brain fog. Hormone therapy can directly address each." },
      { title: "Post-menopausal", body: "Bone, heart, and brain health become priorities. Long-term protocols designed for prevention." },
      { title: "Surgical menopause", body: "After hysterectomy or oophorectomy — symptoms hit fast and hard. Rapid, careful protocols matter." },
    ],
    benefitsTitle: "What hormone therapy with us looks like",
    benefits: [
      { title: "Provider intake", body: "A women's health clinician reviews symptoms, history, and goals." },
      { title: "Personalized protocol", body: "Bioidentical hormones if appropriate — adjusted to your symptoms." },
      { title: "Safety monitoring", body: "Regular check-ins to track response and screen for risks." },
      { title: "Ongoing support", body: "Message your care team between visits. No more guessing alone." },
    ],
    faqs: [
      { q: "Is hormone therapy safe?", a: "For most women starting within 10 years of menopause and without contraindications (e.g., certain cancers, blood clots), modern HT has a favorable risk/benefit profile. Your provider screens carefully and explains the trade-offs for your specific case." },
      { q: "What's bioidentical?", a: "Bioidentical hormones are molecularly identical to those your body produces. Many are FDA-approved; some compounded preparations are not. Your provider will explain the options." },
      { q: "Do I need labs?", a: "Symptom-based prescribing is the standard, but labs help personalize and monitor. Your provider will recommend what's appropriate." },
      { q: "How long until I feel better?", a: "Many women notice sleep and mood changes within 2–4 weeks. Hot flashes often improve in 4–8 weeks. Some symptoms take longer. Results vary." },
    ],
    ctaHeadline: "Ready to feel like",
    ctaEmphasis: "yourself again?",
    ctaButton: "Start my hormone intake →",
    gradient: "linear-gradient(145deg, #f5e0ea, #ecc8d8)",
    accent: "#8a3d5a",
    intakeIntro: "A few questions so we can match you with the right women's health provider.",
    intakeQuestions: [
      {
        id: "stage",
        label: "Where are you in the transition?",
        type: "single",
        required: true,
        options: ["Perimenopausal (cycles changing)", "Menopausal (no period 12+ months)", "Post-menopausal", "Surgical menopause", "Not sure"],
      },
      {
        id: "symptoms",
        label: "Which symptoms bother you most?",
        helper: "Select all that apply.",
        type: "multi",
        required: true,
        options: ["Hot flashes / night sweats", "Sleep problems", "Mood / anxiety", "Low libido", "Brain fog", "Joint pain", "Vaginal dryness", "Weight changes"],
      },
      {
        id: "tried_before",
        label: "Have you tried hormone therapy before?",
        type: "single",
        required: true,
        options: ["Never", "Tried, didn't work", "Currently on therapy", "Stopped recently"],
      },
    ],
  },
  {
    slug: "hair-loss",
    name: "Hair loss",
    cardEyebrow: "Hair loss",
    heroEyebrow: "Hair regrowth, prescribed",
    heroProblem: "Thinning hair or a receding hairline?",
    heroEmphasis: "Catch it early. Keep it thick.",
    heroSubcopy:
      "Clinically proven hair loss treatments prescribed by licensed providers — finasteride, minoxidil, and combinations tailored to your pattern of loss.",
    heroBadges: ["🩺 Provider-prescribed", "🔬 FDA-approved actives", "📦 Shipped monthly"],
    problemTitle: "Hair loss compounds. Every month you wait, you lose more.",
    problemBody:
      "Whether it's a slow-creeping hairline, a thinning crown, or sudden shedding — the science is clear: the earlier you treat, the more you can save (and regrow). The right combination, used consistently, works.",
    solutionTitle: "A protocol matched to your pattern of loss.",
    solutionBody:
      "Upload a few photos and answer a few questions. A licensed provider matches you to the right combination — oral, topical, or both — based on your hair pattern, age, and goals.",
    solutionBullets: [
      "Finasteride (oral or topical) for DHT-driven loss",
      "Minoxidil for follicle stimulation",
      "Combination formulas for compounding effect",
      "Discreet monthly shipments",
    ],
    segmentsTitle: "Whatever your pattern, we have a protocol.",
    segments: [
      { title: "Receding hairline", body: "Frontal and temple recession is the most common male pattern. Early intervention preserves coverage." },
      { title: "Crown thinning", body: "Vertex thinning responds well to combination therapy." },
      { title: "Diffuse shedding", body: "More common in women — often hormonal, stress, or genetic. Different protocols apply." },
      { title: "Post-pregnancy / postpartum", body: "Often resolves, but topical support speeds recovery." },
    ],
    benefitsTitle: "What's in your hair regrowth plan",
    benefits: [
      { title: "Photo + symptom intake", body: "A provider reviews your pattern from photos and history." },
      { title: "Personalized prescription", body: "Oral, topical, or both — the right combination for your case." },
      { title: "Monthly delivery", body: "Discreet shipping. No pharmacy runs, no awkward conversations." },
      { title: "Provider follow-up", body: "Photo check-ins to track regrowth and adjust as needed." },
    ],
    faqs: [
      { q: "How fast does it work?", a: "Most patients see less shedding in 3 months and visible thickening at 6–12 months. Full results take a year or more. Stopping treatment reverses gains." },
      { q: "Are there side effects?", a: "Finasteride has rare but possible sexual side effects in a small percentage of users. Minoxidil can cause initial shedding before regrowth. Your provider will review your full risk profile." },
      { q: "Will it work for women?", a: "Yes — but the protocols differ. We prescribe female-specific options where appropriate." },
      { q: "What if I stop?", a: "Hair loss resumes within months of stopping. Treatment is ongoing for sustained results." },
    ],
    ctaHeadline: "Ready to keep",
    ctaEmphasis: "the hair you have?",
    ctaButton: "Start my hair intake →",
    gradient: "linear-gradient(145deg, #e0e8f5, #c8d4ec)",
    accent: "#3d5a8a",
    intakeIntro: "A few questions so a provider can match the right protocol to your pattern.",
    intakeQuestions: [
      {
        id: "pattern",
        label: "Where are you noticing hair loss?",
        type: "multi",
        required: true,
        options: ["Hairline / temples", "Crown / top", "Overall thinning", "Sudden shedding", "Postpartum"],
      },
      {
        id: "duration",
        label: "How long has this been going on?",
        type: "single",
        required: true,
        options: ["Less than 6 months", "6–12 months", "1–3 years", "3+ years"],
      },
      {
        id: "tried",
        label: "Have you tried any treatments?",
        type: "multi",
        options: ["Over-the-counter minoxidil", "Finasteride", "Supplements", "Nothing yet"],
      },
    ],
  },
];

export const getTreatment = (slug: string): TreatmentConfig | undefined =>
  TREATMENTS.find((t) => t.slug === slug);
