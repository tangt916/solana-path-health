import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Mail, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

const faqs = [
  { q: "How long does the approval process take?", a: "Most evaluations are reviewed within 24-48 hours by a licensed provider." },
  { q: "When will my medication ship?", a: "Once approved, your medication typically ships within 3-5 business days with free delivery." },
  { q: "How do I update my billing information?", a: "Go to Subscription & Billing in your dashboard. You can update your payment method there." },
  { q: "What if I experience side effects?", a: "Contact your care team immediately through the dashboard messaging feature. Common side effects are usually temporary." },
  { q: "Can I change my medication dosage?", a: "Dosage changes are made by your provider based on your progress and response to treatment." },
  { q: "How do I cancel my subscription?", a: "You can cancel anytime from the Subscription page. There are no cancellation fees." },
];

const statusColor = (status: string) => {
  switch (status) {
    case "open": return "bg-amber-100 text-amber-800 border-amber-200";
    case "resolved": return "bg-green-100 text-green-800 border-green-200";
    default: return "bg-muted text-muted-foreground";
  }
};

const Support = () => {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  useEffect(() => {
    if (user) fetchTickets();
  }, [user]);

  const fetchTickets = async () => {
    const { data } = await supabase
      .from("support_tickets")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setTickets(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from("support_tickets").insert({
        subject,
        message,
        email,
        user_id: user?.id || null,
      });
      trackEvent("support_ticket_submitted");
      setSubmitted(true);
      if (user) fetchTickets();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container max-w-3xl py-10 md:py-16">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
          <p className="text-sm text-muted-foreground mt-1">Find answers or reach out to our support team.</p>
        </div>

        {/* Contact info */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-primary" />
            <a href="mailto:support@solanahealth.com" className="hover:text-foreground transition-colors">support@solanahealth.com</a>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>We respond within 1 business day</span>
          </div>
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
        <Card className="shadow-card mb-8">
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
                <p className="text-sm text-muted-foreground mt-1">Your message has been sent. We typically respond within 1 business day.</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => { setSubmitted(false); setSubject(""); setMessage(""); }}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="What do you need help with?" value={subject} onChange={e => setSubject(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea placeholder="Describe your issue or question..." rows={4} value={message} onChange={e => setMessage(e.target.value)} required />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send message"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Ticket history */}
        {user && tickets.length > 0 && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Your past tickets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{ticket.subject}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className={statusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{ticket.message}</p>
                  {ticket.admin_reply && (
                    <div className="mt-3 rounded-md bg-secondary/50 p-3 border border-border">
                      <p className="text-xs font-medium text-primary mb-1">Support reply:</p>
                      <p className="text-sm text-foreground">{ticket.admin_reply}</p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Support;
