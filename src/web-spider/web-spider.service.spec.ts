import { Test, TestingModule } from '@nestjs/testing';
import { WebSpiderService } from './web-spider.service';

describe('WebSpiderService', () => {
  let service: WebSpiderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebSpiderService],
    }).compile();

    service = module.get<WebSpiderService>(WebSpiderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
