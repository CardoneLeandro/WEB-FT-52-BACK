import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { UserRole } from 'src/common/enum/userRole.enum';
import productsSeeder from './seeders/product.seed';
import { ProductsRepository } from 'src/products/products.repository';
import eventSeeder from './seeders/event.seed';
import { EventsRepository } from 'src/events/events.repository';

@Injectable()
export class SeederService {
  constructor(
    private readonly userInfo: UserInformationRepository,
    private readonly userRepo: UsersRepository,
    private readonly productRepo: ProductsRepository,
    private readonly eventRepo: EventsRepository,
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
    for (const product of productsSeeder) {
      const newProduct = { ...product, creator: id };
      const createdProduct = this.productRepo.createProduct(newProduct);
      await this.productRepo.saveProduct(createdProduct);
    }
    const allProducts = await this.userInfo.findOne({
      where: { id },
      relations: ['products'],
    });
    console.log(
      'CARDONE => seederService, addProductSeeder, INFORMATION TABLE WITH "PRODUCT" RELATION',
      allProducts,
    );
    return;
  }

  async addEventSeeder(id) {
    for (const event of eventSeeder) {
      const newEvent = { ...event, creator: id };
      const createdEvent = this.eventRepo.createEvent(newEvent);
      const savedEvent = await this.eventRepo.saveEvent(createdEvent);
      console.log(
        'CARDONE => seederService, addEventSeeder, savedEvent',
        savedEvent,
      );
    }
    const allEvents = await this.userInfo.findOne({
      where: { id },
      relations: ['events'],
    });
    console.log(
      'CARDONE => seederService, addEventSeeder, INFORMATION TABLE WITH "EVENT" RELATION',
      allEvents,
    );
    return;
  }
}
