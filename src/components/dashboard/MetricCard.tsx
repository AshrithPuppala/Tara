import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Trend } from "@/domain/metrics/dashboard";
import { cn } from "@/lib/cn";

export function MetricCard({
  title,
  value,
  unit,
  trend,
}: {
  title: string;
  value: string | number;
  unit?: string;
  trend: Trend;
}) {
  const Icon =
    trend.direction === "up" ? ArrowUp : trend.direction === "down" ? ArrowDown : Minus;
  return (
    <Card className="p-5">
      <p className="text-sm text-muted">{title}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight tabular-nums">
        {value}
        {unit && <span className="text-xl font-semibold text-muted">{unit}</span>}
      </p>
      <p
        className={cn(
          "mt-2 flex items-center gap-1 text-xs font-medium",
          trend.direction === "up"
            ? "text-good"
            : trend.direction === "down"
              ? "text-red-600"
              : "text-muted",
        )}
      >
        <Icon size={13} />
        {trend.text}
      </p>
    </Card>
  );
}
