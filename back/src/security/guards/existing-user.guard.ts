import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExistingProductGuard implements CanActivate {
  constructor(private readonly userSv: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const email = request.body.email;

    try {
      const existingUser = await this.userSv.findOne(email);
      if (!existingUser) {
        await this.userSv.createNewUser(request.body);
      }
      return true;
    } catch {
      throw new BadRequestException('error');
    }
  }
}
