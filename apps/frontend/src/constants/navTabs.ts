import type { ComponentType } from "react";
import {
  Home,
  School,
  Baby,
  Wallet,
  Calendar,
  Users,
  MapPin,
  BarChart3,
  ClipboardCheck,
  History,
  Package,
  Trophy,
  LayoutDashboard,
} from "lucide-react";

export interface NavTab {
  to: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  roles?: string[];
  bottomNav?: boolean;
}

export interface DashboardTab {
  id: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  roles?: string[];
}

export const NAV_TABS: NavTab[] = [
  { to: "/dashboard", icon: Home, label: "Дашборд", roles: ["SUPERADMIN", "MANAGER", "OWNER"], bottomNav: true },
  { to: "/reports/review", icon: ClipboardCheck, label: "Звіти", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { to: "/inventory", icon: Package, label: "Склад", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { to: "/schools", icon: School, label: "Школи", bottomNav: true },
  { to: "/kindergartens", icon: Baby, label: "Садочки" },
  { to: "/finance", icon: Wallet, label: "Фінанси", bottomNav: true },
  { to: "/calendar", icon: Calendar, label: "Календар", bottomNav: true },
  { to: "/employees", icon: Users, label: "Працівники", roles: ["SUPERADMIN"] },
  { to: "/analytics", icon: BarChart3, label: "Аналітика", roles: ["SUPERADMIN", "OWNER"] },
  { to: "/city-leaderboard", icon: Trophy, label: "Рейтинг", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { to: "/audit-log", icon: History, label: "Журнал дій", roles: ["SUPERADMIN", "OWNER"] },
];

export const ADMIN_TABS: NavTab[] = [
  { to: "/cities", icon: MapPin, label: "Міста", roles: ["SUPERADMIN"] },
];

export const DASHBOARD_TABS: DashboardTab[] = [
  { id: "overview", icon: LayoutDashboard, label: "Огляд", roles: ["SUPERADMIN", "MANAGER", "OWNER"] },
  { id: "reports", icon: ClipboardCheck, label: "Звіти", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { id: "leaderboard", icon: Trophy, label: "Рейтинг", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { id: "analytics", icon: BarChart3, label: "Аналітика", roles: ["SUPERADMIN", "OWNER"] },
];
