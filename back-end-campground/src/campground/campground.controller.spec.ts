import { Test, TestingModule } from '@nestjs/testing';
import { CampgroundController } from './campground.controller';

describe('CampgroundController', () => {
  let controller: CampgroundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampgroundController],
    }).compile();

    controller = module.get<CampgroundController>(CampgroundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
