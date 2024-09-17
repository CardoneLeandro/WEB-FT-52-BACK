import { Module } from '@nestjs/common';
import { commentsService } from './comments.service';
import { commentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comments.entity';

@Module({
  controllers: [commentsController],
  providers: [commentsService, CommentsRepository],
  imports: [TypeOrmModule.forFeature([Comment])]
})
export class CommentsModule {}
