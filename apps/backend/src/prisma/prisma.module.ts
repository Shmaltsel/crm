import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OwnershipGuard } from '../auth/guards/ownership.guard';

@Global()
@Module({
  providers: [PrismaService, OwnershipGuard],
  exports: [PrismaService, OwnershipGuard],
})
export class PrismaModule {}
