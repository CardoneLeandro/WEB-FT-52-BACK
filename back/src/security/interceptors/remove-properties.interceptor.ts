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
        if(data && data.role) { delete data.role}
        if(data && data.status) { delete data.status}
        if(data && data.providerAccountId) { delete data.providerAccountId}
        if(data && data.updateDate) { delete data.updateDate}
        if(data && data.password) { delete data.password}
        if(data && data.password === null) { delete data.password}

        return data
        
      }),
    );
  }
}
