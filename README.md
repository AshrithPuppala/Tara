# TARA — Kathputra-Tact Therapist Workspace

> The toy collects the data. TARA makes sense of it. The therapist decides what to do with it.

TARA is the web app for **Kathputra-Tact**, a sensor-embedded wooden puppet for pediatric neurodevelopmental therapy. After a therapy session, TARA turns the puppet's movement data into understandable performance information, observations and long-term progress that a therapist can act on.

Built for **Smart India Hackathon 2026** (SIH26198) by team **Seed42**.

> **Status: prototype.** All data is synthetic (seeded mock data) and the UI says so with a "Demo data" badge. Nothing here is a medical device or clinical advice.

## Quick start

Requires Node 20.9+ (Node 22 recommended; `nvm use` picks it up from `.nvmrc`).

```bash
git clone <your-repo-url> tara
cd tara
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are needed for the demo.

## What works today

| Area                                                                                                                        | State                                   |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Dashboard: child selector, 1W/1M/3M/6M range, KPI cards, ROM line chart, motor-skill radar, recent sessions, therapist note | Working, driven by mock data            |
| Sessions list (filter by child) and session detail                                                                          | Working                                 |
| Children list and child profile                                                                                             | Working                                 |
| Activities                                                                                                                  | Working (static list)                   |
| Reports, Story Library                                                                                                      | Placeholder pages                       |
| Session analysis with AI observations, therapist notes editing, processing flow                                             | Planned, see [ROADMAP](docs/ROADMAP.md) |

## Scripts

| Command          | Does                                                                 |
| ---------------- | -------------------------------------------------------------------- |
| `npm run dev`    | Start the dev server                                                 |
| `npm run check`  | Typecheck, lint, test, build (what CI runs; run before opening a PR) |
| `npm test`       | Unit tests (Vitest)                                                  |
| `npm run format` | Format with Prettier                                                 |

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Recharts · Zustand · Zod · Vitest. Planned: Supabase (data), Groq Llama-3 (insight phrasing).

## How it is organised

```
src/
  app/          Routes (Next.js App Router)
  components/   UI: ui/ (primitives), layout/, dashboard/
  domain/       Pure TypeScript: data contract (types.ts) and calculations (metrics/)
  data/         Repository interface + mock implementation (the swap point for a real backend)
  stores/       UI selection state (Zustand)
  lib/          Small helpers, nav config, chart colours
docs/           Product, architecture, data contract, design system, roadmap
```

The rule that keeps this maintainable: **`domain/` and `data/` never import from `components/`.** UI reads data through `data/repository.ts`, so replacing mock data with real toy data changes one file.

## Docs

- [Product definition and AI safety rules](docs/PRODUCT.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Data contract](docs/DATA_CONTRACT.md)
- [Design system](docs/DESIGN_SYSTEM.md)
- [Roadmap and good first issues](docs/ROADMAP.md)
- [Contributing](CONTRIBUTING.md) · [AI-assistant instructions](AGENTS.md)

## Privacy

This project concerns children's health data. Never commit real child data, names or session recordings. See [SECURITY.md](SECURITY.md).

## License

MIT. See [LICENSE](LICENSE).
