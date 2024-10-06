import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UserRole } from 'src/common/enum/userRole.enum';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class SuperAdminProtectionGuard implements CanActivate {
  constructor(private readonly userRepo: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.id;
    try {
      const user = await this.userRepo.findOneBy({ id: userId });
      if (user.role === UserRole.SUPERADMIN) {
        return false;
      }
      return true;
    } catch {
      throw new BadRequestException('An error occurred during this request');
    }
  }
}
