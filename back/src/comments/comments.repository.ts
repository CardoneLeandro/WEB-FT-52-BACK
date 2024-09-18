import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './entities/comments.entity';

@Injectable()
export class CommentsRepository extends Repository<Comment> {
  constructor(private readonly dSource: DataSource) {
    super(Comment, dSource.getRepository(Comment).manager);
  }
}
