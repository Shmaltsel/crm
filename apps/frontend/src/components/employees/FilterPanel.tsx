import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

const ROLE_OPTIONS = [
  { value: "MANAGER", label: "Менеджер" },
  { value: "DRIVER", label: "Водій" },
  { value: "HOST", label: "Ведучий" },
  { value: "SUPERADMIN", label: "Суперадмін" },
];

const CITY_OPTIONS = [
  { value: "all", label: "Всі міста" },
  { value: "kyiv", label: "Київ" },
  { value: "lviv", label: "Львів" },
];

interface FilterPanelProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function FilterPanel({ isMobileOpen, onMobileClose }: FilterPanelProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("all");

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const content = (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xs font-semibold text-content-muted uppercase tracking-wider mb-3">
          Роль
        </h3>
        <div className="flex flex-col gap-1.5">
          {ROLE_OPTIONS.map((role) => (
            <button
              key={role.value}
              onClick={() => toggleRole(role.value)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-control text-sm font-medium transition-colors text-left
                ${selectedRoles.includes(role.value) ? "bg-brand-50 text-brand-700" : "text-content-secondary hover:bg-neutral-50"}`}
            >
              <span
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                  ${selectedRoles.includes(role.value) ? "bg-brand border-brand" : "border-neutral-300"}`}
              >
                {selectedRoles.includes(role.value) && (
                  <span className="w-2 h-2 rounded-sm bg-white" />
                )}
              </span>
              {role.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-content-muted uppercase tracking-wider mb-3">
          Місто
        </h3>
        <div className="flex flex-col gap-1.5">
          {CITY_OPTIONS.map((city) => (
            <button
              key={city.value}
              onClick={() => setSelectedCity(city.value)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-control text-sm font-medium transition-colors text-left
                ${selectedCity === city.value ? "bg-brand-50 text-brand-700" : "text-content-secondary hover:bg-neutral-50"}`}
            >
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                  ${selectedCity === city.value ? "border-brand" : "border-neutral-300"}`}
              >
                {selectedCity === city.value && (
                  <span className="w-2 h-2 rounded-full bg-brand" />
                )}
              </span>
              {city.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-content-muted uppercase tracking-wider mb-3">
          Статус
        </h3>
        <div className="flex gap-2">
          <Badge variant="success">Активний</Badge>
          <Badge variant="danger">Неактивний</Badge>
        </div>
      </div>

      {(selectedRoles.length > 0 || selectedCity !== "all") && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedRoles([]);
            setSelectedCity("all");
          }}
        >
          Скинути фільтри
        </Button>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-4">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-4 h-4 text-content-muted" />
            <span className="text-sm font-semibold text-content-primary">Фільтри</span>
          </div>
          {content}
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
            onClick={onMobileClose}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-72 bg-surface shadow-modal p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-content-muted" />
                  <span className="text-sm font-semibold text-content-primary">Фільтри</span>
                </div>
                <button onClick={onMobileClose} className="p-1 -mr-1 text-content-muted hover:text-content-primary">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
