

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

  const hosts = employees.filter(e => e.role === 'HOST' && e.city?.name === city);
  const drivers = employees.filter(e => e.role === 'DRIVER' && e.city?.name === city);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(selectedHost, selectedDriver);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden max-h-[90vh] flex flex-col">
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
        <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
          <h3 className="text-xl font-bold text-slate-800">Екіпаж ({city})</h3>
          <button type="button" onClick={onClose} className="text-slate-400 p-2 -mr-2">✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 flex-1 overflow-y-auto flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ведучий</label>
            <select value={selectedHost} onChange={e => setSelectedHost(e.target.value)} required className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">— Оберіть ведучого —</option>
              {hosts.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
            </select>
            {hosts.length === 0 && <p className="text-xs text-red-500 mt-1">Немає ведучих у цьому місті</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Водій</label>
            <select value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)} required className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">— Оберіть водія —</option>
              {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            {drivers.length === 0 && <p className="text-xs text-red-500 mt-1">Немає водіїв у цьому місті</p>}
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0 pb-1 sm:pb-0">
            <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors">Скасувати</button>
            <button type="submit" className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">Зберегти</button>
          </div>
        </form>
      </div>
    </div>
  );
}


