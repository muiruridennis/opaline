import { Module } from '@nestjs/common';
import { TemplateService } from './templates.service';

@Module({
  providers: [TemplateService],
  exports: [TemplateService], 
})
export class TemplateModule {}
