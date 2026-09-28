# Roadmap

## Milestone 1: Foundation and dashboard (done)

Project setup, design tokens, app shell, dashboard, sessions, children, activities, mock data with repository swap point, CI.

## Milestone 2: Session analysis (the hero screen)

- [ ] Post-session **processing state** screen (honest about mock data)
- [ ] Per-session time series in the contract (`metrics.timeSeries`) and a session metric chart with metric switcher
- [ ] `MetricExplainer` (what it means, limits, no medical claims)
- [ ] Pattern detector in `domain/patterns/` (e.g. decline in final minutes, similar in earlier sessions)
- [ ] `InsightCard` with evidence, confidence, consideration
- [ ] Therapist notes: add/edit on a session (in-memory first)
- [ ] `/api/insights` route: LLM phrasing with Zod validation and templated fallback

## Milestone 3: Reports and progress

- [ ] Baseline vs current comparison
- [ ] Printable progress report (Reports page)

## Milestone 4: Content

- [ ] Story Library page
- [ ] Activity detail pages

## Milestone 5: Real data

- [ ] Define metric formulas with the hardware side (see DATA_CONTRACT.md)
- [ ] `SupabaseRepository` + schema + Row Level Security
- [ ] Session upload from the mobile app in the same contract
- [ ] Auth

## Good first issues

- Add pagination to Sessions (currently shows the latest 60)
- Empty and error states for charts
- Keyboard-accessible custom dropdown for the therapist menu
- Add Playwright smoke test: dashboard renders, changing child updates KPIs
- Replace the placeholder logo with the final Kathputli mark
- Add a `loading.tsx` skeleton for dashboard

## Explicitly out of scope

Live telemetry, real-time alerts, BLE in the browser, parent accounts, notifications, full medical records.
