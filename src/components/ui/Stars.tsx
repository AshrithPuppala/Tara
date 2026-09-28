import { Star } from "lucide-react";
import { toStars } from "@/lib/format";

export function Stars({ engagement }: { engagement: number }) {
  const n = toStars(engagement);
  return (
    <span
      className="inline-flex gap-0.5"
      role="img"
      aria-label={`Engagement ${n} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={14} className={i < n ? "fill-gold text-gold" : "text-line"} />
      ))}
    </span>
  );
}
