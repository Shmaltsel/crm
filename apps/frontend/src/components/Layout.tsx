import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelectedCity } from "../context/CityContext";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const is = (roles: string[]) => !!user?.role && roles.includes(user.role);
  const { selectedCity } = useSelectedCity();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = async () => {
    await logout();
    queryClient.clear();
    window.location.href = "/login";
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
              className="flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-colors text-xs font-medium ml-2 shrink-0 px-2.5 py-2 rounded-lg"
              title="Вийти"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Вийти
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
