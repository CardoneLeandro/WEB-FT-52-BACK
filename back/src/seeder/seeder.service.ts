import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { UserRole } from 'src/common/enum/userRole.enum';
import { ProductsRepository } from 'src/products/products.repository';
import { EventsRepository } from 'src/events/events.repository';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly userInfo: UserInformationRepository,
    private readonly userRepo: UsersRepository,
    private readonly productRepo: ProductsRepository,
    private readonly eventRepo: EventsRepository,
    private readonly userService: UsersService
  ) {}

  async superAdmin() {
    const superAdmin = await this.userRepo.findOne({
      where: { role: UserRole.SUPERADMIN },
      relations: ['userInformation'],
    });

    const creatorId: string = superAdmin.userInformation.id;

    console.log(creatorId);
  }

  async addProductSeeder(id, seed) {
    for (const product of seed) {
      const existingProduct = await this.productRepo.findOne({
        where: { title: product.title },
      });
      if (existingProduct) {
        console.log(`Product with title ${product.title} already exists`);
        continue;
      }
      const newProduct = { ...product, creator: id };
      const createdProduct = this.productRepo.createProduct(newProduct);
      await this.productRepo.saveProduct(createdProduct);
    }
  }

  async addEventSeeder(id, seed) {
    for (const event of seed) {
      const existingEvent = await this.eventRepo.findOne({
        where: { title: event.title },
      });
      if (existingEvent) {
        console.log(`Event with title ${event.title} already exists`);
        continue;
      }
      const newEvent = { ...event, creator: id };
      const createdEvent = this.eventRepo.createEvent(newEvent);
      await this.eventRepo.saveEvent(createdEvent);
    }
    return;
  }

  async addUserSeeder(seed){
    for (const user of seed){
      const exsitingUser = await this.userRepo.findOne({
        where: {email: user.email}
      });
      if(exsitingUser){
        console.log(`User with email ${user.email} already exist`);
        continue;
      }
      const newUser = {...user};
      await this.userService.createNewUser(newUser)
    }
  }
}
