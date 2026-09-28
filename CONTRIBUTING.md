# Contributing

Thanks for helping build TARA. This guide keeps six people (and their AI assistants) from stepping on each other.

## Setup

```bash
npm install
npm run dev
```

Run `npm run check` before every PR. CI runs the same thing.

## Workflow

1. Pick or create an issue. Comment so nobody duplicates it.
2. Branch from `main`: `feat/session-analysis`, `fix/radar-labels`, `docs/roadmap`.
3. Keep PRs small (one screen or one concern). Aim for under ~400 changed lines.
4. Open a PR using the template. Add a screenshot for any UI change.
5. One approving review, then squash-merge. Do not push directly to `main`.

Commit messages: short, imperative, prefixed: `feat: add session filter`, `fix: ...`, `docs: ...`, `chore: ...`.

## Rules of the codebase

- **Data comes through `src/data/repository.ts`.** Never import `data/mock/*` from a component.
- **The data contract lives in `src/domain/types.ts`.** Change it first, then fix the type errors. Tell the team, because the mobile app and backend depend on it.
- **Calculations live in `src/domain/`**, as pure functions with tests. No React there.
- **Reuse before creating.** Check `components/ui/` and existing dashboard components first.
- **Use design tokens**, not raw hex values in components (see `docs/DESIGN_SYSTEM.md`). Chart colours are the one exception, in `lib/chartColors.ts`.
- **Do not invent clinical formulas or claims.** Anything metric-related is labelled synthetic or "prototype calculation" until the team defines it. See `docs/PRODUCT.md` for the AI language rules.
- **No real child data**, ever.

## Working with AI assistants

Point your tool at [`AGENTS.md`](AGENTS.md). Review generated code the same as any other PR. Prefer editing an existing component to adding a near-duplicate.

## Avoiding merge conflicts

Areas are mostly separate files. Before touching `src/domain/types.ts`, `src/lib/nav.ts` or `globals.css`, say so in the team chat.
