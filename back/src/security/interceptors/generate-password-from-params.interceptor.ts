import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
@Injectable()
export class GenerateNewPasswordFromParamsInterceptor
  implements NestInterceptor
{
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    if (!request.params || !request.params.password) {
      throw new BadRequestException(
        'Bouth "password" and "confirmPassword" are required',
      );
    }
    delete request.params.confirmPassword;
    request.body.newPassword = bcrypt.hashSync(request.params.password, 10);
    return next.handle();
  }
}
