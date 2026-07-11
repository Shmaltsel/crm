import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
  sendDefaultPii: false,
  beforeSend(event) {
    if (event.request?.data && typeof event.request.data === 'object') {
      const redact = (obj: Record<string, unknown>) => {
        for (const key of Object.keys(obj)) {
          if (/phone|director|contact|name|email|password/i.test(key)) {
            obj[key] = '[REDACTED]';
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            redact(obj[key] as Record<string, unknown>);
          }
        }
      };
      redact(event.request.data as Record<string, unknown>);
    }
    return event;
  },
});
