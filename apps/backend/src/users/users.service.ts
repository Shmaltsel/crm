import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
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
}