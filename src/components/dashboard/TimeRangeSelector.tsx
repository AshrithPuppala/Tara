import type { TimeRange } from "@/domain/types";
import { cn } from "@/lib/cn";

const RANGES: TimeRange[] = ["1W", "1M", "3M", "6M"];

export function TimeRangeSelector({
  value,
  onChange,
}: {
  value: TimeRange;
  onChange: (r: TimeRange) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Time range"
      className="inline-flex rounded-xl border border-line bg-surface p-1 shadow-[var(--shadow-card)]"
    >
      {RANGES.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          aria-pressed={value === r}
          className={cn(
            "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
            value === r ? "bg-data-wash text-data" : "text-muted hover:text-ink",
          )}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
