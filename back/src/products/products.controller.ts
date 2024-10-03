import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('WorkInProgress')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Ruta para la creación de un nuevo producto' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Ruta para la obtención de todos los productos creados. Por defecto se devuelve 1 pagina con 5 productos ordenados por fecha de creación de más reciente a más antiguo',
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query('sortBy') sortBy: string = 'createDate', 
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
  ) {
    return this.productsService.findAll(page, limit, sortBy, order);
  }

  @Get('getone')
  @ApiOperation({
    summary: 'Ruta para la obtención de un solo producto por ID',
  })
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Ruta para la actualización de un solo producto. Se debe pasar el ID del producto por @Param y los campos a actualizar por @Body',
  })
  update(@Param('id') id: string, @Body() updateProductData: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductData);
  }
}
