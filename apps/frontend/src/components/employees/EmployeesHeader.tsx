import { Search, List, LayoutGrid, Download, Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/Button";

type ViewMode = "cards" | "table";

interface EmployeesHeaderProps {
  isSuperAdmin: boolean;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddUser: () => void;
  onToggleFilter: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function EmployeesHeader({
  isSuperAdmin,
  viewMode,
  onViewModeChange,
  onAddUser,
  onToggleFilter,
  searchQuery,
  onSearchChange,
}: EmployeesHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">Працівники</h1>
          <p className="text-sm text-content-muted mt-0.5">
            Керування доступами, ролями та проєктами
          </p>
        </div>
        {isSuperAdmin && (
          <Button onClick={onAddUser} size="md">
            <Plus className="w-4 h-4 mr-1.5" />
            Створити користувача
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Пошук за ім'ям, email, телефоном..."
            aria-label="Пошук працівників"
            className="w-full pl-9 pr-3 py-2.5 md:py-2 rounded-control border border-border-strong bg-surface
              text-sm text-content-primary placeholder:text-content-muted
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand"
          />
        </div>

        <button
          onClick={onToggleFilter}
          className="lg:hidden p-2 rounded-control text-content-muted hover:text-content-primary hover:bg-neutral-100 transition-colors"
          aria-label="Фільтри"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>

        <div role="tablist" aria-label="Режим перегляду" className="flex items-center border border-border-strong rounded-control overflow-hidden">
          <button
            role="tab"
            aria-selected={viewMode === "cards"}
            onClick={() => onViewModeChange("cards")}
            className={`p-2 transition-colors ${viewMode === "cards" ? "bg-brand text-white" : "text-content-muted hover:bg-neutral-100"}`}
            aria-label="Картки"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            role="tab"
            aria-selected={viewMode === "table"}
            onClick={() => onViewModeChange("table")}
            className={`p-2 transition-colors ${viewMode === "table" ? "bg-brand text-white" : "text-content-muted hover:bg-neutral-100"}`}
            aria-label="Таблиця"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <button
          className="p-2 rounded-control text-content-muted hover:text-content-primary hover:bg-neutral-100 transition-colors"
          aria-label="Експорт"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
