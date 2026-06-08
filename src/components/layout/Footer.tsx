import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-serif text-3xl tracking-tight">Solana Health</span>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-primary-foreground/70 max-w-sm">
              Personalized wellness for women. Licensed providers. Real results.
            </p>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60 mb-4">
                Platform
              </h4>
              <ul className="space-y-2.5">
                <li><a href="/#how-it-works" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">How It Works</a></li>
                <li><a href="/#treatments" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Treatments</a></li>
                <li><a href="/#pricing" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Pricing</a></li>
                <li><a href="/#faq" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">FAQ</a></li>
                <li><Link to="/safety-info" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Safety Info</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60 mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li><Link to="/privacy" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
                <li><Link to="/telehealth-consent" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Telehealth Consent</Link></li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60 mb-4">
              Get started
            </h4>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-medium hover:opacity-95 transition-opacity"
            >
              Find My Protocol →
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-primary-foreground/15">
          <p className="text-xs leading-relaxed text-primary-foreground/50 max-w-5xl">
            <strong className="text-primary-foreground/70">Important:</strong> Compounded drug products are not approved or evaluated for safety, effectiveness, or quality by the FDA. Prescription products require an online consultation with a healthcare provider who will determine if a prescription is appropriate. Results may vary.
          </p>
          <p className="mt-4 text-[11px] leading-relaxed text-primary-foreground/40 max-w-5xl">
            © {year} Solana Health. All rights reserved. Solana Health is a technology platform. We do not practice medicine. All prescribing decisions are made by independent licensed healthcare providers. Prescription medication is only dispensed following a clinical evaluation. GLP-1 medications are not appropriate for everyone. Results vary and are not guaranteed. Ozempic® is a registered trademark of Novo Nordisk A/S. Solana Health is not affiliated with Novo Nordisk or Eli Lilly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
