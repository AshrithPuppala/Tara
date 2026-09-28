export const formatDate = (
  iso: string,
  opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" },
) =>
  new Date(iso + (iso.length === 10 ? "T00:00:00Z" : "")).toLocaleDateString("en-US", {
    ...opts,
    timeZone: "UTC",
  });

/** Engagement is stored 0-10; the UI shows it as 5 stars. */
export const toStars = (engagement: number) =>
  Math.max(1, Math.min(5, Math.round(engagement / 2)));
