"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardTitle } from "@/components/ui/Card";
import { chart } from "@/lib/chartColors";

type Point = { label: string; left: number; right: number };

export function RomChart({ data }: { data: Point[] }) {
  return (
    <Card>
      <CardTitle>Range of Motion (°)</CardTitle>
      <div className="mt-4 h-72">
        {data.length === 0 ? (
          <p className="grid h-full place-items-center text-sm text-muted">
            No sessions in this period.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid stroke={chart.grid} vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: chart.axis }}
                axisLine={{ stroke: chart.grid }}
                tickLine={false}
                minTickGap={24}
              />
              <YAxis
                domain={[0, 150]}
                ticks={[0, 30, 60, 90, 120, 150]}
                tick={{ fontSize: 12, fill: chart.axis }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip formatter={(v) => `${v}°`} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Line
                name="Left Hand"
                dataKey="left"
                stroke={chart.left}
                strokeWidth={2}
                dot={{ r: 3 }}
                type="monotone"
              />
              <Line
                name="Right Hand"
                dataKey="right"
                stroke={chart.right}
                strokeWidth={2}
                dot={{ r: 3 }}
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
