import { createOpenRouter } from '@openrouter/ai-sdk-provider';

// Ініціалізуємо провайдер з явним ключем
const openrouter = createOpenRouter({
  apiKey: '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',
});

export default {
  web: {
    url: 'https://app.svitlo-znan.app',
  },
  ai: {
    model: openrouter('tencent/hy3:free'),
    visionModel: openrouter('google/gemma-4-31b-it:free'),
    agenticModel: openrouter('google/gemini-2.0-flash-001'),
  },
};