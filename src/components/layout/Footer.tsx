import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-section-soft">
      <div className="container py-14">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
                <span className="text-sm font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-lg font-semibold text-foreground">Solana Health</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Medically supervised weight loss with licensed providers. Telehealth made simple.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Program</h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><Link to="/quiz" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Check Eligibility</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/telehealth-consent" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Telehealth Consent</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 space-y-3">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Solana Health. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            Solana Health is a technology platform. We do not practice medicine. All prescribing decisions are made by independent licensed healthcare providers. Prescription medication is only dispensed following a clinical evaluation. GLP-1 medications are not appropriate for everyone. Results vary and are not guaranteed. This website does not provide medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
