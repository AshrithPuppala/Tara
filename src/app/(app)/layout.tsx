import { AppShell } from "@/components/layout/AppShell";
import { repo } from "@/data";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const device = await repo.getDeviceStatus();
  return <AppShell device={device}>{children}</AppShell>;
}
