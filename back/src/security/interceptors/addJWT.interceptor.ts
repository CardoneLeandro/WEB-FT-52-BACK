import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JsonWebTokenService } from '../../auth/jsonWebToken/jsonWebToken.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class addJWTInterceptor implements NestInterceptor {
  constructor(private readonly jwtSv: JsonWebTokenService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (result) => {
        try {
          const token = await this.jwtSv.generateJwt(result);
          if (result && result.redirect === true) {
            return { token, result}
          }
          return { user: result, token };
        } catch (error) {
          throw new Error('Error al generar el token');
        }
      }),
    );
  }
}
