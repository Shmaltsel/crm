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
} from "lucide-react";

export interface NavTab {
  to: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  roles?: string[];
}

export const NAV_TABS: NavTab[] = [
  { to: "/dashboard", icon: Home, label: "Дашборд", roles: ["SUPERADMIN", "MANAGER", "OWNER"] },
  { to: "/reports/review", icon: ClipboardCheck, label: "Звіти", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { to: "/schools", icon: School, label: "Школи" },
  { to: "/kindergartens", icon: Baby, label: "Садочки" },
  { to: "/finance", icon: Wallet, label: "Фінанси" },
  { to: "/calendar", icon: Calendar, label: "Календар" },
  { to: "/employees", icon: Users, label: "Працівники", roles: ["SUPERADMIN"] },
  { to: "/analytics", icon: BarChart3, label: "Аналітика", roles: ["SUPERADMIN", "OWNER"] },
  { to: "/audit-log", icon: History, label: "Журнал дій", roles: ["SUPERADMIN", "OWNER"] },
];

export const ADMIN_TABS: NavTab[] = [
  { to: "/cities", icon: MapPin, label: "Міста", roles: ["SUPERADMIN"] },
];
