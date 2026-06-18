import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Ініціалізуємо підключення до бази (простий і надійний спосіб)
const prisma = new PrismaClient();

@Injectable()
export class CitiesService {
  // Метод для створення нового міста
  async create(name: string) {
    return prisma.city.create({
      data: { name },
    });
  }

  // Метод для отримання всіх міст
  async findAll() {
    return prisma.city.findMany({
      orderBy: { createdAt: 'desc' }, // Нові міста будуть зверху
    });
  }
}
