import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { elementType } from 'src/common/enum/elementType.enum';
import { ProductResponseDto } from './dto/response-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepo: ProductsRepository) {}

  async create(product: CreateProductDto) {
    const newProduct = { ...product, type: elementType.PRODUCT };
    const createdProduct = this.productRepo.createProduct(newProduct);
    if (!createdProduct) {
      throw new Error('Could not create product');
    }
    const savedProduct = await this.productRepo.saveProduct(createdProduct);

    const response: ProductResponseDto = {
      id: savedProduct.id,
      creator: savedProduct.creator,
      type: savedProduct.type,
      title: savedProduct.title,
      description: savedProduct.description,
      price: savedProduct.price,
      stock: savedProduct.stock,
      images: savedProduct.images,
      createDate: savedProduct.createDate,
      status: savedProduct.status,
    };
    console.log('FERNANDO ==> productsService, create, savedProduct', response);
    return response;
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
