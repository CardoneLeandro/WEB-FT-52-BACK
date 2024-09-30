import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UserRole } from 'src/common/enum/userRole.enum';
import { UsersService } from 'src/users/users.service';
import { SUPERADMIN } from 'config/super-admin.config';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import { status } from 'src/common/enum/status.enum';
import { User } from 'src/users/entities/user.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { encriptPasswordCompare } from 'src/common/utils/encript-passwordCompare.util';
import { encriptProviderAccIdCompare } from 'src/common/utils/encript-providerAccIdCompare.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly userService: UsersService,
    private readonly infoRepo: UserInformationRepository,
    private readonly mailerService: MailerService,
  ) {}

  async superAdminSeeder() {
    const existingSuperAdmin = await this.userRepo.findOne({
      where: { role: UserRole.SUPERADMIN },
    });

    if (!existingSuperAdmin) {
      const { providerAccountId, ...params } = SUPERADMIN;
      const encriptedProviderAccId = bcrypt.hashSync(providerAccountId, 10);
      const superAdminCreationData = {
        providerAccountId: encriptedProviderAccId,
        ...params,
      };
      await this.userService.createNewUser(superAdminCreationData);
    }

    const userAdminTable = await this.userRepo.findOne({
      where: { role: UserRole.SUPERADMIN },
      relations: ['userInformation'],
    });
    return userAdminTable.userInformation.id;
  }
//________________________

  async logginWithAuth0(params) {
    const existingUser = await this.userService.foundExistingUser(params);
    if (existingUser === null) {
      const createUserData = {
        status: status.PENDING,
        ...params,
      };
      const newUser = await this.userService.createNewUser(createUserData);
      return await this.infoRepo.loggedUser(newUser.id);
    }

    if (existingUser.status === status.PARTIALACTIVE) {
      const hashedProviderAccId = bcrypt.hashSync(params.providerAccountId, 10);
      await this.userRepo.update(existingUser.id, {
        status: status.ACTIVE,
        providerAccountId: hashedProviderAccId,
      });
      return await this.infoRepo.loggedUser(existingUser.id);
    }

    if (existingUser.status === status.PENDING) {
      return await this.infoRepo.loggedUser(existingUser.id);
    }
    if (existingUser.status === status.ACTIVE) {
      if (
        (await encriptProviderAccIdCompare(
          existingUser,
          params.providerAccountId,
        )) === false
      ) {
        throw new NotFoundException('Invalid Credentials');
      }
      return await this.infoRepo.loggedUser(existingUser.id);
    }
  }

  async loginUser(params) {
    const existingUser = await this.userService.foundExistingUser(
      params.email)
    if (!existingUser) {
      throw new NotFoundException('Invalid Credentials');
    }
    
    if (existingUser.status === status.PENDING) {
    return { redirect: true };
    }
    
    if (
      existingUser.status === status.ACTIVE ||
      existingUser.status === status.PARTIALACTIVE
    ) {
      if (
        (await encriptPasswordCompare(existingUser, params.password)) === false
      ) {
        throw new NotFoundException('Invalid Credentials');
      }

      return await this.infoRepo.loggedUser(existingUser.id);
    }
  }

  async signUp(params) {
    const existingUser = await this.userRepo.findUserByEmail(params.email);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return existingUser;
  }

  async completeRegister(params) {
    const incompleteUser = await this.userRepo.findOneBy({
      email: params.email,
    });
    if (!incompleteUser) return new NotFoundException('User not found');
    if (incompleteUser.status !== status.PENDING) {
      return new NotFoundException('User register is allready Completed');
    }
    await this.mailerService.sendEmailWelcome({
      name: incompleteUser.name,
      email: incompleteUser.email,
    });
    if (incompleteUser.providerAccountId !== params.providerAccountId) {
      throw new BadRequestException('Invalid credentials');
    }
    // if (
    //   (await encriptProviderAccIdCompare(
    //     incompleteUser,
    //     params.providerAccountId,
    //   )) === false
    // ) {
    //   throw new BadRequestException('Invalid credentials');
    // }
    const { providerAccountId, ...updateParams } = params;
    const hashedProviderAccId = bcrypt.hashSync(providerAccountId, 10);
    updateParams.providerAccountId = hashedProviderAccId;
    const userData = { status: status.ACTIVE, ...updateParams };
    await this.userService.updateUserInformation(incompleteUser, userData);
    //! -----------------------------------
    const completeUser = await this.infoRepo.findOne({
      where: { user: { id: incompleteUser.id } },
      relations: ['user'],
    });
    const { id, user } = completeUser;
    return { creatorId: id, ...user };
    //! -----------------------------------
  }

  async createNewUser(params) {
    const newUser = await this.userService.createNewUser(params);
    await this.mailerService.sendEmailWelcome({
      name: newUser.name,
      email: newUser.email,
    });
    const newUserInformationTable = this.infoRepo.findOne({
      where: { user: { id: newUser.id } },
      relations: ['user'],
    });
    return newUserInformationTable;
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
