import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ARTICLES } from "@/components/intake/problems-data";

interface Props {
  problems: string[];
}

export const RelevantArticles = ({ problems }: Props) => {
  const matched = useMemo(() => {
    if (!problems?.length) return ARTICLES.slice(0, 4);
    const scored = ARTICLES.map((a) => ({
      a,
      score: a.problems.filter((p) => problems.includes(p)).length,
    }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.a);
    return (scored.length ? scored : ARTICLES).slice(0, 4);
  }, [problems]);

  return (
    <section className="bg-white border border-border/40 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-end justify-between gap-3 mb-4">
        <div>
          <h2 className="font-serif text-xl text-foreground">Articles for you</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Hand-picked from your intake answers.
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {matched.map((a) => (
          <Link
            key={a.id}
            to="#"
            className="group block rounded-xl border border-border/50 p-4 hover:border-primary/40 hover:bg-muted/20 transition-all"
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">{a.readTime}</p>
            <h3 className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
              {a.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{a.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
