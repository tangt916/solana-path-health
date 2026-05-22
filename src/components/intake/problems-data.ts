// Master list of problems used in:
//   1. Step 0 of intake (multi-select)
//   2. Dashboard "Articles for you" filtering
//   3. marketing_leads.problems for retargeting segmentation
export interface ProblemOption {
  slug: string;
  label: string;
  description: string;
  emoji: string;
}

export const PROBLEM_OPTIONS: ProblemOption[] = [
  { slug: "weight",      label: "Weight that won't budge",     description: "Stalled progress despite diet and exercise",       emoji: "⚖️" },
  { slug: "energy",      label: "Low energy or fatigue",        description: "Tired even after a full night's sleep",            emoji: "🔋" },
  { slug: "hormones",    label: "Hormone shifts",               description: "Cycle, mood, libido, or perimenopause symptoms",   emoji: "🌗" },
  { slug: "sleep",       label: "Poor sleep",                   description: "Trouble falling or staying asleep",                emoji: "🌙" },
  { slug: "skin",        label: "Skin & visible aging",         description: "Fine lines, dullness, loss of firmness",           emoji: "✨" },
  { slug: "recovery",    label: "Slow recovery",                description: "Joints, soft tissue, post-workout soreness",        emoji: "🦵" },
  { slug: "libido",      label: "Sexual health",                description: "Desire, arousal, or performance concerns",         emoji: "❤️‍🔥" },
  { slug: "longevity",   label: "Longevity & prevention",       description: "Get ahead of decline before it shows up",          emoji: "🧬" },
  { slug: "mood",        label: "Mood & focus",                 description: "Anxiety, irritability, or mental fog",             emoji: "🧠" },
  { slug: "hair",        label: "Hair thinning",                description: "Density, shedding, or texture changes",            emoji: "💇" },
];

export const ARTICLES: Array<{
  id: string;
  problems: string[]; // matches PROBLEM_OPTIONS.slug
  title: string;
  excerpt: string;
  readTime: string;
}> = [
  { id: "metabolic-101",     problems: ["weight"],             title: "Why willpower isn't the problem: a primer on metabolic resistance", excerpt: "How insulin, ghrelin, and leptin actually drive weight — and what GLP-1 protocols address.", readTime: "6 min" },
  { id: "glp1-myths",        problems: ["weight"],             title: "5 GLP-1 myths your friends are repeating", excerpt: "Cutting through TikTok-grade misinformation about Ozempic, Wegovy, and compounded options.", readTime: "5 min" },
  { id: "perimenopause-map", problems: ["hormones", "mood"],   title: "The perimenopause symptom map most women are never given", excerpt: "If you're between 35 and 55, these patterns are not in your head.", readTime: "7 min" },
  { id: "estrogen-explained",problems: ["hormones"],           title: "Bioidentical vs synthetic hormones, explained simply", excerpt: "What the labels mean, what the research says, and how to talk to your provider.", readTime: "4 min" },
  { id: "nad-energy",        problems: ["energy", "longevity"],title: "NAD+ and the energy story your cells are telling you", excerpt: "Why levels decline with age and what protocols are studied to support them.", readTime: "5 min" },
  { id: "sleep-recovery",    problems: ["sleep", "recovery"],  title: "Sleep is the foundation of every other goal", excerpt: "Protocols, peptides, and habits used to support deeper restorative sleep.", readTime: "6 min" },
  { id: "ghk-cu-skin",       problems: ["skin"],               title: "GHK-Cu and the science of skin that looks like skin", excerpt: "A primer on the copper peptide and where it fits in a maintenance protocol.", readTime: "4 min" },
  { id: "libido-women",      problems: ["libido", "hormones"], title: "Sexual wellness isn't a luxury — it's a vital sign", excerpt: "Why desire changes, and what's actually treatable.", readTime: "5 min" },
  { id: "longevity-stack",   problems: ["longevity"],          title: "Building a longevity stack without falling for hype", excerpt: "Three categories of intervention with the most defensible evidence today.", readTime: "8 min" },
  { id: "recovery-tissue",   problems: ["recovery"],           title: "Peptides used in protocols supporting tissue recovery", excerpt: "What the literature does and doesn't say about BPC-157, TB-500, and others.", readTime: "6 min" },
  { id: "hair-density",      problems: ["hair"],               title: "Why hair changes (and what's actually in your control)", excerpt: "Hormonal, nutritional, and follicular factors at a glance.", readTime: "4 min" },
];
