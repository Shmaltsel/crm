

import axios from 'axios';

interface EventsTableProps {
  events: any[];
  selectedEventId: string | null;
  onEventSelect: (id: string) => void;
  onDeleteSuccess: () => void; // Додаємо колбек для оновлення списку
}

export default function EventsTable({ events, selectedEventId, onEventSelect, onDeleteSuccess }: EventsTableProps) {
  
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Щоб не вибирати подію при кліку на кнопку видалення
    if (!window.confirm('Видалити цю подію?')) return;
    
    try {
      await axios.delete(`https://crm-57qd.onrender.com/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onDeleteSuccess();
    } catch (error) {
      console.error('Помилка видалення:', error);
    }
  };

  if (events.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-2 w-full">
      <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Всі події ({events.length})</h3>
      </div>

      {/* Картки — мобільний вигляд */}
      <div className="md:hidden divide-y divide-slate-50">
        {events.map(ev => (
          <div
            key={ev.id}
            onClick={() => onEventSelect(ev.id)}
            className={`flex items-center justify-between gap-3 p-4 transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-blue-50/50' : 'active:bg-slate-50'}`}
          >
            <div className="min-w-0">
              <p className="font-medium text-slate-800">{ev.project}</p>
              <p className="text-xs text-slate-500 mt-0.5">{new Date(ev.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-medium text-sm text-slate-700">{ev.price} грн</span>
              <button
                onClick={(e) => handleDelete(e, ev.id)}
                className="text-red-500 active:text-red-700 p-2"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Таблиця — десктоп */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-white border-b border-slate-100 text-slate-500">
              <th className="p-4">Дата</th>
              <th className="p-4">Проєкт</th>
              <th className="p-4">Вартість</th>
              <th className="p-4 text-center">Дія</th>
            </tr>
          </thead>
          <tbody>
            {events.map(ev => (
              <tr 
                key={ev.id} onClick={() => onEventSelect(ev.id)}
                className={`border-b transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
              >
                <td className="p-4 font-medium">{new Date(ev.date).toLocaleDateString()}</td>
                <td className="p-4">{ev.project}</td>
                <td className="p-4">{ev.price} грн</td>
                <td className="p-4 text-center">
                  <button 
                    onClick={(e) => handleDelete(e, ev.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


