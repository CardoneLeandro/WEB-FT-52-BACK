import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepo: ProductsRepository) {}

  async create(product: CreateProductDto) {
    const newProduct = this.productRepo.createProduct(product);
    const savedProduct = await this.productRepo.saveProduct(newProduct);
    return savedProduct;
  }

  async findAll(
    page: number,
    limit: number,
    sortBy: string = 'createDate',
    order: 'ASC' | 'DESC' = 'ASC',
  ) {
    const [products, totalElements] =
      await this.productRepo.findAndCountProducts(page, limit, sortBy, order);
    const validSortFields = ['price', 'title', 'createDate'];
    if (!validSortFields.includes(sortBy)) {
      throw new Error(`Invalid sort field: ${sortBy}`);
    }

    const totalPages = Math.ceil(totalElements / Number(limit));
    const hasPrevPage = Number(page) > 1;
    const hasNextPage = Number(page) < totalPages;
    const prevPage = hasPrevPage ? Number(page) - 1 : null;
    const nextPage = hasNextPage ? Number(page) + 1 : null;

    return {
      products,
      totalElements,
      page,
      limit,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    };
  }

  findOne(id: string) {
    const existingProduct = this.productRepo.findProductsById(id);
    if (!existingProduct) {
      throw new Error('Could not find product');
    }
    return existingProduct;
  }

  async updateProduct(id: string, updateProductData: UpdateProductDto) {
    const foundEvent = await this.productRepo.findProductsById(id);
    if (!foundEvent) {
      throw new BadRequestException('Event not found');
    }
    const updatedEvent = await this.productRepo.updateProduct(
      id,
      updateProductData,
    );
    return updatedEvent;
  }
}
