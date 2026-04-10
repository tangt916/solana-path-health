import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ClipboardList, Package, CreditCard, Pill, MessageSquare, ArrowRight,
  CheckCircle, Clock, Truck, AlertTriangle, XCircle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const statusSteps = [
  { label: "Intake submitted", icon: ClipboardList, done: true },
  { label: "Under review", icon: Clock, done: true },
  { label: "Approved", icon: CheckCircle, done: false, active: true },
  { label: "Prescription sent", icon: Pill, done: false },
  { label: "Shipped", icon: Truck, done: false },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [subStatus, setSubStatus] = useState<string | null>(null);
  const [intakeStatus, setIntakeStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchStatus = async () => {
      const [{ data: sub }, { data: intake }] = await Promise.all([
        supabase.from("subscriptions").select("status").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).single(),
        supabase.from("intake_submissions").select("status").eq("user_id", user.id).order("submitted_at", { ascending: false }).limit(1).single(),
      ]);
      setSubStatus(sub?.status || null);
      setIntakeStatus(intake?.status || null);
    };
    fetchStatus();
  }, [user]);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container py-10 md:py-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's an overview of your treatment status.</p>
        </div>

        {/* Declined banner */}
        {intakeStatus === "declined" && (
          <Alert className="mb-6 border-destructive/30 bg-destructive/5">
            <XCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              Our provider has reviewed your intake. GLP-1 treatment is not recommended for you at this time. Your payment has been fully refunded. Please <Link to="/support" className="underline font-medium">contact support</Link> if you have questions.
            </AlertDescription>
          </Alert>
        )}

        {/* Past due banner */}
        {subStatus === "past_due" && (
          <Alert className="mb-6 border-amber-300 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              ⚠️ Your last payment failed. Please <Link to="/subscription" className="underline font-medium">update your billing information</Link> to avoid interruption to your program.
            </AlertDescription>
          </Alert>
        )}

        {/* Paused banner */}
        {subStatus === "paused" && (
          <Alert className="mb-6 border-amber-300 bg-amber-50">
            <Clock className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Your subscription is paused. <Link to="/subscription" className="underline font-medium">Resume anytime</Link>.
            </AlertDescription>
          </Alert>
        )}

        {/* Status tracker */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="text-base">Treatment status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {statusSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    step.done ? "bg-primary" : step.active ? "border-2 border-primary bg-secondary" : "border border-border bg-muted"
                  }`}>
                    <step.icon className={`h-4 w-4 ${step.done ? "text-primary-foreground" : step.active ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`text-xs font-medium whitespace-nowrap ${step.done ? "text-foreground" : step.active ? "text-primary" : "text-muted-foreground"}`}>
                    {step.label}
                  </span>
                  {i < statusSteps.length - 1 && (
                    <div className={`h-px w-8 ${step.done ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-secondary/50 p-3">
              <p className="text-sm text-foreground font-medium">Your intake is being reviewed</p>
              <p className="text-xs text-muted-foreground mt-1">A licensed provider is reviewing your information. You'll be notified once a decision is made.</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick links */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Orders", desc: "Track your shipments", icon: Package, href: "/orders", badge: "1 active" },
            { title: "Prescriptions", desc: "View your medications", icon: Pill, href: "/orders", badge: null },
            { title: "Subscription", desc: "Manage your plan", icon: CreditCard, href: "/subscription", badge: subStatus || "—" },
            { title: "Support", desc: "Get help", icon: MessageSquare, href: "/support", badge: null },
          ].map((item, i) => (
            <Link key={i} to={item.href}>
              <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 h-full cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    {item.badge && <Badge variant="secondary" className="text-xs">{item.badge}</Badge>}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  <ArrowRight className="mt-3 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
