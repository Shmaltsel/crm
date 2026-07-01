import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from './prisma.service';
export type MockPrismaService = DeepMockProxy<PrismaService>;

export const createPrismaMock = (): MockPrismaService => {
  return mockDeep<PrismaService>();
};
