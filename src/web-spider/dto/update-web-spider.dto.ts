import { PartialType } from '@nestjs/mapped-types';
import { CreateWebSpiderDto } from './create-web-spider.dto';

export class UpdateWebSpiderDto extends PartialType(CreateWebSpiderDto) {}
