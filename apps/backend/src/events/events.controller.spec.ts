import { Test } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { JwtService } from '@nestjs/jwt';
import { OwnershipGuard } from '../auth/guards/ownership.guard';

describe('EventsController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        { provide: EventsService, useValue: {} },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(OwnershipGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();
    expect(module.get(EventsController)).toBeDefined();
  });
});
