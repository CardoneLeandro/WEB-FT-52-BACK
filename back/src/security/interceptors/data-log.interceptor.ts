import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DataLogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    // Obtener datos de la solicitud
    const method = request.method;
    const url = request.originalUrl;
    const headers = request.headers;
    const params = request.params;
    const query = request.query;
    const body = request.body;

    const refererUrl =
      headers['referer'] || headers['referrer'] || 'No disponible';
    
    console.log('==== Datos de la Solicitud ====');
    console.log(`URL de Referencia: ${refererUrl}`);
    console.log(`Método: ${method}`);
    console.log(`Ruta: ${url}`);
    console.log('Headers:', headers);
    console.log('Params:', params);
    console.log('Query:', query);
    console.log('Body:', body);
    console.log('===============================');
    
  //   return next.handle();
  // }

    const startTime = Date.now();
    return next.handle().pipe(
      tap((response) => {
        const elapsedTime = Date.now() - startTime;

        const statusCode = context.switchToHttp().getResponse().statusCode;
        const responseHeaders = context
          .switchToHttp()
          .getResponse()
          .getHeaders();
        console.log('===============================');
        console.log('==== Datos de la Respuesta ====');
        console.log(`Código de Estado: ${statusCode}`);
        console.log('Respuesta:', response);
        console.log('Headers de Respuesta:', responseHeaders);
        console.log(`Tiempo de Respuesta: ${elapsedTime} ms`);
        console.log('===============================');
      }),
    );
  }
}

