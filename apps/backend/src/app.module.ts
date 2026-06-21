import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { CitiesModule } from './cities/cities.module';
import { SchoolsModule } from './schools/schools.module';
import { FinanceModule } from './finance/finance.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    EventsModule,
    CitiesModule,
    SchoolsModule,
    FinanceModule,
    FinanceModule,
    TelegramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
