import type { ComponentType } from "react";
import {
  Home,
  School,
  Wallet,
  Calendar,
  Users,
  MapPin,
  BarChart3,
  ClipboardCheck,
  Package,
  Trophy,
  LayoutDashboard,
  AlertTriangle,
} from "lucide-react";

export interface NavTab {
  to: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  roles?: string[];
}

export interface DashboardTab {
  id: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  roles?: string[];
}

export const NAV_TABS: NavTab[] = [
  { to: "/dashboard", icon: Home, label: "Дашборд", roles: ["SUPERADMIN", "MANAGER", "OWNER"] },
  { to: "/reports/review", icon: ClipboardCheck, label: "Звіти", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { to: "/inventory", icon: Package, label: "Склад", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { to: "/schools", icon: School, label: "Заклади" },
  { to: "/finance", icon: Wallet, label: "Фінанси" },
  { to: "/calendar", icon: Calendar, label: "Календар" },
  { to: "/cities", icon: MapPin, label: "Міста", roles: ["SUPERADMIN", "OWNER"] },
  { to: "/employees", icon: Users, label: "Працівники", roles: ["SUPERADMIN"] },
  { to: "/analytics", icon: BarChart3, label: "Аналітика", roles: ["SUPERADMIN", "OWNER"] },
  { to: "/city-leaderboard", icon: Trophy, label: "Рейтинг", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
];

export const NAV_SECTIONS: { label: string; routes: string[] }[] = [
  { label: "Основне", routes: ["/dashboard", "/calendar", "/reports/review"] },
  { label: "Управління", routes: ["/schools", "/cities", "/employees", "/inventory"] },
  { label: "Бізнес", routes: ["/finance", "/analytics", "/city-leaderboard"] },
];

export const ADMIN_TABS: NavTab[] = [
  { to: "/cities", icon: MapPin, label: "Міста", roles: ["SUPERADMIN"] },
];

export const DASHBOARD_TABS: DashboardTab[] = [
  { id: "overview", icon: LayoutDashboard, label: "Огляд", roles: ["SUPERADMIN", "MANAGER", "OWNER"] },
  { id: "reports", icon: ClipboardCheck, label: "Звіти", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { id: "leaderboard", icon: Trophy, label: "Рейтинг", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { id: "issues", icon: AlertTriangle, label: "Проблеми", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { id: "analytics", icon: BarChart3, label: "Аналітика", roles: ["SUPERADMIN", "OWNER"] },
];