//*     INTERCEPTOR ENCARGADO DE ENCRIPTAR EL PASSWORD DEL USUARIO AL MOMENTO DE REGISTRARLO

import { BadRequestException, Injectable } from '@nestjs/common';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

//* INTERCEPTOR ENCARGADO DE ENCRIPTAR EL PROVIDERACCOUNTID DEL USUARIO AL MOMENTO
//* DE INGRESAR POR LA RUTA DE INICIO DE SESION / REGISTRO MEDIANTE EL SERVICIO DE AUTH0 / GOOGLE
//! EN CASO DE QUE NO EXISTA PROVIDERACCOUNTID O QUE ESTE NO SE RECIBA COMO UN NUMBER SE LANZARA UNA EXCEPCION

@Injectable()
export class ProviderAccountIdEncriptorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log(
      'ProviderAccountIdEncriptorInterceptor => ENTRY <=',
      request.body.providerAccountId,
    );
    if (!request.body.providerAccountId) {
      throw new BadRequestException('ProviderAccountId is required');
    }
    request.body.providerAccountId = bcrypt.hashSync(
      request.body.providerAccountId,
      10,
    );
    console.log(
      'ProviderAccountIdEncriptorInterceptor => EXIT <=',
      request.body.providerAccountId,
    );
    return next.handle();
  }
}
