import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { elementType } from 'src/common/enum/elementType.enum'
import { ElementsRepository } from 'src/element/element.repository'
import { ProductResponseDto } from './dto/response-product.dto'

@Injectable()
export class ProductsService {
  constructor(private readonly elementRepo: ElementsRepository) {}

  async create(product: CreateProductDto) {
    const newProduct = { ...product, type: elementType.PRODUCT }
    const createdProduct = this.elementRepo.create(newProduct)
    if (!createdProduct) {
      throw new Error('Could not create product')
}
    const savedProduct = await this.elementRepo.save(createdProduct)
    
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
    console.log('FERNANDO ==> productsService, create, savedProduct', response)
    return response
  }

  findAll() {
    return this.elementRepo.findProducts()
  }

  findOne(id: string) {
    const existingProduct = this.elementRepo.findOneBy({ id })
    if (!existingProduct) {
      throw new Error('Could not find product')
    }
    return existingProduct
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
