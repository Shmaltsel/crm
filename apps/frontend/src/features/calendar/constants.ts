export const STAFF_ROLES = ["HOST", "DRIVER"];
export const MANAGER_ROLES = ["SUPERADMIN", "MANAGER"];

export const PROJECT_HEX: Record<string, string> = {
  blue: "#3b82f6",
  emerald: "#10b981",
  rose: "#f43f5e",
  red: "#ef4444",
  amber: "#f59e0b",
  purple: "#a855f7",
};

export const ROLE_ICON_MAP: Record<string, string> = {
  HOST: "🎙️",
  DRIVER: "🚗",
};

export const MONTH_NAMES = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export const WEEKDAY_HEADERS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

export const PROJECT_BADGE_COLORS: Record<string, string> = {
  blue: "bg-blue-400",
  emerald: "bg-emerald-400",
  rose: "bg-rose-400",
  red: "bg-red-500",
  amber: "bg-amber-400",
  purple: "bg-purple-400",
};
import { Role } from '../../types';
import { Home, School, ShieldCheck, Users } from 'lucide-react';

export const STAFF_ROLES: Role[] = [Role.ADMIN, Role.MANAGER, Role.HOST, Role.SALES, Role.RECRUITER];
export const MANAGER_ROLES: Role[] = [Role.ADMIN, Role.MANAGER];

export const PROJECT_HEX: Record<string, string> = {
  'Проєкт "День Здоров\'я"': '#22C55E',
  'Проєкт "Мрії Збуваються"': '#3B82F6',
  'Проєкт "Твій Вибір"': '#8B5CF6',
  'Проєкт "Безпека в деталях"': '#EF4444',
  'Проєкт "English Fest"': '#EC4899',
  'Проєкт "Екологія"': '#F59E0B',
  'Проєкт "Свято Букваря"': '#06B6D4',
  'Проєкт "Профорієнтація"': '#6B7280',
};

export const ROLE_ICON_MAP = {
  [Role.ADMIN]: <ShieldCheck className="w-4 h-4" />,
  [Role.MANAGER]: <Users className="w-4 h-4" />,
  [Role.HOST]: <Home className="w-4 h-4" />,
  [Role.SALES]: <School className="w-4 h-4" />,
  [Role.RECRUITER]: <Users className="w-4 h-4" />,
};
