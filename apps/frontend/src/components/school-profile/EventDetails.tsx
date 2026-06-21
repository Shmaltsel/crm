import { useState } from 'react';
import AddressLink from "../AddressLink";
import PhoneLink from "../PhoneLink";
import IssueModal from "./modals/IssueModal";

interface EventDetailsProps {
  currentEvent: any;
  schoolName?: string;
  cityId?: string;
}

export default function EventDetails({ currentEvent, schoolName, cityId }: EventDetailsProps) {
  const [issueOpen, setIssueOpen] = useState(false);

  if (!currentEvent) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center h-32 text-slate-400">
        У цього закладу ще немає запланованих подій.
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-blue-600">
        <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100 flex justify-between items-center">
          <span>Деталі обраної події</span>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-blue-600">{new Date(currentEvent.date).toLocaleDateString()}</span>
            <button
              onClick={() => setIssueOpen(true)}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              🚨 Проблема
            </button>
          </div>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex"><span className="w-1/3 text-slate-500">Проєкт:</span><span className="font-medium">{currentEvent.project}</span></div>
          <div className="flex"><span className="w-1/3 text-slate-500">Дата та Час:</span><span className="font-medium">{new Date(currentEvent.date).toLocaleDateString()} о {currentEvent.time}</span></div>
          <div className="flex"><span className="w-1/3 text-slate-500">Кількість дітей:</span><span className="font-medium">{currentEvent.childrenPlanned}</span></div>
          <div className="flex"><span className="w-1/3 text-slate-500">Вартість:</span><span className="font-medium">{currentEvent.price} грн</span></div>
          <div className="flex"><span className="w-1/3 text-slate-500">Адреса:</span><span className="font-medium"><AddressLink address={currentEvent.address} /></span></div>
          <div className="flex"><span className="w-1/3 text-slate-500">Контакт:</span><span className="font-medium">{currentEvent.contactPerson} <br/><PhoneLink phone={currentEvent.contactPhone} /></span></div>
        </div>
      </div>

      <IssueModal
        isOpen={issueOpen}
        onClose={() => setIssueOpen(false)}
        schoolName={schoolName || currentEvent.school?.name || ''}
        eventName={`${currentEvent.project} — ${new Date(currentEvent.date).toLocaleDateString('uk-UA')}`}
        eventId={currentEvent.id}
        cityId={cityId || currentEvent.cityId || ''}
      />
    </>
  );
}
