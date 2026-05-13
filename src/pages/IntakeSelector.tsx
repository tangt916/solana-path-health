// Central "not sure what I want" intake.
// Step 1: pick a treatment area → routes to that treatment's intake.
// Also offers a generic "I'm not sure — guide me" lead-capture path.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PageShell } from "@/components/ui/shared/PageShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/shared/LoadingSpinner";
import { SuccessMessage } from "@/components/ui/shared/SuccessMessage";
import { ErrorMessage } from "@/components/ui/shared/ErrorMessage";
import { TREATMENTS } from "@/config/treatments";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { SEO } from "@/components/SEO";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(7, "Phone required").max(40),
});

const IntakeSelector = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"select" | "guide">("select");
  const [contact, setContact] = useState({ firstName: "", email: "", phone: "" });
  const [interest, setInterest] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submitGuide = async () => {
    const errs: Record<string, string> = {};
    if (interest.length === 0) errs.interest = "Pick at least one";
    const parsed = schema.safeParse(contact);
    if (!parsed.success) parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    setSubmitErr(null);
    try {
      const { error } = await supabase.from("marketing_leads").insert({
        email: contact.email.trim(),
        first_name: contact.firstName.trim(),
        phone: contact.phone.trim(),
        source: `intake_guide_me:${interest.join(",")}`,
        email_opt_in: true,
      });
      if (error && !error.message.toLowerCase().includes("duplicate")) {
        console.warn("lead save warning:", error.message);
      }
      trackEvent("intake_submitted", { treatment: "guide_me", interests: interest.join(",") });
      setDone(true);
    } catch (e) {
      console.error(e);
      setSubmitErr("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cream via-background to-muted/20">
      <SEO
        title="Find your treatment — Solana Health"
        description="Pick a treatment area or let us guide you. Personalized weight loss, anti-aging, hormone, and hair loss programs from licensed US providers."
        path="/get-started"
      />
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4">
          <PageShell title="Get started" showBack onBack={() => navigate("/")}>
            <div className="bg-white border border-border/40 rounded-2xl p-6 sm:p-10 shadow-[0_2px_16px_rgba(45,74,50,0.06)] space-y-6">
              {done ? (
                <SuccessMessage
                  variant="inline"
                  title="You're on the list."
                  message="A care advisor will reach out to help you pick the right path."
                  ctaLabel="Back to home"
                  onCta={() => navigate("/")}
                />
              ) : mode === "select" ? (
                <>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] mb-3" style={{ color: "#2d4a1e" }}>
                      What brings you here?
                    </p>
                    <h1 className="font-serif text-2xl sm:text-3xl mb-2" style={{ fontWeight: 300, color: "#0f1f12" }}>
                      Pick the treatment area you'd like help with.
                    </h1>
                    <p className="text-sm" style={{ color: "#5a7060" }}>
                      Not sure? Pick "Help me decide" at the bottom and we'll guide you.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {TREATMENTS.map((t) => (
                      <Link
                        key={t.slug}
                        to={`/get-started/${t.slug}`}
                        onClick={() => trackEvent("treatment_selected", { treatment: t.slug })}
                        className="rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(45,74,50,0.12)]"
                        style={{ background: t.gradient, border: "1px solid rgba(0,0,0,0.06)" }}
                      >
                        <p className="text-xs font-medium uppercase tracking-[0.16em] mb-2" style={{ color: t.accent }}>
                          {t.cardEyebrow}
                        </p>
                        <h3 className="font-serif text-lg leading-snug" style={{ fontWeight: 500, color: "#0f1f12" }}>
                          {t.name} →
                        </h3>
                      </Link>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setMode("guide")}
                    className="w-full rounded-xl border border-dashed border-border/60 p-4 text-sm hover:bg-muted/30 transition-colors"
                    style={{ color: "#0f1f12" }}
                  >
                    <span style={{ fontWeight: 500 }}>Help me decide</span>
                    <span className="block text-xs mt-1" style={{ color: "#5a7060" }}>
                      Tell us what you're hoping to change and we'll route you to the right path.
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <button
                      type="button"
                      onClick={() => setMode("select")}
                      className="text-xs underline-offset-4 hover:underline mb-4"
                      style={{ color: "#5a7060" }}
                    >
                      ← Back to treatment list
                    </button>
                    <h1 className="font-serif text-2xl sm:text-3xl mb-2" style={{ fontWeight: 300, color: "#0f1f12" }}>
                      Tell us what you're hoping to change.
                    </h1>
                    <p className="text-sm" style={{ color: "#5a7060" }}>
                      A care advisor will follow up with the right next step.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium" style={{ color: "#0f1f12" }}>
                      What are you most interested in? <span style={{ color: "#2d4a1e" }}>*</span>
                    </Label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {TREATMENTS.map((t) => {
                        const sel = interest.includes(t.slug);
                        return (
                          <button
                            key={t.slug}
                            type="button"
                            onClick={() =>
                              setInterest((cur) =>
                                cur.includes(t.slug) ? cur.filter((s) => s !== t.slug) : [...cur, t.slug]
                              )
                            }
                            className="rounded-xl border px-4 py-3 text-left text-sm transition-all"
                            style={{
                              borderColor: sel ? t.accent : "rgba(0,0,0,0.12)",
                              background: sel ? `${t.accent}14` : "#ffffff",
                              color: "#0f1f12",
                              fontWeight: sel ? 500 : 400,
                            }}
                          >
                            {t.name}
                          </button>
                        );
                      })}
                    </div>
                    {errors.interest && <p className="text-xs text-destructive">{errors.interest}</p>}
                  </div>

                  <div className="pt-4 border-t border-border/30 space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" value={contact.firstName} onChange={(e) => setContact({ ...contact, firstName: e.target.value })} autoComplete="given-name" />
                      {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} autoComplete="email" />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Mobile number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 555-5555" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} autoComplete="tel" />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>
                  </div>

                  {submitErr && <ErrorMessage variant="inline" title="Try again" message={submitErr} />}

                  <Button
                    onClick={submitGuide}
                    disabled={submitting}
                    className="w-full rounded-full py-6 text-sm font-medium border-0"
                    style={{ background: "#0f1f12", color: "#faf6ee" }}
                  >
                    {submitting ? <LoadingSpinner size="sm" /> : "Help me find the right path →"}
                  </Button>
                </>
              )}
            </div>
          </PageShell>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IntakeSelector;
