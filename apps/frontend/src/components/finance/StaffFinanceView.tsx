import { useState, useEffect, useMemo, memo } from "react";
import { api } from "../../config/api";

const fmt = (n: number) =>
  new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));

const PERIOD_LABELS: Record<string, string> = {
  year: "Цей рік",
  quarter: "Цей квартал",
  month: "Цей місяць",
  all: "За весь час",
};

interface Props {
  myBalance: number | null;
  selectedCity: any;
}


const BalanceCard = memo(function BalanceCard({
  myBalance,
}: {
  myBalance: number | null;
}) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-10 text-center max-w-sm w-full">
        <div className="w-16 h-16 bg-blue-50 rounded-[20px] flex items-center justify-center text-3xl mx-auto mb-4">
          💰
        </div>
        <p className="text-sm text-slate-400 mb-2">Ваш баланс</p>
        <p className="text-4xl font-black text-blue-600 tracking-tight">
          {myBalance !== null ? fmt(myBalance) : "—"}
          <span className="text-lg font-bold text-slate-400 ml-1">грн</span>
        </p>
        <p className="text-xs text-slate-400 mt-4">
          Сума нарахованих зарплат за всі події
        </p>
      </div>
    </div>
  );
});

interface StaffMemberProps {
  member: any;
  index: number;
  maxRevenue: number;
}

const StaffMemberRow = memo(function StaffMemberRow({
  member,
  index,
  maxRevenue,
}: StaffMemberProps) {
  const pct = Math.round((member.revenue / maxRevenue) * 100);
  const isTop = index === 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isTop
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-slate-800">
            {member.name}
          </span>
          {isTop && (
            <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">
              🏆 Топ
            </span>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-slate-800">
            {fmt(member.revenue)} грн
          </p>
          <p className="text-xs text-slate-400">{member.eventsCount} подій</p>
        </div>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isTop ? "bg-amber-400" : "bg-blue-400"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
});


export default memo(function StaffFinanceView({
  myBalance,
  selectedCity,
}: Props) {
  const [tab, setTab] = useState<"balance" | "revenue">("balance");
  const [period, setPeriod] = useState("year");
  const [staffData, setStaffData] = useState<any>(null);
  const [loadingStaff, setLoadingStaff] = useState(false);

  useEffect(() => {
    if (tab !== "revenue") return;
    setLoadingStaff(true);
    const params = new URLSearchParams();
    if (period) params.set("period", period);
    if (selectedCity?.id) params.set("cityId", selectedCity.id);
    api
      .get(`/finance/staff-revenue?${params}`)
      .then((r) => setStaffData(r.data))
      .catch(() => {})
      .finally(() => setLoadingStaff(false));
  }, [tab, period, selectedCity?.id]);

  const maxRevenue = staffData?.staff?.[0]?.revenue ?? 1;

  const staffByRole = useMemo(() => {
    if (!staffData?.staff) return { hosts: [], drivers: [] };
    return {
      hosts: staffData.staff.filter((s: any) => s.role === "HOST"),
      drivers: staffData.staff.filter((s: any) => s.role === "DRIVER"),
    };
  }, [staffData]);

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Фінанси</h1>

      {/* Вкладки */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("balance")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
            tab === "balance"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          💰 Мій баланс
        </button>
        <button
          onClick={() => setTab("revenue")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
            tab === "revenue"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          📊 Виручка команди
        </button>
      </div>

      {tab === "balance" && <BalanceCard myBalance={myBalance} />}

      {tab === "revenue" && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none shadow-sm"
            >
              <option value="year">Цей рік</option>
              <option value="quarter">Цей квартал</option>
              <option value="month">Цей місяць</option>
              <option value="all">За весь час</option>
            </select>
            {selectedCity?.name && (
              <span className="text-sm text-slate-500">
                📍 {selectedCity.name}
              </span>
            )}
          </div>

          {loadingStaff ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : !staffData || staffData.staff.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center text-slate-400">
              <p className="text-3xl mb-3">📊</p>
              <p>Немає даних за обраний період</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
                  <p className="text-xs text-slate-400 mb-1">
                    Загальна виручка
                  </p>
                  <p className="text-2xl font-black text-blue-600">
                    {fmt(staffData.totalRevenue)}{" "}
                    <span className="text-sm font-medium text-slate-400">
                      грн
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {PERIOD_LABELS[period]}
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
                  <p className="text-xs text-slate-400 mb-1">Подій проведено</p>
                  <p className="text-2xl font-black text-slate-800">
                    {staffData.eventsCount}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {PERIOD_LABELS[period]}
                  </p>
                </div>
              </div>

              {(
                [
                  {
                    key: "HOST",
                    label: "🎙️ Ведучі",
                    members: staffByRole.hosts,
                  },
                  {
                    key: "DRIVER",
                    label: "🚗 Водії",
                    members: staffByRole.drivers,
                  },
                ] as const
              ).map(({ key, label, members }) => {
                if (members.length === 0) return null;
                return (
                  <div
                    key={key}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
                  >
                    <h3 className="font-bold text-slate-800 mb-4">{label}</h3>
                    <div className="flex flex-col gap-4">
                      {members.map((member: any, i: number) => (
                        <StaffMemberRow
                          key={member.id}
                          member={member}
                          index={i}
                          maxRevenue={maxRevenue}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
});
