import { useState, lazy, Suspense } from "react";
import { useAuth } from "../context/AuthContext";
import MySalary from "../features/salary/pages/MySalary";
import TeamSalaries from "../features/salary/pages/TeamSalaries";

const Expenses = lazy(() => import("../features/salary/pages/Expenses"));
const Company = lazy(() => import("../features/salary/pages/Company"));

type Tab = "my-salary" | "team" | "expenses" | "company";

function PeekSkeleton() {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      <div className="h-8 bg-surface-muted rounded-control w-48" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-surface rounded-card border border-border" />
        ))}
      </div>
      <div className="h-64 bg-surface rounded-card border border-border" />
    </div>
  );
}

export default function Finance({ isPeek }: { isPeek?: boolean }) {
  const { user } = useAuth();
  const isManagerOrAdmin = user?.role === "MANAGER" || user?.role === "SUPERADMIN" || user?.role === "OWNER";
  const isSuperadmin = user?.role === "SUPERADMIN";

  const tabs: { key: Tab; label: string; managerOnly?: boolean; superOnly?: boolean }[] = [
    { key: "my-salary", label: "Мої нарахування" },
    { key: "team", label: "Нарахування команди", managerOnly: true },
    { key: "expenses", label: "Витрати", managerOnly: true },
    { key: "company", label: "Баланс компанії", superOnly: true },
  ];

  const availableTabs = tabs.filter((t) => {
    if (t.superOnly) return isSuperadmin;
    if (t.managerOnly) return isManagerOrAdmin;
    return true;
  });
  const [activeTab, setActiveTab] = useState<Tab>(availableTabs[0]?.key ?? "my-salary");

  if (isPeek) {
    return <PeekSkeleton />;
  }

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-none">
            {availableTabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`shrink-0 px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === t.key
                    ? "text-brand"
                    : "text-content-muted hover:text-content-secondary"
                }`}
              >
                {t.label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-brand transition-opacity duration-150 ease-out ${
                    activeTab === t.key ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface to-transparent pointer-events-none" />
        </div>
      </div>

      {activeTab === "my-salary" && <MySalary />}
      {activeTab === "team" && isManagerOrAdmin && <TeamSalaries />}
      {activeTab === "expenses" && isManagerOrAdmin && (
        <Suspense fallback={<div className="p-8 text-center text-sm text-content-muted">Завантаження...</div>}>
          <Expenses />
        </Suspense>
      )}
      {activeTab === "company" && isSuperadmin && (
        <Suspense fallback={<div className="p-8 text-center text-sm text-content-muted">Завантаження...</div>}>
          <Company />
        </Suspense>
      )}
    </div>
  );
}
