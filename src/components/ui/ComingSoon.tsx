import { Card } from "./Card";
import { PageHeader } from "./PageHeader";

/** Placeholder for pages that are in the nav but not built yet. Good first issues! */
export function ComingSoon({
  title,
  description,
  issue,
}: {
  title: string;
  description: string;
  issue: string;
}) {
  return (
    <>
      <PageHeader title={title} />
      <Card className="max-w-xl">
        <p className="text-sm text-ink">{description}</p>
        <p className="mt-3 text-sm text-muted">
          Planned work: {issue}. See docs/ROADMAP.md.
        </p>
      </Card>
    </>
  );
}
