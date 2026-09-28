"use client";

import { useState } from "react";
import Link from "next/link";
import { Battery } from "lucide-react";
import type { DeviceStatus } from "@/domain/types";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";

const label: Record<DeviceStatus["state"], string> = {
  connecting: "Connecting",
  connected: "Toy connected",
  disconnected: "Toy disconnected",
  low_battery: "Low battery",
  error: "Toy error",
};
const dot: Record<DeviceStatus["state"], string> = {
  connecting: "bg-gold",
  connected: "bg-good",
  disconnected: "bg-muted",
  low_battery: "bg-gold",
  error: "bg-red-600",
};

/** Shows the toy's LAST SYNCED status (the phone app talks BLE; the web app never does). */
export function DeviceStatusChip({ device }: { device: DeviceStatus }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:bg-panel"
      >
        <span className={cn("size-2 rounded-full", dot[device.state])} />
        {label[device.state]}
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-64 rounded-[var(--radius-card)] border border-line bg-surface p-4 shadow-lg">
          <p className="text-sm font-semibold">{device.name}</p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Device ID</dt>
              <dd>{device.deviceId}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Battery</dt>
              <dd className="flex items-center gap-1">
                <Battery size={14} />
                {device.batteryPct}%
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Last sync</dt>
              <dd>{formatDate(device.lastSyncedAt)}</dd>
            </div>
          </dl>
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="mt-3 block text-sm font-medium text-brand-700 hover:underline"
          >
            Device settings
          </Link>
        </div>
      )}
    </div>
  );
}
