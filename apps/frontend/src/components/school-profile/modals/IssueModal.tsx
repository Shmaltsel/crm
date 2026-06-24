import { useState } from 'react';
import { api } from '../../../config/api';

interface Employee {
  id: string;
  name: string;
  role: string;
}

interface IssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolName: string;
  eventName: string;
  eventId: string;
  cityId: string;
  employees?: Employee[];
}

export default function IssueModal({
  isOpen, onClose, schoolName, eventName, eventId, cityId, employees = []
}: IssueModalProps) {
  const [message, setMessage] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignedUserId, setAssignedUserId] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const assignedUser = employees.find(e => e.id === assignedUserId);

  const handleSend = async () => {
    if (!message.trim()) return;
    setIsSending(true);
    try {
      await api.post('/issues', {
        eventId,
        schoolName,
        eventName,
        message,
        cityId,
        deadline: deadline || undefined,
        assignedUserId: assignedUserId || undefined,
        assignedUserName: assignedUser?.name || undefined,
      });
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setMessage('');
        setDeadline('');
        setAssignedUserId('');
        onClose();
      }, 1500);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden max-h-[90vh] flex flex-col">

        <div className="p-5 border-b border-slate-100 flex justify-between bg-red-50 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-red-700">🚨 Запит</h3>
            <p className="text-sm text-red-500 mt-0.5 font-medium">{schoolName}</p>
            <p className="text-xs text-slate-500">{eventName}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 -mr-2 -mt-2 h-fit text-lg">✕</button>
        </div>

        <div className="p-5 flex flex-col gap-4 overflow-y-auto">
          {/* Опис проблеми */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Опишіть проблему або запит..."
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none resize-none h-32"
            autoFocus
          />

          {/* Дедлайн */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              ⏰ Дедлайн <span className="text-slate-400 font-normal">(необов'язково)</span>
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().slice(0, 10)}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm"
            />
          </div>

          {/* Відповідальний */}
          {employees.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                👤 Відповідальний <span className="text-slate-400 font-normal">(необов'язково)</span>
              </label>
              <select
                value={assignedUserId}
                onChange={(e) => setAssignedUserId(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm bg-white"
              >
                <option value="">— Оберіть працівника —</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.role})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium text-sm transition-colors"
            >
              Скасувати
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={isSending || !message.trim()}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium text-sm transition-colors disabled:opacity-50"
            >
              {sent ? '✓ Надіслано!' : isSending ? 'Відправка...' : 'Відправити'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
