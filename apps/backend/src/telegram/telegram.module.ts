import { Module, forwardRef } from '@nestjs/common'; // Додано forwardRef
import { TelegramService } from './telegram.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module'; // Додано імпорт UsersModule

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UsersModule), // Додаємо UsersModule через forwardRef
  ],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
