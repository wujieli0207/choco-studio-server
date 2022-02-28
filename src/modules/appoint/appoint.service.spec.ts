import { Test, TestingModule } from '@nestjs/testing';
import { AppointService } from './appoint.service';

describe('AppointService', () => {
  let service: AppointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointService],
    }).compile();

    service = module.get<AppointService>(AppointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
