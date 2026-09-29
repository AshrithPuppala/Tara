/**
 * Synthetic per-session sensor data for the Insights tab.
 * Deterministic: the same session id always gives the same curves (seeded PRNG),
 * so demos and screenshots are reproducible. EVERYTHING here is fake.
 * Only data/mock/mockRepository.ts should import this file.
 */
import type { SamplePoint, SessionTimeSeries } from "@/domain/types";

export type Scenario = "steady" | "fatigue" | "tremor" | "compensation";
const SCENARIOS: Scenario[] = ["steady", "fatigue", "tremor", "compensation"];

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/** Which behaviour a given session shows. Different sessions look different. */
export function scenarioFor(sessionId: string): Scenario {
  return SCENARIOS[hashString(sessionId) % SCENARIOS.length];
}

export function generateTimeSeries(
  sessionId: string,
  durationSec = 120,
  hz = 10,
): SessionTimeSeries {
  const scenario = scenarioFor(sessionId);
  const rand = mulberry32(hashString(sessionId));
  const noise = (s: number) => (rand() - 0.5) * 2 * s;

  const points: SamplePoint[] = [];
  const n = Math.floor(durationSec * hz);
  for (let i = 0; i <= n; i++) {
    const t = i / hz;
    // One repetition every 2.5 s.
    const phase = 2 * Math.PI * 0.4 * t;
    const reach = (Math.sin(phase) + 1) / 2; // 0..1

    const fatigueFactor = scenario === "fatigue" ? Math.max(0.5, 1 - t / 150) : 1;
    const maxRange = 105 * fatigueFactor;

    const left = 8 + reach * maxRange + noise(1);
    // The right side is a little weaker so left/right differences are visible.
    const right = 8 + ((Math.sin(phase + 0.3) + 1) / 2) * maxRange * 0.9 + noise(1);

    const gripBase = reach > 0.7 ? 6 * fatigueFactor : 1;
    const grip = Math.max(0, gripBase + noise(0.3));

    const roll =
      scenario === "compensation" ? 3 + 16 * reach + noise(0.5) : 3 + noise(0.5);

    const tremor =
      scenario === "tremor"
        ? 0.55 + 0.15 * Math.sin(2 * Math.PI * 0.1 * t) + noise(0.03)
        : 0.05 + Math.abs(noise(0.02));

    points.push({
      t,
      leftArmDeg: left,
      rightArmDeg: right,
      gripN: grip,
      rollDeg: roll,
      tremorAmp: tremor,
    });
  }
  return { sessionId, hz, source: "synthetic", points };
}
