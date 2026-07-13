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
      `🚨 <b>Новий звіт потребує затвердження</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}\n` +
      `📅 <b>Дата події:</b> ${fmtDate(p.eventDate)}\n` +
      `📌 <b>Проєкт:</b> <i>${p.project ?? '—'}</i>\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📋 Переглянути та затвердити звіт</a>`
    );
  },

  REPORT_APPROVED: (p) => {
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : undefined,
    );
    return (
      `✅ <b>Звіт затверджено</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Вітаємо! Ваш звіт успішно перевірено та прийнято.\n\n` +
      `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}\n` +
      `📅 <b>Дата події:</b> ${fmtDate(p.eventDate)}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📋 Переглянути деталі звіту</a>`
    );
  },

  REPORT_REVISION: (p) => {
    const reason = p.reason
      ? `\n\n💬 <b>Коментар:</b>\n<i>${p.reason}</i>`
      : '';
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : '/reports/review',
    );
    return (
      `📝 <b>Звіт потребує доопрацювання</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Будь ласка, внесіть необхідні корективи та подайте звіт знову.\n\n` +
      `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}` +
      reason +
      `\n\n━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">✏️ Редагувати та перездати звіт</a>`
    );
  },

  REPORT_APPROVED_CREW: (p) => {
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : undefined,
    );
    return (
      `✅ <b>Звіт затверджено</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Дякуємо за вашу працю! Звіт прийнято.\n\n` +
      `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}\n\n` +
      `💰 <b>Виплата:</b> Очікуйте зарахування найближчим часом.\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📋 Переглянути деталі звіту</a>`
    );
  },

  DAY_OFF_REQUEST_CREATED: (p) => {
    const reason = p.reason ? `\n\n💬 <b>Причина:</b>\n<i>${p.reason}</i>` : '';
    const link = buildLink('/employees?tab=days-off');
    return (
      `🏖️ <b>Новий запит на вихідний</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 <b>Співробітник:</b> ${p.staffName ?? '—'}\n` +
      `📅 <b>Дата:</b> ${fmtDate(p.date)}` +
      reason +
      `\n\n━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📋 Переглянути та розглянути запит</a>`
    );
  },

  DAY_OFF_APPROVED: (p) => {
    const link = buildLink('/calendar');
    return (
      `✅ <b>Запит на вихідний затверджено</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Ваш запит схвалено! Гарного відпочинку.\n\n` +
      `👤 <b>Співробітник:</b> ${p.staffName ?? '—'}\n` +
      `📅 <b>Дата вихідного:</b> ${fmtDate(p.date)}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📅 Переглянути в календарі</a>`
    );
  },

  DAY_OFF_REJECTED: (p) => {
    const reason = p.reason
      ? `\n\n💬 <b>Коментар:</b>\n<i>${p.reason}</i>`
      : '';
    const link = buildLink('/employees?tab=days-off');
    return (
      `❌ <b>Запит на вихідний відхилено</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `На жаль, ваш запит не може бути задоволений.\n\n` +
      `👤 <b>Співробітник:</b> ${p.staffName ?? '—'}\n` +
      `📅 <b>Запитувана дата:</b> ${fmtDate(p.date)}` +
      reason +
      `\n\n━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📋 Переглянути деталі в CRM</a>`
    );
  },

  DAY_OFF_ASSIGNED: (p) => {
    const link = buildLink('/calendar');
    return (
      `🌴 <b>Призначено вихідний</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Вам призначено день відпочинку.\n\n` +
      `👤 <b>Співробітник:</b> ${p.staffName ?? '—'}\n` +
      `📅 <b>Дата вихідного:</b> ${fmtDate(p.date)}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📅 Переглянути в календарі</a>`
    );
  },

  DAY_OFF_CANCELLED: (p) => {
    const link = buildLink('/calendar');
    return (
      `❌ <b>Вихідний скасовано</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Вихідний день було скасовано.\n\n` +
      `👤 <b>Співробітник:</b> ${p.staffName ?? '—'}\n` +
      `📅 <b>Дата:</b> ${fmtDate(p.date)}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📅 Переглянути актуальний календар</a>`
    );
  },

  ISSUE_CREATED: (p) => {
    const deadline = p.deadline
      ? `\n⏰ <b>Дедлайн:</b> ${fmtDate(p.deadline)}`
      : '';
    const assignee = p.assigneeName
      ? `\n👤 <b>Відповідальний:</b> ${p.assigneeName}`
      : '';
    const crew = p.crew ? `\n\n👥 <b>Екіпаж:</b>\n${p.crew}` : '';
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : '/issues',
    );
    return (
      `🚨 <b>Створено нову проблему</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `🏫 <b>Заклад:</b> ${p.schoolName ?? '—'}\n` +
      `📅 <b>Подія:</b> ${p.eventName ?? '—'}\n\n` +
      `💬 <b>Опис проблеми:</b>\n<i>${p.message ?? 'Немає опису'}</i>` +
      deadline +
      assignee +
      crew +
      `\n\n━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">🔧 Переглянути та вирішити проблему</a>`
    );
  },

  EVENT_CANCELLED: (p) => {
    const link = buildLink(p.eventId ? `/schools/${p.schoolId}` : '/events');
    return (
      `❌ <b>Подію скасовано</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Інформуємо про скасування запланованої події.\n\n` +
      `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}\n` +
      `📅 <b>Дата:</b> ${fmtDate(p.eventDate)}\n` +
      `📌 <b>Проєкт:</b> <i>${p.project ?? '—'}</i>\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📋 Переглянути деталі в CRM</a>`
    );
  },

  EVENT_CREATED: (p) => {
    const link = buildLink(p.schoolId ? `/schools/${p.schoolId}` : '/events');
    return (
      `📅 <b>Створено нову подію</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `У системі зареєстровано нову подію.\n\n` +
      `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}\n` +
      `📅 <b>Дата проведення:</b> ${fmtDate(p.eventDate)}\n` +
      `📌 <b>Проєкт:</b> <i>${p.project ?? '—'}</i>\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📋 Переглянути деталі події</a>`
    );
  },

  EVENT_RESCHEDULED: (p) => {
    const link = buildLink(p.schoolId ? `/schools/${p.schoolId}` : '/calendar');
    return (
      `📅 <b>Подію перенесено</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Увага! Змінено дату та/або час проведення події.\n\n` +
      `🏫 <b>Заклад:</b> ${p.schoolName ?? '—'}\n` +
      `📌 <b>Проєкт:</b> <i>${p.project ?? '—'}</i>\n\n` +
      `📅 <b>Нова дата:</b> ${p.newDate ?? '—'}\n` +
      `🕐 <b>Час:</b> ${p.newTime ?? '—'}\n` +
      (p.cityName ? `📍 <b>Місто:</b> ${p.cityName}\n` : '') +
      (p.address ? `🗺 <b>Адреса:</b> <code>${p.address}</code>\n` : '') +
      `\n━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📋 Переглянути оновлений розклад</a>`
    );
  },

  EVENT_REMINDER: (p) => {
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : '/calendar',
    );
    return (
      `🔔 <b>Нагадування: подія завтра!</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Не забудьте підготуватися до завтрашньої події.\n\n` +
      `👤 <b>Ваша роль:</b> <i>${p.role ?? '—'}</i>\n` +
      `🏫 <b>Заклад:</b> ${p.schoolName ?? '—'}\n` +
      `📌 <b>Проєкт:</b> <i>${p.project ?? '—'}</i>\n` +
      (p.contactPhone
        ? `\n📞 <b>Контакт закладу:</b> <code>${p.contactPhone}</code>\n`
        : '\n') +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📋 Переглянути всі деталі події</a>`
    );
  },

  CREW_ASSIGNED: (p) => {
    const link = buildLink(
      p.eventId ? `/events/${p.eventId}/report` : '/calendar',
    );
    return (
      `🎯 <b>Вас призначено на подію</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 <b>Ваша роль:</b> <i>${p.role ?? '—'}</i>\n` +
      `📅 <b>Дата проведення:</b> ${p.eventDate ?? '—'}\n\n` +
      `🏫 <b>Заклад:</b> ${p.schoolName ?? '—'}\n` +
      `📍 <b>Місто:</b> ${p.cityName ?? '—'}\n` +
      `📌 <b>Проєкт:</b> <i>${p.project ?? '—'}</i>\n` +
      (p.address ? `\n🗺 <b>Адреса:</b>\n<code>${p.address}</code>\n` : '') +
      (p.contactPerson
        ? `\n👤 <b>Контактна особа:</b> ${p.contactPerson}`
        : '') +
      (p.contactPhone
        ? `\n📞 <b>Телефон:</b> <code>${p.contactPhone}</code>`
        : '') +
      `\n\n━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📋 Детальна інформація про подію</a>`
    );
  },

  DAILY_DIGEST: (p) => {
    const link = buildLink('/dashboard');
    return (
      `📊 <b>Щоденний підсумок</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Ось короткий огляд актуальних справ:\n\n` +
      `📅 <b>Подій завтра:</b> ${p.tomorrowEvents ?? 0}\n` +
      `📋 <b>Незатверджених звітів:</b> ${p.pendingReports ?? 0}\n` +
      `🌴 <b>Запитів на вихідні:</b> ${p.pendingDaysOff ?? 0}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📊 Відкрити повний дашборд</a>`
    );
  },

  SALARY_PAID: (p) => {
    const link = buildLink('/employees?tab=salary');
    return (
      `💰 <b>Зарплату нараховано</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Ваша винагорода успішно зараховано!\n\n` +
      `💵 <b>Сума виплати:</b> <code>${p.amount ?? 0} ₴</code>\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">💼 Переглянути історію виплат</a>`
    );
  },

  SALARY_LARGE_PAYOUT: (p) => {
    const link = buildLink('/finance');
    return (
      `⚠️ <b>Велика виплата зарплати</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Увага! Виявлено виплату, що перевищує стандартні межі.\n\n` +
      `💵 <b>Сума:</b> <code>${p.amount ?? 0} ₴</code>\n` +
      `👤 <b>Працівник:</b> ${p.employeeName ?? '—'}\n` +
      `👤 <b>Затверджено:</b> ${p.managerName ?? '—'}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">💼 Переглянути фінансові деталі</a>`
    );
  },

  LOW_STOCK: (p) => {
    const link = buildLink('/inventory');
    return (
      `⚠️ <b>Низький залишок на складі</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Увага! Товар на складі майже закінчився.\n\n` +
      `📦 <b>Товар:</b> ${p.itemName ?? '—'}\n` +
      `📊 <b>Поточний залишок:</b> <code>${p.currentStock ?? 0} ${p.unit ?? 'шт'}</code>\n` +
      `📉 <b>Мінімальний рівень:</b> <code>${p.minStock ?? 0} ${p.unit ?? 'шт'}</code>\n` +
      (p.cityName ? `🏙️ <b>Місто:</b> ${p.cityName}\n` : '') +
      `\n━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">📦 Керувати складськими залишками</a>`
    );
  },

  WELCOME_ONBOARDING: (p) =>
    `👋 <b>Вітаємо у Світло Знань CRM!</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n` +
    `Ваш обліковий запис успішно створено.\n\n` +
    `📧 <b>Ваш логін:</b>\n<code>${p.email ?? '—'}</code>\n\n` +
    `🔐 <i>Пароль надіслано окремо. Обов'язково змініть його після першого входу для безпеки.</i>\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `<a href="${CRM_LINK}">🚀 Увійти до системи</a>`,

  ERROR_ALERT_5XX: (p) => {
    const link = buildLink('/dashboard');
    return (
      `🚨 <b>Критична помилка CRM</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `⚠️ Виявлено <b>${p.count ?? 0} помилок 5xx</b> за останні 5 хвилин!\n\n` +
      `Необхідно терміново перевірити:\n` +
      `• Логи сервера\n` +
      `• Стан сервісів\n` +
      `• Доступність бази даних\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<a href="${link}">🔧 Перейти до панелі управління</a>`
    );
  },
};

export function getTelegramTemplate(
  type: TelegramTemplateType,
): TemplateFn | null {
  return templates[type] ?? null;
}
