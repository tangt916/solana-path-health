import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Terms = () => (
  <div className="min-h-screen bg-muted/30">
    <Header />
    <div className="container max-w-[680px] py-10 md:py-16">
      <div className="mb-6 rounded-md bg-amber-50 border border-amber-200 px-4 py-3 text-center">
        <p className="text-sm font-medium text-amber-800">DRAFT — Under legal review. Not yet effective.</p>
      </div>

      <h1 className="text-3xl font-light text-foreground mb-2">Terms of Service</h1>
      <p className="text-xs text-muted-foreground mb-10">Last updated: April 2026</p>

      <div className="prose-sm space-y-8 text-[14px] leading-[1.85] text-muted-foreground">
        <section>
          <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">Eligibility</h2>
          <p>To use Solana Health services, you must be at least 18 years of age, a resident of the United States, and located in a state where our services are available. By creating an account, you represent that you meet these requirements.</p>
        </section>

        <section>
          <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">Not a Medical Practice</h2>
          <p>Solana Health is a technology platform that connects patients with independent licensed healthcare providers. Solana Health does not practice medicine. All clinical decisions, including whether to prescribe medication, are made solely by the independent licensed provider reviewing your case. Solana Health does not guarantee that you will receive a prescription.</p>
        </section>

        <section>
          <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">Subscription Terms</h2>
          <p>Our services are provided on a monthly subscription basis at the rate displayed at the time of enrollment. Your subscription renews automatically each month until cancelled. You may cancel your subscription at any time from your account dashboard. Cancellation takes effect at the end of your current billing period.</p>
          <p className="mt-3">Refunds are provided only when a licensed provider declines your application for treatment. In such cases, a full refund will be issued to your original payment method.</p>
        </section>

        <section>
          <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, Solana Health and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of our services.</p>
          <p className="mt-3">Solana Health does not guarantee any specific health outcomes. Results from GLP-1 medications vary between individuals and depend on many factors including adherence, lifestyle, and individual physiology.</p>
        </section>

        <section>
          <h2 className="text-[22px] font-light text-foreground mt-10 mb-4">Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts located in the State of Delaware.</p>
        </section>
      </div>
    </div>
    <Footer />
  </div>
);

export default Terms;
