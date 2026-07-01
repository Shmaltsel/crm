import { useState } from 'react';
import { motion } from 'framer-motion';
import AddressLink from "../AddressLink";
import PhoneLink from "../PhoneLink";
import IssueModal from "./modals/IssueModal";
import RescheduleModal from "./modals/RescheduleModal";
import type { Event, User } from '../../types';

interface EventDetailsProps {
  currentEvent: Event | null;
  schoolName?: string;
  cityId?: string;
  onEventUpdated?: () => void;
  employees?: User[];
}

export default function EventDetails({ currentEvent, schoolName, cityId, onEventUpdated, employees }: EventDetailsProps) {
  const [issueOpen, setIssueOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);

  if (!currentEvent) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center h-32 text-slate-400"
      >
        У цього закладу ще немає запланованих подій.
      </motion.div>
    );
  }

  const formattedDate = new Date(currentEvent.date).toLocaleDateString('uk-UA');

  return (
    <>
      <motion.div
        whileHover={{ y: -3, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.09)" }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 md:border-l-4 md:border-l-blue-600 relative"
      >
        <div className="p-5 sm:p-6 pl-6 sm:pl-6">
          
          {/* Заголовок */}
          <div className="flex justify-between items-center mb-2 md:mb-5 md:border-b border-slate-100 md:pb-4">
            <h3 className="font-bold text-slate-800 text-lg">Деталі події</h3>
            {/* Дата для мобільних (щоб була під заголовком) */}
            <span className="md:hidden text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
              {formattedDate}
            </span>
          </div>

          {/* ВЕЛИКІ МОБІЛЬНІ КНОПКИ (Відображаються тільки на телефоні) */}
          <div className="md:hidden grid grid-cols-2 gap-3 mb-5 border-b border-slate-100 pb-5 mt-3">
            <button 
              onClick={() => setRescheduleOpen(true)} 
              className="flex flex-col items-center justify-center gap-2 p-4 bg-amber-50 text-amber-600 rounded-2xl font-bold border border-amber-100/50 active:bg-amber-100 transition-colors shadow-sm"
            >
              <span className="text-2xl">📅</span>
              <span className="text-[11px] uppercase tracking-wider">Перенести</span>
            </button>
            <button 
              onClick={() => setIssueOpen(true)} 
              className="flex flex-col items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold border border-red-100/50 active:bg-red-100 transition-colors shadow-sm"
            >
              <span className="text-2xl">🚨</span>
              <span className="text-[11px] uppercase tracking-wider">Проблема</span>
            </button>
          </div>

          {/* ДЕСКТОПНІ КНОПКИ (Відображаються тільки на ПК) */}
          <div className="hidden md:flex items-center justify-end gap-3 absolute top-5 right-6">
            <span className="text-sm font-medium text-blue-600 mr-2">{formattedDate}</span>
            <button
              onClick={() => setRescheduleOpen(true)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              📅 Перенести
            </button>
            <button
              onClick={() => setIssueOpen(true)}
              className="px-3 py-1.5 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              🚨 Проблема
            </button>
          </div>

          {/* Інформація */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2 md:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-slate-500 font-medium">Проєкт:</span>
              <span className="font-bold text-slate-800">{currentEvent.project}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-slate-500 font-medium">Час початку:</span>
              <span className="font-bold text-slate-800">{currentEvent.time}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-slate-500 font-medium">Кількість дітей:</span>
              <span className="font-bold text-slate-800">{currentEvent.childrenPlanned}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-slate-500 font-medium">Вартість:</span>
              <span className="font-bold text-slate-800">{currentEvent.price} грн</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-slate-50 pt-3 md:border-0 md:pt-0 md:mt-0">
              <span className="w-full sm:w-1/3 text-slate-500 font-medium mt-1">Адреса:</span>
              <span className="font-bold text-slate-800 flex items-start gap-1.5 leading-snug">
                 <span className="text-slate-400 mt-0.5 shrink-0">📍</span>
                 <AddressLink address={currentEvent.address} />
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-slate-50 pt-3 md:border-0 md:pt-0 md:mt-0">
              <span className="w-full sm:w-1/3 text-slate-500 font-medium mt-1">Контакт:</span>
              <span className="font-bold text-slate-800 flex flex-col gap-1 leading-snug">
                <span>{currentEvent.contactPerson}</span>
                <span className="w-6 border-b-2 border-slate-200 my-0.5"></span>
                <PhoneLink phone={currentEvent.contactPhone} />
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <IssueModal
        isOpen={issueOpen}
        onClose={() => setIssueOpen(false)}
        schoolName={schoolName || currentEvent.school?.name || ''}
        eventName={`${currentEvent.project} — ${formattedDate}`}
        eventId={currentEvent.id}
        cityId={cityId || currentEvent.cityId || ''}
        employees={employees}
      />
      <RescheduleModal
        isOpen={rescheduleOpen}
        onClose={() => setRescheduleOpen(false)}
        eventId={currentEvent.id}
        currentDate={currentEvent.date}
        currentTime={currentEvent.time || ''}
        onSuccess={() => onEventUpdated?.()}
      />
    </>
  );
}