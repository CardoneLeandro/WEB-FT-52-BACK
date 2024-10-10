import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { UserInformationService } from 'src/user-information/user-information.service';
import { DataSource } from 'typeorm';
import { UserRole } from 'src/common/enum/userRole.enum';
import { status } from 'src/common/enum/status.enum';
import { CompleteRegisterAuth0Dto } from 'src/auth/dto/complete-register-auth0.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from 'src/mailer/mailer.service';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { encriptProviderAccIdCompare } from 'src/common/utils/encript-providerAccIdCompare.util';
import { encriptPasswordCompare } from 'src/common/utils/encript-passwordCompare.util';
import { JsonWebTokenService } from 'src/auth/jsonWebToken/jsonWebToken.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly dsource: DataSource,
    private readonly userRepo: UsersRepository,
    private readonly infoService: UserInformationService,
    private readonly infoRepo: UserInformationRepository,
    private readonly mailerService: MailerService,
    private readonly jwrService: JsonWebTokenService,
  ) {}

  // =====================> LOGGIN CON AUTH0 <=======================
  async logginWithAuth0(params) {
    const existingUser = await this.foundExistingUser(params);
    if (existingUser === null) {
      const { providerAccountId, ...rest } = params;
      const hashedProviderAccId = bcrypt.hashSync(providerAccountId, 10);
      const createUserData = {
        status: status.PENDING,
        providerAccountId: hashedProviderAccId,
        ...rest,
      };
      const newUser = await this.createNewUser(createUserData);
      return await this.infoRepo.loggedUser(newUser.id);
    }

    // Verificaciones de estado
    if (existingUser.status === status.BANNED) {
      throw new BadRequestException('Access denied');
    }
    if (existingUser.status === status.INACTIVE) {
      throw new BadRequestException('Access denied');
    }

    // SE RETORNA EL USUARIO PENDIENTE
    if (existingUser.status === status.PENDING) {
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

    // SE AGREGA EL PAID + IMAGEN
    if (existingUser.status === status.PARTIALACTIVE) {
      const hashedProviderAccId = bcrypt.hashSync(params.providerAccountId, 10);
      await this.userRepo.update(existingUser.id, {
        status: status.ACTIVE,
        providerAccountId: hashedProviderAccId,
        image: params.image,
      });
      return await this.infoRepo.loggedUser(existingUser.id);
    }

    // SE INICIA SESION
    if (existingUser.status === status.ACTIVE) {
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

  // =================> COMPLETE REGISTER AUTH0 <====================
  async completeRegister(params) {
    const incompleteUser = await this.userRepo.findOneBy({
      email: params.email,
    });
    if (!incompleteUser) {
      throw new BadRequestException('User not found');
    }

    // Verificaciones de estado
    if (incompleteUser.status === status.BANNED) {
      throw new BadRequestException('Access denied');
    }
    if (incompleteUser.status === status.INACTIVE) {
      throw new BadRequestException('Access denied');
    }
    if (incompleteUser.status !== status.PENDING) {
      throw new BadRequestException('User register is already completed');
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

    await this.updateUserInformation(incompleteUser, userData);

    return await this.infoRepo.loggedUser(incompleteUser.id);
  }

  // ========================> LOGIN <========================
  async loginUser(params) {
    const existingUser = await this.foundExistingUser(params);
    if (existingUser === null) {
      throw new BadRequestException('Invalid Credentials');
    }

    // Verificaciones de estado
    if (existingUser.status === status.BANNED) {
      throw new BadRequestException('Access denied');
    }
    if (existingUser.status === status.INACTIVE) {
      throw new BadRequestException('Access denied');
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

  // ========================> REGISTER <========================
  async createNewUser(params) {
    const existingUser = await this.foundExistingUser(params);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const newUser = await this.createUser(params);
    if (newUser.role !== UserRole.SUPERADMIN) {
      await this.mailerService.sendEmailWelcome({
        name: newUser.name,
        email: newUser.email,
      });
    }
    return await this.infoRepo.loggedUser(newUser.id);
  }

  async createUser(params): Promise<Partial<User>> {
    return await this.dsource.transaction(async (manager) => {
      const createdUser = this.userRepo.createUser(params);
      const savedUser = await this.userRepo.saveUser(createdUser);
      await this.infoService.createUserInformationTable(savedUser, manager);
      return savedUser;
    });
  }

  //-------------------------------------------------------------------------------
  async findAll(sortBy, order) {
    const allUsers: User[] = await this.userRepo.findUsers(sortBy, order);
    return allUsers.map((user) => {
      const {
        userInformation,
        password,
        providerAccountId,
        address,
        phone,
        updateDate,
        ...rest
      } = user;
      return rest;
    });
  }

  //-------------------------------------------------------------------------------
  // Solo retorna al usuario si no existe, o si su estado es cualquiera excepto BANNED o INACTIVE, en cuyo caso lanza una excepcion
  async foundExistingUser({ email }): Promise<User | null> {
    const existingUser = await this.userRepo.findUserByEmail(email);
    if (!existingUser) {
      return null;
    }
    if (
      (existingUser && existingUser.status === status.BANNED) ||
      existingUser.status === status.INACTIVE
    ) {
      throw new BadRequestException('Access denied');
    }
    return existingUser;
  }

  //-------------------------------------------------------------------------------
  async updateUserInformation(
    user: User,
    param: Partial<CompleteRegisterAuth0Dto>,
  ) {
    await this.userRepo.update(user.id, param);
    return;
  }

  async requestNewPassword(email) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const token = await this.jwrService.generateCPT(user);
    await this.userRepo.update(user.id, { token });
    const updatedUser = await this.userRepo.findOneBy({ token });
    await this.mailerService.sendEmailChangePasswordRequest({
      name: updatedUser.name,
      email: updatedUser.email,
      token: updatedUser.token,
    });
    return updatedUser;
  }

  async changePassword(params) {
    const user = await this.userRepo.findOneBy({ email: params.email });
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }
    if (user.token !== params.token) {
      throw new BadRequestException('Invalid Credentials');
    }
    await this.userRepo.update(user.id, {
      password: params.newPassword.newPassword,
      token: '',
    });
    const updatedUser = await this.userRepo.findOneBy({ email: params.email });
    return updatedUser;
  }
}
