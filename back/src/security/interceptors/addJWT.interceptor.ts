//*     INTERCEPTOR ENCARGADO DE CARGAR EL TOKEN EN LA RESPUESTA DE INICIO DE SESION

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JsonWebTokenService } from '../jsonWebToken/jsonWebToken.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class addJWTInterceptor implements NestInterceptor {
  constructor(private readonly jwtSv: JsonWebTokenService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (user) => {
        try {
          // ==> then gereate token
          const token = await this.jwtSv.generateJwt(user);
          // and return the user with the new token
          return { user, token };
        } catch (error) {
          throw error({
            message:
              'An error has ben ocurred during the creation of the token',
            error,
          });
        }
      }),
    );
  }
}
