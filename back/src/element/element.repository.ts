import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Element } from './entities/element.entity';
@Injectable()
export class ElementsRepository extends Repository<Element> {
  constructor(private readonly dSource: DataSource) {
    super(Element, dSource.getRepository(Element).manager);
  }
}