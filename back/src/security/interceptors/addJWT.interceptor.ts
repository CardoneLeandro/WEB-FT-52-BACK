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
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map(async (result) => {
        if (result && result.redirect === true) {
          return result;
        }

        try {
          const token = await this.jwtSv.generateJwt(result);
          return { user: result, token };
        } catch (error) {
          throw new Error(
            'An error has occurred during the creation of the token',
          );
        }
      }),
    );
  }
}
