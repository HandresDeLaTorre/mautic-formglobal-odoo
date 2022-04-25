import { Test, TestingModule } from '@nestjs/testing';
import { ApimauticService } from './apimautic.service';

describe('ApimauticService', () => {
  let service: ApimauticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApimauticService],
    }).compile();

    service = module.get<ApimauticService>(ApimauticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
