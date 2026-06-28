import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

describe('UsersService', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: { user: { findMany: jest.fn() } } },
        { provide: TelegramService, useValue: { sendMessage: jest.fn() } },
      ],
    }).compile();
    expect(module.get(UsersService)).toBeDefined();
  });
});
