import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/Card";
import { Stars } from "@/components/ui/Stars";
import type { Activity, Session } from "@/domain/types";
import { formatDate } from "@/lib/format";

export function SessionTable({
  sessions,
  activities,
}: {
  sessions: Session[];
  activities: Activity[];
}) {
  const name = (id: string) => activities.find((a) => a.id === id)?.name ?? id;
  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardTitle>Recent Sessions</CardTitle>
        <Link
          href="/sessions"
          className="text-sm font-medium text-brand-700 hover:underline"
        >
          View all
        </Link>
      </div>
      {sessions.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No sessions in this period.</p>
      ) : (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="text-left text-xs text-muted">
                <th className="py-2 pr-4 font-medium">Date</th>
                <th className="py-2 pr-4 font-medium">Activity</th>
                <th className="py-2 pr-4 font-medium">Duration</th>
                <th className="py-2 font-medium">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-line transition-colors hover:bg-panel"
                >
                  <td className="py-3 pr-4 tabular-nums">
                    <Link href={`/sessions/${s.id}`} className="block">
                      {formatDate(s.date)}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">
                    <Link href={`/sessions/${s.id}`} className="block font-medium">
                      {name(s.activityId)}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 tabular-nums text-muted">
                    {s.durationMin} min
                  </td>
                  <td className="py-3">
                    <Stars engagement={s.metrics.engagement} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
