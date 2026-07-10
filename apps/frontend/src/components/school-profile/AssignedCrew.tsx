import { memo } from 'react';
import PhoneLink from '../PhoneLink';
import { motion } from "framer-motion";
import type { Event, User } from '../../types';

interface AssignedCrewProps {
  currentEvent: Event | null;
  employees: User[];
}

export default memo(function AssignedCrew({ currentEvent, employees }: AssignedCrewProps) {
  const crew = currentEvent?.crew;

  if (!crew) {
    return (
<motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2 }}
      className="bg-surface p-6 rounded-card shadow-card border border-border flex flex-col justify-center items-center h-full text-content-muted min-h-[250px]"
    >        <span className="text-4xl mb-3 opacity-50">🚐</span>
        <p className="font-medium">Екіпаж ще не призначено</p>
        <p className="text-xs mt-1">Виконайте пункт "Призначити екіпаж" зліва</p>
      </motion.div>
    );
  }

  const host = (employees ?? []).find(e => e.id === crew.hostId);
  const driver = (employees ?? []).find(e => e.id === crew.driverId);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2 }}
      className="bg-surface p-6 rounded-card shadow-card border border-border h-full flex flex-col"
    >
      <h3 className="font-bold text-content-primary mb-4 border-b pb-3 border-border">Призначений екіпаж</h3>
      <div className="space-y-4 text-sm flex-1">
        <div className="flex justify-between items-center">
          <span className="text-content-muted">Назва:</span>
          <span className="font-bold text-content-primary bg-surface-muted px-3 py-1 rounded-control">{crew.name || 'Екіпаж'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-content-muted">Ведучий:</span>
          <span className="font-medium text-brand flex items-center gap-2">
            <span className="bg-brand-50 text-brand w-6 h-6 flex items-center justify-center rounded-full text-xs">🎙️</span>
            {host?.name || '—'} 
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-content-muted">Водій:</span>
          <span className="font-medium text-success-600 flex items-center gap-2">
            <span className="bg-success-subtle text-success-600 w-6 h-6 flex items-center justify-center rounded-full text-xs">🚗</span>
            {driver?.name || '—'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-content-muted">Авто:</span>
          <span className="font-medium text-content-primary">{crew.car || '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-content-muted">Телефон:</span>
          <span className="font-medium text-content-primary"><PhoneLink phone={crew.phone} /></span>
        </div>
      </div>
    </motion.div>
  );
});
