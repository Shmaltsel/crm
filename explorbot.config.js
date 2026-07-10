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
    // Використовуємо модель, яка стабільно доступна безкоштовно
    model: openrouter('qwen/qwen-2.5-7b-instruct'),
    visionModel: openrouter('qwen/qwen-2.5-7b-instruct'),
    agenticModel: openrouter('qwen/qwen-2.5-7b-instruct'),
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