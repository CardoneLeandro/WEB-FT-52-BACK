import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { UsersRepository } from 'src/users/users.repository';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { AuthService } from 'src/auth/auth.service';
import { ElementsRepository } from 'src/element/element.repository';
import { UsersService } from 'src/users/users.service';
import { UserInformationService } from 'src/user-information/user-information.service';

@Module({
  controllers: [SeederController],
  providers: [
    SeederService,
    UsersRepository,
    UserInformationRepository,
    AuthService,
    ProductsRepository,
    UsersService,
    UserInformationService,
  ],
  exports: [SeederService],
})
export class SeederModule {}
