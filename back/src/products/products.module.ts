import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementsRepository } from 'src/element/element.repository';
import { Element } from 'src/element/entities/element.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, ElementsRepository],
  imports: [TypeOrmModule.forFeature([Element])],
})
export class ProductsModule {}
