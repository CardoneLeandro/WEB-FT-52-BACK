import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Element } from 'src/element/entities/element.entity';
import { elementType } from 'src/common/enum/elementType.enum';

@Injectable()
export class ProductsRepository extends Repository<Element> {
  constructor(private readonly dSource: DataSource) {
    super(Element, dSource.getRepository(Element).manager);
  }

  createProduct(product: CreateProductDto): Element {
    return this.create(product);
  }

  async saveProduct(product: Element) {
    return await this.save(product);
  }

  async findAndCountProducts(
    page: number,
    limit: number,
    sortBy: string,
    order: 'ASC' | 'DESC',
  ) {
    return await this.findAndCount({
      where: { type: elementType.PRODUCT },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [sortBy]: order,
      },
    });
  }

  async findProductsById(id: string) {
    return await this.findOne({ where: { id } });
  }
}
