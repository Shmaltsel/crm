export type TelegramTemplateType =
  | 'REPORT_SUBMITTED'
  | 'REPORT_APPROVED'
  | 'REPORT_REVISION'
  | 'REPORT_APPROVED_CREW'
  | 'DAY_OFF_REQUEST_CREATED'
  | 'DAY_OFF_APPROVED'
  | 'DAY_OFF_REJECTED'
  | 'DAY_OFF_ASSIGNED'
  | 'DAY_OFF_CANCELLED'
  | 'ISSUE_CREATED'
  | 'EVENT_CANCELLED'
  | 'EVENT_CREATED'
  | 'EVENT_RESCHEDULED'
  | 'EVENT_REMINDER'
  | 'CREW_ASSIGNED'
  | 'DAILY_DIGEST'
  | 'SALARY_PAID'
  | 'SALARY_LARGE_PAYOUT'
  | 'LOW_STOCK'
  | 'WELCOME_ONBOARDING'
  | 'ERROR_ALERT_5XX';

type TemplateFn = (p: Record<string, unknown>) => string;

export const CRM_LINK = 'https://app.svitlo-znan.app';

export function buildLink(path?: string): string {
  return path ? `${CRM_LINK}${path}` : CRM_LINK;
}

function fmtDate(val: unknown): string {
  if (!val) return '—';
  try {
    return new Date(val as string).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return String(val);
  }
}

const templates: Record<TelegramTemplateType, TemplateFn> = {
  REPORT_SUBMITTED: (p) => {
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : '/reports/review',
    );
    return (
      `🚨 <b>Новий звіт потребує затвердження</b>\n\n` +
      `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}\n` +
      `📅 <b>Дата:</b> ${fmtDate(p.eventDate)}\n` +
      `📌 <b>Проєкт:</b> ${p.project ?? '—'}\n\n` +
      `<i>Звіт: <a href="${link}">CRM</a></i>`
    );
  },

  REPORT_APPROVED: (p) =>
    `✅ <b>Звіт затверджено</b>\n\n` +
    `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}\n` +
    `📅 <b>Дата:</b> ${fmtDate(p.eventDate)}`,

  REPORT_REVISION: (p) => {
    const reason = p.reason ? `\n💬 <b>Причина:</b> ${p.reason}` : '';
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : '/reports/review',
    );
    return (
      `📝 <b>Звіт потребує доопрацювання</b>\n\n` +
      `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}` +
      reason +
      `\n\n<i>Звіт: <a href="${link}">CRM</a></i>`
    );
  },

  REPORT_APPROVED_CREW: (p) => {
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : undefined,
    );
    return (
      `✅ <b>Звіт затверджено</b>\n\n` +
      `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}\n\n` +
      `Очікуйте виплату.\n\n` +
      `<i>Звіт: <a href="${link}">CRM</a></i>`
    );
  },

  DAY_OFF_REQUEST_CREATED: (p) => {
    const reason = p.reason ? `\n📝 <b>Причина:</b> ${p.reason}` : '';
    return (
      `🏖️ <b>Запит на вихідний</b>\n\n` +
      `👤 <b>Співробітник:</b> ${p.staffName ?? '—'}\n` +
      `📅 <b>Дата:</b> ${fmtDate(p.date)}` +
      reason
    );
  },

  DAY_OFF_APPROVED: (p) =>
    `✅ <b>Запит на вихідний затверджено</b>\n\n` +
    `👤 <b>Співробітник:</b> ${p.staffName ?? '—'}\n` +
    `📅 <b>Дата:</b> ${fmtDate(p.date)}`,

  DAY_OFF_REJECTED: (p) => {
    const reason = p.reason ? `\n💬 <b>Коментар:</b> ${p.reason}` : '';
    return (
      `❌ <b>Запит на вихідний відхилено</b>\n\n` +
      `👤 <b>Співробітник:</b> ${p.staffName ?? '—'}\n` +
      `📅 <b>Дата:</b> ${fmtDate(p.date)}` +
      reason
    );
  },

  DAY_OFF_ASSIGNED: (p) =>
    `🌴 <b>Призначено вихідний</b>\n\n` +
    `👤 <b>Співробітник:</b> ${p.staffName ?? '—'}\n` +
    `📅 <b>Дата:</b> ${fmtDate(p.date)}\n\n` +
    `<i>Календар: <a href="${buildLink('/calendar')}">CRM</a></i>`,

  DAY_OFF_CANCELLED: (p) =>
    `❌ <b>Скасовано вихідний</b>\n\n` +
    `👤 <b>Співробітник:</b> ${p.staffName ?? '—'}\n` +
    `📅 <b>Дата:</b> ${fmtDate(p.date)}\n\n` +
    `<i>Календар: <a href="${buildLink('/calendar')}">CRM</a></i>`,

  ISSUE_CREATED: (p) => {
    const deadline = p.deadline
      ? `\n⏰ <b>Дедлайн:</b> ${fmtDate(p.deadline)}`
      : '';
    const assignee = p.assigneeName
      ? `\n👤 <b>Відповідальний:</b> ${p.assigneeName}`
      : '';
    const crew = p.crew ? `\n\n👥 <b>Екіпаж:</b>\n${p.crew}` : '';
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : undefined,
    );
    return (
      `🚨 <b>Нова проблема</b>\n\n` +
      `🏫 <b>Заклад:</b> ${p.schoolName ?? '—'}\n` +
      `📅 <b>Подія:</b> ${p.eventName ?? '—'}\n\n` +
      `💬 <b>Повідомлення:</b>\n${p.message ?? ''}` +
      deadline +
      assignee +
      crew +
      `\n\n<i>Деталі: <a href="${link}">CRM</a></i>`
    );
  },

  EVENT_CANCELLED: (p) => {
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : undefined,
    );
    return (
      `❌ <b>Подію скасовано</b>\n\n` +
      `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}\n` +
      `📅 <b>Дата:</b> ${fmtDate(p.eventDate)}\n` +
      `📌 <b>Проєкт:</b> ${p.project ?? '—'}\n\n` +
      `<i>Деталі: <a href="${link}">CRM</a></i>`
    );
  },

  EVENT_CREATED: (p) => {
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : undefined,
    );
    return (
      `📅 <b>Нова подія</b>\n\n` +
      `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}\n` +
      `📅 <b>Дата:</b> ${fmtDate(p.eventDate)}\n` +
      `📌 <b>Проєкт:</b> ${p.project ?? '—'}\n\n` +
      `<i>Деталі: <a href="${link}">CRM</a></i>`
    );
  },

  EVENT_RESCHEDULED: (p) => {
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : undefined,
    );
    return (
      `📅 <b>Подію перенесено</b>\n\n` +
      `🏫 <b>Заклад:</b> ${p.schoolName ?? '—'}\n` +
      `📌 <b>Проєкт:</b> ${p.project ?? '—'}\n` +
      `📅 <b>Нова дата:</b> ${p.newDate ?? '—'} о ${p.newTime ?? '—'}\n` +
      (p.cityName ? `📍 <b>Місто:</b> ${p.cityName}\n` : '') +
      (p.address ? `🗺 <b>Адреса:</b> ${p.address}\n` : '') +
      `\n<i>Деталі: <a href="${link}">CRM</a></i>`
    );
  },

  EVENT_REMINDER: (p) => {
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : undefined,
    );
    return (
      `🔔 <b>Нагадування про подію</b>\n\n` +
      `👤 <b>Роль:</b> ${p.role ?? '—'}\n` +
      `📅 <b>Дата:</b> завтра\n` +
      `🏫 <b>Заклад:</b> ${p.schoolName ?? '—'}\n` +
      `📌 <b>Проєкт:</b> ${p.project ?? '—'}\n` +
      (p.contactPhone ? `📞 <b>Контакт:</b> ${p.contactPhone}\n` : '') +
      `\n<i>Деталі: <a href="${link}">CRM</a></i>`
    );
  },

  CREW_ASSIGNED: (p) => {
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : undefined,
    );
    return (
      `🎯 <b>Вас призначено на подію</b>\n\n` +
      `👤 <b>Роль:</b> ${p.role ?? '—'}\n` +
      `📅 <b>Дата:</b> ${p.eventDate ?? '—'}\n` +
      `🏫 <b>Заклад:</b> ${p.schoolName ?? '—'}\n` +
      `📍 <b>Місто:</b> ${p.cityName ?? '—'}\n` +
      `📌 <b>Проєкт:</b> ${p.project ?? '—'}\n` +
      (p.address ? `🗺 <b>Адреса:</b> ${p.address}\n` : '') +
      (p.contactPerson
        ? `👤 <b>Контакт:</b> ${p.contactPerson}\n`
        : '') +
      (p.contactPhone ? `📞 <b>Телефон:</b> ${p.contactPhone}\n` : '') +
      `\n<i>Деталі: <a href="${link}">CRM</a></i>`
    );
  },

  DAILY_DIGEST: (p) =>
    `📊 <b>Щоденний підсумок</b>\n\n` +
    `📅 Подій на завтра: <b>${p.tomorrowEvents ?? 0}</b>\n` +
    `📋 Незатверджених звітів: <b>${p.pendingReports ?? 0}</b>\n` +
    `🌴 Очікують вихідних: <b>${p.pendingDaysOff ?? 0}</b>`,

  SALARY_PAID: (p) =>
    `💰 <b>Нараховано зарплату</b>\n\n` +
    `💵 <b>Сума:</b> ${p.amount ?? 0} ₴`,

  SALARY_LARGE_PAYOUT: (p) =>
    `⚠️ <b>Велика виплата: ${p.amount ?? 0} ₴</b>\n\n` +
    `👤 <b>Працівник:</b> ${p.employeeName ?? '—'}\n` +
    `👤 <b>Менеджер:</b> ${p.managerName ?? '—'}`,

  LOW_STOCK: (p) =>
    `⚠️ <b>Низький залишок на складі</b>\n\n` +
    `📦 <b>Товар:</b> ${p.itemName ?? '—'}\n` +
    `📊 <b>Залишок:</b> ${p.currentStock ?? 0} ${p.unit ?? 'шт'}\n` +
    `📉 <b>Мінімум:</b> ${p.minStock ?? 0} ${p.unit ?? 'шт'}\n` +
    (p.cityName ? `🏙️ <b>Місто:</b> ${p.cityName}\n` : '') +
    `\n<i>Склад: <a href="${CRM_LINK}">CRM</a></i>`,

  WELCOME_ONBOARDING: (p) =>
    `👋 <b>Вітаємо у Світло Знань CRM!</b>\n\n` +
    `Ваш акаунт створено.\n\n` +
    `📧 <b>Логін:</b> <code>${p.email ?? '—'}</code>\n\n` +
    `Увійдіть за посиланням: <a href="${CRM_LINK}">${CRM_LINK}</a>\n\n` +
    `<i>Пароль було надіслано окремо. Змініть його після першого входу.</i>`,

  ERROR_ALERT_5XX: (p) =>
    `🚨 <b>CRM «Світло Знань» — ${p.count ?? 0} помилок 5xx за останні 5 хв</b>\n\n` +
    `Перевірте логи та стан сервісів.`,
};

export function getTelegramTemplate(
  type: TelegramTemplateType,
): TemplateFn | null {
  return templates[type] ?? null;
}
