import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { repo } from "@/data";

export const metadata: Metadata = { title: "Activities" };

export default async function ActivitiesPage() {
  const activities = await repo.listActivities();
  return (
    <>
      <PageHeader
        title="Activities"
        description="Story-based exercises therapists can assign."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {activities.map((a) => (
          <Card key={a.id}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-lg font-semibold">{a.name}</p>
              <Badge tone="data">{a.difficulty}</Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{a.objective}</p>
            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Target skill</dt>
                <dd className="text-right">{a.targetSkill}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Duration</dt>
                <dd>{a.durationMin} min</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Movements</dt>
                <dd className="text-right">{a.movements.join(", ")}</dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>
    </>
  );
}
