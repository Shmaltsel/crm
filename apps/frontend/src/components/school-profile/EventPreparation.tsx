import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EventPreparation as EventPreparationData } from "../../types";
import {
  PREPARATION_STATUS_LABELS,
  getNextPreparationStatus,
  type PreparationStatus,
} from "../../utils/preparationStatus";
import { useInventoryByProject } from "../../hooks/useInventory";

interface PreparationProps {
  data: Partial<EventPreparationData>;
  onUpdate: (field: string, status: PreparationStatus) => void;
  onOpenCrewModal: () => void;
  project?: string;
}

export default memo(function EventPreparation({
  data,
  onUpdate,
  onOpenCrewModal,
  project,
}: PreparationProps) {
  const [optimistic, setOptimistic] = useState<Record<string, string>>({});
  const { data: projectItems } = useInventoryByProject(project);

  const tasks = [
    { key: "assignCrew", label: "Призначити екіпаж" },
    { key: "bookEquipment", label: "Забронювати обладнання" },
    { key: "prepareDocs", label: "Підготувати документи" },
    { key: "prepareMaterials", label: "Підготувати матеріали" },
    { key: "remindSchool", label: "Нагадати школі про подію" },
  ];

  const getStatusColor = (status: PreparationStatus) => {
    switch (status) {
      case "DONE":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "IN_PROGRESS":
        return "bg-orange-50 text-orange-600 border border-orange-200";
      default:
        return "bg-blue-50 text-blue-600 border border-blue-200";
    }
  };

  const handleTaskClick = (key: string) => {
    if (key === "assignCrew") {
      onOpenCrewModal();
    } else {
      const current = (optimistic[key] ??
        data[key as keyof EventPreparationData] ??
        "PLANNED") as PreparationStatus;
      const next = getNextPreparationStatus(current);
      setOptimistic((prev) => ({ ...prev, [key]: next }));
      onUpdate(key, next).catch(() => {
        setOptimistic((prev) => ({ ...prev, [key]: data[key] }));
      });
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="bg-surface p-6 rounded-card shadow-card border border-border"
    >
      <h3 className="font-bold text-content-primary mb-4 border-b pb-3 border-border">
        Підготовка до події
      </h3>
      <div className="space-y-3 text-sm">
        {tasks.map((task) => {
          const currentStatus = (optimistic[task.key] ??
            data[task.key as keyof EventPreparationData] ??
            "PLANNED") as PreparationStatus;
          return (
            <motion.div
              key={task.key}
              whileTap={{ scale: 0.98 }}
              className="flex justify-between items-center cursor-pointer group hover:bg-surface-muted p-2 -mx-2 rounded-control transition-colors"
              onClick={() => handleTaskClick(task.key)}
            >
              <span className="text-content-secondary font-medium select-none">
                {task.label}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentStatus}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold select-none ${getStatusColor(currentStatus)}`}
                >
                  {PREPARATION_STATUS_LABELS[currentStatus]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {project && projectItems && projectItems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-content-secondary mb-2">
            Предмети для проєкту «{project}»
          </h4>
          <div className="space-y-1.5">
            {projectItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm py-1">
                <span className="text-content-secondary">{item.name}</span>
                <span className="text-xs text-content-muted">
                  {item.currentStock} {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
});
