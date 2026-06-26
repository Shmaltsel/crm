import { memo } from 'react';
import PhoneLink from '../PhoneLink';
import { motion } from "framer-motion";

interface AssignedCrewProps {
  currentEvent: any;
  employees: any[];
}

export default memo(function AssignedCrew({ currentEvent, employees }: AssignedCrewProps) {
  const crew = currentEvent?.crew;

  if (!crew) {
    return (
<motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center h-full text-slate-400 min-h-[250px]"
    >        <span className="text-4xl mb-3 opacity-50">🚐</span>
        <p className="font-medium">Екіпаж ще не призначено</p>
        <p className="text-xs mt-1">Виконайте пункт "Призначити екіпаж" зліва</p>
      </div>
    );
  }

  // Знаходимо працівників по їхніх ID, збережених у екіпажі
  const host = (employees ?? []).find(e => e.id === crew.hostId);
  const driver = (employees ?? []).find(e => e.id === crew.driverId);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col"
    >
      <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100">Призначений екіпаж</h3>
      <div className="space-y-4 text-sm flex-1">
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Назва:</span>
          <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">{crew.name || 'Екіпаж'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Ведучий:</span>
          <span className="font-medium text-blue-600 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full text-xs">🎙️</span>
            {host?.name || '—'} 
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Водій:</span>
          <span className="font-medium text-emerald-600 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-600 w-6 h-6 flex items-center justify-center rounded-full text-xs">🚗</span>
            {driver?.name || '—'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Авто:</span>
          <span className="font-medium">{crew.car || '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Телефон:</span>
          <span className="font-medium"><PhoneLink phone={crew.phone} /></span>
        </div>
      </div>
    </div>
  );
});
