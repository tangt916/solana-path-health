import { AppointmentCard } from "@/components/ui/shared";
import type { DashboardData } from "./types";

interface Props {
  appointments: DashboardData["appointments"];
  cancellingId: string | null;
  onCancel: (id: string) => void;
}

export const AppointmentsSection = ({ appointments, cancellingId, onCancel }: Props) => {
  if (appointments.length === 0) return null;
  return (
    <section>
      <h2 className="font-serif text-xl mb-3">Upcoming appointments</h2>
      <div className="grid gap-3">
        {appointments.map((appt) => (
          <AppointmentCard
            key={appt.id}
            providerName={appt.provider_name ?? "Your provider"}
            dateTime={appt.start_time!}
            timezone={appt.timezone ?? "Local time"}
            meetingLink={appt.meeting_link ?? undefined}
            status="scheduled"
            onCancel={cancellingId === appt.id ? undefined : () => onCancel(appt.id)}
          />
        ))}
      </div>
    </section>
  );
};
