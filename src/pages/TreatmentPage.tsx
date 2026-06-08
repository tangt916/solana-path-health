import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getTreatment } from "@/config/treatments";
import { TreatmentLanding } from "@/components/treatment/TreatmentLanding";
import { MetabolicLanding } from "@/components/treatment/MetabolicLanding";
import { HormoneLanding } from "@/components/treatment/HormoneLanding";
import { PeptidesLanding } from "@/components/treatment/PeptidesLanding";
import { trackEvent } from "@/lib/analytics";
import { SEO } from "@/components/SEO";

const TreatmentPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const t = getTreatment(slug);

  useEffect(() => {
    if (t) trackEvent("treatment_page_viewed", { treatment: t.slug });
  }, [t]);

  if (!t) return <Navigate to="/" replace />;

  const title = `${t.name} — ${t.heroEmphasis.replace(/\.$/, "")} | Solana Health`;
  const description = t.heroSubcopy.slice(0, 158);

  return (
    <>
      <SEO
        title={title}
        description={description}
        path={`/treatments/${t.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      {t.slug === "weight-loss" ? (
        <MetabolicLanding />
      ) : t.slug === "hormone-therapy" ? (
        <HormoneLanding />
      ) : t.slug === "anti-aging" ? (
        <PeptidesLanding />
      ) : (
        <TreatmentLanding t={t} />
      )}
    </>
  );
};

export default TreatmentPage;
