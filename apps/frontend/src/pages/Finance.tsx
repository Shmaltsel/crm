import { useState, useEffect, lazy, Suspense } from "react";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";

const FinanceCharts = lazy(() => import("../components/finance/FinanceCharts"));
const StaffFinanceView = lazy(
  () => import("../components/finance/StaffFinanceView"),
);

function FinanceSkeleton() {
  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen flex flex-col gap-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded-xl w-48" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-white rounded-2xl border border-slate-100"
          />
        ))}
      </div>
      <div className="h-64 bg-white rounded-2xl border border-slate-100" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-48 bg-white rounded-2xl border border-slate-100" />
        <div className="h-48 bg-white rounded-2xl border border-slate-100" />
      </div>
    </div>
  );
}

export default function Finance() {
  const { selectedCity } = useSelectedCity();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("year");
  const [projectFilter, setProjectFilter] = useState("");
  const [currentUser, setCurrentUser] = useState<{
    role: string;
    balance?: number;
  } | null>(null);
  const [myBalance, setMyBalance] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setCurrentUser(JSON.parse(raw));
    } catch {}
  }, []);

  const isManagerOrAdmin =
    currentUser?.role === "MANAGER" || currentUser?.role === "SUPERADMIN";

  useEffect(() => {
    if (isManagerOrAdmin === false) {
      api
        .get("/finance/my-balance", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((r) => setMyBalance(r.data.balance))
        .catch(() => {});
    }
  }, [isManagerOrAdmin]);

  useEffect(() => {
    if (!isManagerOrAdmin) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const params = new URLSearchParams();
        if (period) params.set("period", period);
        if (selectedCity?.id) params.set("cityId", selectedCity.id);
        if (projectFilter) params.set("project", projectFilter);

        // Спочатку minimal — швидко показуємо KPI + графік
        params.set("minimal", "true");
        const res = await api.get(`/finance/dashboard?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
        setIsLoading(false);

        // Потім повні дані (топи, таблиці) у фоні
        params.set("minimal", "false");
        api
          .get(`/finance/dashboard?${params}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((r) => setData(r.data))
          .catch(() => {});
      } catch (error) {
        console.error("Помилка завантаження фінансів:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCity.id, period, projectFilter, isManagerOrAdmin]);

  if (!isManagerOrAdmin) {
    return (
      <Suspense fallback={<FinanceSkeleton />}>
        <StaffFinanceView myBalance={myBalance} selectedCity={selectedCity} />
      </Suspense>
    );
  }

  if (isLoading || !data) return <FinanceSkeleton />;

  return (
    <Suspense fallback={<FinanceSkeleton />}>
      <FinanceCharts
        data={data}
        period={period}
        setPeriod={setPeriod}
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
        selectedCity={selectedCity}
      />
    </Suspense>
  );
}
