import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { UserInformationService } from 'src/user-information/user-information.service';
import { UserInformationRepository } from 'src/user-information/user-information.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UserInformationService,
    UsersRepository,
    UserInformationRepository,
  ],
})
export class AuthModule {}
