import { Calendar, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AppointmentStatus = "scheduled" | "cancelled" | "completed";

interface AppointmentCardProps {
  providerName: string;
  dateTime: string | Date;
  timezone: string;
  meetingLink?: string;
  status: AppointmentStatus;
  onCancel?: () => void;
  onReschedule?: () => void;
  className?: string;
}

const statusVariant: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  scheduled: {
    label: "Scheduled",
    className: "bg-primary/10 text-primary border-primary/30",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive border-destructive/30",
  },
  completed: {
    label: "Completed",
    className: "bg-success/10 text-success border-success/30",
  },
};

export const AppointmentCard = ({
  providerName,
  dateTime,
  timezone,
  meetingLink,
  status,
  onCancel,
  onReschedule,
  className,
}: AppointmentCardProps) => {
  const date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;
  const dateStr = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  const s = statusVariant[status];

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg p-5 space-y-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Provider
          </p>
          <h3 className="font-serif text-xl text-foreground mt-0.5">
            {providerName}
          </h3>
        </div>
        <Badge variant="outline" className={s.className}>
          {s.label}
        </Badge>
      </div>

      <div className="space-y-1.5 text-sm text-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>{dateStr}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>
            {timeStr}{" "}
            <span className="text-muted-foreground">({timezone})</span>
          </span>
        </div>
      </div>

      {(meetingLink || onCancel || onReschedule) && status === "scheduled" && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          {meetingLink && (
            <Button asChild size="sm">
              <a href={meetingLink} target="_blank" rel="noopener noreferrer">
                <Video className="w-4 h-4 mr-1.5" />
                Join meeting
              </a>
            </Button>
          )}
          {onReschedule && (
            <Button size="sm" variant="outline" onClick={onReschedule}>
              Reschedule
            </Button>
          )}
          {onCancel && (
            <Button size="sm" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
