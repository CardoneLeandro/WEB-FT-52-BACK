import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/common/enum/userRole.enum';
import { UsersRepository } from 'src/users/users.repository';

interface DecodedToken {
  id: string;
  creatorId: string;
  role: UserRole;
}

@Injectable()
export class SelfProtectionGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly userRepo: UsersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const token = authHeader.split(' ')[1];
    const userId = request.params.id;
    try {
      const decodedToken = this.jwtService.verify(token) as DecodedToken;
      const user = await this.userRepo.findOneBy({ id: userId });

      if (user.id === decodedToken.id) {
        throw new ForbiddenException(
          'You do not have permission to modify your own account',
        );
      }
      return true;
    } catch {
      throw new BadRequestException('An error occurred during this request');
    }
  }
}
