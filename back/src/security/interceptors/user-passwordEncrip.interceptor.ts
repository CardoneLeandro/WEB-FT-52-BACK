//*     INTERCEPTOR ENCARGADO DE ENCRIPTAR EL PASSWORD DEL USUARIO AL MOMENTO DE REGISTRARLO

import { BadRequestException, Injectable } from '@nestjs/common';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPasswordEncripInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    // ==> se hashea la contraseña y se la retorna
    request.body.password = bcrypt.hashSync(request.body.password, 10);
    return next.handle();
  }
}
