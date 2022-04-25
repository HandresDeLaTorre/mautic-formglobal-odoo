import { Test, TestingModule } from '@nestjs/testing';
import { ValidateuserService } from './validateuser.service';

describe('ValidateuserService', () => {
  let service: ValidateuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateuserService],
    }).compile();

    service = module.get<ValidateuserService>(ValidateuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
