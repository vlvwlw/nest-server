import { Test, TestingModule } from '@nestjs/testing';
import { WebSpiderController } from './web-spider.controller';
import { WebSpiderService } from './web-spider.service';

describe('WebSpiderController', () => {
  let controller: WebSpiderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebSpiderController],
      providers: [WebSpiderService],
    }).compile();

    controller = module.get<WebSpiderController>(WebSpiderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
