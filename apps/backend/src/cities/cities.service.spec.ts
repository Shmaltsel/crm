import { Test } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CitiesService', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      providers: [
        CitiesService,
        { provide: PrismaService, useValue: { city: { findMany: jest.fn() } } },
      ],
    }).compile();
    expect(module.get(CitiesService)).toBeDefined();
  });
});
