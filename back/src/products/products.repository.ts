import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsRepository {
    constructor (
        @InjectRepository(Product) private productsRepository: Repository<Product>
    ) {}
}