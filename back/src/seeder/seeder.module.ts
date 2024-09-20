import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { UsersRepository } from 'src/users/users.repository';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { ProductsRepository } from 'src/products/products.repository';

@Module({
  controllers: [SeederController],
  providers: [SeederService, UsersRepository, UserInformationRepository, ProductsRepository],
})
export class SeederModule {}
