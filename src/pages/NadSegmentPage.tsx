import { Navigate } from "react-router-dom";
import { getNadSegment, type NadSegmentConfig } from "@/config/nad-segments";
import { NadSegmentLanding } from "@/components/nad/NadSegmentLanding";
import { SEO } from "@/components/SEO";

const NadSegmentPage = ({ slug }: { slug: NadSegmentConfig["slug"] }) => {
  const segment = getNadSegment(slug);
  if (!segment) return <Navigate to="/" replace />;
  return (
    <>
      <SEO
        title={segment.metaTitle}
        description={segment.metaDescription}
        path={`/${segment.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: segment.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <NadSegmentLanding s={segment} />
    </>
  );
};

export default NadSegmentPage;
