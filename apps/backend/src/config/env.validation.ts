import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().uri().required(),
  DIRECT_URL: Joi.string().uri().optional(),
  FRONTEND_URL: Joi.string().required(),
  TELEGRAM_BOT_TOKEN: Joi.string().required(),
  JWT_SECRET: Joi.string()
    .min(16)
    .when('NODE_ENV', {
      is: 'production',
      then: Joi.required(),
      otherwise: Joi.optional().default('super-secret-key-for-dev'),
    }),
  SEED_ADMIN_EMAIL: Joi.string().email().optional(),
  SEED_ADMIN_PASSWORD: Joi.string().optional(),
});
