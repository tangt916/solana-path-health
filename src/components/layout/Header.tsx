import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isPortal = location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/orders") ||
    location.pathname.startsWith("/subscription") ||
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
              <Link to="/orders" className="text-sm font-medium transition-colors" style={{ color: '#5a7060' }}>Orders</Link>
              <Link to="/subscription" className="text-sm font-medium transition-colors" style={{ color: '#5a7060' }}>Subscription</Link>
              <Link to="/support" className="text-sm font-medium transition-colors" style={{ color: '#5a7060' }}>Support</Link>
            </>
          ) : (
            <>
              <a href="#medications" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#5a7060' }}>Treatment</a>
              <a href="#membership" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#5a7060' }}>Membership</a>
              <a href="#how-it-works" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#5a7060' }}>How it works</a>
              <a href="#safety" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#5a7060' }}>Safety info</a>
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
                <Link to="/quiz">Get started</Link>
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
                <Link to="/orders" className="text-sm font-medium" style={{ color: '#5a7060' }} onClick={() => setMobileOpen(false)}>Orders</Link>
                <Link to="/subscription" className="text-sm font-medium" style={{ color: '#5a7060' }} onClick={() => setMobileOpen(false)}>Subscription</Link>
                <Link to="/support" className="text-sm font-medium" style={{ color: '#5a7060' }} onClick={() => setMobileOpen(false)}>Support</Link>
              </>
            ) : (
              <>
                <a href="#medications" className="text-sm font-medium" style={{ color: '#5a7060' }} onClick={() => setMobileOpen(false)}>Treatment</a>
                <a href="#membership" className="text-sm font-medium" style={{ color: '#5a7060' }} onClick={() => setMobileOpen(false)}>Membership</a>
                <a href="#how-it-works" className="text-sm font-medium" style={{ color: '#5a7060' }} onClick={() => setMobileOpen(false)}>How it works</a>
                <a href="#safety" className="text-sm font-medium" style={{ color: '#5a7060' }} onClick={() => setMobileOpen(false)}>Safety info</a>
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
                    <Link to="/quiz">Get started</Link>
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
