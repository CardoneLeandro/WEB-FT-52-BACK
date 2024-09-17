import { Module } from '@nestjs/common';
import { commentsService } from './comments.service';
import { commentsController } from './comments.controller';

@Module({
  controllers: [commentsController],
  providers: [commentsService],
})
export class commentsModule {}
