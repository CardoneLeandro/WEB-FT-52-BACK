import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PostsRepository extends Repository<Post> {
  constructor(private readonly dSource: DataSource) {
    super(Post, dSource.getRepository(Post).manager);
  }
}
