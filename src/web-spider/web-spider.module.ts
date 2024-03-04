import { Module } from '@nestjs/common';
import { WebSpiderService } from './web-spider.service';
import { WebSpiderController } from './web-spider.controller';

@Module({
  controllers: [WebSpiderController],
  providers: [WebSpiderService],
})
export class WebSpiderModule {}
