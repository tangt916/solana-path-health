import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { IntakeFormProvider } from "@/contexts/IntakeFormContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { initGA4, trackPageView } from "@/lib/analytics";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import CheckEmail from "./pages/CheckEmail";
import Dashboard from "./pages/Dashboard";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import TelehealthConsent from "./pages/TelehealthConsent";
import NotFound from "./pages/NotFound";
import GetStarted from "./pages/GetStarted";
import SafetyInfo from "./pages/SafetyInfo";
import ScrollToTop from "./components/ScrollToTop";

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
            <IntakeFormProvider>
              <GAPageTracker />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/check-email" element={<CheckEmail />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/support" element={<Support />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/telehealth-consent" element={<TelehealthConsent />} />
                <Route path="/safety-info" element={<SafetyInfo />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </IntakeFormProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
