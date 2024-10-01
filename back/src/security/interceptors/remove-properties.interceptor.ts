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
export class RemovePropertiesInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // console.log('REMOVE PROPERTIES INTERCEPTOR');
    return next.handle().pipe(
      map((data) => {
        if (data && data.email === null) {
          delete data.email;
        }

        if (data && data.name === null) {
          delete data.name;
        }

        if (data && data.id === null) {
          delete data.id;
        }

        if ((data && data.role) || data.role === null) {
          delete data.role;
        }
        if (
          (data && data.status === status.ACTIVE) ||
          data.status === status.BANNED ||
          data.status === status.INACTIVE ||
          data.status === status.PARTIALACTIVE
        ) {
          delete data.status;
        }
        if (
          (data && data.providerAccountId && data.status !== status.PENDING) ||
          data.providerAccountId === null
        ) {
          delete data.providerAccountId;
        }
        if ((data && data.updateDate) || data.updateDate === null) {
          delete data.updateDate;
        }
        if ((data && data.password) || data.password === null) {
          delete data.password;
        }
        if (data && data.phone === null) {
          delete data.phone;
        }
        if (data && data.address === null) {
          delete data.address;
        }
        if (data && data.image === null) {
          delete data.image;
        }
        return data;
      }),
    );
  }
}
