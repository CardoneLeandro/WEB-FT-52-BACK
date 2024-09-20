import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { UserRole } from 'src/common/enum/userRole.enum';
import productsSeeder from './seeders/product.seed';
import { ProductsRepository } from 'src/products/products.repository';
import { Product } from 'src/products/entities/product.entity';


@Injectable()
export class SeederService {
  constructor(
    private readonly userInfo: UserInformationRepository,
    private readonly userRepo: UsersRepository,
    private readonly productRepo: ProductsRepository
  ) {}

  async onBoostrapApplication() {
    const superAdmin = await this.userRepo.findOne({
      where: { role: UserRole.SUPERADMIN },
      relations: ['userInformation'],
    });

    const creatorId: string = superAdmin.userInformation.id;

    console.log(creatorId);
  }
  
  async addProductSeeder() : Promise<Product> {
    const productsSeed = [];
    for (const product of productsSeeder) {
        productsSeed.push(product);
      }
    if (productsSeed.length > 0) {
      await this.productRepo.save(productsSeed);
    }
    return;
  }
}
