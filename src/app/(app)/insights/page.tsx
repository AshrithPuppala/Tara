import type { Metadata } from "next";
import { InsightsView } from "@/components/insights/InsightsView";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { repo } from "@/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Insights" };

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const { session } = await searchParams;
  const [sessions, activities, childList] = await Promise.all([
    repo.listSessions(),
    repo.listActivities(),
    repo.listChildren(),
  ]);

  const options = sessions.slice(0, 30).map((s) => ({
    id: s.id,
    label: `${childList.find((c) => c.id === s.childId)?.name ?? "Child"} · ${
      activities.find((a) => a.id === s.activityId)?.name ?? "Activity"
    } · ${formatDate(s.date)}`,
  }));

  const selectedId = options.find((o) => o.id === session)?.id ?? options[0]?.id;
  const series = selectedId ? await repo.getSessionTimeSeries(selectedId) : null;

  if (!series || !selectedId) {
    return (
      <>
        <PageHeader title="Insights" />
        <Card>
          <p className="text-sm text-muted">No sessions to show yet.</p>
        </Card>
      </>
    );
  }

  return (
    <InsightsView
      key={series.sessionId}
      series={series}
      options={options}
      selectedId={selectedId}
    />
  );
}
