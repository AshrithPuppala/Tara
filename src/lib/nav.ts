import {
  BookOpen,
  FileText,
  LayoutDashboard,
  Puzzle,
  Settings,
  Users,
  Activity,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

export const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sessions", label: "Sessions", icon: Activity },
  { href: "/children", label: "Children", icon: Users },
  { href: "/activities", label: "Activities", icon: Puzzle },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/stories", label: "Story Library", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];
