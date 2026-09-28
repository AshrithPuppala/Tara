import { Card, CardTitle } from "@/components/ui/Card";
import type { TherapistNote as Note } from "@/domain/types";
import { formatDate } from "@/lib/format";

export function TherapistNote({ note }: { note: Note | undefined }) {
  return (
    <Card className="bg-panel shadow-none">
      <CardTitle>Therapist Notes</CardTitle>
      {note ? (
        <>
          <p className="mt-3 text-[15px] leading-relaxed text-ink">
            &ldquo;{note.text}&rdquo;
          </p>
          <p className="mt-4 text-xs text-muted">
            {note.author} ·{" "}
            {formatDate(note.createdAt, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </>
      ) : (
        <p className="mt-3 text-sm text-muted">No notes yet for this child.</p>
      )}
    </Card>
  );
}
