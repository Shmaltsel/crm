import { Module } from '@nestjs/common';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';
import { SalaryPayoutService } from './salary-payout.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [SalaryController],
  providers: [SalaryService, SalaryPayoutService],
  exports: [SalaryService, SalaryPayoutService],
})
export class SalaryModule {}
