import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from './prisma.service';
// Типізація для нашого моку, щоб автодоповнення працювало в тестах
export type MockPrismaService = DeepMockProxy<PrismaService>;

// Функція, яка створює глибокий мок PrismaClient
export const createPrismaMock = (): MockPrismaService => {
  return mockDeep<PrismaService>();
};
