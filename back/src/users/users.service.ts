import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { UserInformationService } from 'src/user-information/user-information.service';
import { DataSource } from 'typeorm';
import { UserRole } from 'src/common/enum/userRole.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly dsource: DataSource,
    private readonly userRepo: UsersRepository,
    private readonly userInfoservice: UserInformationService,
  ) {}
  async createNewUser(createUserData): Promise<Partial<User>> {
    return await this.dsource.transaction(async (manager) => {
      const createdUser = this.userRepo.createUser(createUserData);

      const savedUser = await this.userRepo.saveUser(createdUser);

      await this.userInfoservice.createUserInformationTable(savedUser, manager);
      return savedUser;
    });
  }

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
