import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar, RefreshCw, Pause, XCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Subscription = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container max-w-3xl py-10 md:py-16">
        <h1 className="text-2xl font-bold text-foreground mb-8">Subscription & Billing</h1>

        <Card className="shadow-card mb-6">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">GLP-1 Weight Loss Program</CardTitle>
            <Badge className="bg-success text-success-foreground">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Monthly cost</span>
                </div>
                <p className="text-lg font-bold text-foreground">$179.00</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Next billing date</span>
                </div>
                <p className="text-lg font-bold text-foreground">May 7, 2026</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Next refill</span>
                </div>
                <p className="text-lg font-bold text-foreground">May 5, 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card mb-6">
          <CardHeader>
            <CardTitle className="text-base">Refills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Your refill is automatically processed before your next billing date.</p>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" /> Request early refill
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Manage subscription</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button variant="outline" size="sm">
              <Pause className="mr-2 h-4 w-4" /> Pause subscription
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
              <XCircle className="mr-2 h-4 w-4" /> Cancel subscription
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Subscription;
