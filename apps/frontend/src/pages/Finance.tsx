import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import MySalary from "../features/salary/pages/MySalary";
import TeamSalaries from "../features/salary/pages/TeamSalaries";
import Company from "../features/salary/pages/Company";

type Tab = "my-salary" | "team" | "company";

export default function Finance() {
  const { user } = useAuth();
  const isManagerOrAdmin = user?.role === "MANAGER" || user?.role === "SUPERADMIN" || user?.role === "OWNER";

  const tabs: { key: Tab; label: string; managerOnly?: boolean }[] = [
    { key: "my-salary", label: "Мої нарахування" },
    { key: "team", label: "Нарахування команди", managerOnly: true },
    { key: "company", label: "Фінанси компанії", managerOnly: true },
  ];

  const availableTabs = tabs.filter((t) => !t.managerOnly || isManagerOrAdmin);
  const [activeTab, setActiveTab] = useState<Tab>(availableTabs[0]?.key ?? "my-salary");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="flex overflow-x-auto scrollbar-none">
          {availableTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`shrink-0 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === t.key
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "my-salary" && <MySalary />}
      {activeTab === "team" && isManagerOrAdmin && <TeamSalaries />}
      {activeTab === "company" && isManagerOrAdmin && <Company />}
    </div>
  );
}
