export type TelegramTemplateType =
  | 'REPORT_SUBMITTED'
  | 'REPORT_APPROVED'
  | 'REPORT_REVISION'
  | 'DAY_OFF_REQUEST_CREATED'
  | 'ISSUE_CREATED';

type TemplateFn = (p: Record<string, unknown>) => string;

const CRM_LINK = 'https://app.svitlo-znan.app';

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
  REPORT_SUBMITTED: (p) =>
    `🚨 <b>Новий звіт потребує затвердження</b>\n\n` +
    `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}\n` +
    `📅 <b>Дата:</b> ${fmtDate(p.eventDate)}\n` +
    `📌 <b>Проєкт:</b> ${p.project ?? '—'}\n\n` +
    `<i>Перевірити: <a href="${CRM_LINK}">CRM</a></i>`,

  REPORT_APPROVED: (p) =>
    `✅ <b>Звіт затверджено</b>\n\n` +
    `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}\n` +
    `📅 <b>Дата:</b> ${fmtDate(p.eventDate)}`,

  REPORT_REVISION: (p) => {
    const reason = p.reason
      ? `\n💬 <b>Причина:</b> ${p.reason}`
      : '';
    return (
      `📝 <b>Звіт потребує доопрацювання</b>\n\n` +
      `🏫 <b>Школа:</b> ${p.schoolName ?? '—'}` +
      reason +
      `\n\n<i>Перевірити: <a href="${CRM_LINK}">CRM</a></i>`
    );
  },

  DAY_OFF_REQUEST_CREATED: (p) =>
    `🏖️ <b>Новий запит на вихідний</b>\n\n` +
    `👤 <b>Співробітник:</b> ${p.staffName ?? '—'}\n` +
    `📅 <b>Дата:</b> ${fmtDate(p.date)}`,

  ISSUE_CREATED: (p) => {
    const deadline = p.deadline
      ? `\n⏰ <b>Дедлайн:</b> ${fmtDate(p.deadline)}`
      : '';
    const assignee = p.assigneeName
      ? `\n👤 <b>Відповідальний:</b> ${p.assigneeName}`
      : '';
    return (
      `🚨 <b>Нова проблема</b>\n\n` +
      `🏫 <b>Заклад:</b> ${p.schoolName ?? '—'}\n` +
      `📅 <b>Подія:</b> ${p.eventName ?? '—'}\n\n` +
      `💬 <b>Повідомлення:</b>\n${p.message ?? ''}` +
      deadline +
      assignee +
      `\n\n<i>Деталі: <a href="${CRM_LINK}">CRM</a></i>`
    );
  },
};

export function getTelegramTemplate(
  type: TelegramTemplateType,
): TemplateFn | null {
  return templates[type] ?? null;
}
