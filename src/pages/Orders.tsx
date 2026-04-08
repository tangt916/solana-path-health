import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Orders = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container max-w-3xl py-10 md:py-16">
        <h1 className="text-2xl font-bold text-foreground mb-8">Orders & Tracking</h1>

        <Card className="shadow-card mb-6">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Order #SH-10042</CardTitle>
            <Badge className="bg-warning text-warning-foreground">In Transit</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">GLP-1 Medication — Month 1</p>
                  <p className="text-xs text-muted-foreground">Semaglutide 0.25mg</p>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-foreground font-medium">Tracking number</p>
                    <p className="text-xs text-primary font-mono">1Z999AA10123456784</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-foreground font-medium">Estimated delivery</p>
                    <p className="text-xs text-muted-foreground">April 12, 2026</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3 pl-3 border-l-2 border-border">
                {[
                  { label: "Order placed", date: "Apr 7, 2026", done: true },
                  { label: "Prescription verified", date: "Apr 8, 2026", done: true },
                  { label: "Shipped", date: "Apr 9, 2026", done: true },
                  { label: "Out for delivery", date: "Estimated Apr 12", done: false },
                ].map((event, i) => (
                  <div key={i} className="relative pl-4">
                    <div className={`absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 ${event.done ? "bg-primary border-primary" : "bg-background border-border"}`} />
                    <p className="text-sm text-foreground font-medium">{event.label}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
