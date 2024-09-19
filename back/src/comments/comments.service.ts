import { Injectable } from '@nestjs/common'
import { CreateCommentsDto } from './dto/create-comments.dto'
import { UpdateCommentsDto } from './dto/update-comments.dto'

@Injectable()
export class commentsService {
  create(CreateCommentsDto: CreateCommentsDto) {
    return 'This action adds a new coment'
  }

  findAll() {
    return `This action returns all comments`
  }

  findOne(id: number) {
    return `This action returns a #${id} coment`
  }

  update(id: number, UpdateCommentsDto: UpdateCommentsDto) {
    return `This action updates a #${id} coment`
  }

  remove(id: number) {
    return `This action removes a #${id} coment`
  }
}
