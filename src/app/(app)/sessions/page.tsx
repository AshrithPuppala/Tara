import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Stars } from "@/components/ui/Stars";
import { repo } from "@/data";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Sessions" };

export default async function SessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ child?: string }>;
}) {
  const { child } = await searchParams;
  const [childList, sessions, activities] = await Promise.all([
    repo.listChildren(),
    repo.listSessions(child),
    repo.listActivities(),
  ]);
  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3 py-1 text-sm",
      active
        ? "border-brand-800 bg-brand-800 text-white"
        : "border-line bg-surface text-muted hover:text-ink",
    );

  return (
    <>
      <PageHeader
        title="Sessions"
        description="Every completed therapy session, newest first."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <Link href="/sessions" className={chip(!child)}>
          All children
        </Link>
        {childList.map((c) => (
          <Link
            key={c.id}
            href={`/sessions?child=${c.id}`}
            className={chip(child === c.id)}
          >
            {c.name}
          </Link>
        ))}
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              {[
                "Date",
                "Child",
                "Activity",
                "Duration",
                "Reps",
                "Engagement",
                "Therapist",
                "Status",
              ].map((h) => (
                <th key={h} className="px-5 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sessions.slice(0, 60).map((s) => (
              <tr key={s.id} className="border-t border-line hover:bg-panel">
                <td className="px-5 py-3 tabular-nums">
                  <Link
                    href={`/sessions/${s.id}`}
                    className="font-medium hover:underline"
                  >
                    {formatDate(s.date)}
                  </Link>
                </td>
                <td className="px-5 py-3">
                  {childList.find((c) => c.id === s.childId)?.name}
                </td>
                <td className="px-5 py-3">
                  {activities.find((a) => a.id === s.activityId)?.name}
                </td>
                <td className="px-5 py-3 tabular-nums text-muted">{s.durationMin} min</td>
                <td className="px-5 py-3 tabular-nums text-muted">
                  {s.metrics.repetitions}/{s.metrics.targetRepetitions}
                </td>
                <td className="px-5 py-3">
                  <Stars engagement={s.metrics.engagement} />
                </td>
                <td className="px-5 py-3 text-muted">{s.therapist}</td>
                <td className="px-5 py-3">
                  <Badge tone="good">Completed</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {sessions.length > 60 && (
        <p className="mt-3 text-sm text-muted">
          Showing the latest 60 of {sessions.length}. Pagination is a good first issue.
        </p>
      )}
    </>
  );
}
