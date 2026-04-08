import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, Send } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const faqs = [
  { q: "How long does the approval process take?", a: "Most evaluations are reviewed within 24-48 hours by a licensed provider." },
  { q: "When will my medication ship?", a: "Once approved, your medication typically ships within 2-3 business days with free delivery." },
  { q: "How do I update my billing information?", a: "Go to Subscription & Billing in your dashboard. You can update your payment method there." },
  { q: "What if I experience side effects?", a: "Contact your care team immediately through the dashboard messaging feature. Common side effects are usually temporary." },
  { q: "Can I change my medication dosage?", a: "Dosage changes are made by your provider based on your progress and response to treatment." },
  { q: "How do I cancel my subscription?", a: "You can cancel anytime from the Subscription page. There are no cancellation fees." },
];

const Support = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container max-w-3xl py-10 md:py-16">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
          <p className="text-sm text-muted-foreground mt-1">Find answers or reach out to our support team.</p>
        </div>

        {/* FAQ */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="text-base">Common questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="rounded-lg border border-border px-4">
                  <AccordionTrigger className="text-sm text-left font-medium hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" /> Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Message sent</h3>
                <p className="text-sm text-muted-foreground mt-1">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="What do you need help with?" required />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea placeholder="Describe your issue or question..." rows={4} required />
                </div>
                <Button type="submit">Send message</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Support;
