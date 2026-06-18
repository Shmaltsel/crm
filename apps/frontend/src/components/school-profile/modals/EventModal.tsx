import React from 'react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventForm: any;
  setEventForm: (data: any) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function EventModal({ isOpen, onClose, eventForm, setEventForm, onSave }: EventModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800">Нова подія</h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        <form onSubmit={onSave} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Проєкт</label>
              <select value={eventForm.project} onChange={e => setEventForm({...eventForm, project: e.target.value})} className="w-full p-2 border rounded">
                <option>Голограма для школи</option>
                <option>360° шоу</option>
                <option>Проєкт для садочків</option>
              </select>
            </div>
            <div><label className="block text-sm mb-1">Дата</label><input type="date" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} required className="w-full p-2 border rounded" /></div>
            <div><label className="block text-sm mb-1">Час</label><input type="time" value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} required className="w-full p-2 border rounded" /></div>
            <div><label className="block text-sm mb-1">Дітей (план)</label><input type="number" value={eventForm.childrenPlanned} onChange={e => setEventForm({...eventForm, childrenPlanned: e.target.value})} required className="w-full p-2 border rounded" /></div>
            <div><label className="block text-sm mb-1">Вартість</label><input type="number" value={eventForm.price} onChange={e => setEventForm({...eventForm, price: e.target.value})} required className="w-full p-2 border rounded" /></div>
            <div className="md:col-span-2"><label className="block text-sm mb-1">Адреса</label><input type="text" value={eventForm.address} onChange={e => setEventForm({...eventForm, address: e.target.value})} className="w-full p-2 border rounded" /></div>
            <div><label className="block text-sm mb-1">Контактна особа</label><input type="text" value={eventForm.contactPerson} onChange={e => setEventForm({...eventForm, contactPerson: e.target.value})} className="w-full p-2 border rounded" /></div>
            <div><label className="block text-sm mb-1">Телефон</label><input type="text" value={eventForm.contactPhone} onChange={e => setEventForm({...eventForm, contactPhone: e.target.value})} className="w-full p-2 border rounded" /></div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-slate-100 rounded">Скасувати</button>
            <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded">Створити</button>
          </div>
        </form>
      </div>
    </div>
  );
}