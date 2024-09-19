import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { UserInformationService } from 'src/user-information/user-information.service';
import { DataSource, getConnection } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly dsource: DataSource,
    private readonly userRepo: UsersRepository,
    private readonly userInfoservice: UserInformationService,
  ) {}
  async createNewUser(createUserData: CreateUserDto): Promise<User> {
    return await this.dsource.transaction(async (manager) => {
      const createdUser = this.userRepo.createUser(createUserData);
      const savedUser = await this.userRepo.saveUser(createdUser);
      const userInformationTable =
        await this.userInfoservice.createUserInformationTable(
          savedUser,
          manager,
        );
      await this.userRepo.update(savedUser.id, {
        userInformation: userInformationTable,
      });
      return savedUser;
    });
  }

  /*async createNewUser(createUserData: CreateUserDto): Promise<User> {
    const createdUser = this.userRepo.createUser(createUserData);
    if (!createdUser) {
      throw new Error('Could not create user');
    }
    const savedUser: User | null = await this.userRepo.saveUser(createdUser);
    if (!savedUser) {
      throw new Error('Could not save user');
    }
    console.log('CARDONE => usersService, createNewUser, savedUser', savedUser);
    const userInformationTable =
     await this.userInfoservice.createUserInformationTable(savedUser);
    if (!userInformationTable) {
      throw new Error('Could not create userInformation');
    }
    await this.userRepo.update(savedUser.id,{userInformation:userInformationTable});
    return savedUser;
  }*/

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
