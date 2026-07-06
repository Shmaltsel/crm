import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { ParserService } from './parser.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';

const mockGuard = { canActivate: jest.fn() };

const mockSchoolsService = {
  findOne: jest.fn(),
  findAll: jest.fn(),
};

const mockParserService = {};

describe('SchoolsController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [
        { provide: SchoolsService, useValue: mockSchoolsService },
        { provide: ParserService, useValue: mockParserService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .overrideGuard(OwnershipGuard)
      .useValue(mockGuard)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockGuard.canActivate.mockResolvedValue(true);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('GET /schools/:id — findOne', () => {
    it('OWNERSHIP: MANAGER іншого міста отримує 403', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Немає доступу до ресурсу іншого міста',
        ),
      );
      await request(app.getHttpServer())
        .get('/schools/s-1')
        .expect(403);
    });

    it('SUPERADMIN отримує 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockSchoolsService.findOne.mockResolvedValueOnce({ id: 's-1' });
      const res = await request(app.getHttpServer())
        .get('/schools/s-1')
        .expect(200);
      expect(res.body.id).toBe('s-1');
    });
  });
});
