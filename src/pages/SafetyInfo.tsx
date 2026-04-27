import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ShieldCheck, AlertTriangle, Phone, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SafetyInfoPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = "Patient Information & Medication Safety | Solana Health";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-cream/60 to-background border-b border-border/40">
          <div className="container max-w-3xl py-12 sm:py-16">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-7 h-7 text-primary" />
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Patient Information
              </p>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-foreground leading-tight">
              Medication Safety Information
            </h1>
            <p className="mt-4 text-muted-foreground text-base leading-relaxed">
              A comprehensive guide to GLP-1 medications, side effects, warnings,
              and when to contact your provider. Always speak with your prescribing
              clinician before starting, changing, or stopping any medication.
            </p>
          </div>
        </section>

        <div className="container max-w-3xl py-12 space-y-12">
          {/* Medication breakdown */}
          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-6">
              Medications by drug
            </h2>
            <div className="space-y-5">
              <DrugCard
                name="Compounded Semaglutide"
                form="Weekly subcutaneous injection"
                use="Used as part of a comprehensive weight management plan that also includes nutrition, movement, and ongoing clinical support."
                dosing="Typically titrated from 0.25 mg weekly, increasing gradually as tolerated under provider supervision."
              />
              <DrugCard
                name="Compounded Tirzepatide"
                form="Weekly subcutaneous injection"
                use="A dual-action GIP/GLP-1 receptor agonist that may be prescribed when clinically appropriate."
                dosing="Titrated gradually starting at low doses; your provider determines whether and how to escalate."
              />
              <DrugCard
                name="Oral Semaglutide (when available)"
                form="Once-daily oral tablet"
                use="An alternative for patients who cannot tolerate injections, when clinically appropriate."
                dosing="Taken on an empty stomach with a small sip of water, at least 30 minutes before food, drink, or other oral medications."
              />
            </div>
          </section>

          {/* Common side effects */}
          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3">
              Common side effects
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              These are typically mild and tend to improve as your body adjusts,
              especially during the first few weeks or after dose increases.
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-foreground">
              {[
                "Nausea",
                "Constipation",
                "Diarrhea",
                "Reduced appetite",
                "Bloating or gas",
                "Mild stomach discomfort",
                "Fatigue",
                "Headache",
                "Heartburn or reflux",
                "Injection-site reactions (redness, itching)",
              ].map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 rounded-lg border border-border/40 bg-card px-3 py-2"
                >
                  <span className="text-primary mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What's normal */}
          <section className="rounded-2xl border border-border/40 bg-card p-6">
            <h3 className="font-serif text-xl text-foreground mb-3">
              What's typically normal
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mild nausea, reduced hunger, occasional digestive changes, and
              fatigue during the first few weeks of treatment or after a dose
              increase. These usually improve over time. Your provider may slow
              your titration to help minimize discomfort. Drinking water,
              eating smaller meals, and avoiding fatty or fried foods can help.
            </p>
          </section>

          {/* Serious side effects */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                Serious side effects — contact a doctor immediately
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Stop the medication and seek medical attention right away if you
              experience any of the following:
            </p>
            <ul className="space-y-2 text-sm text-foreground">
              {[
                "Severe, persistent abdominal pain (with or without vomiting) — possible pancreatitis",
                "Yellowing of skin or eyes, dark urine, or pain in the upper right abdomen — possible gallbladder problems",
                "A lump or swelling in the neck, hoarseness, trouble swallowing, or persistent shortness of breath",
                "Signs of an allergic reaction: rash, hives, swelling of the face, lips, tongue, or throat, trouble breathing",
                "Signs of low blood sugar (especially if you take insulin or sulfonylureas): shakiness, sweating, confusion, fast heartbeat",
                "Vision changes, especially if you have a history of diabetic retinopathy",
                "Thoughts of self-harm or suicide, or worsening depression",
                "Severe vomiting or diarrhea leading to dehydration or reduced urine output",
              ].map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2"
                >
                  <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl bg-destructive/10 border border-destructive/30 p-4 flex items-start gap-3">
              <Phone className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong>If symptoms are severe or life-threatening, call 911
                or go to the nearest emergency room immediately.</strong>
              </p>
            </div>
          </section>

          {/* Boxed warning */}
          <section className="rounded-2xl border-2 border-destructive/40 bg-destructive/5 p-6">
            <h3 className="font-serif text-xl text-foreground mb-3">
              Boxed Warning: Risk of thyroid C-cell tumors
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              In rodent studies, semaglutide and tirzepatide caused thyroid
              C-cell tumors. It is unknown whether these medications cause
              thyroid C-cell tumors, including medullary thyroid carcinoma
              (MTC), in humans. These medications are <strong>contraindicated</strong>
              {" "}in patients with a personal or family history of MTC or in
              patients with Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).
              Counsel patients regarding the potential risk and symptoms of
              thyroid tumors.
            </p>
          </section>

          {/* Prescribing guidance */}
          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
              Important prescribing guidance
            </h2>
            <ul className="space-y-3 text-sm text-foreground/90 leading-relaxed">
              <li>
                <strong>Pregnancy:</strong> May cause fetal harm. Discontinue
                at least 2 months before a planned pregnancy. Notify your
                provider immediately if you become pregnant.
              </li>
              <li>
                <strong>Breastfeeding:</strong> Not recommended while
                breastfeeding.
              </li>
              <li>
                <strong>Kidney problems:</strong> Acute kidney injury has been
                reported, often associated with dehydration from nausea,
                vomiting, or diarrhea. Stay hydrated and tell your provider
                if you have a history of kidney disease.
              </li>
              <li>
                <strong>Pancreatitis:</strong> Stop using the medication and
                contact your provider promptly if you experience persistent
                severe abdominal pain.
              </li>
              <li>
                <strong>Gallbladder disease:</strong> Symptoms may include
                upper-right abdominal pain, fever, jaundice, or clay-colored
                stools — contact your provider.
              </li>
              <li>
                <strong>Heart rate increase:</strong> Mean increases in resting
                heart rate of 1–4 bpm have been observed.
              </li>
              <li>
                <strong>Drug interactions:</strong> GLP-1 medications can slow
                gastric emptying and may affect the absorption of other oral
                medications. Tell your provider about all medications and
                supplements you take.
              </li>
              <li>
                <strong>Hypoglycemia risk:</strong> Increased risk if used with
                insulin or sulfonylureas. Your provider may adjust those
                medications.
              </li>
            </ul>
          </section>

          {/* Doctor follow-up */}
          <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <h3 className="font-serif text-xl text-foreground mb-3">
              Doctor follow-up guidance
            </h3>
            <ul className="space-y-2 text-sm text-foreground/90 leading-relaxed">
              <li>• Attend all scheduled monthly check-ins with your care team.</li>
              <li>• Report any new or worsening symptoms between visits.</li>
              <li>
                • Do not change your dose, skip injections, or stop the
                medication without speaking with your provider first.
              </li>
              <li>
                • Keep a record of any side effects, when they started, and how
                long they lasted to share with your provider.
              </li>
              <li>
                • If you miss a dose, follow your provider's instructions —
                do not double up.
              </li>
            </ul>
          </section>

          {/* FDA compounded disclaimer */}
          <section className="rounded-xl border border-border/40 bg-muted/30 p-5">
            <p className="text-xs leading-relaxed text-muted-foreground">
              <strong>Important:</strong> Compounded drug products are not
              approved or evaluated for safety, effectiveness, or quality by
              the FDA. Prescription products require an online consultation
              with a healthcare provider who will determine if a prescription
              is appropriate. Results may vary.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center pt-4">
            <Link
              to="/get-started"
              className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Start Losing Weight →
            </Link>
            <p className="mt-3 text-xs text-muted-foreground">
              Eligibility and prescriptions are determined by independent
              licensed providers.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const DrugCard = ({
  name,
  form,
  use,
  dosing,
}: {
  name: string;
  form: string;
  use: string;
  dosing: string;
}) => (
  <div className="rounded-2xl border border-border/40 bg-card p-6">
    <h3 className="font-serif text-xl text-foreground">{name}</h3>
    <p className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
      {form}
    </p>
    <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{use}</p>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
      <strong className="text-foreground">Dosing:</strong> {dosing}
    </p>
  </div>
);

export default SafetyInfoPage;
