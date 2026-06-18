import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

interface UserInfo {
  name: string;
  role: string;
}

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);


// Отримуємо токен
const token = localStorage.getItem('token');
let isSuperAdmin = false;

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // Переконайся, що назва поля 'role' збігається з тим, що лежить у токені
        isSuperAdmin = decoded.role === 'SUPERADMIN';
      } catch (error) {
        console.error("Не вдалося розкодувати токен:", error);
      }
    }
  

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Темний сайдбар */}
      <aside className="w-64 bg-[#0B1527] text-white flex flex-col">
        <div className="p-6 flex flex-col items-center border-b border-slate-700/50">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-3 flex items-center justify-center text-2xl">
            🎓
          </div>
          <h2 className="text-sm font-semibold tracking-wider">СВІТЛО ЗНАНЬ</h2>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link
            to="/dashboard"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/dashboard') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span className="mr-3">🏠</span> Дашборд
          </Link>
          <Link
            to="/cities"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/cities') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span className="mr-3">📍</span> Міста
          </Link>
          <Link
            to="/schools"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/schools') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span className="mr-3">🏫</span> Школи / Садочки
          </Link>
          <Link
            to="/events"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/events') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span className="mr-3">📅</span> Події
          </Link>

          {/* Вкладка Працівники — тільки для суперадміна */}
          {isSuperAdmin && (
            <Link
              to="/employees"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/employees') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <span className="mr-3">👥</span> Працівники
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center px-4 py-2 text-slate-300 justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0) ?? '?'}
              </div>
              <div className="text-sm">
                <p className="font-medium text-white">{user?.name ?? 'Користувач'}</p>
                <p className="text-xs text-slate-400">{user?.role ?? ''}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-500 hover:text-slate-300 transition-colors text-xs ml-2"
              title="Вийти"
            >
              ⬅️
            </button>
          </div>
        </div>
      </aside>

      {/* Головна область */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}