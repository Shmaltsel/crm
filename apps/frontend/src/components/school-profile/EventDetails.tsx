import { useState } from 'react';
import { motion } from 'framer-motion';
import AddressLink from "../AddressLink";
import PhoneLink from "../PhoneLink";
import IssueModal from "./modals/IssueModal";
import RescheduleModal from "./modals/RescheduleModal";
import { fadeVariants, cardHoverVariants } from "../../lib/motion";
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
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        className="bg-surface p-6 rounded-card shadow-card border border-border flex items-center justify-center h-32 text-content-muted"
      >
        У цього закладу ще немає запланованих подій.
      </motion.div>
    );
  }

  const formattedDate = new Date(currentEvent.date).toLocaleDateString('uk-UA');

  return (
    <>
      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className="bg-surface rounded-card shadow-card border border-border md:border-l-4 md:border-l-brand relative"
      >
        <div className="p-5 sm:p-6 pl-6 sm:pl-6">
          <div className="flex justify-between items-center mb-2 md:mb-5 md:border-b border-border md:pb-4">
            <h3 className="font-bold text-content-primary text-lg">Деталі події</h3>
            <span className="md:hidden text-sm font-bold text-brand bg-brand-50 px-2 py-1 rounded-control">
              {formattedDate}
            </span>
          </div>

          <div className="md:hidden grid grid-cols-2 gap-3 mb-5 border-b border-border pb-5 mt-3">
            <button
              onClick={() => setRescheduleOpen(true)}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-warning-subtle text-warning-600 rounded-card font-bold border border-warning-100/50 active:bg-warning-100 transition-colors shadow-sm"
            >
              <span className="text-2xl">📅</span>
              <span className="text-xs uppercase tracking-wider">Перенести</span>
            </button>
            <button
              onClick={() => setIssueOpen(true)}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-danger-subtle text-danger-600 rounded-card font-bold border border-danger-100/50 active:bg-danger-100 transition-colors shadow-sm"
            >
              <span className="text-2xl">🚨</span>
              <span className="text-xs uppercase tracking-wider">Проблема</span>
            </button>
          </div>

          <div className="hidden md:flex items-center justify-end gap-3 absolute top-5 right-6">
            <span className="text-sm font-medium text-brand mr-2">{formattedDate}</span>
            <button
              onClick={() => setRescheduleOpen(true)}
              className="px-3 py-1.5 bg-warning hover:bg-warning-600 text-white text-xs font-bold rounded-control transition-colors shadow-sm"
            >
              📅 Перенести
            </button>
            <button
              onClick={() => setIssueOpen(true)}
              className="px-3 py-1.5 bg-danger hover:bg-danger-600 text-white text-xs font-bold rounded-control transition-colors shadow-sm"
            >
              🚨 Проблема
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2 md:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-content-muted font-medium">Проєкт:</span>
              <span className="font-bold text-content-primary">{currentEvent.project}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-content-muted font-medium">Час початку:</span>
              <span className="font-bold text-content-primary">{currentEvent.time}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-content-muted font-medium">Кількість дітей:</span>
              <span className="font-bold text-content-primary">{currentEvent.childrenPlanned}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-content-muted font-medium">Вартість:</span>
              <span className="font-bold text-content-primary">{currentEvent.price} грн</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-surface-muted pt-3 md:border-0 md:pt-0 md:mt-0">
              <span className="w-full sm:w-1/3 text-content-muted font-medium mt-1">Адреса:</span>
              <span className="font-bold text-content-primary flex items-start gap-1.5 leading-snug">
                 <span className="text-content-muted mt-0.5 shrink-0">📍</span>
                 <AddressLink address={currentEvent.address} />
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-surface-muted pt-3 md:border-0 md:pt-0 md:mt-0">
              <span className="w-full sm:w-1/3 text-content-muted font-medium mt-1">Контакт:</span>
              <span className="font-bold text-content-primary flex flex-col gap-1 leading-snug">
                <span>{currentEvent.contactPerson}</span>
                <span className="w-6 border-b-2 border-border-strong my-0.5"></span>
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