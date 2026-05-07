import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const SafetyInfo = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="safety" className="py-12" style={{ background: '#f5f0e8', borderTop: '1px solid #cddbc6' }}>
      <div className="container max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.14em] mb-4" style={{ color: '#5a7060' }}>
          Important Safety Information
        </p>
        <p style={{ fontSize: '0.73rem', lineHeight: '1.8', color: '#5a7060' }}>
          <strong>WARNING: RISK OF THYROID C-CELL TUMORS.</strong> In rodent studies, semaglutide caused thyroid C-cell tumors. It is unknown whether semaglutide causes thyroid C-cell tumors, including medullary thyroid carcinoma (MTC), in humans. Semaglutide is contraindicated in patients with a personal or family history of MTC or in patients with Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).
        </p>

        {expanded && (
          <div className="mt-4 space-y-3" style={{ fontSize: '0.73rem', lineHeight: '1.8', color: '#5a7060' }}>
            <p><strong>Pancreatitis:</strong> Acute pancreatitis, including fatal and non-fatal hemorrhagic or necrotizing pancreatitis, has been observed. Discontinue promptly if pancreatitis is suspected.</p>
            <p><strong>Gallbladder problems:</strong> Cholelithiasis and cholecystitis have been reported. If suspected, gallbladder studies are indicated.</p>
            <p><strong>Heart rate increase:</strong> Mean increases in resting heart rate of 1 to 4 beats per minute were observed. Monitor heart rate at regular intervals.</p>
            <p><strong>Suicidal behavior and ideation:</strong> Monitor for depression or suicidal thoughts. Discontinue if symptoms develop.</p>
            <p><strong>Kidney injury:</strong> Has been reported, usually in association with nausea, vomiting, and diarrhea. Use caution in patients with renal impairment.</p>
            <p><strong>Serious allergic reactions:</strong> Anaphylaxis and angioedema have been reported. Discontinue and seek medical attention if suspected.</p>
            <p><strong>Pregnancy:</strong> May cause fetal harm. Discontinue at least 2 months before a planned pregnancy.</p>
            <p><strong>Indication:</strong> Semaglutide 2.4 mg injection is indicated as an adjunct to a reduced-calorie diet and increased physical activity for chronic weight management in adults with an initial BMI of ≥30 kg/m² (obesity), or ≥27 kg/m² (overweight) in the presence of at least one weight-related comorbid condition.</p>
            <p>Please see full Prescribing Information, including Boxed Warning, at the prescriber's discretion.</p>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: '#4a6e52' }}
        >
          {expanded ? (<>See less <ChevronUp className="h-4 w-4" /></>) : (<>See more <ChevronDown className="h-4 w-4" /></>)}
        </button>
      </div>
    </section>
  );
};
