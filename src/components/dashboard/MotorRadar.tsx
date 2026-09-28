"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { Card, CardTitle } from "@/components/ui/Card";
import { chart } from "@/lib/chartColors";

type Point = { skill: string; current: number; previous: number };

export function MotorRadar({ data }: { data: Point[] }) {
  return (
    <Card>
      <CardTitle>Motor Skill Profile</CardTitle>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke={chart.grid} />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: "#4b5350" }} />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Previous"
              dataKey="previous"
              stroke={chart.radarPrevious}
              fill={chart.radarPrevious}
              fillOpacity={0.08}
              strokeDasharray="4 3"
            />
            <Radar
              name="Current"
              dataKey="current"
              stroke={chart.radarCurrent}
              fill={chart.radarCurrent}
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
