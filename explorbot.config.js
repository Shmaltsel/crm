import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
  apiKey: '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',
});

export default {
  web: {
    url: 'https://app.svitlo-znan.app',
    headless: true,           // або false, якщо хочеш бачити браузер
  },

  ai: {
    model: openrouter('tencent/hy3:free'),
    visionModel: openrouter('google/gemma-4-31b-it:free'),
    agenticModel: openrouter('google/gemini-2.0-flash-001'),
  },

  // === НАЛАШТУВАННЯ АВТОЛОГІНУ ===
 auth: {
    enabled: true,
    loginUrl: '/login',
    emailSelector: '#login-email',    // змінено з input[type="email"]
    passwordSelector: '#login-password', // змінено з input[type="password"]
    submitSelector: 'button[type="submit"]',
    email: 'admin@crm.com',
    password: '123!PASSWORD!321',
  },

  // Додаткові параметри
  timeouts: {
    pageLoad: 15000,
    action: 10000,
  },

  // Початкова сторінка після логіну
  startUrl: '/dashboard',
};