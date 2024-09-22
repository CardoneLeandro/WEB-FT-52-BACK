import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//*     INTERCEPTOR ENCARGADO DE ELIMINAR LAS PROPIEDADES EN LA RESPUESTA
//!     DE INICIO DE SESION POR AUTH 0
@Injectable()
export class RemovePropertiesInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (
          data &&
          data.role &&
          data.status &&
          data.providerAccountId &&
          data.updateDate
        ) {
          delete data.role;
          delete data.status;
          delete data.providerAccountId;
          delete data.updateDate;
          return data;
        }
      }),
    );
  }
}
