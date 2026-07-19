import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TelegramService } from '../telegram/telegram.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => TelegramService))
    private telegramService: TelegramService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    if (!email) return null;
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  async findByEmailWithCity(email: string) {
    if (!email) return null;
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { city: true },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        cityId: true,
        car: true,
        telegramId: true,
        telegramChatId: true,
        balance: true,
        createdAt: true,
        updatedAt: true,
        city: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    if (data.cityId) {
      const city = await this.prisma.city.findUnique({
        where: { id: data.cityId },
      });
      if (!city) {
        throw new BadRequestException('Вказане місто не знайдено');
      }
    }

    let user;
    try {
      user = await this.prisma.user.create({
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
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException('Користувач з таким email вже існує');
        }
        if (err.code === 'P2003') {
          throw new BadRequestException('Вказане місто не знайдено');
        }
      }
      throw err;
    }

    if (data.password) {
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

    this.prisma.notification
      .create({
        data: {
          userId: user.id,
          type: 'WELCOME',
          payload: { name: data.fullName },
        },
      })
      .catch((err) => {
        console.error('Failed to create welcome notification:', err.message);
      });

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const updateData: Prisma.UserUpdateInput = {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      city: data.cityId
        ? { connect: { id: data.cityId } }
        : { disconnect: true },
      telegramId: data.telegramId || null,
      car: data.car || null,
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({ where: { id }, data: updateData });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        cityId: true,
        car: true,
        telegramId: true,
        telegramChatId: true,
        balance: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateTelegramChatId(username: string, chatId: string) {
    return this.prisma.user.updateMany({
      where: {
        telegramId: {
          equals: username,
          mode: 'insensitive',
        },
      },
      data: { telegramChatId: chatId },
    });
  }

  async exportCsv(): Promise<string> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        city: { select: { name: true } },
        car: true,
        telegramId: true,
      },
      orderBy: { name: 'asc' },
    });

    const header = 'ID,Назва,Email,Телефон,Роль,Місто,Авто,Telegram';
    const rows = users.map(
      (u) =>
        `"${u.id}","${u.name}","${u.email}","${u.phone || ''}","${u.role}","${u.city?.name || ''}","${u.car || ''}","${u.telegramId || ''}"`,
    );

    return [header, ...rows].join('\n');
  }
}
