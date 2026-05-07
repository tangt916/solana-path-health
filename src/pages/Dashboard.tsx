import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { WelcomeModal } from "@/components/WelcomeModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatusBanner } from "@/components/dashboard/StatusBanner";
import { AppointmentsSection } from "@/components/dashboard/AppointmentsSection";
import { PrescriptionsSection } from "@/components/dashboard/PrescriptionsSection";
import { OrdersSection } from "@/components/dashboard/OrdersSection";
import { MessagesSection } from "@/components/dashboard/MessagesSection";
import { ReferralCreditsCard } from "@/components/dashboard/ReferralCreditsCard";
import { QuickLinks } from "@/components/dashboard/QuickLinks";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = user?.email ?? null;

  const { loading, error, data, reload } = useDashboardData(user?.id, email);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [welcomeMeta, setWelcomeMeta] = useState<{
    firstName?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    isImmediate?: boolean;
  }>({});

  useEffect(() => {
    const isNew = searchParams.get("newUser") === "true";
    const seen = sessionStorage.getItem("welcomeModalSeen") === "true";
    if (!isNew || seen) return;

    let appt: { type?: string; slot?: { displayDate?: string; time?: string } } | null = null;
    let firstName: string | undefined;
    try {
      const raw = sessionStorage.getItem("intakeFormState");
      if (raw) {
        const parsed = JSON.parse(raw);
        appt = parsed?.appointment ?? null;
        firstName = parsed?.personalInfo?.firstName || undefined;
      }
    } catch { /* ignore */ }

    setWelcomeMeta({
      firstName,
      isImmediate: appt?.type === "immediate",
      appointmentDate: appt?.slot?.displayDate,
      appointmentTime: appt?.slot?.time,
    });
    setWelcomeOpen(true);

    const next = new URLSearchParams(searchParams);
    next.delete("newUser");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const closeWelcome = () => {
    sessionStorage.setItem("welcomeModalSeen", "true");
    setWelcomeOpen(false);
  };

  const unreadCount = useMemo(
    () => (data?.messages ?? []).filter((m) => !m.read).length,
    [data]
  );

  const futureAppointments = useMemo(() => {
    const now = Date.now();
    return (data?.appointments ?? []).filter(
      (a) => a.start_time && new Date(a.start_time).getTime() > now && a.status !== "cancelled"
    );
  }, [data]);

  const handleCancelAppointment = async (apptId: string) => {
    if (!confirm("Cancel this appointment?")) return;
    setCancellingId(apptId);
    try {
      const { error: updErr } = await supabase
        .from("appointments")
        .update({ status: "cancelled" })
        .eq("id", apptId);
      if (updErr) throw updErr;
      toast({ title: "Appointment cancelled" });
      await reload();
    } catch (err) {
      toast({
        title: "Could not cancel",
        description: err instanceof Error ? err.message : "Try again",
        variant: "destructive",
      });
    } finally {
      setCancellingId(null);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <LoadingSpinner label="Loading..." />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <WelcomeModal
        open={welcomeOpen}
        onClose={closeWelcome}
        firstName={welcomeMeta.firstName}
        appointmentDate={welcomeMeta.appointmentDate}
        appointmentTime={welcomeMeta.appointmentTime}
        isImmediate={welcomeMeta.isImmediate}
      />
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="container max-w-5xl space-y-6">
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <div>
              <h1 className="font-serif text-3xl text-foreground">Your dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">{email}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reload}>
              <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
            </Button>
          </div>

          {loading && (
            <div className="py-16">
              <LoadingSpinner label="Loading your dashboard..." />
            </div>
          )}

          {!loading && error && (
            <ErrorMessage title="Could not load your case" message={error} onRetry={reload} />
          )}

          {!loading && !error && data && (
            <>
              <StatusBanner caseRow={data.caseRow} />
              <AppointmentsSection
                appointments={futureAppointments}
                cancellingId={cancellingId}
                onCancel={handleCancelAppointment}
              />
              <PrescriptionsSection
                prescriptions={data.prescriptions}
                caseStatus={data.caseRow?.status}
              />
              <OrdersSection orders={data.orders} shipments={data.shipments} />
              <MessagesSection messages={data.messages} unreadCount={unreadCount} />
              <ReferralCreditsCard credits={data.credits} />
              <QuickLinks caseStatus={data.caseRow?.status} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
