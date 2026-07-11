import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import MySalary from "../features/salary/pages/MySalary";
import TeamSalaries from "../features/salary/pages/TeamSalaries";
import Company from "../features/salary/pages/Company";

const Expenses = lazy(() => import("../features/salary/pages/Expenses"));

type Tab = "my-salary" | "team" | "company" | "expenses";

function PeekSkeleton() {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded-xl w-48" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100" />
        ))}
      </div>
      <div className="h-64 bg-white rounded-2xl border border-slate-100" />
    </div>
  );
}

export default function Finance({ isPeek }: { isPeek?: boolean }) {
  const { user } = useAuth();
  const isManagerOrAdmin = user?.role === "MANAGER" || user?.role === "SUPERADMIN" || user?.role === "OWNER";

  const tabs: { key: Tab; label: string; managerOnly?: boolean }[] = [
    { key: "my-salary", label: "Мої нарахування" },
    { key: "team", label: "Нарахування команди", managerOnly: true },
    { key: "company", label: "Фінанси компанії", managerOnly: true },
    { key: "expenses", label: "Витрати", managerOnly: true },
  ];

  const availableTabs = tabs.filter((t) => !t.managerOnly || isManagerOrAdmin);
  const [activeTab, setActiveTab] = useState<Tab>(availableTabs[0]?.key ?? "my-salary");

  if (isPeek) {
    return <PeekSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-none">
            {availableTabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`shrink-0 px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === t.key
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.label}
                {activeTab === t.key && (
                  <motion.div
                    layoutId="finance-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>

      {activeTab === "my-salary" && <MySalary />}
      {activeTab === "team" && isManagerOrAdmin && <TeamSalaries />}
      {activeTab === "company" && isManagerOrAdmin && <Company />}
      {activeTab === "expenses" && isManagerOrAdmin && (
        <Suspense fallback={<div className="p-8 text-center text-sm text-slate-400">Завантаження...</div>}>
          <Expenses />
        </Suspense>
      )}
    </div>
  );
}
