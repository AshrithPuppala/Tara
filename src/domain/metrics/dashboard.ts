/**
 * Pure functions that turn a child's sessions into what the dashboard shows.
 * No React, no data fetching. Easy to unit test.
 *
 * NOTE: these are *summary* calculations over per-session metrics. The formulas that
 * produce the per-session metrics from raw sensor data (ROM, smoothness, ...) are NOT
 * defined yet: see docs/DATA_CONTRACT.md. Do not present them as clinical measures.
 */
import type { Session, TimeRange } from "../types";

export const RANGE_DAYS: Record<TimeRange, number> = {
  "1W": 7,
  "1M": 30,
  "3M": 90,
  "6M": 180,
};
/** Bucket size (days) for the ROM chart. 0 = one point per session. */
const BUCKET_DAYS: Record<TimeRange, number> = { "1W": 0, "1M": 0, "3M": 7, "6M": 14 };
/** ROM is drawn on the radar as a % of this reference range. Placeholder, not clinical. */
export const ROM_REFERENCE_DEG = 150;

const DAY = 86_400_000;
const t = (iso: string) => Date.parse(iso + "T00:00:00Z");
const mean = (xs: number[]) =>
  xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
const round1 = (n: number) => Math.round(n * 10) / 10;
const avgRom = (s: Session) => (s.metrics.romLeftDeg + s.metrics.romRightDeg) / 2;

export type Trend = { text: string; direction: "up" | "down" | "flat" };

export type DashboardSummary = {
  kpis: {
    totalSessions: { value: number; trend: Trend };
    avgRom: { value: number; trend: Trend };
    grip: { label: "Improving" | "Stable" | "Declining"; trend: Trend };
    engagement: { value: number; trend: Trend };
  };
  romSeries: { label: string; left: number; right: number }[];
  radar: { skill: string; current: number; previous: number }[];
  recent: Session[];
};

export function summarize(all: Session[], range: TimeRange): DashboardSummary {
  const sessions = [...all].sort((a, b) => a.date.localeCompare(b.date));
  const anchor = sessions.length ? t(sessions[sessions.length - 1].date) : 0;
  const span = RANGE_DAYS[range] * DAY;

  const current = sessions.filter((s) => t(s.date) > anchor - span);
  const previous = sessions.filter(
    (s) => t(s.date) <= anchor - span && t(s.date) > anchor - 2 * span,
  );

  const pct = (cur: number, prev: number): Trend => {
    if (!prev) return { text: "no earlier data", direction: "flat" };
    const d = ((cur - prev) / prev) * 100;
    return {
      text: `${Math.abs(Math.round(d))}%`,
      direction: d > 1 ? "up" : d < -1 ? "down" : "flat",
    };
  };
  const diff = (cur: number, prev: number, unit = ""): Trend => {
    const d = round1(cur - prev);
    return {
      text: `${Math.abs(d)}${unit}`,
      direction: d > 0.05 ? "up" : d < -0.05 ? "down" : "flat",
    };
  };

  const gripCur = mean(current.map((s) => s.metrics.gripPct));
  const gripPrev = mean(previous.map((s) => s.metrics.gripPct));
  const gripTrend = pct(gripCur, gripPrev);

  const countDelta = current.length - previous.length;

  return {
    kpis: {
      totalSessions: {
        value: current.length,
        trend: {
          text:
            countDelta === 0
              ? "same as previous period"
              : `${Math.abs(countDelta)} ${countDelta > 0 ? "more" : "fewer"} than previous period`,
          direction: countDelta > 0 ? "up" : countDelta < 0 ? "down" : "flat",
        },
      },
      avgRom: {
        value: Math.round(mean(current.map(avgRom))),
        trend: pct(mean(current.map(avgRom)), mean(previous.map(avgRom))),
      },
      grip: {
        label:
          gripTrend.direction === "up"
            ? "Improving"
            : gripTrend.direction === "down"
              ? "Declining"
              : "Stable",
        trend: gripTrend,
      },
      engagement: {
        value: round1(mean(current.map((s) => s.metrics.engagement))),
        trend: diff(
          mean(current.map((s) => s.metrics.engagement)),
          mean(previous.map((s) => s.metrics.engagement)),
        ),
      },
    },
    romSeries: bucketRom(current, BUCKET_DAYS[range]),
    radar: radar(current),
    recent: [...current].reverse().slice(0, 5),
  };
}

function fmt(iso: string) {
  return new Date(t(iso)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function bucketRom(sessions: Session[], bucketDays: number) {
  if (!bucketDays) {
    return sessions.map((s) => ({
      label: fmt(s.date),
      left: s.metrics.romLeftDeg,
      right: s.metrics.romRightDeg,
    }));
  }
  const buckets = new Map<number, Session[]>();
  for (const s of sessions) {
    const k = Math.floor(t(s.date) / (bucketDays * DAY));
    buckets.set(k, [...(buckets.get(k) ?? []), s]);
  }
  return [...buckets.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, group]) => ({
      label: fmt(group[0].date),
      left: Math.round(mean(group.map((s) => s.metrics.romLeftDeg))),
      right: Math.round(mean(group.map((s) => s.metrics.romRightDeg))),
    }));
}

/** "Current" = later half of the sessions in range, "Previous" = earlier half. */
function radar(sessions: Session[]) {
  const mid = Math.floor(sessions.length / 2);
  const prev = sessions.length > 1 ? sessions.slice(0, mid) : sessions;
  const cur = sessions.length > 1 ? sessions.slice(mid) : sessions;
  const axes: [string, (s: Session) => number][] = [
    ["ROM", (s) => Math.min(100, (avgRom(s) / ROM_REFERENCE_DEG) * 100)],
    ["Coordination", (s) => s.metrics.coordinationPct],
    ["Strength", (s) => s.metrics.gripPct],
    ["Smoothness", (s) => s.metrics.smoothnessPct],
    ["Control", (s) => s.metrics.controlPct],
  ];
  return axes.map(([skill, f]) => ({
    skill,
    current: Math.round(mean(cur.map(f))),
    previous: Math.round(mean(prev.map(f))),
  }));
}
