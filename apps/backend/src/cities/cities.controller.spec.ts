import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';

describe('CitiesController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        { provide: CitiesService, useValue: {} },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(OwnershipGuard)
      .useValue({ canActivate: () => true })
      .compile();
    expect(module.get(CitiesController)).toBeDefined();
  });
});
