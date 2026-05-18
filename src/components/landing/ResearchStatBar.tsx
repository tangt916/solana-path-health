import { useEffect, useState } from "react";

const STATS = [
  {
    quote:
      "GLP-1 medications produce 15–20% average body weight reduction in clinical trials.",
    source: "New England Journal of Medicine",
  },
  {
    quote:
      "NAD+ declines by up to 50% between ages 40–60, directly impacting energy and metabolism.",
    source: "Cell Metabolism",
  },
  {
    quote:
      "More than 1 in 3 women report significant fatigue, brain fog, or weight changes during hormonal transition.",
    source: "The Menopause Society",
  },
];

export const ResearchStatBar = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % STATS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="border-y border-border/60"
      style={{ background: "hsl(var(--sage-bg))" }}
    >
      <div className="container py-7 md:py-9">
        <div className="relative h-[88px] md:h-[68px]">
          {STATS.map((s, i) => (
            <figure
              key={s.source}
              className={`absolute inset-0 flex flex-col md:flex-row md:items-center md:justify-center gap-1 md:gap-4 text-center transition-opacity duration-700 ${
                i === idx ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={i !== idx}
            >
              <blockquote className="font-serif text-base md:text-lg italic text-foreground leading-snug max-w-3xl mx-auto">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <figcaption className="text-xs tracking-wide uppercase text-muted-foreground">
                — {s.source}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-1.5">
          {STATS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Show stat ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-6 bg-primary" : "w-1.5 bg-primary/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
