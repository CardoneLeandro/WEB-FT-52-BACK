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
import { MailerService } from 'src/mailer/mailer.service';
import { encriptPasswordCompare } from 'src/common/utils/encript-passwordCompare.util';
import { encriptProviderAccIdCompare } from 'src/common/utils/encript-providerAccIdCompare.util';
import * as bcrypt from 'bcrypt';
import { ChildEntity, DataSource } from 'typeorm';
import { EventsRepository } from 'src/events/events.repository';
import { Event } from 'src/events/entity/events.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly userService: UsersService,
    private readonly infoRepo: UserInformationRepository,
    private readonly mailerService: MailerService,
    private readonly dSource: DataSource,
    private readonly eventRepo: EventsRepository,
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
      const { providerAccountId, ...rest } = params;
      const hashedProviderAccId = bcrypt.hashSync(providerAccountId, 10);
      const createUserData = {
        status: status.PENDING,
        providerAccountId: hashedProviderAccId,
        ...rest,
      };
      const newUser = await this.userService.createNewUser(createUserData);
      return await this.infoRepo.loggedUser(newUser.id);
    }

    if (existingUser.status === status.PARTIALACTIVE) {
      const hashedProviderAccId = bcrypt.hashSync(params.providerAccountId, 10);
      await this.userRepo.update(existingUser.id, {
        status: status.ACTIVE,
        providerAccountId: hashedProviderAccId,
        image: params.image,
      });
      return await this.infoRepo.loggedUser(existingUser.id);
    }

    if (
      existingUser.status === status.PENDING ||
      existingUser.status === status.ACTIVE
    ) {
      if (
        (await encriptProviderAccIdCompare(
          existingUser,
          params.providerAccountId,
        )) === false
      ) {
        throw new BadRequestException('Invalid Credentials');
      }
      return await this.infoRepo.loggedUser(existingUser.id);
    }
  }

  async loginUser(params) {
    const existingUser = await this.userService.foundExistingUser(params);
    if (existingUser === null) {
      throw new BadRequestException('Invalid Credentials');
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
        throw new BadRequestException('Invalid Credentials');
      }

      return await this.infoRepo.loggedUser(existingUser.id);
    }
  }

  async signUp(params) {
    const existingUser = await this.userRepo.findUserByEmail(params.email);
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }
    return existingUser;
  }

  async completeRegister(params) {
    const incompleteUser = await this.userRepo.findOneBy({
      email: params.email,
    });
    if (!incompleteUser) {
      throw new BadRequestException('User not found');
    }
    if (incompleteUser.status !== status.PENDING) {
      throw new BadRequestException('User register is allready Completed');
    }
    await this.mailerService.sendEmailWelcome({
      name: incompleteUser.name,
      email: incompleteUser.email,
    });

    if (
      (await encriptProviderAccIdCompare(
        incompleteUser,
        params.providerAccountId,
      )) === false
    ) {
      throw new BadRequestException('Invalid Credentials');
    }
    const { providerAccountId, email, ...updateParams } = params;

    const userData = {
      status: status.ACTIVE,
      ...updateParams,
    };

    await this.userService.updateUserInformation(incompleteUser, userData);

    return await this.infoRepo.loggedUser(incompleteUser.id);
  }

  async createNewUser(params) {
    const existingUser = await this.userService.foundExistingUser(params);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const newUser = await this.userService.createNewUser(params);
    await this.mailerService.sendEmailWelcome({
      name: newUser.name,
      email: newUser.email,
    });
    return await this.infoRepo.loggedUser(newUser.id);
  }

  async ban(id: string) {
    const foundUser = await this.userRepo.findOne({ where: { id } });
    if (!foundUser) throw new NotFoundException('User not found');
    if (
      foundUser.status === status.ACTIVE ||
      foundUser.status === status.PENDING ||
      foundUser.status === status.PARTIALACTIVE
    ) {
      await this.userRepo.update(id, { status: status.BANNED });
    } else if (foundUser.status === status.BANNED) {
      if (!foundUser.password) {
        await this.userRepo.update(id, { status: status.PENDING });
      } else if (!foundUser.providerAccountId) {
        await this.userRepo.update(id, { status: status.PARTIALACTIVE });
      } else if (foundUser.password) {
        await this.userRepo.update(id, { status: status.ACTIVE });
      }
    }
    const updatedUser = await this.userRepo.findOne({ where: { id } });
    return updatedUser;
  }
  async getOne(id) {
    return await this.infoRepo.findOneUser(id);
  }

  async roleChangeAdminUser(id: string) {
    const existingUser = await this.userRepo.findOneBy({ id });
    if (
      (!existingUser ||
        existingUser.status === status.BANNED ||
        existingUser.status === status.INACTIVE,
      existingUser.status === status.PENDING)
    ) {
      return new NotFoundException('This action is not allowed');
    }
    if (existingUser.role === UserRole.ADMIN) {
      await this.userRepo.update(id, { role: UserRole.USER });
    } else if (existingUser.role === UserRole.USER) {
      await this.userRepo.update(id, { role: UserRole.ADMIN });
    }
    return await this.userRepo.findOneBy({ id });
  }

  async highlight(id) {
    const event: Event | null = await this.eventRepo.findOneBy({ id });
    if (!event) {
      throw new BadRequestException(`Event not found`);
    }
    return await this.eventRepo.highlightEvent(id, !event.highlight);
  }
}
