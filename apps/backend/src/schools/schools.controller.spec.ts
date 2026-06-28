import { Test } from '@nestjs/testing';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { ParserService } from './parser.service';

describe('SchoolsController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [
        { provide: SchoolsService, useValue: {} },
        { provide: ParserService, useValue: {} },
      ],
    }).compile();
    expect(module.get(SchoolsController)).toBeDefined();
  });
});
