import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Privacy = () => (
  <div className="min-h-screen bg-muted/30">
    <Header />
    <div className="container max-w-[680px] py-10 md:py-16">
      <div className="mb-6 rounded-md bg-amber-50 border border-amber-200 px-4 py-3 text-center">
        <p className="text-sm font-medium text-amber-800">DRAFT — Under legal review. Not yet effective.</p>
      </div>

      <h1 className="text-3xl font-light text-foreground mb-2">Privacy Policy</h1>
      <p className="text-xs text-muted-foreground mb-10">Last updated: April 2026</p>

      <div className="prose-sm space-y-8 text-[14px] leading-[1.85] text-muted-foreground">
        <section>
          <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">What Information We Collect</h2>
          <p>We collect the following categories of information when you use our services:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Personal identifiers: name, email address, date of birth, phone number</li>
            <li>Health intake data: medical history, current medications, height, weight, health conditions</li>
            <li>Payment information: processed securely through our payment processor (Stripe). We do not store full credit card numbers.</li>
            <li>Usage data: pages visited, interactions with our platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">How We Use Your Information</h2>
          <p>Your information is used to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Facilitate clinical review of your health intake by licensed providers</li>
            <li>Coordinate medication dispensing and delivery through licensed pharmacies</li>
            <li>Process payments and manage your subscription</li>
            <li>Communicate with you about your care and account</li>
            <li>Improve our platform and services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">HIPAA Compliance</h2>
          <p>Solana Health maintains Business Associate Agreements with all partners who may access protected health information in accordance with HIPAA. Your health data is encrypted in transit and at rest, and access is restricted to authorized personnel involved in your care.</p>
        </section>

        <section>
          <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Access the personal and health information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data, subject to legal retention requirements</li>
            <li>Opt out of non-essential communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">Data Retention</h2>
          <p>We retain health intake data for a minimum of 7 years in compliance with healthcare record retention requirements. Payment records are retained as required by applicable financial regulations. You may request deletion of non-medical personal data at any time.</p>
        </section>

        <section>
          <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">Contact</h2>
          <p>For privacy-related inquiries, please contact us at: <a href="mailto:privacy@solanahealth.com" className="text-primary hover:underline">privacy@solanahealth.com</a></p>
        </section>
      </div>
    </div>
    <Footer />
  </div>
);

export default Privacy;
