import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dSource: DataSource) {
    super(User, dSource.getRepository(User).manager);
  }

  createUser(user: Partial<User>): DeepPartial<User> {
    return this.create(user);
  }

  async saveUser(user: DeepPartial<User>): Promise<User> {
    return await this.save(user);
  }

  async findUser(email: string): Promise<User | null> {
    return await this.findOne({
      where: { email },
      relations: ['userInformation'],
    });
  }
}
