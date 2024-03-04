import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSpiderModule } from './web-spider/web-spider.module';

@Module({
  imports: [WebSpiderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
