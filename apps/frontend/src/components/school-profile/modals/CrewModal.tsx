import React, { useState } from 'react';

interface Employee {
  id: string;
  fullName: string;
  role: string;
  city: string;
}

interface CrewModalProps {
  isOpen: boolean;
  onClose: () => void;
  city: string;
  employees: Employee[];
  onSave: (hostId: string, driverId: string) => void;
}

export default function CrewModal({ isOpen, onClose, city, employees, onSave }: CrewModalProps) {
  const [selectedHost, setSelectedHost] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');

  if (!isOpen) return null;

  // Фільтруємо працівників за роллю та назвою міста, яке передано в пропси
  const hosts = employees.filter(e => e.role === 'HOST' && e.city === city);
  const drivers = employees.filter(e => e.role === 'DRIVER' && e.city === city);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(selectedHost, selectedDriver);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800">Призначити екіпаж ({city})</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ведучий</label>
            <select 
              value={selectedHost} 
              onChange={e => setSelectedHost(e.target.value)} 
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">— Оберіть ведучого —</option>
              {hosts.map(h => <option key={h.id} value={h.id}>{h.fullName}</option>)}
            </select>
            {hosts.length === 0 && <p className="text-xs text-red-500 mt-1">У цьому місті немає доступних ведучих</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Водій</label>
            <select 
              value={selectedDriver} 
              onChange={e => setSelectedDriver(e.target.value)} 
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">— Оберіть водія —</option>
              {drivers.map(d => <option key={d.id} value={d.id}>{d.fullName}</option>)}
            </select>
            {drivers.length === 0 && <p className="text-xs text-red-500 mt-1">У цьому місті немає доступних водіїв</p>}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-slate-100 rounded-xl text-sm font-medium">Скасувати</button>
            <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">Зберегти екіпаж</button>
          </div>
        </form>
      </div>
    </div>
  );
}