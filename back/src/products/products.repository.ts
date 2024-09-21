import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entity/products.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(private readonly dSource: DataSource) {
    super(Product, dSource.getRepository(Product).manager);
  }

  createProduct(product) {
    return this.create(product);
  }

  async saveProduct(product): Promise<Product> {
    return await this.save(product);
  }

  async findAndCountProducts(
    page: number,
    limit: number,
    sortBy: string,
    order: 'ASC' | 'DESC',
  ) {
    return await this.findAndCount({
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
  async updateProduct(id: string, updateProductData: UpdateProductDto) {
    await this.update(id, updateProductData);
    return await this.findOne({ where: { id } });
  }
}
