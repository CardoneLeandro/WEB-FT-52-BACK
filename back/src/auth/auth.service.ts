import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UserRole } from 'src/common/enum/userRole.enum';
import { UsersService } from 'src/users/users.service';
import { SUPERADMIN } from 'config/super-admin.config';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { status } from 'src/common/enum/status.enum';
import { MailerService } from 'src/mailer/mailer.service';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { EventsRepository } from 'src/events/events.repository';
import { Event } from 'src/events/entity/events.entity';
import { JsonWebTokenService } from './jsonWebToken/jsonWebToken.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly userService: UsersService,
    private readonly infoRepo: UserInformationRepository,
    private readonly mailerService: MailerService,
    private readonly dSource: DataSource,
    private readonly eventRepo: EventsRepository,
    private readonly jwrService: JsonWebTokenService,
  ) {}

  async superAdminSeeder() {
    const existingSuperAdmin = await this.userRepo.findOne({
      where: { role: UserRole.SUPERADMIN },
    });

    if (!existingSuperAdmin) {
      const { providerAccountId, password, ...params } = SUPERADMIN;
      const encriptedProviderAccId = bcrypt.hashSync(providerAccountId, 10);
      const encriptedPassword = bcrypt.hashSync(password, 10);
      const superAdminCreationData = {
        providerAccountId: encriptedProviderAccId,
        password: encriptedPassword,
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
  async ban(id: string) {
    console.log('servicio ban', id);
    const foundUser = await this.userRepo.findOne({ where: { id } });
    console.log('servicio ban, resultado de busqueda de usuario', foundUser);
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
    console.log('console.log previo al return dentro del servicio');
    return await this.userRepo.getUser(id);
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

  async getAllUsers(
    sortBy: string = 'createDate',
    order: 'ASC' | 'DESC' = 'ASC',
  ) {
    const validSortFields = ['price', 'title', 'updateDate'];
    if (!validSortFields.includes(sortBy)) {
      throw new Error(`Invalid sort field: ${sortBy}`);
    }
    return await this.userService.findAll(sortBy, order);
  }
}
