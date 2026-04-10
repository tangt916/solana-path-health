import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const TelehealthConsent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConsent = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setLoading(true);
    try {
      await supabase.from("consents").insert({
        user_id: user.id,
        consent_type: "telehealth",
        consent_text_version: "v1.0",
        agreed: true,
      });
      setAgreed(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container max-w-[680px] py-10 md:py-16">
        <div className="mb-6 rounded-md bg-amber-50 border border-amber-200 px-4 py-3 text-center">
          <p className="text-sm font-medium text-amber-800">DRAFT — Under legal review. Not yet effective.</p>
        </div>

        <h1 className="text-3xl font-light text-foreground mb-2">Informed Consent for Telehealth Services</h1>
        <p className="text-xs text-muted-foreground mb-10">Last updated: April 2026</p>

        <div className="prose-sm space-y-8 text-[14px] leading-[1.85] text-muted-foreground">
          <section>
            <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">What is Telehealth?</h2>
            <p>Telehealth involves the delivery of healthcare services using electronic communications, information technology, or other means between a healthcare provider and a patient who are not in the same physical location. This may include assessment of your medical history and symptoms, diagnosis, treatment recommendations, and prescribing of medication when clinically appropriate.</p>
          </section>

          <section>
            <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">Your Rights</h2>
            <p>As a patient receiving telehealth services, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Refuse telehealth services at any time without affecting your right to future care or treatment</li>
              <li>Seek in-person medical care at any time</li>
              <li>Request a referral to an in-person provider</li>
              <li>Expect that all applicable privacy protections will apply to your telehealth visit</li>
              <li>Ask questions about the telehealth process and your treatment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">Limitations of Telehealth</h2>
            <p>Telehealth has limitations compared to in-person visits. These include:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>The inability to perform a physical examination</li>
              <li>Potential technology failures that could delay care</li>
              <li>Limitations in the provider's ability to assess your condition without in-person observation</li>
              <li>The possibility that the provider may determine that telehealth is not appropriate for your situation and refer you to in-person care</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">Privacy Protections</h2>
            <p>Your telehealth consultations are conducted in a secure, HIPAA-compliant environment. All communications between you and your provider are encrypted. We maintain Business Associate Agreements with all technology partners involved in delivering telehealth services. Your health information will be treated with the same level of confidentiality as an in-person visit.</p>
          </section>

          <section className="pt-6 border-t border-border">
            {agreed ? (
              <div className="rounded-lg bg-green-50 border border-green-200 p-6 text-center">
                <p className="text-sm font-medium text-green-800">Thank you. Your consent has been recorded.</p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-sm text-foreground font-medium">By clicking below, you acknowledge that you have read, understand, and agree to the terms described above regarding telehealth services.</p>
                <Button onClick={handleConsent} disabled={loading} size="lg">
                  {loading ? "Recording..." : "I consent and agree"}
                </Button>
                {!user && (
                  <p className="text-xs text-muted-foreground">You'll need to sign in to record your consent.</p>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TelehealthConsent;
