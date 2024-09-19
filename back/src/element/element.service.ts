import { Injectable } from '@nestjs/common'

@Injectable()
export class ElementService {
  create(createElementDto) {
    return 'This action adds a new element'
  }

  findAll() {
    return `This action returns all element`
  }

  findOne(id: number) {
    return `This action returns a #${id} element`
  }

  update(id: number, updateElementDto) {
    return `This action updates a #${id} element`
  }

  remove(id: number) {
    return `This action removes a #${id} element`
  }
}
