import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { elementType } from 'src/common/enum/elementType.enum';
import { Element } from 'src/element/entities/element.entity';
// import { Event } from './entities/event.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class EventsRepository extends Repository<Element> {
  constructor(private readonly dSource: DataSource) {
    super(Element, dSource.getRepository(Element).manager);
  }

  async findAndCountProducts(
    page: number,
    limit: number,
    sortBy: string,
    order: 'ASC' | 'DESC',
  ) {
    return await this.findAndCount({
      where: { type: elementType.EVENT },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [sortBy]: order,
      },
    });
  }
}
