import type { Metadata } from "next";
import { Card, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { repo } from "@/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const d = await repo.getDeviceStatus();
  return (
    <>
      <PageHeader title="Settings" />
      <div className="grid max-w-3xl gap-4">
        <Card>
          <CardTitle>Device</CardTitle>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Name</dt>
              <dd>{d.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Device ID</dt>
              <dd>{d.deviceId}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Battery</dt>
              <dd>{d.batteryPct}%</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Last synced</dt>
              <dd>
                {formatDate(d.lastSyncedAt, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </dd>
            </div>
          </dl>
        </Card>
        <Card>
          <CardTitle>Account</CardTitle>
          <p className="mt-3 text-sm text-muted">
            Therapist profile and preferences are not built yet. Signed in as Dr. Meera
            (demo).
          </p>
        </Card>
      </div>
    </>
  );
}
