import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Element } from 'src/element/entities/element.entity';

@Injectable()
export class ProductsRepository extends Repository<Element> {
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
