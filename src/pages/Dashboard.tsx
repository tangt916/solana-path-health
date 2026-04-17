import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { WelcomeModal } from "@/components/WelcomeModal";
import {
  Pill,
  Package,
  Truck,
  MessageSquare,
  ExternalLink,
  Gift,
  UserCog,
  RefreshCw,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LoadingSpinner,
  ErrorMessage,
  AppointmentCard,
} from "@/components/ui/shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type CaseStatus =
  | "OPEN"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "APPROVED"
  | "REJECTED"
  | string;

interface DashboardData {
  caseRow: {
    id: string;
    status: CaseStatus | null;
    vendor_case_id: string | null;
    plan_months: number | null;
    amount_paid: number | null;
    created_at: string;
  } | null;
  appointments: Array<{
    id: string;
    provider_name: string | null;
    start_time: string | null;
    end_time: string | null;
    timezone: string | null;
    meeting_link: string | null;
    status: string | null;
    vendor_appointment_id: string | null;
  }>;
  prescriptions: Array<{
    id: string;
    medication_name: string;
    dosage: string | null;
    status: string;
    prescribed_at: string;
    prescribing_provider: string | null;
  }>;
  orders: Array<{
    id: string;
    order_number: string;
    status: string;
    month_number: number;
    created_at: string;
  }>;
  shipments: Array<{
    order_id: string;
    event_type: string;
    tracking_number: string | null;
    carrier: string | null;
    estimated_delivery: string | null;
    occurred_at: string;
  }>;
  messages: Array<{
    id: string;
    text: string;
    author_name: string | null;
    read: boolean;
    created_at: string;
  }>;
  credits: Array<{
    id: string;
    amount: number | null;
    expires_at: string | null;
    used: boolean | null;
  }>;
}

const STATUS_BANNER: Record<
  string,
  { label: string; tone: string; description: string }
> = {
  OPEN: {
    label: "Under Review",
    tone: "bg-primary/10 text-primary border-primary/30",
    description: "A provider will review your intake soon.",
  },
  ASSIGNED: {
    label: "Under Review",
    tone: "bg-primary/10 text-primary border-primary/30",
    description: "A provider will review your intake soon.",
  },
  IN_PROGRESS: {
    label: "In Progress",
    tone: "bg-amber-100 text-amber-800 border-amber-300",
    description: "Your provider is working on your case.",
  },
  APPROVED: {
    label: "Approved",
    tone: "bg-success/10 text-success border-success/30",
    description: "Your prescription has been sent.",
  },
  REJECTED: {
    label: "Not Approved",
    tone: "bg-destructive/10 text-destructive border-destructive/30",
    description: "Please contact our support team.",
  },
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [welcomeMeta, setWelcomeMeta] = useState<{
    firstName?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    isImmediate?: boolean;
  }>({});

  // Show welcome modal once for new users (?newUser=true)
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
    } catch {
      /* ignore */
    }

    setWelcomeMeta({
      firstName,
      isImmediate: appt?.type === "immediate",
      appointmentDate: appt?.slot?.displayDate,
      appointmentTime: appt?.slot?.time,
    });
    setWelcomeOpen(true);

    // Strip ?newUser=true so back button works
    const next = new URLSearchParams(searchParams);
    next.delete("newUser");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const closeWelcome = () => {
    sessionStorage.setItem("welcomeModalSeen", "true");
    setWelcomeOpen(false);
  };

  const email = user?.email ?? null;

  const load = useCallback(async () => {
    if (!user || !email) return;
    setLoading(true);
    setError(null);
    try {
      // Most recent case for this email
      const { data: caseRow } = await supabase
        .from("cases")
        .select(
          "id, status, vendor_case_id, plan_months, amount_paid, created_at"
        )
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const caseId = caseRow?.id ?? null;
      const vendorCaseId = caseRow?.vendor_case_id ?? null;

      // Appointments tied to this case (or email)
      const apptQuery = caseId
        ? supabase
            .from("appointments")
            .select(
              "id, provider_name, start_time, end_time, timezone, meeting_link, status, vendor_appointment_id"
            )
            .eq("case_id", caseId)
            .order("start_time", { ascending: true })
        : supabase
            .from("appointments")
            .select(
              "id, provider_name, start_time, end_time, timezone, meeting_link, status, vendor_appointment_id"
            )
            .eq("email", email)
            .order("start_time", { ascending: true });

      const [
        { data: appointments },
        { data: prescriptions },
        { data: orders },
        { data: credits },
      ] = await Promise.all([
        apptQuery,
        supabase
          .from("prescriptions")
          .select(
            "id, medication_name, dosage, status, prescribed_at, prescribing_provider"
          )
          .eq("user_id", user.id)
          .order("prescribed_at", { ascending: false }),
        supabase
          .from("orders")
          .select("id, order_number, status, month_number, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("referral_credits")
          .select("id, amount, expires_at, used")
          .eq("email", email)
          .eq("used", false)
          .order("created_at", { ascending: false }),
      ]);

      // Shipments for orders
      let shipments: DashboardData["shipments"] = [];
      const orderIds = (orders ?? []).map((o) => o.id);
      if (orderIds.length > 0) {
        const { data: ships } = await supabase
          .from("shipment_events")
          .select(
            "order_id, event_type, tracking_number, carrier, estimated_delivery, occurred_at"
          )
          .in("order_id", orderIds)
          .order("occurred_at", { ascending: false });
        shipments = ships ?? [];
      }

      // Messages via secure edge function (also marks as read)
      let messages: DashboardData["messages"] = [];
      if (vendorCaseId) {
        try {
          const { data: msgRes } = await supabase.functions.invoke(
            "api-get-messages",
            { body: { vendorCaseId, markRead: true } }
          );
          const r = msgRes as
            | { success: boolean; data?: { messages: any[] } }
            | undefined;
          if (r?.success && r.data?.messages) {
            messages = r.data.messages.map((m) => ({
              id: m.id,
              text: m.text,
              author_name: m.author_name,
              read: m.read,
              created_at: m.created_at,
            }));
          }
        } catch (err) {
          console.error("Messages fetch failed:", err);
        }
      }

      setData({
        caseRow: caseRow ?? null,
        appointments: appointments ?? [],
        prescriptions: prescriptions ?? [],
        orders: orders ?? [],
        shipments,
        messages,
        credits: credits ?? [],
      });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [user, email]);

  useEffect(() => {
    load();
  }, [load]);

  const unreadCount = useMemo(
    () => (data?.messages ?? []).filter((m) => !m.read).length,
    [data]
  );

  const futureAppointments = useMemo(() => {
    const now = Date.now();
    return (data?.appointments ?? []).filter(
      (a) =>
        a.start_time &&
        new Date(a.start_time).getTime() > now &&
        a.status !== "cancelled"
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
      await load();
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
              <h1 className="font-serif text-3xl text-foreground">
                Your dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {email}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={load}>
              <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
            </Button>
          </div>

          {loading && (
            <div className="py-16">
              <LoadingSpinner label="Loading your dashboard..." />
            </div>
          )}

          {!loading && error && (
            <ErrorMessage
              title="Could not load your case"
              message={error}
              onRetry={load}
            />
          )}

          {!loading && !error && data && (
            <>
              {/* Status banner */}
              {data.caseRow ? (
                (() => {
                  const status = (data.caseRow.status ?? "OPEN").toUpperCase();
                  const banner =
                    STATUS_BANNER[status] ?? STATUS_BANNER.OPEN;
                  return (
                    <Card
                      className={`p-5 border ${banner.tone}`}
                    >
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div>
                          <p className="text-xs uppercase tracking-wide opacity-80">
                            Case status
                          </p>
                          <h2 className="font-serif text-xl mt-0.5">
                            {banner.label}
                          </h2>
                          <p className="text-sm mt-1 opacity-90">
                            {banner.description}
                          </p>
                        </div>
                        {status === "REJECTED" && (
                          <Button asChild variant="outline" size="sm">
                            <Link to="/support">Contact support</Link>
                          </Button>
                        )}
                      </div>
                    </Card>
                  );
                })()
              ) : (
                <Card className="p-6 text-center">
                  <p className="text-muted-foreground">
                    No case found yet. Once you complete checkout, your case
                    will appear here.
                  </p>
                  <Button asChild className="mt-4">
                    <Link to="/get-started">Start your intake</Link>
                  </Button>
                </Card>
              )}

              {/* Appointments */}
              {futureAppointments.length > 0 && (
                <section>
                  <h2 className="font-serif text-xl mb-3">
                    Upcoming appointments
                  </h2>
                  <div className="grid gap-3">
                    {futureAppointments.map((appt) => (
                      <AppointmentCard
                        key={appt.id}
                        providerName={appt.provider_name ?? "Your provider"}
                        dateTime={appt.start_time!}
                        timezone={appt.timezone ?? "Local time"}
                        meetingLink={appt.meeting_link ?? undefined}
                        status="scheduled"
                        onCancel={
                          cancellingId === appt.id
                            ? undefined
                            : () => handleCancelAppointment(appt.id)
                        }
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Prescriptions */}
              {data.caseRow?.status?.toUpperCase() === "APPROVED" &&
                data.prescriptions.length > 0 && (
                  <section>
                    <h2 className="font-serif text-xl mb-3">
                      Your prescription
                    </h2>
                    <div className="grid gap-3">
                      {data.prescriptions.map((rx) => (
                        <Card key={rx.id} className="p-5">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                              <Pill className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">
                                {rx.medication_name}
                              </h3>
                              {rx.dosage && (
                                <p className="text-sm text-muted-foreground">
                                  Dosage: {rx.dosage}
                                </p>
                              )}
                              {rx.prescribing_provider && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Prescribed by {rx.prescribing_provider}
                                </p>
                              )}
                              <Badge
                                variant="outline"
                                className="mt-2 capitalize"
                              >
                                {rx.status}
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}

              {/* Orders */}
              {data.orders.length > 0 && (
                <section>
                  <h2 className="font-serif text-xl mb-3">
                    Order tracking
                  </h2>
                  <div className="grid gap-3">
                    {data.orders.map((order) => {
                      const latest = data.shipments.find(
                        (s) => s.order_id === order.id
                      );
                      return (
                        <Card key={order.id} className="p-5">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                                <Package className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground">
                                  {order.order_number}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Month {order.month_number}
                                </p>
                                <Badge
                                  variant="outline"
                                  className="mt-1 capitalize"
                                >
                                  {order.status}
                                </Badge>
                              </div>
                            </div>
                            {latest?.tracking_number && (
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">
                                  {latest.carrier ?? "Carrier"}
                                </p>
                                <p className="text-sm font-mono">
                                  {latest.tracking_number}
                                </p>
                                {latest.estimated_delivery && (
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    Est. delivery{" "}
                                    {new Date(
                                      latest.estimated_delivery
                                    ).toLocaleDateString()}
                                  </p>
                                )}
                                <Button
                                  asChild
                                  size="sm"
                                  variant="ghost"
                                  className="mt-1"
                                >
                                  <a
                                    href={`https://www.google.com/search?q=${encodeURIComponent(
                                      latest.tracking_number
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Truck className="w-4 h-4 mr-1.5" />
                                    Track package
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                  </a>
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Messages */}
              <section>
                <Tabs defaultValue="messages">
                  <TabsList>
                    <TabsTrigger value="messages" className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Messages
                      {unreadCount > 0 && (
                        <Badge className="ml-1 h-5 px-1.5">
                          {unreadCount}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="messages" className="mt-4">
                    {data.messages.length === 0 ? (
                      <Card className="p-6 text-center">
                        <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          No messages yet. Your provider will message you here.
                        </p>
                      </Card>
                    ) : (
                      <div className="space-y-3">
                        {data.messages.map((msg) => (
                          <Card key={msg.id} className="p-4">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="text-sm font-medium text-foreground">
                                {msg.author_name ?? "Your care team"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(msg.created_at).toLocaleString()}
                              </p>
                            </div>
                            <p className="text-sm text-foreground whitespace-pre-wrap">
                              {msg.text}
                            </p>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </section>

              {/* Referral credits */}
              {data.credits.length > 0 && (
                <Card className="p-5 bg-gradient-to-br from-success/5 to-primary/5 border-success/30">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                      <Gift className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        You have $
                        {data.credits
                          .reduce((sum, c) => sum + (c.amount ?? 0), 0)
                          .toFixed(0)}{" "}
                        in referral credits
                      </h3>
                      {data.credits[0]?.expires_at && (
                        <p className="text-sm text-muted-foreground">
                          Expires{" "}
                          {new Date(
                            data.credits[0].expires_at
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {/* Quick links */}
              <section className="grid gap-3 sm:grid-cols-2">
                <Button
                  asChild
                  variant="outline"
                  className="h-auto py-4 justify-start"
                >
                  <Link to="/support">
                    <UserCog className="w-4 h-4 mr-2" />
                    Contact support
                  </Link>
                </Button>
                {data.caseRow?.status?.toUpperCase() === "APPROVED" && (
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto py-4 justify-start"
                  >
                    <Link to="/support">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Request refill
                    </Link>
                  </Button>
                )}
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
