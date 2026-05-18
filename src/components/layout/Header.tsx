import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { TREATMENTS } from "@/config/treatments";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isPortal =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/support");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const navLinkCls =
    "text-sm font-medium text-foreground/75 hover:text-foreground transition-colors";

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl transition-colors ${
        scrolled ? "border-b border-border/70" : "border-b border-transparent"
      }`}
      style={{ background: "hsl(var(--background) / 0.85)" }}
    >
      <div className="container flex h-16 md:h-18 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl md:text-2xl text-primary tracking-tight">
            Solana
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {isPortal ? (
            <>
              <Link to="/dashboard" className={navLinkCls}>Dashboard</Link>
              <Link to="/support" className={navLinkCls}>Support</Link>
            </>
          ) : (
            <>
              <a href="/#how-it-works" className={navLinkCls}>How It Works</a>
              <div className="relative group">
                <button className={`${navLinkCls} inline-flex items-center gap-1`}>
                  Treatments <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all">
                  <div className="rounded-2xl bg-card shadow-[0_18px_48px_hsl(var(--primary)/0.15)] border border-border p-2 w-72">
                    {TREATMENTS.map((t) => (
                      <Link
                        key={t.slug}
                        to={`/treatments/${t.slug}`}
                        className="block rounded-xl px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <a href="/#pricing" className={navLinkCls}>Pricing</a>
              <a href="/#faq" className={navLinkCls}>FAQ</a>
              <Link to="/safety-info" className={navLinkCls}>Safety Info</Link>
            </>
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-foreground hover:opacity-70">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-95 transition-opacity"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="text-sm font-medium text-foreground hover:opacity-70">
                Log In
              </Link>
              <Link
                to="/quiz"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-95 transition-opacity"
              >
                Find My Protocol <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden text-foreground"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container py-5 flex flex-col gap-3">
            {isPortal ? (
              <>
                <Link to="/dashboard" className={navLinkCls} onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <Link to="/support" className={navLinkCls} onClick={() => setMobileOpen(false)}>Support</Link>
              </>
            ) : (
              <>
                <a href="/#how-it-works" className={navLinkCls} onClick={() => setMobileOpen(false)}>How It Works</a>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-2">Treatments</p>
                {TREATMENTS.map((t) => (
                  <Link
                    key={t.slug}
                    to={`/treatments/${t.slug}`}
                    className="text-sm text-foreground/80 pl-3"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t.name}
                  </Link>
                ))}
                <a href="/#pricing" className={`${navLinkCls} mt-2`} onClick={() => setMobileOpen(false)}>Pricing</a>
                <a href="/#faq" className={navLinkCls} onClick={() => setMobileOpen(false)}>FAQ</a>
                <Link to="/safety-info" className={navLinkCls} onClick={() => setMobileOpen(false)}>Safety Info</Link>
              </>
            )}
            <div className="flex gap-2 pt-3">
              {user ? (
                <>
                  <Link to="/dashboard" className="flex-1 text-center rounded-full border border-border px-4 py-2.5 text-sm" onClick={() => setMobileOpen(false)}>
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="flex-1 rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="flex-1 text-center rounded-full border border-border px-4 py-2.5 text-sm" onClick={() => setMobileOpen(false)}>
                    Log In
                  </Link>
                  <Link to="/quiz" className="flex-1 text-center rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                    Find My Protocol →
                  </Link>
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
