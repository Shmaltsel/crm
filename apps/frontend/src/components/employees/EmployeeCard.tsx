import { motion } from "framer-motion";
import PhoneLink from "../PhoneLink";
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

const ROLE_RING: Record<string, string> = {
  MANAGER: "ring-blue-100",
  DRIVER: "ring-emerald-100",
  HOST: "ring-violet-100",
};
const ROLE_GRADIENT: Record<string, string> = {
  MANAGER: "from-blue-500 to-blue-600",
  DRIVER: "from-emerald-500 to-emerald-600",
  HOST: "from-violet-500 to-violet-600",
};
const ROLE_HOVER_BORDER: Record<string, string> = {
  MANAGER: "hover:border-blue-200",
  DRIVER: "hover:border-emerald-200",
  HOST: "hover:border-violet-200",
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
      className={`group relative bg-white border border-slate-100 rounded-3xl p-5 shadow-sm transition-colors duration-300 ${ROLE_HOVER_BORDER[role] ?? "hover:border-slate-200"}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br ${ROLE_GRADIENT[role] ?? "from-slate-500 to-slate-600"} ring-4 ring-offset-2 ${ROLE_RING[role] ?? "ring-slate-100"}`}
        >
          {user.name.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-800 truncate">{user.name}</h3>
          <p className="text-sm text-slate-400 truncate">{user.email}</p>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
            <span className="text-slate-500">
              <PhoneLink phone={user.phone} />
            </span>
            <span className="bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full font-medium">
              📍 {user.city?.name || "Всі міста"}
            </span>
            {user.car && (
              <span className="text-emerald-600 font-medium">
                🚗 {user.car}
              </span>
            )}
          </div>
        </div>

        {isSuperAdmin && (
          <div className="flex items-center gap-1 shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(user)}
              className="text-slate-400 hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-lg"
              aria-label={`Редагувати ${user.name}`}
            >
              ✏️
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(user.id, user.name)}
              className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg"
              aria-label={`Видалити ${user.name}`}
            >
              🗑
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
