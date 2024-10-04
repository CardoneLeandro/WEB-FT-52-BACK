import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { UserInformationService } from 'src/user-information/user-information.service';
import { DataSource } from 'typeorm';
import { UserRole } from 'src/common/enum/userRole.enum';
import { status } from 'src/common/enum/status.enum';
import { CompleteRegisterAuth0Dto } from 'src/auth/dto/complete-register-auth0.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly dsource: DataSource,
    private readonly userRepo: UsersRepository,
    private readonly userInfoservice: UserInformationService,
  ) {}

  //-------------------------------------------------------------------------------

  async createNewUser(params): Promise<Partial<User>> {
    return await this.dsource.transaction(async (manager) => {
      const createdUser = this.userRepo.createUser(params);
      const savedUser = await this.userRepo.saveUser(createdUser);
      await this.userInfoservice.createUserInformationTable(savedUser, manager);
      return savedUser;
    });
  }

  //-------------------------------------------------------------------------------

  async findAll(
    sortBy: string = 'createDate',
    order: 'ASC' | 'DESC' = 'ASC'
  ) {
    const validSortFields = ['price', 'title', 'updateDate'];
    if (!validSortFields.includes(sortBy)) {
      throw new Error(`Invalid sort field: ${sortBy}`);
    }

    const users = await this.userRepo.findUsers(sortBy, order)
    
    return  users
  }

  //-------------------------------------------------------------------------------
  // solo returna al usuario si no existe, o si su estado es cualquiera excepto BANNED o INACTIVE, en cuyo caso lanza una excepcion
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
}
