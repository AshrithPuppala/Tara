import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { repo } from "@/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Children" };

export default async function ChildrenPage() {
  const [childList, sessions] = await Promise.all([
    repo.listChildren(),
    repo.listSessions(),
  ]);
  return (
    <>
      <PageHeader title="Children" description="Profiles and therapy context." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {childList.map((c) => {
          const count = sessions.filter((s) => s.childId === c.id).length;
          return (
            <Link key={c.id} href={`/children/${c.id}`}>
              <Card className="h-full transition-colors hover:bg-panel">
                <p className="text-lg font-semibold">{c.name}</p>
                <p className="mt-1 text-sm text-muted">
                  Age {c.age} · therapy since{" "}
                  {formatDate(c.therapyStartDate, { month: "long", year: "numeric" })}
                </p>
                <p className="mt-4 text-sm text-muted">
                  Focus: {c.focusAreas.join(", ")}
                </p>
                <p className="mt-1 text-sm text-muted tabular-nums">{count} sessions</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
