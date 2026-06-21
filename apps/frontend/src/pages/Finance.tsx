import { useState, useEffect } from "react";
import { api } from '../config/api'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

const fmt = (n: number) =>
  new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));

export default function Finance() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("year");
  const [cityId, setCityId] = useState("");
  const [project, setProject] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();
      if (period) params.set("period", period);
      if (cityId) params.set("cityId", cityId);
      if (project) params.set("project", project);

      const res = await api.get(
        `/finance/dashboard?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchData();
    };
    void load();
  }, [period, cityId, project]);

  if (isLoading)
    return <div className="p-8 text-slate-500">Завантаження...</div>;
  if (!data)
    return <div className="p-8 text-slate-500">Помилка завантаження</div>;

  const {
    kpi,
    monthly,
    byProject,
    byExpenseCategory,
    topCities,
    topSchools,
    topEvents,
    worstEvents,
    expectedRevenue,
    filters,
  } = data;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">💰 Фінанси</h1>

        {/* Фільтри */}
        <div className="flex flex-wrap gap-3">
          <div className="flex rounded-lg overflow-hidden border border-slate-200 bg-white text-sm">
            {[
              ["month", "Місяць"],
              ["quarter", "Квартал"],
              ["year", "Рік"],
              ["", "Весь час"],
            ].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setPeriod(val)}
                className={`px-4 py-2 transition-colors ${period === val ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Всі міста</option>
            {filters?.cities?.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Всі проєкти</option>
            {filters?.projects?.map((p: string) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI картки */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Загальна виручка"
          value={`${fmt(kpi.totalRevenue)} грн`}
          color="blue"
        />
        <KpiCard
          label="Витрати"
          value={`${fmt(kpi.totalExpenses)} грн`}
          color="red"
        />
        <KpiCard
          label="Чистий прибуток"
          value={`${fmt(kpi.totalProfit)} грн`}
          color="green"
        />
        <KpiCard
          label="Проведено подій"
          value={kpi.totalEvents}
          color="purple"
        />
      </div>

      {/* Очікувана виручка */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-600 font-medium">
            📅 Очікувана виручка (заплановані події)
          </p>
          <p className="text-2xl font-bold text-blue-800 mt-1">
            {fmt(expectedRevenue)} грн
          </p>
        </div>
        <span className="text-4xl">🔮</span>
      </div>

      {/* Графік по місяцях */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <h3 className="font-bold text-slate-800 mb-4">Динаміка по місяцях</h3>
        {monthly.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">
            Немає даних за обраний період
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                tickFormatter={(v) => `${Math.round(v / 1000)}к`}
              />
              <Tooltip formatter={(v: number) => `${fmt(v)} грн`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Виручка"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={2}
                name="Прибуток"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Pie charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4">Структура доходів</h3>
          {byProject.length === 0 ? (
            <EmptyPie />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={byProject}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {byProject.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${fmt(v)} грн`} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4">Структура витрат</h3>
          {byExpenseCategory.length === 0 ? (
            <EmptyPie />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={byExpenseCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {byExpenseCategory.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${fmt(v)} грн`} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Топ міст і шкіл */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4">🏙️ Топ міст</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs uppercase border-b border-slate-50">
                <th className="text-left pb-2">Місто</th>
                <th className="text-right pb-2">Виручка</th>
                <th className="text-right pb-2">Прибуток</th>
              </tr>
            </thead>
            <tbody>
              {topCities.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-slate-400">
                    Немає даних
                  </td>
                </tr>
              ) : (
                topCities.map((c: any, i: number) => (
                  <tr key={i} className="border-b border-slate-50">
                    <td className="py-2 font-medium">{c.name}</td>
                    <td className="py-2 text-right text-slate-600">
                      {fmt(c.revenue)} грн
                    </td>
                    <td className="py-2 text-right text-emerald-600 font-medium">
                      {fmt(c.profit)} грн
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4">🏫 Топ закладів</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs uppercase border-b border-slate-50">
                <th className="text-left pb-2">Заклад</th>
                <th className="text-right pb-2">Подій</th>
                <th className="text-right pb-2">Виручка</th>
              </tr>
            </thead>
            <tbody>
              {topSchools.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-slate-400">
                    Немає даних
                  </td>
                </tr>
              ) : (
                topSchools.map((s: any, i: number) => (
                  <tr key={i} className="border-b border-slate-50">
                    <td className="py-2 font-medium">{s.name}</td>
                    <td className="py-2 text-right text-slate-600">
                      {s.count}
                    </td>
                    <td className="py-2 text-right text-blue-600 font-medium">
                      {fmt(s.revenue)} грн
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Найкращі і найгірші події */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4">
            🏆 Найприбутковіші події
          </h3>
          <EventTable events={topEvents} positive />
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4">
            ⚠️ Найменш прибуткові події
          </h3>
          <EventTable events={worstEvents} positive={false} />
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  color,
}: {
  label: string;
  value: any;
  color: string;
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 border-blue-100",
    green: "bg-emerald-50 border-emerald-100",
    red: "bg-red-50 border-red-100",
    purple: "bg-violet-50 border-violet-100",
  };
  const textColors: Record<string, string> = {
    blue: "text-blue-700",
    green: "text-emerald-700",
    red: "text-red-700",
    purple: "text-violet-700",
  };
  return (
    <div className={`rounded-2xl border p-5 ${colors[color]}`}>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
        {label}
      </p>
      <p className={`text-2xl font-bold ${textColors[color]}`}>{value}</p>
    </div>
  );
}

function EventTable({
  events,
  positive,
}: {
  events: any[];
  positive: boolean;
}) {
  if (!events.length)
    return (
      <p className="text-slate-400 text-sm text-center py-4">Немає даних</p>
    );
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-slate-400 text-xs uppercase border-b border-slate-50">
          <th className="text-left pb-2">Дата</th>
          <th className="text-left pb-2">Заклад</th>
          <th className="text-right pb-2">Прибуток</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e: any, i: number) => (
          <tr key={i} className="border-b border-slate-50">
            <td className="py-2 text-slate-500">
              {new Date(e.date).toLocaleDateString("uk-UA")}
            </td>
            <td className="py-2 font-medium truncate max-w-[140px]">
              {e.school}
            </td>
            <td
              className={`py-2 text-right font-semibold ${positive ? "text-emerald-600" : "text-red-500"}`}
            >
              {new Intl.NumberFormat("uk-UA").format(Math.round(e.profit))} грн
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EmptyPie() {
  return (
    <p className="text-slate-400 text-sm text-center py-8">
      Немає даних за обраний період
    </p>
  );
}
