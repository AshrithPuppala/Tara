import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { repo } from "@/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Child profile" };

export default async function ChildPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const child = await repo.getChild(id);
  if (!child) notFound();
  const [sessions, notes] = await Promise.all([
    repo.listSessions(id),
    repo.listNotes(id),
  ]);
  const avgDuration = Math.round(
    sessions.reduce((a, s) => a + s.durationMin, 0) / Math.max(1, sessions.length),
  );

  return (
    <>
      <PageHeader
        title={child.name}
        description={`Age ${child.age} · therapy since ${formatDate(child.therapyStartDate, { month: "long", year: "numeric" })} · ${child.therapist}`}
      >
        <Link
          href="/dashboard"
          className="rounded-xl bg-brand-800 px-4 py-2 text-sm font-medium text-white hover:bg-brand-900"
        >
          View progress
        </Link>
      </PageHeader>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardTitle>Current focus</CardTitle>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {child.focusAreas.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <CardTitle className="mt-6">Goals</CardTitle>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {child.goals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardTitle>Session summary</CardTitle>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Total sessions</dt>
              <dd className="font-medium tabular-nums">{sessions.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Average duration</dt>
              <dd className="font-medium tabular-nums">{avgDuration} min</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Latest session</dt>
              <dd className="font-medium">
                {sessions[0] ? formatDate(sessions[0].date) : "—"}
              </dd>
            </div>
          </dl>
          <Link
            href={`/sessions?child=${child.id}`}
            className="mt-4 block text-sm font-medium text-brand-700 hover:underline"
          >
            View sessions
          </Link>
        </Card>
        <Card className="bg-panel shadow-none">
          <CardTitle>Therapist notes</CardTitle>
          <ul className="mt-3 space-y-4 text-sm">
            {notes.slice(0, 3).map((n) => (
              <li key={n.id}>
                <p className="leading-relaxed">{n.text}</p>
                <p className="mt-1 text-xs text-muted">{formatDate(n.createdAt)}</p>
              </li>
            ))}
            {notes.length === 0 && <li className="text-muted">No notes yet.</li>}
          </ul>
        </Card>
      </div>
    </>
  );
}
