import { useParams, Navigate } from "react-router-dom";
import { getNadSegment } from "@/config/nad-segments";
import { NadSegmentLanding } from "@/components/nad/NadSegmentLanding";

const NadSegmentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const segment = slug ? getNadSegment(slug) : undefined;
  if (!segment) return <Navigate to="/" replace />;
  return <NadSegmentLanding s={segment} />;
};

export default NadSegmentPage;
