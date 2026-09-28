/**
 * THE DATA CONTRACT.
 * Everything the UI renders comes through these types. Whether data comes from the
 * mock generator, Supabase, or the Flutter app's upload later, it must match these.
 * Change a shape here first, then fix the compiler errors.
 */
import { z } from "zod";

export const TimeRangeSchema = z.enum(["1W", "1M", "3M", "6M"]);
export type TimeRange = z.infer<typeof TimeRangeSchema>;

export const ChildSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().int(),
  therapyStartDate: z.string(), // ISO date
  focusAreas: z.array(z.string()),
  goals: z.array(z.string()),
  therapist: z.string(),
});
export type Child = z.infer<typeof ChildSchema>;

export const ActivitySchema = z.object({
  id: z.string(),
  name: z.string(),
  objective: z.string(),
  targetSkill: z.string(),
  durationMin: z.number(),
  difficulty: z.enum(["Easy", "Moderate", "Challenging"]),
  movements: z.array(z.string()),
});
export type Activity = z.infer<typeof ActivitySchema>;

/**
 * One completed therapy session, as summary metrics.
 * `source` says where the numbers came from so nobody mistakes demo data for real data.
 * Later we add `raw` (sensor time series) beside these; see docs/DATA_CONTRACT.md.
 */
export const SessionSchema = z.object({
  id: z.string(),
  childId: z.string(),
  date: z.string(), // ISO date (YYYY-MM-DD)
  activityId: z.string(),
  durationMin: z.number(),
  therapist: z.string(),
  status: z.enum(["completed", "processing", "failed"]),
  source: z.enum(["synthetic", "device"]),
  metrics: z.object({
    romLeftDeg: z.number(),
    romRightDeg: z.number(),
    gripPct: z.number(), // 0-100
    smoothnessPct: z.number(), // 0-100
    coordinationPct: z.number(), // 0-100
    controlPct: z.number(), // 0-100
    repetitions: z.number().int(),
    targetRepetitions: z.number().int(),
    engagement: z.number(), // 0-10
  }),
});
export type Session = z.infer<typeof SessionSchema>;

export const TherapistNoteSchema = z.object({
  id: z.string(),
  childId: z.string(),
  sessionId: z.string().optional(),
  author: z.string(),
  createdAt: z.string(), // ISO date
  text: z.string(),
});
export type TherapistNote = z.infer<typeof TherapistNoteSchema>;

export const DeviceStatusSchema = z.object({
  deviceId: z.string(),
  name: z.string(),
  state: z.enum(["connecting", "connected", "disconnected", "low_battery", "error"]),
  batteryPct: z.number(),
  lastSyncedAt: z.string(),
});
export type DeviceStatus = z.infer<typeof DeviceStatusSchema>;
