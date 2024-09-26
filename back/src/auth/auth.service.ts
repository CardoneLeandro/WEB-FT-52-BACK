import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UserRole } from 'src/common/enum/userRole.enum';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SUPERADMIN } from 'config/super-admin.config';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import { status } from 'src/common/enum/status.enum';
import { emitWarning } from 'process';
import { User } from 'src/users/entities/user.entity';

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

  async logginWithAuth0(params) {
    const existingUser = await this.userRepo.findUserByEmail(params.email);
    if (!existingUser) {
      const newAuth0UserData = { status: status.PENDING, ...params };
      const newUser = await this.userService.createNewUser(newAuth0UserData);
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

  async NEEDREFACTORIZATION(params) {
    const newUser = await this.userService.createNewUser(params);
    const newUserInformationTable = this.infoRepo.findOne({
      where: { user: { id: newUser.id } },
      relations: ['user'],
    });
    return newUserInformationTable;
  }

  async createNewUser(params) {
    const newUser = await this.userService.createNewUser(params);
    return newUser;
  }

  async loginUser(params) {
    const user = await this.userRepo.findUserByEmail(params.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.infoRepo.findOne({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
  }

  async signUp(params) {
    const existingUser = await this.userRepo.findUserByEmail(params.email);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return existingUser;
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

  async completeRegister(params) {
    const incompleteUser: User | null = await this.userRepo.findOneBy({
      email: params.email,
    });
    if (!incompleteUser) return new NotFoundException('User not found');
    if (incompleteUser.status !== status.PENDING) {
      return new NotFoundException('User register is allready Completed');
    }
    const userData = { status: status.ACTIVE, ...params };
    return await this.userService.updateUserInformation(
      incompleteUser,
      userData,
    );
  }
}
