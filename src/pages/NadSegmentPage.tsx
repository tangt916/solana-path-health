import { Navigate } from "react-router-dom";
import { getNadSegment, type NadSegmentConfig } from "@/config/nad-segments";
import { NadSegmentLanding } from "@/components/nad/NadSegmentLanding";

const NadSegmentPage = ({ slug }: { slug: NadSegmentConfig["slug"] }) => {
  const segment = getNadSegment(slug);
  if (!segment) return <Navigate to="/" replace />;
  return <NadSegmentLanding s={segment} />;
};

export default NadSegmentPage;
