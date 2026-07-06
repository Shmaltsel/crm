import './instrument';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(PinoLogger));
  app.use(helmet());
  app.use(cookieParser());

  const allowedOrigins = (process.env.FRONTEND_URL ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(app.get(AllExceptionsFilter));

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('CRM «Світло Знань» API')
      .setDescription(
        'Система управління освітніми заходами у школах та садочках',
      )
      .setVersion('1.0')
      .addCookieAuth('access_token')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.getHttpAdapter().get('/docs-json', (req, res) => res.json(document));
    app.getHttpAdapter().get('/docs/redoc', (req, res) => {
      res.type('html').send(`<!DOCTYPE html>
<html><head><title>CRM API Docs</title>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>body{margin:0;padding:0}</style></head>
<body><redoc spec-url="/docs-json"></redoc>
<script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script>
</body></html>`);
    });
  }

  app.enableShutdownHooks();
  const logger = new Logger('Bootstrap');

  process.on('SIGTERM', async () => {
    logger.log('Отримано SIGTERM, завершення роботи...');
    const prisma = app.get(PrismaService);
    await prisma.$disconnect();
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    logger.log('Отримано SIGINT, завершення роботи...');
    const prisma = app.get(PrismaService);
    await prisma.$disconnect();
    await app.close();
    process.exit(0);
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
