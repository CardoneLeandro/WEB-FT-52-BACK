import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UserRole } from 'src/common/enum/userRole.enum';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UsersRepository) {}

  async onApplicationBootstrap() {
    const existingSuperAdmin = await this.userRepo.findOne({
      where: { role: UserRole.SUPERADMIN },
    });
    console.log(
      'GAMMA => authService, onApplicationBootstrap, existingSuperAdmin ',
      existingSuperAdmin,
    );
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

  create(createAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
