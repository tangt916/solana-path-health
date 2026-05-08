import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getTreatment } from "@/config/treatments";
import { TreatmentLanding } from "@/components/treatment/TreatmentLanding";
import { trackEvent } from "@/lib/analytics";

const TreatmentPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const t = getTreatment(slug);

  useEffect(() => {
    if (t) {
      trackEvent("treatment_page_viewed", { treatment: t.slug });
      document.title = `${t.name} — Solana Health`;
    }
  }, [t]);

  if (!t) return <Navigate to="/" replace />;
  return <TreatmentLanding t={t} />;
};

export default TreatmentPage;
