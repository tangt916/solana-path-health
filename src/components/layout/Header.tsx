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
    <header className="sticky top-0 z-50 border-b border-border bg-cream/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-forest">
            <span className="text-sm font-bold text-cream">S</span>
          </div>
          <span className="font-serif text-lg font-normal text-espresso">Solana Health</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {isPortal ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-espresso">Dashboard</Link>
              <Link to="/orders" className="text-sm font-medium text-muted-foreground transition-colors hover:text-espresso">Orders</Link>
              <Link to="/subscription" className="text-sm font-medium text-muted-foreground transition-colors hover:text-espresso">Subscription</Link>
              <Link to="/support" className="text-sm font-medium text-muted-foreground transition-colors hover:text-espresso">Support</Link>
            </>
          ) : (
            <>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-espresso">How It Works</a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-espresso">Pricing</a>
              <a href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-espresso">FAQ</a>
              <Link to="/support" className="text-sm font-medium text-muted-foreground transition-colors hover:text-espresso">Support</Link>
            </>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="text-espresso hover:bg-espresso/5" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" className="border-border text-espresso rounded-[2px]" onClick={handleLogout}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="text-espresso hover:bg-espresso/5" asChild>
                <Link to="/auth">Log In</Link>
              </Button>
              <Button size="sm" className="bg-forest hover:bg-forest-light text-cream rounded-[2px] border-0" asChild>
                <Link to="/quiz">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-espresso" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-cream/95 backdrop-blur-md p-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {isPortal ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <Link to="/orders" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Orders</Link>
                <Link to="/subscription" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Subscription</Link>
                <Link to="/support" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Support</Link>
              </>
            ) : (
              <>
                <a href="#how-it-works" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>How It Works</a>
                <a href="#pricing" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Pricing</a>
                <a href="#faq" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>FAQ</a>
              </>
            )}
            <div className="flex gap-2 pt-2">
              {user ? (
                <>
                  <Button variant="ghost" size="sm" asChild className="flex-1 text-espresso">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 rounded-[2px]" onClick={() => { handleLogout(); setMobileOpen(false); }}>
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild className="flex-1 text-espresso">
                    <Link to="/auth">Log In</Link>
                  </Button>
                  <Button size="sm" asChild className="flex-1 bg-forest text-cream rounded-[2px] border-0">
                    <Link to="/quiz">Get Started</Link>
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
