import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelectedCity } from "../context/CityContext";

interface UserInfo {
  name: string;
  role: string;
}

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUserRole(JSON.parse(raw).role);
    } catch {}
  }, []);

  const is = (roles: string[]) => !!userRole && roles.includes(userRole);
  const { selectedCity } = useSelectedCity();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch {
    }
  }, []);

  const token = localStorage.getItem("token");
  let isSuperAdmin = false;

  interface DecodedToken {
    role: string;
  }

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      isSuperAdmin = decoded.role === "SUPERADMIN";
    } catch (error) {
      console.error("Не вдалося розкодувати токен:", error);
    }
  }

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Мобільний хедер (видно тільки на малих екранах) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1527] text-white flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <span className="font-semibold tracking-wider text-sm">
            СВІТЛО ЗНАНЬ
          </span>
          <span className="text-xs text-blue-300 ml-1">
            · {selectedCity.name}
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 focus:outline-none"
        >
          {/* Проста іконка гамбургера / хрестика */}
          <span className="text-2xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Оверлей для мобільного меню (затемнення фону) */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Сайдбар */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1527] text-white flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-6 flex flex-col items-center border-b border-slate-700/50 hidden md:flex">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-3 flex items-center justify-center text-2xl">
            🎓
          </div>
          <h2 className="text-sm font-semibold tracking-wider">СВІТЛО ЗНАНЬ</h2>
          <p className="text-xs text-blue-300 mt-1 tracking-wide">
            📍 {selectedCity.name}
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto mt-16 md:mt-0">
          {is(["SUPERADMIN", "MANAGER"]) && (
            <Link
              to="/dashboard"
              onClick={handleLinkClick}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/dashboard") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              <span className="mr-3">🏠</span> Дашборд
            </Link>
          )}
          {is(["SUPERADMIN", "MANAGER"]) && (
            <Link
              to="/cities"
              onClick={handleLinkClick}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/cities") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              <span className="mr-3">📍</span> Міста
            </Link>
          )}
          <Link
            to="/schools"
            onClick={handleLinkClick}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/schools") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
          >
            <span className="mr-3">🏫</span> Школи
          </Link>

          {/* ДОДАЛИ НОВИЙ ПУНКТ "САДОЧКИ" */}
          <Link
            to="/kindergartens"
            onClick={handleLinkClick}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/kindergartens") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
          >
            <span className="mr-3">🧸</span> Садочки
          </Link>
          {is(["SUPERADMIN", "MANAGER"]) && (
            <Link
              to="/finance"
              onClick={handleLinkClick}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/finance") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              <span className="mr-3">💰</span> Фінанси
            </Link>
          )}
          <Link
            to="/calendar"
            onClick={handleLinkClick}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/calendar") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
          >
            <span className="mr-3">📆</span> Календар
          </Link>
          {is(["SUPERADMIN"]) && (
            <Link
              to="/employees"
              onClick={handleLinkClick}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/employees") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              <span className="mr-3">👥</span> Працівники
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-slate-700/50 pb-8 md:pb-4">
          <div className="flex items-center px-4 py-2 text-slate-300 justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0) ?? "?"}
              </div>
              <div className="text-sm truncate max-w-[120px]">
                <p className="font-medium text-white truncate">
                  {user?.name ?? "Користувач"}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {user?.role ?? ""}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-500 hover:text-slate-300 transition-colors text-xs ml-2 shrink-0 p-2"
              title="Вийти"
            >
              ⬅️
            </button>
          </div>
        </div>
      </aside>

      {/* Головна область */}
      <main className="flex-1 overflow-y-auto mt-16 md:mt-0 relative w-full">
        <Outlet />
      </main>
    </div>
  );
}
