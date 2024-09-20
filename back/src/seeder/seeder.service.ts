import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { UserRole } from 'src/common/enum/userRole.enum';
import productsSeeder from './seeders/product.seed';
import { ProductsRepository } from 'src/products/products.repository';
import { Element } from 'src/element/entities/element.entity';
import eventSeeder from './seeders/event.seed';
import { elementType } from 'src/common/enum/elementType.enum';

@Injectable()
export class SeederService {
  constructor(
    private readonly userInfo: UserInformationRepository,
    private readonly userRepo: UsersRepository,
    private readonly productRepo: ProductsRepository,
  ) {}

  async superAdmin() {
    const superAdmin = await this.userRepo.findOne({
      where: { role: UserRole.SUPERADMIN },
      relations: ['userInformation'],
    });

    const creatorId: string = superAdmin.userInformation.id;

    console.log(creatorId);
  }

  async addProductSeeder(id) {
    const productsSeed = [];
    for (const product of productsSeeder) {
      const foundProduct = await this.productRepo.findOne({
        where: { title: product.title },
      });
      if (!foundProduct) {
        const newProduct = { ...product, creator: id };
        productsSeed.push(newProduct);
      }
    }
    if (productsSeed.length > 0) {
      const savedProducts = await this.productRepo.save(productsSeed);
      console.log(savedProducts);
    }

    return;
  }

  async addEventSeeder(id) {
    const eventsSeed = [];
    for (const event of eventSeeder) {
      const foundProduct = await this.productRepo.findOne({
        where: { title: event.title },
      });
      if (!foundProduct) {
        const newEvent = { ...event, creator: id, type: elementType.EVENT };
        eventsSeed.push(newEvent);
      }
    }
    if (eventsSeed.length > 0) {
      const savedEvents = await this.productRepo.save(eventsSeed);
      console.log(savedEvents);
    }

    return;
  }
}
