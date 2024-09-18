import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { elementType } from 'src/common/enum/elementType.enum';
import { ElementsRepository } from 'src/element/element.repository';

@Injectable()
export class ProductsService {
constructor(private readonly elementRepo: ElementsRepository) {}

  async create(Dto: CreateProductDto) {
    const newProduct = {...Dto, type:elementType.PRODUCT}
    const createdProduct = this.elementRepo.create(newProduct);
    if(!createdProduct) {throw new Error('Could not create product');}
    console.log('CARDONE => productsService, create, createdProduct', createdProduct);
    const savedProduct = await this.elementRepo.save(createdProduct);
    return savedProduct

  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id:string) {
    const existingProduct = this.elementRepo.findOneBy({id});
    if(!existingProduct) {throw new Error('Could not find product');}
    return existingProduct
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
