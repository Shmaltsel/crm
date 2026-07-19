import { Search, Plus, SlidersHorizontal, Download } from "lucide-react";
import { Button } from "../ui/Button";

interface EmployeesHeaderProps {
  isSuperAdmin: boolean;
  onAddUser: () => void;
  onToggleFilter: () => void;
  onExportCsv: () => void;
  isExporting: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function EmployeesHeader({
  isSuperAdmin,
  onAddUser,
  onToggleFilter,
  onExportCsv,
  isExporting,
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
          <div className="flex items-center gap-2">
            <Button onClick={onExportCsv} size="md" variant="secondary" disabled={isExporting}>
              <Download className="w-4 h-4 mr-1.5" />
              {isExporting ? "Завантаження..." : "Експорт в CSV"}
            </Button>
            <Button onClick={onAddUser} size="md">
              <Plus className="w-4 h-4 mr-1.5" />
              Створити користувача
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted pointer-events-none" />
          <input
            type="search"
            inputMode="search"
            enterKeyHint="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Пошук за ім'ям, email, телефоном..."
            aria-label="Пошук працівників"
            className="w-full pl-9 pr-3 py-2.5 md:py-2 rounded-control border border-border-strong bg-surface
              text-base text-content-primary placeholder:text-content-muted
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
      </div>
    </div>
  );
}
