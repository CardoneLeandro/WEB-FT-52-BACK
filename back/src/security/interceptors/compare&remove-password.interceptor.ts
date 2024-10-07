import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
//! INTERCEPTOR ENCARGADO DE COMPARAR EL PASSWORD Y EL PASSWORD DE CONFIRMACION
//! EN CASO DE QUE NO COINCIDAN SE LANZARA UNA EXCEPCION
//! EN CASO DE QUE COINCIDAN SE ELIMINAN EL CAMPO DE "CONFIRMAR PASSWORD"
//! Y SE ENCRIPTA EL PASSWORD
@Injectable()
export class CompareAndRemovePasswordInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    if (
      !request.body ||
      !request.body.password ||
      !request.body.confirmPassword
    ) {
      throw new BadRequestException(
        'Bouth "password" and "confirmPassword" are required',
      );
    }
    if (request.body.password !== request.body.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    delete request.body.confirmPassword;
    request.body.password = await bcrypt.hashSync(request.body.password, 10);
    return next.handle();
  }
}
