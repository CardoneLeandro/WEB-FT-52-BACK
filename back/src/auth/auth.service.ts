import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UserRole } from 'src/common/enum/userRole.enum';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly userService: UsersService,
  ) {}

  async onApplicationBootstrap() {
    const existingSuperAdmin = await this.userRepo.findOne({
      where: { role: UserRole.SUPERADMIN },
    });
    console.log(
      'GAMMA => authService, onApplicationBootstrap, existingSuperAdmin ',
      existingSuperAdmin,
    );
  }

  async createNewUser(CreateUserData: CreateUserDto) {
    const newUser = await this.userService.createNewUser(CreateUserData);
    console.log('CARDONE => authService, createNewUser, newUser', newUser);
    return newUser;
  }

  async login(loginUserDto) {
    const user = await this.userRepo.findUser(loginUserDto.email);
    if (!user) {
      return null;
    }
    if (user.password !== loginUserDto.password) {
      return null;
    }
    return user;
  }
}
