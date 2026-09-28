# Data contract

Source of truth: `src/domain/types.ts`. This page explains intent.

## Entities

`Child`, `Activity`, `Session`, `TherapistNote`, `DeviceStatus`. See the file for exact fields.

## Session metrics (today)

Each `Session` carries summary metrics: ROM left/right (degrees), grip %, smoothness %, coordination %, control %, repetitions vs target, and engagement (0-10).

`source: "synthetic" | "device"` marks provenance. The UI must never present `synthetic` values as real measurements.

## Metric formulas: NOT DEFINED YET

The SIH deck names AROM, LDLJ-based movement smoothness and grip fatigue curves, but the team has not fixed formulas or normal ranges. Until it does:

- Values are seeded synthetic numbers (`src/data/mock/seed.ts`).
- The radar draws ROM as a % of a placeholder 150° reference (`ROM_REFERENCE_DEG`).
- Do not claim clinical meaning.

**Action for the team:** decide with the hardware side how each metric is computed from raw sensor data, and record it here.

## Planned: raw data

```ts
raw: {
  sampleRateHz: number;
  t: number[];
  jointAngleDeg: { left: number[]; right: number[] };   // AS5600
  gripForce: number[];                                  // FSR-402
  imu: { accel: number[][]; gyro: number[][] };         // MPU6050
  hapticEvents: { t: number; intensity: number }[];
}
```

`computeMetrics(raw) -> metrics` will live in `src/domain/metrics/`. The mobile app uploads sessions in this shape.

## Planned: insights

```ts
Insight {
  id, category: "observation" | "trend" | "deviation" | "baseline",
  observation: string,
  evidence: { metric: string; sessionIds?: string[] }[],
  confidence: "low" | "medium" | "high",
  consideration?: string,
}
```
