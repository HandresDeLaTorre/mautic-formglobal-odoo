import { Test, TestingModule } from '@nestjs/testing';
import { ApiodooService } from './apiodoo.service';

describe('ApiodooService', () => {
  let service: ApiodooService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiodooService],
    }).compile();

    service = module.get<ApiodooService>(ApiodooService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
