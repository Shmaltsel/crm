import { Test } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

describe('CitiesController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [{ provide: CitiesService, useValue: {} }],
    }).compile();
    expect(module.get(CitiesController)).toBeDefined();
  });
});
