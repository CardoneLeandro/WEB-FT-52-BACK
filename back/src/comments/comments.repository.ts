import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comments.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comment) private comentsRepository: Repository<Comment>,
  ) {}
}
