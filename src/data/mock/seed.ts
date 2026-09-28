/**
 * Deterministic synthetic data. Same output on every run/machine (seeded PRNG),
 * so demos and screenshots are reproducible. EVERYTHING here is fake: it is flagged
 * `source: "synthetic"` and the UI shows a "Demo data" badge.
 */
import type {
  Activity,
  Child,
  DeviceStatus,
  Session,
  TherapistNote,
} from "@/domain/types";

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export const THERAPIST = "Dr. Meera";

export const activities: Activity[] = [
  {
    id: "brave-elephant",
    name: "The Brave Elephant",
    objective:
      "Guide the elephant across the river by raising and lowering both arms in a steady rhythm.",
    targetSkill: "Shoulder and elbow range of motion",
    durationMin: 15,
    difficulty: "Moderate",
    movements: ["Arm raise", "Arm lower", "Alternating swing"],
  },
  {
    id: "river-journey",
    name: "River Journey",
    objective: "Steer the boat with slow wrist turns to follow the bends of the river.",
    targetSkill: "Wrist rotation and smoothness",
    durationMin: 12,
    difficulty: "Easy",
    movements: ["Wrist rotation", "Slow sweep"],
  },
  {
    id: "colour-quest",
    name: "Colour Quest",
    objective:
      "Squeeze and hold to collect colours from the market stalls, releasing to move on.",
    targetSkill: "Grip strength and hold duration",
    durationMin: 18,
    difficulty: "Challenging",
    movements: ["Squeeze and hold", "Controlled release", "Two-hand lift"],
  },
  {
    id: "peacock-dance",
    name: "The Peacock's Dance",
    objective: "Mirror the peacock's dance to practise left-right coordination.",
    targetSkill: "Bilateral coordination",
    durationMin: 14,
    difficulty: "Moderate",
    movements: ["Alternating arms", "Mirror movement"],
  },
];

type Profile = {
  child: Child;
  romStart: [number, number]; // left, right at first session
  romPerMonth: number;
  gripStart: number;
  gripPerMonth: number;
  base: number; // baseline for smoothness / coordination / control
  perMonth: number;
};

const profiles: Profile[] = [
  {
    child: {
      id: "aarav",
      name: "Aarav S.",
      age: 7,
      therapyStartDate: "2026-04-10",
      focusAreas: ["Wrist ROM", "Grip endurance"],
      goals: [
        "Reach 90° wrist-arm ROM on both sides",
        "Hold grip for 10 seconds without drop-off",
      ],
      therapist: THERAPIST,
    },
    romStart: [48, 44],
    romPerMonth: 4.4,
    gripStart: 52,
    gripPerMonth: 3.5,
    base: 58,
    perMonth: 3.5,
  },
  {
    child: {
      id: "diya",
      name: "Diya R.",
      age: 6,
      therapyStartDate: "2026-05-02",
      focusAreas: ["Bilateral coordination", "Movement smoothness"],
      goals: [
        "Alternate arms smoothly for a full activity",
        "Reduce sudden stops mid-movement",
      ],
      therapist: THERAPIST,
    },
    romStart: [62, 60],
    romPerMonth: 2.6,
    gripStart: 60,
    gripPerMonth: 1.8,
    base: 52,
    perMonth: 4.6,
  },
  {
    child: {
      id: "kabir",
      name: "Kabir M.",
      age: 8,
      therapyStartDate: "2026-03-18",
      focusAreas: ["Grip strength", "Sustained attention"],
      goals: ["Complete Colour Quest at Challenging level", "Increase hold duration"],
      therapist: THERAPIST,
    },
    romStart: [70, 66],
    romPerMonth: 1.8,
    gripStart: 40,
    gripPerMonth: 5.2,
    base: 60,
    perMonth: 2.4,
  },
  {
    child: {
      id: "ananya",
      name: "Ananya T.",
      age: 9,
      therapyStartDate: "2026-06-05",
      focusAreas: ["Shoulder ROM", "Control"],
      goals: [
        "Raise both arms above shoulder height",
        "Hold a steady position for 5 seconds",
      ],
      therapist: THERAPIST,
    },
    romStart: [40, 52],
    romPerMonth: 5.2,
    gripStart: 64,
    gripPerMonth: 1.2,
    base: 55,
    perMonth: 3.0,
  },
];

export const children: Child[] = profiles.map((p) => p.child);

const noteTemplates = [
  "Good improvement in wrist ROM. Child was highly engaged with the story. Recommend increasing hold duration exercises.",
  "Movement looked less smooth toward the end of the activity. Try shorter blocks next session.",
  "Left side still lagging the right. Keep the alternating-arm activities in rotation.",
  "Very settled today. Grip held well through the second half. Consider a harder activity next week.",
  "Needed a short break mid-session, then recovered well. Worth watching whether this repeats.",
];

const START = Date.parse("2026-04-15T00:00:00Z");
const END = Date.parse("2026-09-25T00:00:00Z");
const DAY = 86_400_000;
const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

function build() {
  const sessions: Session[] = [];
  const notes: TherapistNote[] = [];

  profiles.forEach((p, pi) => {
    const rand = mulberry32(42 + pi * 101);
    const childStart = Math.max(
      START,
      Date.parse(p.child.therapyStartDate + "T00:00:00Z"),
    );
    let day = childStart + Math.floor(rand() * 3) * DAY;
    let n = 0;

    while (day <= END) {
      const months = (day - childStart) / (30 * DAY);
      const jitter = () => (rand() - 0.5) * 6;
      const activity = activities[Math.floor(rand() * activities.length)];
      const engagement = clamp(6.4 + months * 0.32 + (rand() - 0.5) * 1.6, 5, 9.8);
      const id = `${p.child.id}-${String(++n).padStart(3, "0")}`;

      sessions.push({
        id,
        childId: p.child.id,
        date: iso(day),
        activityId: activity.id,
        durationMin: Math.round(clamp(activity.durationMin + (rand() - 0.5) * 4, 8, 22)),
        therapist: THERAPIST,
        status: "completed",
        source: "synthetic",
        metrics: {
          romLeftDeg: Math.round(
            clamp(p.romStart[0] + months * p.romPerMonth + jitter(), 20, 140),
          ),
          romRightDeg: Math.round(
            clamp(p.romStart[1] + months * p.romPerMonth + jitter(), 20, 140),
          ),
          gripPct: Math.round(
            clamp(p.gripStart + months * p.gripPerMonth + jitter(), 20, 98),
          ),
          smoothnessPct: Math.round(
            clamp(p.base + months * p.perMonth + jitter(), 20, 98),
          ),
          coordinationPct: Math.round(
            clamp(p.base + 4 + months * p.perMonth * 0.9 + jitter(), 20, 98),
          ),
          controlPct: Math.round(
            clamp(p.base - 2 + months * p.perMonth * 1.1 + jitter(), 20, 98),
          ),
          repetitions: Math.round(clamp(6 + months * 0.6 + rand() * 3, 4, 12)),
          targetRepetitions: 10,
          engagement: Math.round(engagement * 10) / 10,
        },
      });

      if (n % 5 === 0) {
        notes.push({
          id: `note-${id}`,
          childId: p.child.id,
          sessionId: id,
          author: THERAPIST,
          createdAt: iso(day),
          text: noteTemplates[Math.floor(rand() * noteTemplates.length)],
        });
      }
      day += (2 + Math.floor(rand() * 2)) * DAY; // every 2-3 days
    }
  });

  return { sessions, notes };
}

const built = build();
export const sessions = built.sessions;
export const notes = built.notes;

export const deviceStatus: DeviceStatus = {
  deviceId: "KT-001",
  name: "Kathputra-Tact",
  state: "connected",
  batteryPct: 82,
  lastSyncedAt: "2026-09-25T10:42:00Z",
};
