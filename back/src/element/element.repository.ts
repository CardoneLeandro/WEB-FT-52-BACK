import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Element } from './entities/element.entity';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
@Injectable()
export class ElementsRepository extends Repository<Element> {
  constructor(private readonly dSource: DataSource) {
    super(Element, dSource.getRepository(Element).manager);
  }
  createProduct(product: CreateProductDto): Partial<Element> {
    return this.create(product);
  }

  async saveProduct(product: Element): Promise<Element> {
    return await this.save(product);
  }

  async findProducts(): Promise<Element[]> {
    return await this.find();
  }

  async findProductsById(id: string) {
    return await this.findOne({ where: { id } });
  }
}
