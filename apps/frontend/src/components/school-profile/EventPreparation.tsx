
import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EventPreparation as EventPreparationData } from '../../types';

interface PreparationProps {
  data: Partial<EventPreparationData>;
  onUpdate: (field: string, status: string) => void;
  onOpenCrewModal: () => void;
}

const STATUSES = ['Заплановано', 'В процесі', 'Виконано'];

const getNextStatus = (current: string) => {
  const idx = STATUSES.indexOf(current || 'Заплановано');
  return STATUSES[(idx + 1) % STATUSES.length];
};

export default memo(function EventPreparation({ data, onUpdate, onOpenCrewModal }: PreparationProps) {
  const [optimistic, setOptimistic] = useState<Record<string, string>>({});

  const tasks = [
    { key: 'assignCrew', label: 'Призначити екіпаж' },
    { key: 'bookEquipment', label: 'Забронювати обладнання' },
    { key: 'prepareDocs', label: 'Підготувати документи' },
    { key: 'prepareMaterials', label: 'Підготувати матеріали' },
    { key: 'remindSchool', label: 'Нагадати школі про подію' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Виконано': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'В процесі': return 'bg-orange-50 text-orange-600 border border-orange-200';
      default: return 'bg-blue-50 text-blue-600 border border-blue-200';
    }
  };

  const handleTaskClick = (key: string) => {
    if (key === 'assignCrew') {
      onOpenCrewModal();
    } else {
      const next = getNextStatus(
        optimistic[key] ?? data[key as keyof EventPreparationData] ?? 'Заплановано',
      );
      setOptimistic(prev => ({ ...prev, [key]: next }));
      onUpdate(key, next).catch(() => {
        setOptimistic(prev => ({ ...prev, [key]: data[key] }));
      });
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
    >
      <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100">Підготовка до події</h3>
      <div className="space-y-3 text-sm">
        {tasks.map((task) => {
          const currentStatus = optimistic[task.key] ?? data[task.key] ?? 'Заплановано';
          return (
            <motion.div
              key={task.key}
              whileTap={{ scale: 0.98 }}
              className="flex justify-between items-center cursor-pointer group hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors"
              onClick={() => handleTaskClick(task.key)}
            >
              <span className="text-slate-700 font-medium select-none">{task.label}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentStatus}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold select-none ${getStatusColor(currentStatus)}`}
                >
                  {currentStatus}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
});

