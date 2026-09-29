/**
 * The swap point. UI code depends on this interface, never on mock files directly.
 * To go real: write `supabase/supabaseRepository.ts` implementing this, change one line
 * in data/index.ts. Nothing under components/ or app/ should need to change.
 */
import type {
  Activity,
  Child,
  DeviceStatus,
  Session,
  SessionTimeSeries,
  TherapistNote,
} from "@/domain/types";

export interface Repository {
  listChildren(): Promise<Child[]>;
  getChild(id: string): Promise<Child | null>;
  listSessions(childId?: string): Promise<Session[]>;
  getSession(id: string): Promise<Session | null>;
  getSessionTimeSeries(sessionId: string): Promise<SessionTimeSeries | null>;
  listNotes(childId?: string): Promise<TherapistNote[]>;
  listActivities(): Promise<Activity[]>;
  getDeviceStatus(): Promise<DeviceStatus>;
}
