import { Module, forwardRef } from '@nestjs/common'; // Додано forwardRef
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TelegramModule } from '../telegram/telegram.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  // Обгортаємо TelegramModule у forwardRef
  imports: [forwardRef(() => TelegramModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
