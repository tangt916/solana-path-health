import { ExternalLink, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DashboardData } from "./types";

interface Props {
  orders: DashboardData["orders"];
  shipments: DashboardData["shipments"];
}

export const OrdersSection = ({ orders, shipments }: Props) => {
  if (orders.length === 0) return null;
  return (
    <section>
      <h2 className="font-serif text-xl mb-3">Order tracking</h2>
      <div className="grid gap-3">
        {orders.map((order) => {
          const latest = shipments.find((s) => s.order_id === order.id);
          return (
            <Card key={order.id} className="p-5">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{order.order_number}</h3>
                    <p className="text-sm text-muted-foreground">Month {order.month_number}</p>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {order.status}
                    </Badge>
                  </div>
                </div>
                {latest?.tracking_number && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{latest.carrier ?? "Carrier"}</p>
                    <p className="text-sm font-mono">{latest.tracking_number}</p>
                    {latest.estimated_delivery && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Est. delivery {new Date(latest.estimated_delivery).toLocaleDateString()}
                      </p>
                    )}
                    <Button asChild size="sm" variant="ghost" className="mt-1">
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(latest.tracking_number)}`}
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
  );
};
