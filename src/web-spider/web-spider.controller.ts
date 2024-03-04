import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { WebSpiderService } from './web-spider.service';
import { CreateWebSpiderDto } from './dto/create-web-spider.dto';
import { UpdateWebSpiderDto } from './dto/update-web-spider.dto';

@Controller('web-spider')
export class WebSpiderController {
  constructor(private readonly webSpiderService: WebSpiderService) {}

  @Post()
  create(@Body() createWebSpiderDto: CreateWebSpiderDto) {
    return this.webSpiderService.create(createWebSpiderDto);
  }

  @Get()
  findAll() {
    return this.webSpiderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webSpiderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebSpiderDto: UpdateWebSpiderDto) {
    return this.webSpiderService.update(+id, updateWebSpiderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webSpiderService.remove(+id);
  }
}
