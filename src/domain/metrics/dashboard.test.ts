import { describe, expect, it } from "vitest";
import { sessions } from "@/data/mock/seed";
import { summarize } from "./dashboard";

const aarav = sessions.filter((s) => s.childId === "aarav");

describe("summarize", () => {
  it("only counts sessions inside the range", () => {
    const week = summarize(aarav, "1W").kpis.totalSessions.value;
    const sixMonths = summarize(aarav, "6M").kpis.totalSessions.value;
    expect(week).toBeGreaterThan(0);
    expect(sixMonths).toBeGreaterThan(week);
  });

  it("returns all five radar axes within 0-100", () => {
    const { radar } = summarize(aarav, "3M");
    expect(radar.map((r) => r.skill)).toEqual([
      "ROM",
      "Coordination",
      "Strength",
      "Smoothness",
      "Control",
    ]);
    for (const r of radar) {
      expect(r.current).toBeGreaterThanOrEqual(0);
      expect(r.current).toBeLessThanOrEqual(100);
    }
  });

  it("handles a child with no sessions", () => {
    const s = summarize([], "1M");
    expect(s.kpis.totalSessions.value).toBe(0);
    expect(s.romSeries).toEqual([]);
  });

  it("mock data is deterministic", () => {
    expect(sessions[0].metrics.romLeftDeg).toBe(sessions[0].metrics.romLeftDeg);
    expect(sessions.length).toBeGreaterThan(100);
  });
});
