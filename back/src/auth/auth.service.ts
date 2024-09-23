import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UserRole } from 'src/common/enum/userRole.enum';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SUPERADMIN } from 'config/super-admin.config';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import { status } from 'src/common/enum/status.enum';

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
    return userAdminTable.userInformation.id;
  }

  async loggedUser(CreateUserData) {
    const existingUser = await this.userRepo.findUser(CreateUserData.email);
    if (!existingUser) {
      const newUser = await this.userService.createNewUser(CreateUserData);
      const newUserInformationTable = this.infoRepo.findOne({
        where: { user: { id: newUser.id } },
        relations: ['user'],
      });
      return newUserInformationTable;
    }

    return await this.infoRepo.findOne({
      where: { user: { id: existingUser.id } },
      relations: ['user'],
    });
  }

  async createNewUser(CreateUserData) {
    const newUser = await this.userService.createNewUser(CreateUserData);
    return newUser;
  }

  async login(loginUserDto) {
    const user = await this.userRepo.findUser(loginUserDto.email);
    if (!user) {
      return null;
    }
    if (user.email !== loginUserDto.email) {
      return null;
    }
    return user;
  }

  async ban(id: string) {
    const foundUser = await this.userRepo.findOne({ where: { id } });
    if (!foundUser) return new NotFoundException('User not found');
    if (foundUser.status === status.ACTIVE) {
      await this.userRepo.update(id, { status: status.BANNED });
    } else if (foundUser.status === status.BANNED) {
      await this.userRepo.update(id, { status: status.ACTIVE });
    }
    const updatedUser = await this.userRepo.findOne({ where: { id } });
    return updatedUser;
  }
}
