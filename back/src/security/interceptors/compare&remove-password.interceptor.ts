import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { status } from 'src/common/enum/status.enum';
//*     INTERCEPTOR ENCARGADO DE ELIMINAR LAS PROPIEDADES EN LA RESPUESTA
//!     DE INICIO DE SESION POR AUTH 0
@Injectable()
export class CompareAndRemovePasswordInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.password && data.confirmPassword) {
          if (data.password !== data.confirmPassword) {
            throw new Error('Las contraseñas no coinciden');
          }
          delete data.password;
        }
        return data;
      }),
    );
  }
}
