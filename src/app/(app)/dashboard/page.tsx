import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { repo } from "@/data";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const [childList, sessions, notes, activities] = await Promise.all([
    repo.listChildren(),
    repo.listSessions(),
    repo.listNotes(),
    repo.listActivities(),
  ]);
  return (
    <DashboardView
      childList={childList}
      sessions={sessions}
      notes={notes}
      activities={activities}
    />
  );
}
