export const MESSAGES = {
  EVENT_NOT_FOUND: { uk: 'Подію не знайдено', en: 'Event not found' },
  SCHOOL_NOT_FOUND: { uk: 'Школу не знайдено', en: 'School not found' },
  CITY_NOT_FOUND: { uk: 'Місто не знайдено', en: 'City not found' },
  INVALID_CREDENTIALS: {
    uk: 'Невірний email або пароль',
    en: 'Invalid email or password',
  },
  INVALID_REFRESH_TOKEN: {
    uk: 'Недійсний refresh token',
    en: 'Invalid refresh token',
  },
  INTERNAL_ERROR: {
    uk: 'Внутрішня помилка сервера',
    en: 'Internal server error',
  },
  SERVICE_UNAVAILABLE: {
    uk: 'Сервіс тимчасово недоступний',
    en: 'Service temporarily unavailable',
  },
  USER_ID_REQUIRED: {
    uk: 'Ідентифікатор користувача обов’язковий',
    en: 'User ID is required',
  },
  INVALID_STAFF_USER: {
    uk: 'Невалідний користувач персоналу',
    en: 'Invalid staff user',
  },
  DAY_OFF_NOT_FOUND: {
    uk: 'Вихідний день не знайдено',
    en: 'Day off not found',
  },
  FORBIDDEN: {
    uk: 'Недостатньо прав',
    en: 'Forbidden',
  },
  CROSS_CITY_DAY_OFF: {
    uk: 'Можна призначати вихідні лише співробітникам свого міста',
    en: 'Can only manage day offs for own city staff',
  },
} as const;

export type MessageKey = keyof typeof MESSAGES;
