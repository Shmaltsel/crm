import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { api } from "../config/api";
import AddressLink from "../components/AddressLink";

export default function EventReport() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvent(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [eventId]);

  if (isLoading)
    return <div className="p-8 text-slate-500">Завантаження...</div>;
  if (!event)
    return <div className="p-8 text-slate-500">Подію не знайдено</div>;

  const report = event.report;
  const crew = event.crew;
  const fmt = (n: number) =>
    new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-xs sm:text-sm text-slate-500 mb-4 flex items-center gap-1 flex-wrap">
        <Link to="/cities" className="hover:text-blue-600">
          Міста
        </Link>
        <span>›</span>
        <Link to={`/cities/${event.cityId}`} className="hover:text-blue-600">
          {event.city?.name}
        </Link>
        <span>›</span>
        <span>Події</span>
        <span>›</span>
        <span className="text-slate-800 font-medium">Звіт по події</span>
      </div>

      <button
        onClick={() => history.back()}
        className="mb-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
      >
        ← Назад
      </button>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          Звіт по події
        </h1>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          Проведено
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Інформація */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
          <h3 className="font-bold text-slate-800 mb-4">Інформація</h3>
          <div className="space-y-2 text-sm">
            <Row label="Заклад" value={event.school?.name} />
            <Row
              label="Адреса"
              value={<AddressLink address={event.address} />}
            />
            <Row
              label="Дата"
              value={new Date(event.date).toLocaleDateString("uk-UA")}
            />
            <Row label="Час" value={event.time} />
            <Row label="Проєкт" value={event.project} />
            <Row label="Екіпаж" value={crew?.name} />
            <Row label="Ведучий" value={crew?.host?.name} />
            <Row label="Водій" value={crew?.driver?.name} />
          </div>
        </div>

        {/* Результат */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
          <h3 className="font-bold text-slate-800 mb-4">Результат</h3>
          <div className="space-y-2 text-sm">
            <Row label="Заплановано дітей" value={event.childrenPlanned} />
            <Row label="Фактично дітей" value={report?.childrenCount} />
            <Row label="Вартість" value={`${fmt(event.price)} грн`} />
            <Row label="Отримано" value={`${fmt(report?.totalSum)} грн`} />
            <Row label="Спосіб оплати" value={event.paymentMethod} />
          </div>
        </div>

        {/* Оцінка */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
          <h3 className="font-bold text-slate-800 mb-4">Оцінка</h3>
          <div className="space-y-2 text-sm">
            <Row
              label="Директор задоволений"
              value={report?.directorSatisfied ? "Так" : "Ні"}
            />
            <Row
              label="Вчителі задоволені"
              value={report?.teachersSatisfied ? "Так" : "Ні"}
            />
            <Row label="Проблеми" value={report?.hadIssues ? "Так" : "Ні"} />
            {report?.comment && (
              <div className="pt-2">
                <p className="text-slate-400 mb-1">Коментар:</p>
                <p className="text-slate-700 italic">"{report.comment}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}:</span>
      <span className="font-medium text-slate-800">{value || "—"}</span>
    </div>
  );
}
