// apps/frontend/lighthouserc.cjs
module.exports = {
  ci: {
    collect: {
      url: [
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/cities",
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/schools",
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/events",
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/finance",
      ],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        formFactor: "desktop",
        throttlingMethod: "devtools",        // більш реалістичне тестування
        screenEmulation: { disabled: true },
        chromeFlags: "--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage",
      },
      // Додаємо важливі параметри для детальнішого аналізу
      skipAudits: ["redirects-http"],
    },

    upload: {
      target: "temporary-public-storage",
    },

    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["error", { minScore: 0.70 }],
        "categories:accessibility": ["warn", { minScore: 0.85 }],
        "categories:seo": ["warn", { minScore: 0.80 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 3500 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.25 }],
        "total-blocking-time": ["warn", { maxNumericValue: 600 }],
        "speed-index": ["warn", { maxNumericValue: 3500 }],
      }
    },

    // === НАЙВАЖЛИВІШЕ ДЛЯ ОПТИМІЗАЦІЇ ===
    options: {
      output: ["html", "json"],           // генеруємо HTML + JSON звіт
      // Додаємо більше деталей
      onlyCategories: ["performance", "accessibility", "seo", "best-practices"],
    }
  }
};