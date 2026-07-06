import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../common/cache/redis-cache.module';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

@Module({
  imports: [RedisCacheModule],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
