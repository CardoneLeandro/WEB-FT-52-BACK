import { Module } from '@nestjs/common';
import { ComentsService } from './coments.service';
import { ComentsController } from './coments.controller';

@Module({
  controllers: [ComentsController],
  providers: [ComentsService],
})
export class ComentsModule {}
