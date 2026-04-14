import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      {/* Main footer */}
      <div style={{ background: '#16261a' }}>
        <div className="container py-16">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <span className="font-serif text-xl" style={{ fontWeight: 300, color: '#faf6ee' }}>
                Solana Health
              </span>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(250,246,238,0.5)' }}>
                Medically guided weight loss with licensed providers. Telehealth made simple.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4" style={{ color: 'rgba(250,246,238,0.7)' }}>Platform</h4>
              <ul className="space-y-2.5">
                <li><a href="#how-it-works" className="text-sm transition-opacity hover:opacity-80" style={{ color: 'rgba(250,246,238,0.45)' }}>How It Works</a></li>
                <li><a href="#medications" className="text-sm transition-opacity hover:opacity-80" style={{ color: 'rgba(250,246,238,0.45)' }}>Treatment</a></li>
                <li><a href="#membership" className="text-sm transition-opacity hover:opacity-80" style={{ color: 'rgba(250,246,238,0.45)' }}>Membership</a></li>
                <li><Link to="/quiz" className="text-sm transition-opacity hover:opacity-80" style={{ color: 'rgba(250,246,238,0.45)' }}>Check Eligibility</Link></li>
                <li><Link to="/faq" className="text-sm transition-opacity hover:opacity-80" style={{ color: 'rgba(250,246,238,0.45)' }}>FAQ</Link></li>
                <li><Link to="/support" className="text-sm transition-opacity hover:opacity-80" style={{ color: 'rgba(250,246,238,0.45)' }}>Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4" style={{ color: 'rgba(250,246,238,0.7)' }}>Legal</h4>
              <ul className="space-y-2.5">
                <li><Link to="/privacy" className="text-sm transition-opacity hover:opacity-80" style={{ color: 'rgba(250,246,238,0.45)' }}>Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm transition-opacity hover:opacity-80" style={{ color: 'rgba(250,246,238,0.45)' }}>Terms of Service</Link></li>
                <li><Link to="/telehealth-consent" className="text-sm transition-opacity hover:opacity-80" style={{ color: 'rgba(250,246,238,0.45)' }}>Telehealth Consent</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ background: '#0e1a10' }} className="py-4">
        <div className="container">
          <p className="text-center leading-relaxed" style={{ fontSize: '0.67rem', color: 'rgba(250,246,238,0.3)' }}>
            © {new Date().getFullYear()} Solana Health. All rights reserved. Solana Health is a technology platform. We do not practice medicine. All prescribing decisions are made by independent licensed healthcare providers. Prescription medication is only dispensed following a clinical evaluation. GLP-1 medications are not appropriate for everyone. Results vary and are not guaranteed. This website does not provide medical advice. Ozempic® is a registered trademark of Novo Nordisk A/S. Solana Health is not affiliated with Novo Nordisk.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
