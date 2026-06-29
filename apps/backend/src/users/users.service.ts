import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TelegramService } from '../telegram/telegram.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => TelegramService))
    private telegramService: TelegramService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      include: {
        city: true, // <--- Ось цей магічний рядок підтягне назву міста!
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async createUser(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: data.role,
        cityId: data.cityId || null,
        telegramId: data.telegramId || null,
        car: data.car || null,
      },
    });

    // Надсилаємо вітальне повідомлення якщо вказано telegramId
    if (data.password) {
      // Шукаємо chat_id: якщо є збережений після /start — використовуємо його
      // інакше пробуємо telegramId напряму (якщо вже числовий)
      const chatId = user.telegramChatId || null;

      if (chatId) {
        await this.telegramService.sendWelcome(
          chatId,
          data.fullName,
          data.email,
          data.password,
        );
      }
    }

    return user;
  }

  async updateUser(id: string, data: any) {
    const updateData: any = {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      cityId: data.cityId || null,
      telegramId: data.telegramId || null,
      car: data.car || null,
    };

    // Якщо передано новий пароль, хешуємо його
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({ where: { id }, data: updateData });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  // Створення адміністратора
  async seedAdmin() {
    const existingAdmin = await this.prisma.user.findUnique({
      where: { email: 'admin@crm.com' },
    });

    if (existingAdmin) {
      return { message: 'Адміністратор вже існує!' };
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await this.prisma.user.create({
      data: {
        name: 'Артур Шмальцель',
        email: 'admin@crm.com',
        password: hashedPassword,
        role: 'SUPERADMIN',
      },
    });

    return { message: 'Суперадмін успішно створений!', user: admin };
  }

  // Новий метод для додавання Васі
  async seedVasya() {
    const existingVasya = await this.prisma.user.findUnique({
      where: { email: 'vasya@charisma.com' },
    });

    if (existingVasya) {
      return { message: 'Вася вже в базі!' };
    }

    const hashedPassword = await bcrypt.hash('vasya123', 10);

    const vasya = await this.prisma.user.create({
      data: {
        name: 'Вася Харізма',
        email: 'vasya@charisma.com',
        password: hashedPassword,
        role: 'MANAGER',
      },
    });

    return { message: 'Вася Харізма успішно доданий!', user: vasya };
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  // Новий публічний метод для TelegramService
  async updateTelegramChatId(username: string, chatId: string) {
    return this.prisma.user.updateMany({
      where: {
        telegramId: {
          equals: username,
          mode: 'insensitive', // пошук без урахування регістру (Svitlo != svitlo)
        },
      },
      data: { telegramChatId: chatId },
    });
  }
}
