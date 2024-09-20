//*     GUARDIAN ACTUALIZADO PARA VALIDAR EL HEADER DE AUTENTICACION
//*     CON TOKEN Y CONFIGURADO PARA TRABAJAR CON ROLES
//*     DISEÑADO PARA PERMITIR ACCESO A USUARIOS DE TIPO ADMINISTRADOR

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRole } from 'src/common/enum/user.role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      //*     VERIFICAMOS LA PRESENCIA DEL TOKEN Y SU EXPIRACION     *//
      const decodedToken = this.jwtService.verify(token) as { role: UserRole };

      if (decodedToken.role !== UserRole.ADMIN) {
        throw new ForbiddenException(
          'You do not have permission to access this resource',
        );
      }

      return true;
    } catch (err) {
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}
