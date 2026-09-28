import { cn } from "@/lib/cn";

const tones = {
  neutral: "bg-panel text-muted",
  good: "bg-good-wash text-good",
  brand: "bg-brand-50 text-brand-800",
  data: "bg-data-wash text-data",
} as const;

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
