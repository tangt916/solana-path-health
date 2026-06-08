import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SolanaHome } from "@/components/landing/SolanaHome";
import { SEO } from "@/components/SEO";

const Index = () => (
  <div className="min-h-screen bg-white">
    <SEO
      title="Solana Health — Feel better in your body"
      description="Personalized treatments for weight, hormones, longevity, hair, and wellness — guided by licensed US clinicians and delivered to your door."
      path="/"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Solana Health",
          url: "https://solanahealth.co",
        },
      ]}
    />
    <Header />
    <main>
      <SolanaHome />
    </main>
    <Footer />
  </div>
);

export default Index;
