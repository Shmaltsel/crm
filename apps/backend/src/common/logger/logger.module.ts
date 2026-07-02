import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req, res) => {
          const existing = req.headers['x-request-id'] as string | undefined;
          const id = existing ?? randomUUID();
          res.setHeader('x-request-id', id);
          return id;
        },
        customProps: (req) => ({
          userId: (req as any).user?.sub ?? (req as any).user?.id ?? null,
        }),
        serializers: {
          req: (req) => ({ method: req.method, url: req.url }),
        },
        autoLogging: true,
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { singleLine: true } }
            : undefined,
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
