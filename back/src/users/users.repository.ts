import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { status } from 'src/common/enum/status.enum';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dSource: DataSource) {
    super(User, dSource.getRepository(User).manager);
  }
  
  async getUser(id){
    const user:User = await this.findOneBy({id})
    const {userInformation, password, providerAccountId, address, phone, updateDate, ...rest} = user
    return rest
  }

  async getAllUsers(){
    const users:User[] = await this.find()
    const filteredUsers = users.map((user) => {
      const {userInformation, password, providerAccountId, address, phone, updateDate, ...rest} = user
      return rest
    })
    return filteredUsers
  }

  createUser(user: Partial<User>): DeepPartial<User> {
    return this.create(user);
  }

  async saveUser(user: DeepPartial<User>): Promise<User> {
    return await this.save(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.findOne({
      where: { email },
      relations: ['userInformation'],
    });
  }

  async findUsers(sortBy: string, order: 'ASC' | 'DESC') {
    return await this.find({
      order: {
        [sortBy]: order,
      },
    });
  }
  }
