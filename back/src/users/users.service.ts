import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersRepository } from './users.repository'
import { User } from './entities/user.entity'
import { UserInformationService } from 'src/user-information/user-information.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly userInfoservice: UserInformationService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.userRepo.createUser(createUserDto)
    if (!createdUser) {
      throw new Error('Could not create user')
    }
    const savedUser: User | null = await this.userRepo.saveUser(createdUser)
    if (!savedUser) {
      throw new Error('Could not save user')
    }
    const userInformation =
      this.userInfoservice.createUserInformationTable(savedUser)
    if (!userInformation) {
      throw new Error('Could not create userInformation')
    }
    return savedUser
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
