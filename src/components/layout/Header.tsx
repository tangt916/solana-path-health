import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isPortal = location.pathname.startsWith("/dashboard") || 
    location.pathname.startsWith("/orders") || 
    location.pathname.startsWith("/subscription") ||
    location.pathname.startsWith("/support");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-lg font-semibold text-foreground">Solana Health</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {isPortal ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>
              <Link to="/orders" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Orders</Link>
              <Link to="/subscription" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Subscription</Link>
              <Link to="/support" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Support</Link>
            </>
          ) : (
            <>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">How It Works</a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
              <a href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
              <Link to="/support" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Support</Link>
            </>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isPortal ? (
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Log Out</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Log In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/quiz">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
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
              <Button variant="ghost" size="sm" asChild className="flex-1">
                <Link to="/auth">Log In</Link>
              </Button>
              <Button size="sm" asChild className="flex-1">
                <Link to="/quiz">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
