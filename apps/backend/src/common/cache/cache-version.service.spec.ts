import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheVersionService } from './cache-version.service';

const mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('CacheVersionService', () => {
  let service: CacheVersionService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheVersionService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();
    service = module.get<CacheVersionService>(CacheVersionService);
  });

  describe('getVersion', () => {
    it('повертає 0 коли версія не збережена', async () => {
      mockCacheManager.get.mockResolvedValueOnce(undefined);
      const version = await service.getVersion('finance');
      expect(version).toBe(0);
    });

    it('повертає збережене значення', async () => {
      mockCacheManager.get.mockResolvedValueOnce(5);
      const version = await service.getVersion('dashboard');
      expect(version).toBe(5);
    });
  });

  describe('bumpVersion', () => {
    it('встановлює 1 при першому виклику', async () => {
      mockCacheManager.get.mockResolvedValueOnce(undefined);
      await service.bumpVersion('finance');
      expect(mockCacheManager.set).toHaveBeenCalledWith(
        'cache:version:finance',
        1,
        0,
      );
    });

    it('інкрементує версію при повторному виклику', async () => {
      mockCacheManager.get.mockResolvedValueOnce(1);
      await service.bumpVersion('finance');
      expect(mockCacheManager.set).toHaveBeenCalledWith(
        'cache:version:finance',
        2,
        0,
      );

      mockCacheManager.get.mockResolvedValueOnce(2);
      await service.bumpVersion('finance');
      expect(mockCacheManager.set).toHaveBeenCalledWith(
        'cache:version:finance',
        3,
        0,
      );
    });
  });
});
