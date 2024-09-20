//*     GUARDIAN ACTUALIZADO PARA VALIDAR EL HEADER DE AUTENTICACION
//*     CON TOKEN PARA ACCESO LIMITADO A USUSARIOS ESTANDAR

import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//==>AuthHeaderGuard ahora se extiende de la clase de AuthGuard por lo que hereda todos sus metodos
//==> ('jwt') es el nombre de la estrategia de autenticacion
export class AuthHeaderGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('missing or invalid token');
    }
    return super.canActivate(context);
  }
}
