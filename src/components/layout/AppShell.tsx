"use client";

import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import type { DeviceStatus } from "@/domain/types";
import { Badge } from "@/components/ui/Badge";
import { Sidebar } from "./Sidebar";
import { DeviceStatusChip } from "./DeviceStatusChip";

export function AppShell({
  device,
  children,
}: {
  device: DeviceStatus;
  children: React.ReactNode;
}) {
  const [drawer, setDrawer] = useState(false);
  return (
    <div className="min-h-screen lg:pl-56">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-56 border-r border-line bg-canvas lg:block">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setDrawer(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 bg-canvas shadow-xl">
            <Sidebar onNavigate={() => setDrawer(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-8">
          <button
            className="rounded-lg p-2 text-muted hover:bg-panel lg:hidden"
            onClick={() => setDrawer((d) => !d)}
            aria-label={drawer ? "Close menu" : "Open menu"}
          >
            {drawer ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="ml-auto flex items-center gap-3">
            <Badge tone="brand">Demo data</Badge>
            <DeviceStatusChip device={device} />
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="grid size-8 place-items-center rounded-full bg-brand-100 text-xs font-semibold text-brand-800">
                DM
              </span>
              <span className="hidden sm:inline">Dr. Meera</span>
              <ChevronDown size={14} className="text-muted" />
            </div>
          </div>
        </div>
        <main className="flex-1 px-4 pb-12 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
