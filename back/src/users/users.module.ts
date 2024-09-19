import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserInformationService } from 'src/user-information/user-information.service';
import { UserInformationRepository } from 'src/user-information/user-information.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UserInformationService,
    UserInformationRepository,
  ],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersRepository],
})
export class UsersModule {}
