import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { TREATMENTS } from "@/config/treatments";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isPortal = location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/support");

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(250,246,238,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #cddbc6',
      }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl" style={{ fontWeight: 300, color: '#16261a' }}>
            Solana Health
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {isPortal ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium transition-colors" style={{ color: '#5a7060' }}>Dashboard</Link>
              <Link to="/support" className="text-sm font-medium transition-colors" style={{ color: '#5a7060' }}>Support</Link>
            </>
          ) : (
            <>
              <a href="/#how-it-works" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#5a7060' }}>How it works</a>
              <div className="relative group">
                <button className="text-sm font-medium transition-colors hover:opacity-70 inline-flex items-center gap-1" style={{ color: '#5a7060' }}>
                  Treatments <ChevronDown className="h-3 w-3" />
                </button>
                <div className="absolute left-0 top-full pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all">
                  <div className="rounded-xl bg-white shadow-lg border border-border/40 p-2 w-64">
                    {TREATMENTS.map((t) => (
                      <Link
                        key={t.slug}
                        to={`/treatments/${t.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-muted/40 transition-colors"
                        style={{ color: '#16261a' }}
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <a href="/#faq" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#5a7060' }}>FAQ</a>
              <Link to="/safety-info" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#5a7060' }}>Safety info</Link>
            </>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="rounded-full px-5" style={{ color: '#16261a' }} asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button size="sm" className="rounded-full px-5 border-0" style={{ background: '#16261a', color: '#faf6ee' }} onClick={handleLogout}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="rounded-full px-5" style={{ color: '#16261a' }} asChild>
                <Link to="/auth">Log in</Link>
              </Button>
              <Button size="sm" className="rounded-full px-5 border-0" style={{ background: '#16261a', color: '#faf6ee' }} asChild>
                <Link to="/get-started">Get started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" style={{ color: '#16261a' }} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="p-4 md:hidden" style={{ background: 'rgba(250,246,238,0.97)', borderTop: '1px solid #cddbc6' }}>
          <nav className="flex flex-col gap-3">
            {isPortal ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium" style={{ color: '#5a7060' }} onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <Link to="/support" className="text-sm font-medium" style={{ color: '#5a7060' }} onClick={() => setMobileOpen(false)}>Support</Link>
              </>
            ) : (
              <>
                <a href="/#how-it-works" className="text-sm font-medium" style={{ color: '#5a7060' }} onClick={() => setMobileOpen(false)}>How it works</a>
                <p className="text-xs uppercase tracking-wider mt-2" style={{ color: '#8a9a85' }}>Treatments</p>
                {TREATMENTS.map((t) => (
                  <Link
                    key={t.slug}
                    to={`/treatments/${t.slug}`}
                    className="text-sm pl-3"
                    style={{ color: '#5a7060' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t.name}
                  </Link>
                ))}
                <a href="/#faq" className="text-sm font-medium mt-2" style={{ color: '#5a7060' }} onClick={() => setMobileOpen(false)}>FAQ</a>
                <Link to="/safety-info" className="text-sm font-medium" style={{ color: '#5a7060' }} onClick={() => setMobileOpen(false)}>Safety info</Link>
              </>
            )}
            <div className="flex gap-2 pt-2">
              {user ? (
                <>
                  <Button variant="ghost" size="sm" asChild className="flex-1 rounded-full">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button size="sm" className="flex-1 rounded-full border-0" style={{ background: '#16261a', color: '#faf6ee' }} onClick={() => { handleLogout(); setMobileOpen(false); }}>
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild className="flex-1 rounded-full">
                    <Link to="/auth">Log in</Link>
                  </Button>
                  <Button size="sm" asChild className="flex-1 rounded-full border-0" style={{ background: '#16261a', color: '#faf6ee' }}>
                    <Link to="/get-started">Get started</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
