import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { PostsRepository } from './posts.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  imports: [TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
