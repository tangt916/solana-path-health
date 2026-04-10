import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const faqs = [
  {
    q: "What are GLP-1 medications?",
    a: "GLP-1 (glucagon-like peptide-1) receptor agonists are a class of prescription medications originally developed to treat type 2 diabetes. Certain GLP-1 medications have also received FDA approval for chronic weight management in eligible adults. GLP-1 medications are only available by prescription from a licensed healthcare provider.",
  },
  {
    q: "How does the Solana Health program work?",
    a: "Complete a brief health intake questionnaire. A licensed, independent healthcare provider will review your responses and determine whether a GLP-1 prescription is clinically appropriate for you. If approved, your medication is dispensed by a licensed pharmacy and shipped directly to your door. All prescribing decisions are made solely by the reviewing provider. We do not guarantee approval.",
  },
  {
    q: "Is GLP-1 treatment right for me?",
    a: "Only a licensed healthcare provider can determine whether GLP-1 treatment is appropriate for your individual health situation. Our program connects you with independent licensed providers who review your complete health history. Treatment eligibility is assessed on a case-by-case basis. Not all applicants will be approved.",
  },
  {
    q: "What results can I expect?",
    a: "Results vary significantly between individuals. GLP-1 medications are not a guaranteed weight loss solution. Clinical studies have shown that GLP-1 medications can support weight management when combined with a reduced-calorie diet and increased physical activity, but individual outcomes depend on many factors including adherence, lifestyle, dosage, and individual physiology. Your provider will discuss realistic expectations with you.",
  },
  {
    q: "How long does the approval process take?",
    a: "Most intake reviews are completed within 24–48 business hours. You will be notified by email once a provider has reviewed your case. If additional information is needed, the provider may reach out directly.",
  },
  {
    q: "What if my application is not approved?",
    a: "If a licensed provider determines that GLP-1 treatment is not appropriate for you, your payment will be fully refunded. We will notify you by email.",
  },
  {
    q: "When will my medication ship?",
    a: "Once your prescription is approved and verified, your medication is typically dispensed and shipped within 3–5 business days. You will receive a tracking number by email.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "You can pause or cancel your subscription at any time from your account dashboard under \"Subscription.\" Cancellation takes effect at the end of your current billing period. There are no cancellation fees.",
  },
  {
    q: "Can I change my medication dosage?",
    a: "Dosage adjustments are made at the discretion of your licensed provider. If you have concerns about your dosage or are experiencing side effects, contact our support team and we will facilitate a provider review.",
  },
  {
    q: "What if I experience side effects?",
    a: "Common side effects of GLP-1 medications include nausea, vomiting, diarrhea, and constipation, particularly during the first weeks of treatment. These often decrease over time. If you experience severe or persistent side effects, contact our support team immediately or seek emergency medical care if appropriate. Do not stop or adjust medication without consulting a provider.",
  },
  {
    q: "Is my health information private?",
    a: "Yes. All health information is handled in accordance with HIPAA. We maintain Business Associate Agreements with all clinical and technology partners who may access protected health information. For details, see our Privacy Policy.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container max-w-2xl py-10 md:py-16">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h1>
          <p className="text-sm text-muted-foreground mt-2">Find answers to common questions about our GLP-1 weight loss program.</p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-sm border border-border px-5 data-[state=open]:border-primary/40"
            >
              <AccordionTrigger className="text-left text-[15px] font-medium text-foreground hover:no-underline py-4 leading-relaxed">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground leading-[1.75] pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
