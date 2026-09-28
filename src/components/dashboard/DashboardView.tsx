"use client";

import { useMemo } from "react";
import type { Activity, Child, Session, TherapistNote as Note } from "@/domain/types";
import { summarize } from "@/domain/metrics/dashboard";
import { useAppStore } from "@/stores/useAppStore";
import { PageHeader } from "@/components/ui/PageHeader";
import { ChildSelector } from "./ChildSelector";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { MetricCard } from "./MetricCard";
import { RomChart } from "./RomChart";
import { MotorRadar } from "./MotorRadar";
import { SessionTable } from "./SessionTable";
import { TherapistNote } from "./TherapistNote";

export function DashboardView({
  childList,
  sessions,
  notes,
  activities,
}: {
  childList: Child[];
  sessions: Session[];
  notes: Note[];
  activities: Activity[];
}) {
  const { selectedChildId, range, setChild, setRange } = useAppStore();

  const summary = useMemo(
    () =>
      summarize(
        sessions.filter((s) => s.childId === selectedChildId),
        range,
      ),
    [sessions, selectedChildId, range],
  );
  const latestNote = notes.find((n) => n.childId === selectedChildId); // notes are sorted newest-first
  const { kpis } = summary;

  return (
    <>
      <PageHeader title="Child Progress">
        <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:flex-1">
          <ChildSelector
            childList={childList}
            value={selectedChildId}
            onChange={setChild}
          />
          <TimeRangeSelector value={range} onChange={setRange} />
        </div>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Sessions"
          value={kpis.totalSessions.value}
          trend={kpis.totalSessions.trend}
        />
        <MetricCard
          title="Avg. Range of Motion"
          value={kpis.avgRom.value}
          unit="°"
          trend={kpis.avgRom.trend}
        />
        <MetricCard
          title="Grip Strength"
          value={kpis.grip.label}
          trend={kpis.grip.trend}
        />
        <MetricCard
          title="Engagement Score"
          value={kpis.engagement.value}
          unit="/10"
          trend={kpis.engagement.trend}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <RomChart data={summary.romSeries} />
        <MotorRadar data={summary.radar} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <SessionTable sessions={summary.recent} activities={activities} />
        <TherapistNote note={latestNote} />
      </div>
    </>
  );
}
