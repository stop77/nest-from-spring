import { Test, TestingModule } from '@nestjs/testing';
import { CombinationController } from './combination.controller';
import { CombinationService } from './combination.service';

describe('CombinationController', () => {
  let controller: CombinationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombinationController],
      providers: [CombinationService],
    }).compile();

    controller = module.get<CombinationController>(CombinationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
