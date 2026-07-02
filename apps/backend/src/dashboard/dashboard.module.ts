import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../common/cache/redis-cache.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule, RedisCacheModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
