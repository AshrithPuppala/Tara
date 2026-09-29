import type { Repository } from "../repository";
import { generateTimeSeries } from "./timeSeries";
import { activities, children, deviceStatus, notes, sessions } from "./seed";

const byDateDesc = <T extends { date?: string; createdAt?: string }>(a: T, b: T) =>
  (b.date ?? b.createdAt ?? "").localeCompare(a.date ?? a.createdAt ?? "");

export const mockRepository: Repository = {
  async listChildren() {
    return children;
  },
  async getChild(id) {
    return children.find((c) => c.id === id) ?? null;
  },
  async listSessions(childId) {
    return sessions.filter((s) => !childId || s.childId === childId).sort(byDateDesc);
  },
  async getSession(id) {
    return sessions.find((s) => s.id === id) ?? null;
  },
  async getSessionTimeSeries(sessionId) {
    const exists = sessions.some((s) => s.id === sessionId);
    return exists ? generateTimeSeries(sessionId) : null;
  },
  async listNotes(childId) {
    return notes.filter((n) => !childId || n.childId === childId).sort(byDateDesc);
  },
  async listActivities() {
    return activities;
  },
  async getDeviceStatus() {
    return deviceStatus;
  },
};
