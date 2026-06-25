import { useState, useEffect } from 'react';
import { api } from '../../../config/api';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  currentDate: string;
  currentTime: string;
  onSuccess: () => void;
}

export default function RescheduleModal({
  isOpen,
  onClose,
  eventId,
  currentDate,
  currentTime,
  onSuccess,
}: RescheduleModalProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && currentDate) {
      setDate(currentDate.slice(0, 10));
      setTime(currentTime || '');
    }
  }, [isOpen, currentDate, currentTime]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.patch(`/events/${eventId}/reschedule`, { date, time });
      onSuccess();
      onClose();
    } catch (e) {
      console.error('Помилка перенесення:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden max-h-[90vh] flex flex-col">
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
        <div className="p-5 border-b border-slate-100 flex justify-between bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">📅 Перенести подію</h3>
          <button onClick={onClose} className="text-slate-400 p-1">✕</button>
        </div>
        <div className="p-5 flex flex-col gap-4 overflow-y-auto">
          <div>
            <label className="block text-sm mb-1 text-slate-600">Нова дата</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-600">Новий час</label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 font-medium rounded-xl transition-colors"
            >
              Скасувати
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Збереження...' : 'Зберегти'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
