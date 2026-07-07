import type { ComponentType } from "react";
import {
  Home,
  School,
  Baby,
  Wallet,
  Calendar,
  Users,
  MapPin,
} from "lucide-react";

export interface NavTab {
  to: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  roles?: string[];
}

export const NAV_TABS: NavTab[] = [
  { to: "/dashboard", icon: Home, label: "Дашборд", roles: ["SUPERADMIN", "MANAGER"] },
  { to: "/schools", icon: School, label: "Школи" },
  { to: "/kindergartens", icon: Baby, label: "Садочки" },
  { to: "/finance", icon: Wallet, label: "Фінанси" },
  { to: "/calendar", icon: Calendar, label: "Календар" },
  { to: "/employees", icon: Users, label: "Працівники", roles: ["SUPERADMIN"] },
];

export const ADMIN_TABS: NavTab[] = [
  { to: "/cities", icon: MapPin, label: "Міста", roles: ["SUPERADMIN"] },
];
