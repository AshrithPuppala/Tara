# Instructions for AI coding assistants

Read this before generating code for this repo (Claude Code, Cursor, Copilot, etc.).

## What this is

TARA: a therapist web workspace for the Kathputra-Tact sensor puppet. Post-session analysis only. **No live telemetry, no real-time BLE in the web app** (BLE goes puppet to phone app; the web app reads synced data). Full definition: `docs/PRODUCT.md`.

## Commands

`npm run dev` · `npm run check` (typecheck + lint + test + build). Run `check` before finishing a task.

## Architecture rules

1. UI gets data only via `repo` from `src/data/index.ts` (interface in `src/data/repository.ts`). Never import `src/data/mock/*` in components.
2. Types live in `src/domain/types.ts` (Zod). Change there first.
3. Calculations are pure functions in `src/domain/` with a Vitest test. No React imports in `domain/` or `data/`.
4. Server components fetch; client components handle interaction (see `DashboardView`).
5. Reuse existing components in `src/components/ui/` and `src/components/dashboard/`. Do not create near-duplicates.
6. Styling: Tailwind classes using the tokens in `src/app/globals.css` (`bg-surface`, `text-muted`, `bg-brand-800`, ...). No new raw hex values in components.
7. Match the visual language in `docs/DESIGN_SYSTEM.md`. Do not add dark mode, gradients, glassmorphism or heavy shadows.

## Product and safety rules (important)

- Never invent clinical formulas, thresholds or medical claims. Metrics are synthetic placeholders until defined.
- AI/insight text must describe observations, not diagnoses. Say "movement became less smooth in the last 4 minutes", never "the child has X". Include supporting evidence and confidence. Suggestions are phrased as "consider observing...".
- Never add real child data or secrets. Keep AI API keys server-side.

## Style

TypeScript strict, no `any`. Small components. Sentence-case UI copy, active voice, no emojis as icons (use lucide-react).
