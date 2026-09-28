import { ChevronDown } from "lucide-react";
import type { Child } from "@/domain/types";

export function ChildSelector({
  childList,
  value,
  onChange,
}: {
  childList: Child[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Select child</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none rounded-xl border border-line bg-surface py-2 pl-4 pr-10 text-sm font-medium text-ink shadow-[var(--shadow-card)]"
      >
        {childList.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 text-muted"
      />
    </label>
  );
}
