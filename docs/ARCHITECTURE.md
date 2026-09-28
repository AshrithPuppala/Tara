# Architecture

## System (from the SIH deck)

```
Puppet (ESP32: AS5600 x2, FSR-402, MPU6050, LRA motor)
   -> BLE ->  Mobile app (Flutter)  -> sync -> Supabase  -> TARA web (this repo)
```

The web app **never talks BLE**. The "Toy connected" chip shows the device's last synced status. This repo is the therapist dashboard only.

## Layers in this repo

```
data/mock or Supabase  ->  data/repository.ts  ->  app/ (server components fetch)
                                                     -> components/ (client components interact)
domain/types.ts  = the contract everything above must satisfy
domain/metrics/  = pure calculations (summaries today, sensor metrics later)
```

### Why a Repository interface

The UI depends on `Repository`, not on mock files. Going real means writing `data/supabase/supabaseRepository.ts` and changing one line in `data/index.ts`.

### Server vs client components

Pages are server components that fetch via the repository and pass plain data to a client view (`DashboardView`) that owns interaction (child and range selection via Zustand). This keeps data access swappable and the client bundle small.

### State

- `stores/useAppStore.ts`: selected child, selected range. UI state only.
- Data is never stored globally; it comes from the repository per page.

## Planned pipeline (milestone 2)

```
raw sensor data -> computeMetrics -> detectPatterns -> LLM phrasing (server route) -> Zod-validated Insight[] -> UI
```

The LLM only phrases findings the pattern detector already produced. If validation or the network fails, fall back to templated text from the detected patterns so the demo never depends on a live API.

## Decisions log

- Next.js App Router + TypeScript: in the SIH deck, best support for AI-assisted coding.
- No component library install: primitives are small and owned; add shadcn/ui components via its CLI when needed.
- Inter via `@fontsource-variable/inter` (bundled, no runtime Google Fonts request).
- Recharts for charts (in the deck).
