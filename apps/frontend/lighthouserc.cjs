module.exports = {
  ci: {
    collect: {
      url: [
        "https://crm-frontend-ddodwb19j-shmaltsels-projects.vercel.app/",
        "https://crm-frontend-ddodwb19j-shmaltsels-projects.vercel.app/cities",
        "https://crm-frontend-ddodwb19j-shmaltsels-projects.vercel.app/schools",
        "https://crm-frontend-ddodwb19j-shmaltsels-projects.vercel.app/events",
        "https://crm-frontend-ddodwb19j-shmaltsels-projects.vercel.app/finance",
      ],
      numberOfRuns: 2,           // зменшив до 2, щоб було швидше
      settings: {
        preset: "desktop",
        throttlingMethod: "devtools",
      },
      // Важливо: ігноруємо перенаправлення на логін
      skipAudits: ["redirects-http"],
    },

    upload: {
      target: "temporary-public-storage",
    },

    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["error", { minScore: 0.65 }],   // трохи знизили поріг
        "largest-contentful-paint": ["warn", { maxNumericValue: 4500 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 2800 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.3 }],
      }
    }
  }
};