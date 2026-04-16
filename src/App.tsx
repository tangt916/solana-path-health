import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { initGA4, trackPageView } from "@/lib/analytics";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import IntakeTransition from "./pages/IntakeTransition";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Subscription from "./pages/Subscription";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import TelehealthConsent from "./pages/TelehealthConsent";
import NotFound from "./pages/NotFound";
import { MarketingPopup } from "./components/MarketingPopup";

const queryClient = new QueryClient();

const GAPageTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
};

const App = () => {
  useEffect(() => {
    initGA4();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <GAPageTracker />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/intake-transition" element={<IntakeTransition />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
              <Route path="/support" element={<Support />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/telehealth-consent" element={<TelehealthConsent />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
