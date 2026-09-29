import { describe, expect, it } from "vitest";
import { generateTimeSeries, scenarioFor } from "./timeSeries";

describe("generateTimeSeries", () => {
  it("is deterministic for the same session id", () => {
    expect(generateTimeSeries("s-1")).toEqual(generateTimeSeries("s-1"));
  });

  it("produces hz * duration + 1 samples in order", () => {
    const s = generateTimeSeries("s-1", 10, 10);
    expect(s.points).toHaveLength(101);
    expect(s.points[0].t).toBe(0);
    expect(s.points[100].t).toBeCloseTo(10);
  });

  it("keeps angles in a plausible range", () => {
    const { points } = generateTimeSeries("s-2");
    for (const p of points) {
      expect(p.leftArmDeg).toBeGreaterThan(0);
      expect(p.leftArmDeg).toBeLessThan(140);
    }
  });

  it("picks a scenario from the session id", () => {
    expect(["steady", "fatigue", "tremor", "compensation"]).toContain(scenarioFor("abc"));
  });
});
