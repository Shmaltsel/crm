import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";

import { useEventFull } from "../hooks/useSchoolProfile";
import AddressLink from "../components/AddressLink";
import { formatCurrency } from "../utils/formatCurrency";

export default function EventReport() {
  const { eventId } = useParams();
  const { data: event, isLoading, isError } = useEventFull(eventId);

  if (isLoading)
    return <div className="p-8 text-content-muted">Завантаження...</div>;
  if (isError || !event)
    return <div className="p-8 text-content-muted">Подію не знайдено</div>;

  const report = event.report;
  const crew = event.crew;
  const fmt = formatCurrency;

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      {/* Breadcrumb */}
      <div className="text-xs sm:text-sm text-content-muted mb-4 flex items-center gap-1 flex-wrap">
        <Link to="/cities" className="hover:text-brand">
          Міста
        </Link>
        <span>›</span>
        <Link to={`/cities/${event.cityId}`} className="hover:text-brand">
          {event.city?.name}
        </Link>
        <span>›</span>
        <span>Події</span>
        <span>›</span>
        <span className="text-content-primary font-medium">Звіт по події</span>
      </div>

      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-2.5 bg-surface border border-border-strong rounded-lg text-sm text-content-secondary hover:bg-surface-subtle flex items-center gap-2"
      >
        ← Назад
      </button>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h1 className="text-xl sm:text-2xl font-bold text-content-primary">
          Звіт по події
        </h1>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          Проведено
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Інформація */}
        <div className="bg-surface rounded-card border border-border shadow-card p-4 sm:p-6">
          <h3 className="font-bold text-content-primary mb-4">Інформація</h3>
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
        <div className="bg-surface rounded-card border border-border shadow-card p-4 sm:p-6">
          <h3 className="font-bold text-content-primary mb-4">Результат</h3>
          <div className="space-y-2 text-sm">
            <Row label="Заплановано дітей" value={event.childrenPlanned} />
            <Row label="Фактично дітей" value={report?.childrenCount} />
            <Row label="Вартість" value={`${fmt(event.price)} грн`} />
            <Row label="Отримано" value={`${fmt(report?.totalSum)} грн`} />
            <Row label="Спосіб оплати" value={event.paymentMethod} />
          </div>
        </div>

        {/* Оцінка */}
        <div className="bg-surface rounded-card border border-border shadow-card p-4 sm:p-6">
          <h3 className="font-bold text-content-primary mb-4">Оцінка</h3>
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
                <p className="text-content-muted mb-1">Коментар:</p>
                <p className="text-content-secondary italic">"{report.comment}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="text-content-muted">{label}:</span>
      <span className="font-medium text-content-primary">{value ?? "—"}</span>
    </div>
  );
}
