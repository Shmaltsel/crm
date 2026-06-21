import AddressLink from "../AddressLink";
import PhoneLink from "../PhoneLink";

export default function EventDetails({ currentEvent }: { currentEvent: any }) {
  if (!currentEvent) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center h-32 text-slate-400">
        У цього закладу ще немає запланованих подій.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-blue-600">
      <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100 flex justify-between">
        <span>Деталі обраної події</span>
        <span className="text-sm font-medium text-blue-600">{new Date(currentEvent.date).toLocaleDateString()}</span>
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
  );
}
