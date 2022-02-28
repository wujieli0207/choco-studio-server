import { Test, TestingModule } from '@nestjs/testing';
import { AppointController } from './appoint.controller';
import { AppointService } from './appoint.service';

describe('AppointController', () => {
  let controller: AppointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointController],
      providers: [AppointService],
    }).compile();

    controller = module.get<AppointController>(AppointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
