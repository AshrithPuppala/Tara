"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Pause, Play } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import type { SessionTimeSeries } from "@/domain/types";
import { chart } from "@/lib/chartColors";

// Three.js only works in the browser, so it is loaded client-side only.
const PuppetViewer = dynamic(() => import("./PuppetViewer").then((m) => m.PuppetViewer), {
  ssr: false,
  loading: () => (
    <p className="grid h-full place-items-center text-sm text-muted">Loading 3D view…</p>
  ),
});

export type SessionOption = { id: string; label: string };

const SPEEDS = [0.5, 1, 2, 4] as const;

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <Card className="p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums">
        {value}
        <span className="text-base font-semibold text-muted"> {unit}</span>
      </p>
    </Card>
  );
}

// PROTOTYPE placeholder targets. Not clinical values: the team must agree real ones
// with the therapist/hardware side (see docs/DATA_CONTRACT.md) before showing them as fact.
const ARM_TARGET_BAND = { from: 60, to: 100 } as const; // degrees

type Band = { from: number; to: number; label: string };

function SeriesChart({
  title,
  data,
  time,
  lines,
  yMax,
  band,
  formatY,
}: {
  title: string;
  data: SessionTimeSeries["points"];
  time: number;
  lines: {
    key: "leftArmDeg" | "rightArmDeg" | "gripN" | "tremorAmp" | "rollDeg";
    name: string;
    color: string;
  }[];
  yMax: number;
  band?: Band;
  formatY?: (v: number) => string;
}) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      {band && <p className="mt-1 text-xs text-muted">Green band: {band.label}</p>}
      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={chart.grid} vertical={false} />
            <XAxis
              dataKey="t"
              type="number"
              domain={[0, "dataMax"]}
              tickFormatter={(v: number) => `${Math.round(v)}s`}
              tick={{ fontSize: 12, fill: chart.axis }}
              axisLine={{ stroke: chart.grid }}
              tickLine={false}
            />
            <YAxis
              domain={[0, yMax]}
              tickFormatter={formatY}
              tick={{ fontSize: 12, fill: chart.axis }}
              axisLine={false}
              tickLine={false}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            {band && (
              <ReferenceArea
                y1={band.from}
                y2={band.to}
                fill={chart.target}
                fillOpacity={0.2}
                stroke={chart.target}
                strokeOpacity={0.35}
                strokeDasharray="3 3"
              />
            )}
            {lines.map((l) => (
              <Line
                key={l.key}
                name={l.name}
                dataKey={l.key}
                stroke={l.color}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
                type="monotone"
              />
            ))}
            <ReferenceLine x={time} stroke={chart.axis} strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function InsightsView({
  series,
  options,
  selectedId,
}: {
  series: SessionTimeSeries;
  options: SessionOption[];
  selectedId: string;
}) {
  const router = useRouter();
  const { points, hz } = series;
  const duration = points[points.length - 1]?.t ?? 0;

  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);

  // Playback clock: advances `time` about 20 times a second while playing.
  useEffect(() => {
    if (!playing || duration === 0) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const tick = (now: number) => {
      acc += (now - last) / 1000;
      last = now;
      if (acc >= 0.05) {
        const step = acc * speed;
        acc = 0;
        setTime((prev) => (prev + step > duration ? 0 : prev + step));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, speed, duration]);

  const now = points[Math.min(points.length - 1, Math.floor(time * hz))];

  return (
    <>
      <PageHeader
        title="Insights"
        description="Replay of a completed session. The puppet follows the recorded sensor data."
      >
        <select
          aria-label="Choose a session"
          value={selectedId}
          onChange={(e) => router.push(`/insights?session=${e.target.value}`)}
          className="rounded-lg border border-line bg-surface px-3 py-2 text-sm"
        >
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Card className="flex flex-col p-4">
          <div className="h-80 rounded-lg bg-panel">
            <PuppetViewer
              leftDeg={now.leftArmDeg}
              rightDeg={now.rightArmDeg}
              grip={now.gripN}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-800 px-3 py-2 text-sm font-medium text-white hover:bg-brand-900"
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
              {playing ? "Pause" : "Play"}
            </button>
            <input
              type="range"
              aria-label="Session position"
              min={0}
              max={duration}
              step={0.1}
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="min-w-32 flex-1"
            />
            <span className="text-sm tabular-nums text-muted">
              {Math.floor(time)}s / {Math.round(duration)}s
            </span>
            <div className="flex gap-1" role="group" aria-label="Playback speed">
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={
                    s === speed
                      ? "rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-800"
                      : "rounded-md px-2 py-1 text-xs text-muted hover:text-ink"
                  }
                >
                  {s}×
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 content-start gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Stat label="Left arm" value={now.leftArmDeg.toFixed(0)} unit="°" />
          <Stat label="Right arm" value={now.rightArmDeg.toFixed(0)} unit="°" />
          <Stat label="Grip" value={now.gripN.toFixed(1)} unit="N" />
          <Stat label="Tremor" value={(now.tremorAmp * 100).toFixed(0)} unit="%" />
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <SeriesChart
          title="Arm angles (°)"
          data={points}
          time={time}
          yMax={150}
          band={{ ...ARM_TARGET_BAND, label: "Target range (prototype)" }}
          lines={[
            { key: "leftArmDeg", name: "Left arm", color: chart.left },
            { key: "rightArmDeg", name: "Right arm", color: chart.right },
          ]}
        />
        <SeriesChart
          title="Grip force (N)"
          data={points}
          time={time}
          yMax={10}
          lines={[{ key: "gripN", name: "Grip", color: chart.left }]}
        />
        <SeriesChart
          title="Tremor (%)"
          data={points}
          time={time}
          yMax={1}
          formatY={(v) => `${Math.round(v * 100)}%`}
          lines={[{ key: "tremorAmp", name: "Tremor", color: chart.tremor }]}
        />
        <SeriesChart
          title="Torso lean (°)"
          data={points}
          time={time}
          yMax={30}
          formatY={(v) => `${v}°`}
          lines={[{ key: "rollDeg", name: "Lean", color: chart.lean }]}
        />
      </div>
    </>
  );
}
