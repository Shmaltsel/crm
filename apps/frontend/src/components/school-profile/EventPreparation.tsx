

import React from 'react';

interface PreparationProps {
  data: any; 
  onUpdate: (field: string, status: string) => void;
  onOpenCrewModal: () => void;
}

const STATUSES = ['Заплановано', 'В процесі', 'Виконано'];

const getNextStatus = (current: string) => {
  const idx = STATUSES.indexOf(current || 'Заплановано');
  return STATUSES[(idx + 1) % STATUSES.length];
};

export default function EventPreparation({ data, onUpdate, onOpenCrewModal }: PreparationProps) {
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
      onOpenCrewModal(); // Відкриваємо модалку замість простої зміни статусу
    } else {
      onUpdate(key, getNextStatus(data[key])); // Перемикаємо статус
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100">Підготовка до події</h3>
      <div className="space-y-3 text-sm">
        {tasks.map((task) => (
          <div 
            key={task.key} 
            className="flex justify-between items-center cursor-pointer group hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors"
            onClick={() => handleTaskClick(task.key)}
          >
            <span className="text-slate-700 font-medium select-none">{task.label}</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all select-none ${getStatusColor(data[task.key] || 'Заплановано')}`}>
              {data[task.key] || 'Заплановано'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

