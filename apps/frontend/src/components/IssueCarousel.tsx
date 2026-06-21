import { useState, useEffect } from 'react';
import { api } from '../config/api';
import { useSelectedCity } from '../context/CityContext';

const STATUSES = ['Планується', 'Виконується', 'Виконано'];

const STATUS_STYLES: Record<string, string> = {
  'Планується': 'bg-amber-50 text-amber-700 border-amber-200',
  'Виконується': 'bg-blue-50 text-blue-700 border-blue-200',
  'Виконано': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

function getNextStatus(current: string) {
  const idx = STATUSES.indexOf(current);
  return STATUSES[(idx + 1) % STATUSES.length];
}

export default function IssueCarousel() {
  const { selectedCity } = useSelectedCity();
  const [issues, setIssues] = useState<any[]>([]);

  const fetchIssues = async () => {
    if (!selectedCity?.id) return;
    try {
      const res = await api.get(`/issues?cityId=${selectedCity.id}`);
      setIssues(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [selectedCity?.id]);

  const handleStatusToggle = async (issue: any) => {
    const nextStatus = getNextStatus(issue.status);
    try {
      await api.patch(`/issues/${issue.id}/status`, { status: nextStatus });
      setIssues(prev => prev.map(i => i.id === issue.id ? { ...i, status: nextStatus } : i));
    } catch (e) {
      console.error(e);
    }
  };

  if (issues.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
        🚨 <span>Активні проблеми</span>
        <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">{issues.length}</span>
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
        {issues.map(issue => (
          <div
            key={issue.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-red-500 p-5 min-w-[280px] max-w-[320px] flex flex-col gap-3 shrink-0"
          >
            <div>
              <p className="text-xs text-slate-400 mb-1">{new Date(issue.createdAt).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              <p className="font-bold text-slate-800 text-sm">{issue.schoolName}</p>
              <p className="text-xs text-slate-500">{issue.eventName}</p>
            </div>

            <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed">
              "{issue.message}"
            </p>

            <button
              onClick={() => handleStatusToggle(issue)}
              className={`text-xs font-bold px-3 py-2 rounded-lg border transition-colors text-left ${STATUS_STYLES[issue.status] || STATUS_STYLES['Планується']}`}
            >
              ● {issue.status} → натисни щоб змінити
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
