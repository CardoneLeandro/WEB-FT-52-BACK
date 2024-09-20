import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserInformationRepository } from 'src/user-information/user-information.repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, UserInformationRepository],
  imports: [TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
