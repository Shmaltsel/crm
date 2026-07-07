import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Eye, Edit3, UserX } from "lucide-react";
import { Badge } from "../ui/Badge";
import { cardVariants } from "../../animations/employees";

type Role = "MANAGER" | "DRIVER" | "HOST" | "SUPERADMIN" | "GUEST";

interface City {
  id: string;
  name: string;
}
interface EmployeeCardUser {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  cityId: string | null;
  city?: City;
  role: Role;
  telegramId?: string | null;
  car?: string | null;
}

const ROLE_BADGE: Record<string, string> = {
  MANAGER: "bg-brand-50 text-brand-700 border-brand-200",
  DRIVER: "bg-success-50 text-success-700 border-success-200",
  HOST: "bg-purple-50 text-purple-700 border-purple-200",
};

const ROLE_GRADIENT: Record<string, string> = {
  MANAGER: "from-brand to-brand-700",
  DRIVER: "from-success to-success-700",
  HOST: "from-purple-500 to-purple-700",
};

const ROLE_LABELS: Record<string, string> = {
  MANAGER: "Менеджер",
  DRIVER: "Водій",
  HOST: "Ведучий",
  SUPERADMIN: "Суперадмін",
};

interface Props {
  user: EmployeeCardUser;
  role: Role;
  isSuperAdmin: boolean;
  onEdit: (user: EmployeeCardUser) => void;
  onDelete: (id: string, name: string) => void;
}

export default function EmployeeCard({
  user,
  role,
  isSuperAdmin,
  onEdit,
  onDelete,
}: Props) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      layoutId={`user-${user.id}`}
      role="article"
      aria-label={`${user.name}, ${ROLE_LABELS[role] ?? role}`}
      className="group relative bg-surface rounded-card shadow-card border border-border p-5 transition-shadow duration-200 hover:shadow-card-hover"
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br ${ROLE_GRADIENT[role] ?? "from-neutral-500 to-neutral-600"}`}
          >
            {user.name.charAt(0)}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-surface" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-content-primary truncate text-sm">
              {user.name}
            </h3>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${ROLE_BADGE[role] ?? "bg-neutral-100 text-neutral-600 border-neutral-200"}`}>
              {ROLE_LABELS[role] ?? role}
            </span>
          </div>

          <p className="text-xs text-content-muted truncate">{user.email}</p>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-xs text-content-secondary flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {user.phone || "—"}
            </span>
            <span className="text-xs text-content-secondary flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {user.city?.name || "Всі міста"}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-3 text-2xs text-content-muted">
            {user.car && <span>🚗 {user.car}</span>}
          </div>
        </div>

        {isSuperAdmin && (
          <div className="flex items-center gap-0.5 shrink-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(user)}
              className="p-1.5 rounded-control text-content-muted hover:text-brand hover:bg-brand-50 transition-colors"
              aria-label={`Редагувати ${user.name}`}
            >
              <Edit3 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(user.id, user.name)}
              className="p-1.5 rounded-control text-content-muted hover:text-danger hover:bg-danger-50 transition-colors"
              aria-label={`Видалити ${user.name}`}
            >
              <UserX className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
