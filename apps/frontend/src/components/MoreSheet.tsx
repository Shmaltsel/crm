import { useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { NAV_TABS, NAV_SECTIONS } from "../constants/navTabs";
import { hasRole } from "../utils/roles";

interface Props {
  onClose: () => void;
}

export default function MoreSheet({ onClose, visible }: Props & { visible: boolean }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = useCallback(async () => {
    await logout();
    onClose();
  }, [logout, onClose]);

  const allowedTabs = useMemo(
    () => NAV_TABS.filter((t) => hasRole(user?.role, t.roles)),
    [user],
  );

  const allowedRoutes = new Set(allowedTabs.map((t) => t.to));

  let itemIdx = 0;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-sheet flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40 sheet-backdrop" onClick={onClose} />

      <div className="relative bg-white rounded-t-2xl shadow-xl pb-safe pb-4 sheet-panel">
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="sheet-handle w-9 h-1 rounded-full bg-slate-300" />
        </div>

        <div className="overflow-y-auto max-h-[70vh]">
          <div className="flex items-center justify-between px-5 pt-2 pb-2">
            <h2 className="text-sm font-bold text-content-primary uppercase tracking-wider">
              Розділи
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-content-muted hover:text-content-primary rounded-control transition-colors transition-transform active:scale-90"
              aria-label="Закрити"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="px-3 pb-3">
            {NAV_SECTIONS.map((section, sIdx) => {
              const items = section.routes
                .filter((r) => allowedRoutes.has(r))
                .map((r) => allowedTabs.find((t) => t.to === r)!)
                .filter(Boolean);

              if (items.length === 0) return null;

              return (
                <div key={section.label} className={sIdx > 0 ? "mt-3" : ""}>
                  <div className="sheet-item px-3 py-1.5" style={{ animationDelay: `${(itemIdx++) * 40}ms` }}>
                    <span className="text-2xs font-bold text-content-muted uppercase tracking-wider">
                      {section.label}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {items.map((tab) => {
                      const isActive = location.pathname.startsWith(tab.to);
                      const Icon = tab.icon;
                      const delay = (itemIdx++) * 40;
                      return (
                        <div key={tab.to} className="sheet-item" style={{ animationDelay: `${delay}ms` }}>
                          <Link
                            to={tab.to}
                            onClick={onClose}
                            className={`sheet-nav-link flex items-center gap-3 px-4 py-3 rounded-control text-sm font-medium transition-colors active:scale-[0.97] ${
                              isActive
                                ? "bg-brand/10 text-brand"
                                : "text-content-secondary hover:bg-surface-muted"
                            }`}
                          >
                            <Icon className="w-5 h-5 shrink-0" />
                            {tab.label}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="sheet-item mt-3" style={{ animationDelay: `${itemIdx * 40}ms` }}>
              <div className="px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <div className="sheet-line h-px flex-1 bg-slate-200" />
                  <span className="text-2xs font-bold text-content-muted uppercase tracking-wider">
                    Акаунт
                  </span>
                  <div className="sheet-line h-px flex-1 bg-slate-200" />
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-9 h-9 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {user?.name?.charAt(0) ?? "?"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-content-primary truncate">{user?.name ?? "Користувач"}</p>
                  <p className="text-xs text-content-muted truncate">{user?.role ?? ""}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-control text-sm font-medium text-content-secondary hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors active:scale-[0.97]"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                Вийти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
