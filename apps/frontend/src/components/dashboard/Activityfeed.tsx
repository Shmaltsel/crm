import { useNavigate } from 'react-router-dom';

// Ролі → скорочення для аватара
const ROLE_INITIALS: Record<string, string> = {
  MANAGER:    'М',
  SUPERADMIN: 'А',
  DRIVER:     'В',
  HOST:       'В',
};

// Кольори аватара по ролі
const ROLE_COLORS: Record<string, string> = {
  MANAGER:    'bg-blue-50 text-blue-700',
  SUPERADMIN: 'bg-purple-50 text-purple-700',
  DRIVER:     'bg-emerald-50 text-emerald-700',
  HOST:       'bg-violet-50 text-violet-700',
};

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('uk-UA', {
    hour:   '2-digit',
    minute: '2-digit',
  });
}

// Перетворює рядок action на коротшу зрозумілу фразу
// "Перевів(ла) школу на етап: Підготовка" → виводимо як є, але обрізаємо довге
function formatAction(action: string, schoolName: string | null): string {
  // action вже містить повний опис з сервісу ("Створено подію. Етап: База" etc.)
  // Просто нормалізуємо крапку в кінці
  return action.replace(/\.$/, '');
}

interface ActivityItem {
  id:         string;
  userName:   string;
  role:       string;
  action:     string;
  comment:    string | null;
  createdAt:  string;
  schoolId:   string | null;
  schoolName: string | null;
  eventId:    string | null;
}

interface Props {
  items: ActivityItem[];
}

export default function ActivityFeed({ items }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-slate-800">Активність команди</p>
        <span className="text-xs text-slate-400">сьогодні</span>
      </div>

      {items.length === 0 ? (
        <div className="py-6 text-center text-slate-400 text-sm">
          Сьогодні активності ще немає
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-slate-50">
          {items.map((item) => {
            const avatarColor = ROLE_COLORS[item.role] ?? 'bg-slate-100 text-slate-600';

            return (
              <div
                key={item.id}
                className="flex items-start gap-3 py-2.5"
              >
                {/* Аватар */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatarColor}`}
                >
                  {getInitials(item.userName)}
                </div>

                {/* Текст */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-700 leading-snug">
                    <span className="font-semibold">{item.userName}</span>
                    {' — '}
                    <span className="text-slate-500">
                      {formatAction(item.action, item.schoolName)}
                    </span>
                    {item.schoolName && (
                      <>
                        {' '}
                        <button
                          onClick={() => item.schoolId && navigate(`/schools/${item.schoolId}`)}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {item.schoolName}
                        </button>
                      </>
                    )}
                  </p>
                  {item.comment && (
                    <p className="text-xs text-slate-400 mt-0.5 truncate italic">
                      «{item.comment}»
                    </p>
                  )}
                </div>

                {/* Час */}
                <span className="text-xs text-slate-400 shrink-0 pt-0.5">
                  {formatTime(item.createdAt)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
