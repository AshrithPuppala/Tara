import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Stars } from "@/components/ui/Stars";
import { repo } from "@/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Session" };

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await repo.getSession(id);
  if (!session) notFound();
  const [child, activities, notes] = await Promise.all([
    repo.getChild(session.childId),
    repo.listActivities(),
    repo.listNotes(session.childId),
  ]);
  const activity = activities.find((a) => a.id === session.activityId);
  const note = notes.find((n) => n.sessionId === session.id);
  const m = session.metrics;

  const rows: [string, string][] = [
    ["Range of motion, left", `${m.romLeftDeg}°`],
    ["Range of motion, right", `${m.romRightDeg}°`],
    ["Grip", `${m.gripPct}%`],
    ["Movement smoothness", `${m.smoothnessPct}%`],
    ["Coordination", `${m.coordinationPct}%`],
    ["Control", `${m.controlPct}%`],
    ["Repetitions", `${m.repetitions} / ${m.targetRepetitions}`],
  ];

  return (
    <>
      <Link
        href="/sessions"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft size={14} />
        All sessions
      </Link>
      <PageHeader
        title={activity?.name ?? "Session"}
        description={`${child?.name} · ${formatDate(session.date, { month: "long", day: "numeric", year: "numeric" })} · ${session.durationMin} min · ${session.therapist}`}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle>Session metrics</CardTitle>
          <dl className="mt-3 divide-y divide-line text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5">
                <dt className="text-muted">{k}</dt>
                <dd className="font-medium tabular-nums">{v}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between py-2.5">
              <dt className="text-muted">Engagement</dt>
              <dd>
                <Stars engagement={m.engagement} />
              </dd>
            </div>
          </dl>
        </Card>
        <div className="space-y-4">
          <Card className="bg-panel shadow-none">
            <CardTitle>Therapist note</CardTitle>
            <p className="mt-3 text-sm leading-relaxed">
              {note ? note.text : "No note for this session yet."}
            </p>
          </Card>
          <Card>
            <CardTitle>Session analysis</CardTitle>
            <p className="mt-3 text-sm text-muted">
              Charts within the session and AI observations are planned next. See
              docs/ROADMAP.md, milestone 2.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
