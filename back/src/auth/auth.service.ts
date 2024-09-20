import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UserRole } from 'src/common/enum/userRole.enum';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SUPERADMIN } from 'config/super-admin.config';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { UserInformation } from 'src/user-information/entities/user-information.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly userService: UsersService,
    private readonly infoRepo: UserInformationRepository,
  ) {}

  async superAdminSeeder() {
    const existingSuperAdmin = await this.userRepo.findOne({
      where: { role: UserRole.SUPERADMIN },
    });

    if (!existingSuperAdmin) {
      await this.userService.createNewUser(SUPERADMIN);
    }

    const userAdminTable = await this.userRepo.findOne({
      where: { role: UserRole.SUPERADMIN },
      relations: ['userInformation'],
    });
    console.log(userAdminTable);
    const id = userAdminTable.id;
    const infoTable: UserInformation = await this.infoRepo.findOne({
      where: { user: { id } },
      relations: ['user'],

    });
    console.log(infoTable);

    return infoTable;
  }

  

  async createNewUser(CreateUserData: CreateUserDto) {
    const newUser = await this.userService.createNewUser(CreateUserData);
    console.log('CARDONE => authService, createNewUser, newUser', newUser);
    return newUser;
  }

  async login(loginUserDto) {
    const user = await this.userRepo.findUser(loginUserDto.email);
    if (!user) {
      return null;
    }
    if (user.password !== loginUserDto.password) {
      return null;
    }
    return user;
  }
}
